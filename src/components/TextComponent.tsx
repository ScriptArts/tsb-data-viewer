import { useCallback, useMemo, useState } from 'react';
import { Box, type BoxProps } from '@primer/react';
import { useAnimationFrame } from '../hooks/useAnimationFrame';
import { obfuscate } from '../utils/obfuscate';
import { colorToRgb } from '../utils/colorToRgb';
import type { TextComponent as TextComponentType } from '../types/Artifact';
import { useAppContext } from '../contexts/AppContext';

type Props = BoxProps & {
    raw: TextComponentType | TextComponentType[];
};

export const TextComponent = ({ raw, sx, ...props }: Props) => {
    const [obfuscatedText, setObfuscatedText] = useState<string>();

    const { langData } = useAppContext();

    const replaceColor = useCallback((color?: string) => {
        if (!color) return color;
        return color
            .replace('dark_blue'   , '#00a')
            .replace('dark_green'  , '#0a0')
            .replace('dark_aqua'   , '#0aa')
            .replace('dark_red'    , '#a00')
            .replace('dark_purple' , '#a0a')
            .replace('dark_gray'   , '#555')
            .replace('gold'        , '#fa0')
            .replace('gray'        , '#aaa')
            .replace('blue'        , '#55f')
            .replace('green'       , '#5f5')
            .replace('aqua'        , '#5ff')
            .replace('red'         , '#f55')
            .replace('light_purple', '#f5f')
            .replace('yellow'      , '#ff5');
    }, []);

    const animationFrame = useCallback(() => {
        if (raw instanceof Array || !raw.obfuscated) return false;

        setObfuscatedText(obfuscate(raw.text ?? ''));

        return true;
    }, [raw]);
    useAnimationFrame(animationFrame);

    const text = useMemo(() => {
        if (raw instanceof Array) return undefined;

        if (raw.text !== undefined) {
            return raw.text;
        }
        else if (raw.nbt !== undefined) {
            return `{${raw.nbt}}`;
        }
        else if (raw.translate !== undefined && langData) {
            return langData[raw.translate];
        }

        return undefined;
    }, [langData, raw]);

    const rgb = useMemo(() => {
        if (raw instanceof Array) return undefined;
        return colorToRgb(replaceColor(raw.color) ?? 'white');
    }, [raw, replaceColor]);
    const color = useMemo(() => {
        if (!rgb) return undefined;
        const { r, g, b } = rgb;
        return `rgb(${r}, ${g}, ${b})`;
    }, [rgb]);
    const textShadow = useMemo(() => {
        if (!rgb) return undefined;
        const { r, g, b } = rgb;
        return `1px 1px 0 rgba(${r}, ${g}, ${b}, 0.3)`;
    }, [rgb]);

    const textDecoration = useMemo(() => {
        if (raw instanceof Array) return undefined;

        const arr: string[] = [];

        if (raw.underlined) arr.push('underline');
        if (raw.strikethrough) arr.push('line-through');

        return arr.join(' ');
    }, [raw]);

    if (raw instanceof Array) {
        const arr = [...raw].flat();

        // 上書きしなければ前に定義したものが後ろに引き継がれる
        //   [{ text: 'A', bold: true }, { text: 'B' }, { text: 'C', bold: false }]
        // > [{ text: 'A', bold: true }, { text: 'B', bold: true }, { text: 'C', bold: false }]
        if (arr.length > 0) {
            let before = arr[0];
            for (const [idx] of arr.entries()) {
                arr[idx] = { ...before, ...arr[idx] };
                before = arr[idx];
            }
        }

        return (
            <>
                {arr.map((x, i) => (
                    <TextComponent key={i} raw={x} {...props} />
                ))}
            </>
        );
    }

    return (
        <Box
            as='span'
            display='inline'
            color={color}
            fontFamily='Monocraft, JF Dot K12'
            fontWeight={raw.bold ? 'bold' : undefined}
            fontStyle={raw.italic ? 'italic' : undefined}
            textShadow={textShadow}
            sx={{
                whiteSpace: 'pre-wrap',
                textDecoration,
                fontVariantLigatures: 'none',
                ...sx,
            }}
            {...props}
        >{obfuscatedText ?? text}</Box>
    );
};
