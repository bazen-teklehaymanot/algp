export function generateUniqueColors(n: number) {
    const colors = [];
    for (let i = 0; i < n; i++) {
        const uniqueRgba = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`;
        colors.push(uniqueRgba);
    }
    return colors;
}