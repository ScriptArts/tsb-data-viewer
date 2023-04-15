export const colorToRgb = (color: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw Error('No Context');

    context.fillStyle = color;
    const r = parseInt(context.fillStyle.slice(1, 3), 16);
    const g = parseInt(context.fillStyle.slice(3, 5), 16);
    const b = parseInt(context.fillStyle.slice(5, 7), 16);

    return { r, g, b };
};
