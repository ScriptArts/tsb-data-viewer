import { useCallback, useMemo, useState } from 'react';
import { Box, type BoxProps } from '@primer/react';
import { useAnimationFrame } from '../hooks/useAnimationFrame';
import { useObfuscate } from '../hooks/useObfuscate';
import type { TextComponent as TextComponentType } from '../types/Artifact';

type Props = BoxProps & {
    raw: TextComponentType | TextComponentType[];
};

const Recursive = ({ raw, sx, ...props }: Props) => {
    const [text, setText] = useState(
        raw instanceof Array ? undefined
        : raw.text !== undefined ? raw.text
        : raw.nbt !== undefined ? `{${raw.nbt}}`
        : undefined,
    );

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

    const obfuscate = useObfuscate();

    const animationFrame = useCallback(() => {
        if (raw instanceof Array || !text) return;
        if (!raw.obfuscated) return;
        setText(obfuscate(raw.text ?? ''));
    }, [obfuscate, raw, text]);
    useAnimationFrame(animationFrame);

    const transform = useMemo(() => {
        if (raw instanceof Array) return undefined;
        const arr: string[] = [];
        if (raw.italic) arr.push('skewX(-25deg)');
        if (raw.obfuscated) arr.push('scaleY(0.6)');
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

        // 1文字ずつに分割して改行できるようにする(inline-blockだとブロックごと改行される)
        const chars: TextComponentType[] = [];
        for (const x of arr) {
            if (!x.text) chars.push(x);
            else {
                for (const y of [...x.text]) {
                    chars.push({ ...x, text: y });
                }
            }
        }

        return (
            <>
                {chars.map((x, i) => (
                    <Recursive key={i} raw={x} {...props} />
                ))}
            </>
        );
    }

    return (
        <Box
            as='span'
            position='relative'
            display='inline-block'
            color={replaceColor(raw.color) ?? 'white'}
            fontFamily='JF Dot K12'
            fontWeight={raw.bold ? 'bold' : undefined}
            sx={{
                whiteSpace: 'pre-wrap',
                textDecoration: raw.underlined ? 'underline': undefined,
                transform,
                ...sx,
            }}
            {...props}
        >{text}</Box>
    );
};

export const TextComponent = (props: Props) => {
    return (
        <Box lineHeight={props.fontSize}>
            <Recursive {...props} />
        </Box>
    );
};
