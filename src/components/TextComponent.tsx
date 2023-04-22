import { useCallback, useMemo, useState } from 'react';
import { Box, type BoxProps } from '@primer/react';
import { useAnimationFrame } from '../hooks/useAnimationFrame';
import { obfuscate } from '../utils/obfuscate';
import { colorToRgb } from '../utils/colorToRgb';
import type { TextComponent as TextComponentType } from '../types/Artifact';

type Props = BoxProps & {
    raw: TextComponentType | TextComponentType[];
};

export const TextComponent = ({ raw, sx, ...props }: Props) => {
    const [obfuscatedText, setObfuscatedText] = useState<string>();

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
        if (raw instanceof Array || !raw.obfuscated) return;

        setObfuscatedText(obfuscate(raw.text ?? ''));
    }, [raw]);
    useAnimationFrame(animationFrame);

    const text = useMemo(() => {
        return raw instanceof Array ? undefined
            : raw.text !== undefined ? raw.text
            : raw.nbt !== undefined ? `{${raw.nbt}}`
            : undefined;
    }, [raw]);

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
                textDecoration: raw.underlined ? 'underline': undefined,
                fontVariantLigatures: 'none',
                ...sx,
            }}
            {...props}
        >{obfuscatedText ?? text}</Box>
    );
};
