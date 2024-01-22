import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { Company } from "../companies/company-service";
import { Point, clusterShiftedPoints, meanShift } from "../../core/mean-shift";
import { generateUniqueColors } from "../utils";
import { nearestNeighbor } from "../../core/nearest-neighbour";


function convertCompaniesToDataPoint(companies: Company[]): Point[] {
    return companies.map(company => {
        return { x: company.numberOfEmployees, y: company.revenue };
    });
}

export function useMeanShiftDataSet(radius: number = 1000) {
    const { value: companies } = useAppSelector(state => state.company_state);
    const datasets = useMemo(() => {
        const dataPoints = convertCompaniesToDataPoint(companies);
        const shiftedPoints = meanShift(dataPoints, radius);
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

        return { datasets: datasetsPerCluster };
    }, [companies, radius]);

    return datasets;
}


export function useNearestNeighborDataSet(k: number = 10) {
    const { value: companies } = useAppSelector(state => state.company_state);
    const datasets = useMemo(() => {
        const dataPoints = convertCompaniesToDataPoint(companies);
        const clusters = nearestNeighbor(dataPoints, k);
        const colors = generateUniqueColors(clusters.length);
        const datasetsPerCluster = clusters.map((cluster, i) => ({
            label: `C-${cluster?.centroid?.x}-${cluster?.centroid?.y}`,
            data: cluster.points,
            backgroundColor: colors[i % colors.length],
            pointBackgroundColor: colors[i % colors.length],
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: colors[i % colors.length],
        }));

        return { datasets: datasetsPerCluster };
    }, [companies,k]);

    return datasets;
}