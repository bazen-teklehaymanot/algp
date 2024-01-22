export interface Point {
    x: number;
    y: number;
}

function euclideanDistance(point1: Point, point2: Point) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}

export function meanShift(data: Point[], radius: number): Point[] {
    const maxIterations = 100;
    let shiftedPoints = Array.from(data);

    for (let t = 0; t < maxIterations; t++) {
        let maxShiftDistance = 0;
        for (let i = 0; i < shiftedPoints.length; i++) {
            const pointOld = shiftedPoints[i];
            let weights = Array(shiftedPoints.length).fill(0);
            for (let j = 0; j < shiftedPoints.length; j++) {
                const distance = euclideanDistance(pointOld, shiftedPoints[j]);
                if (distance < radius) {
                    weights[j] = 1;
                }
            }

            const pointNew: Point = { x: 0, y: 0 };
            let weightSum = 0;
            for (let j = 0; j < weights.length; j++) {
                if (weights[j] === 0) continue;
                const weight = weights[j];
                weightSum += weight;
                pointNew.x += weight * shiftedPoints[j].x;
                pointNew.y += weight * shiftedPoints[j].y;
            }

            pointNew.x /= weightSum;
            pointNew.y /= weightSum;

            const shiftDistance = euclideanDistance(pointOld, pointNew);
            maxShiftDistance = Math.max(maxShiftDistance, shiftDistance);

            shiftedPoints[i] = pointNew;
        }

        if (maxShiftDistance < radius * 0.001) break;
    }

    return shiftedPoints;
}

export function clusterShiftedPoints(shiftedPoints: Point[], radius: number): number[] {
    return shiftedPoints.map((point, i) => {
        let nearestClusterIndex = 0;
        for (let j = 0; j < shiftedPoints.length; j++) {
            const distance = euclideanDistance(point, shiftedPoints[j]);
            if (distance < radius) {
                nearestClusterIndex = j;
            }
        }
        return nearestClusterIndex;
    });
}
