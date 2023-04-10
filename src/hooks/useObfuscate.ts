import { useCallback, useMemo } from 'react';

export const useObfuscate = () => {
    const ignoreChars = useMemo(() => [
        0x41, // A
        0x45, // E
        0x49, // I
        0x4f, // O
        0x55, // U
        0x61, // a
        0x65, // e
        0x69, // i
        0x6f, // o
        0x75, // u
        0x79, // y
    ], []);
    // JF Dot K12で等幅になる半角文字
    const chars = useMemo(() => {
        const alphabetArr = [...Array(26).keys()];
        const c = [
            ...alphabetArr.map(x => x + 0x41), // A-Z
            ...alphabetArr.map(x => x + 0x61), // a-z
            ...[...Array(0x40 - 0x21).keys()].map(x => x + 0x21), // !-@
        ];
        return c.filter(char => !ignoreChars.includes(char));
    }, [ignoreChars]);

    // 結合文字
    const pairChars = useMemo(() => [
        0x304, // ̄
        0x306, // ̆
        0x308, // ̈
        0x30b, // ̋
        0x30f, // ̏
        0x318, // ̘
        0x319, // ̙
        0x31a, // ̚
        0x31c, // ̜
        0x31d, // ̝
        0x31e, // ̞
        0x31f, // ̟
        0x320, // ̠
        0x324, // ̤
        0x325, // ̥
        0x329, // ̩
        0x32a, // ̪
        0x32c, // ̬
        0x32f, // ̯
        0x330, // ̰
        0x334, // ̴
        0x339, // ̹
        0x33a, // ̺
        0x33b, // ̻
        0x33c, // ̼
        0x33d, // ̽
        0x344, // ̈́
        0x34f, // CGJ
    ], []);

    const obfuscate = useCallback((text: string) => {
        // 全角は2文字としてカウント(サロゲートペアも2文字扱い)
        // 結合文字系は分解してカウントされる
        const len = [...text].reduce((count, char) => {
            return count += char.match(/[ -~]/) ? 1 : 2;
        }, 0);
        return [...Array(len).keys()]
            .map(() => String.fromCodePoint(
                chars[Math.floor(Math.random() * chars.length)],
                pairChars[Math.floor(Math.random() * pairChars.length)],
            ))
            .join('');
    }, [chars, pairChars]);

    return obfuscate;
};
