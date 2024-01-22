import { Point } from "./mean-shift";



interface Cluster {
    centroid: Point;
    points: Point[];
}


function calculateInitialCentroids(data: Point[], k: number): Point[] {
    const centroids: Point[] = [];
    const usedIndices: number[] = [];

    for (let i = 0; i < k; i++) {
        let index = Math.floor(Math.random() * data.length);

        while (usedIndices.includes(index)) {
            index = Math.floor(Math.random() * data.length);
        }

        centroids.push(data[index]);
        usedIndices.push(index);
    }

    return centroids;
}

export function nearestNeighbor(data: Point[], k: number): Cluster[] {
    const centroids: Point[] = calculateInitialCentroids(data, k);
    const clusters: Cluster[] = centroids.map(centroid => ({ centroid, points: [] }));

    data.forEach(point => {
        let minDistance = Infinity;
        let nearestCluster: Cluster | undefined;

        clusters.forEach(cluster => {
            const dx = point.x - cluster.centroid.x;
            const dy = point.y - cluster.centroid.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                minDistance = distance;
                nearestCluster = cluster;
            }
        });

        if (nearestCluster) {
            nearestCluster.points.push(point);
        }
    });

    return clusters;
}