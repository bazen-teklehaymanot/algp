import { Card, Select, Option } from "@mui/joy";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { useEffect, useMemo, useState } from "react";
import { faker } from '@faker-js/faker';

import { Hub } from "@mui/icons-material";


interface Point {
    x: number;
    y: number;
}

function euclideanDistance(point1: Point, point2: Point) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}

function meanShift(data: Point[], radius: number): Point[] {
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

function clusterShiftedPoints(shiftedPoints: Point[], radius: number): number[] {
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

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function hideLabel(){
    return ''
}

const options = {
    scales: {
        y: {
            beginAtZero: true,
            ticks: { callback: hideLabel}
        },
        x: { 
            beginAtZero: true,
            ticks: { callback: hideLabel}
        },
    },
    plugins: {
        legend: {
            display: false,
            labels: {
                color: 'rgb(255, 99, 132)'
            }
        }
    }

};

const dummyPoints = Array.from({ length: 1000 }, () => ({
    x: faker.datatype.number({ min: 0, max: 10_000 }),
    y: faker.datatype.number({ min: 0, max: 10_000 }),
}));

const dummyData = {
    datasets: [
        {
            label: 'A dataset',
            data: dummyPoints,
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
    ],
};

interface MeanShiftClusteringProps {
    title: string;
}

export function MeanShiftClustering(props: MeanShiftClusteringProps) {
    const [chartData, setChartData] = useState(dummyData);

    const data: Point[] = useMemo(() => {
        const points = [];
        for (let i = 0; i < 100; i++) {
            points.push({ x: Math.random() * 100, y: Math.random() * 100 });
        }
        return points;
    }, []);
    const radius = 1000;

    function generateUniqueColors(n: number) {
        const colors = [];
        for (let i = 0; i < n; i++) {
            const uniqueRgba = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`;
            colors.push(uniqueRgba);
        }
        return colors;
    }

    useEffect(() => {
        const shiftedPoints = meanShift(dummyPoints, radius);
        const clusters = clusterShiftedPoints(shiftedPoints, radius);
        const clusterDict: Record<number, Point[]> = {};
        for (let i = 0; i < shiftedPoints.length; i++) {
            const cluster = clusters[i];
            if (!clusterDict[cluster]) clusterDict[cluster] = [];
            clusterDict[cluster].push(shiftedPoints[i]);
        }
        const colors = generateUniqueColors(Object.keys(clusterDict).length);
        const datasetsPerCluster = Object.keys(clusterDict).map((cluster: any, i) => ({
            label: `C-${cluster}`,
            data: clusterDict[cluster],
            backgroundColor: colors[i % colors.length],
            pointBackgroundColor: colors[i % colors.length],
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: colors[i % colors.length],
        }));


        console.log({ datasetsPerCluster }, { clusterDict })
        setChartData({ datasets: datasetsPerCluster, });

    }, [data]);

    return (
        <Card variant="soft" style={{ height: '100%' }} >
            <Select
                placeholder="Select Clustering Algorithm"
                startDecorator={<Hub />}
                sx={{ width: 300 }}
            >
                <Option value="mean-shift">Mean Shift</Option>
                <Option value="nearest-neighbor">Nearest Neighbor</Option>
            </Select>
            <Scatter options={options} data={chartData} />
        </Card>
    )
}