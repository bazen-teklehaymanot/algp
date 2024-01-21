
export type LevenshteinPath = { i: number; j: number; type?: string }[];

export function levenshteinDistance(firstWord: string, secondWord: string) {
    firstWord = firstWord.toLowerCase();
    secondWord = secondWord.toLowerCase();
    let m: number[][] = [],
        paths: [number, number][][] = [],
        l1 = firstWord.length,
        l2 = secondWord.length;
    for (let i = 0; i <= l1; i++) {
        m[i] = [i];
        paths[i] = [[i - 1, 0]];
    }
    for (let j = 0; j <= l2; j++) {
        m[0][j] = j;
        paths[0][j] = [0, j - 1];
    }
    for (let i = 1; i <= l1; i++)
        for (let j = 1; j <= l2; j++) {
            if (firstWord.charAt(i - 1) == secondWord.charAt(j - 1)) {
                m[i][j] = m[i - 1][j - 1];
                paths[i][j] = [i - 1, j - 1];
            } else {
                let min = Math.min(m[i - 1][j], m[i][j - 1], m[i - 1][j - 1]);
                m[i][j] = min + 1;
                if (m[i - 1][j] === min) paths[i][j] = [i - 1, j];
                else if (m[i][j - 1] === min) paths[i][j] = [i, j - 1];
                else if (m[i - 1][j - 1] === min) paths[i][j] = [i - 1, j - 1];
            }
        }

    let levenshteinPath: LevenshteinPath = [];
    let j = l2;
    for (let i = l1; i >= 0 && j >= 0;)
        for (j = l2; i >= 0 && j >= 0;) {
            levenshteinPath.push({ i, j });
            let t = i;
            i = paths[i][j][0];
            j = paths[t][j][1];
        }
    levenshteinPath = levenshteinPath.reverse();
    for (let i = 0; i < levenshteinPath.length; i++) {
        const last = levenshteinPath[i - 1],
            cur = levenshteinPath[i];
        if (i !== 0) {
            if (
                cur.i === last.i + 1 &&
                cur.j === last.j + 1 &&
                m[cur.i][cur.j] !== m[last.i][last.j]
            )
                cur.type = "replace";
            else if (cur.i === last.i && cur.j === last.j + 1)
                cur.type = "insert";
            else if (cur.i === last.i + 1 && cur.j === last.j)
                cur.type = "delete";
        }
    }
    return { matrix: m, levenshteinPath };
}

export function levenshteinCost(firstWord: string, secondWord: string) {
    const { matrix } = levenshteinDistance(firstWord, secondWord);
    return matrix[firstWord.length][secondWord.length];
}