const chars = [
    [0x0020, 0x007e],
    [0x00a1, 0x00ac],
    [0x00ae, 0x0110],
    [0x0112, 0x0125],
    [0x0128, 0x012d],
    [0x0130, 0x0130],
    [0x0132, 0x013e],
    [0x0141, 0x0148],
    [0x014c, 0x0155],
].map(([s, e]) =>
    [...Array(e - s + 1).keys()].map(x => x + s),
).flat();

export const obfuscate = (text: string) => {
    // 全角は2文字としてカウント(サロゲートペアも2文字扱い)
    const len = [...text].reduce((count, char) => {
        return count += char.match(/[ -~]/) ? 1 : 2;
    }, 0);

    return [...Array(len).keys()]
        .map(() => String.fromCodePoint(
            chars[Math.floor(Math.random() * chars.length)],
        ))
        .join('');
};
