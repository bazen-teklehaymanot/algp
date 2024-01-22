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
import { Hub } from "@mui/icons-material";
import { useMeanShiftDataSet, useNearestNeighborDataSet } from "./clustering-hook";
import { useState } from "react";


ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function hideLabel() {
    return ''
}

const options = {
    scales: {
        y: {
            beginAtZero: true,
            ticks: { callback: hideLabel }
        },
        x: {
            beginAtZero: true,
            ticks: { callback: hideLabel }
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

interface MeanShiftClusteringProps {
    title: string;
}

export function MeanShiftClustering(props: MeanShiftClusteringProps) {
    const [clustering, setClustering] = useState<'mean-shift' | 'nearest-neighbor'>('mean-shift');
    const meanShifDataSet = useMeanShiftDataSet();
    const nearestNeighborDataSet = useNearestNeighborDataSet(50);
    return (
        <Card variant="soft" style={{ height: '100%' }} >
            <Select
                value={clustering}
                placeholder="Select Clustering Algorithm"
                startDecorator={<Hub />}
                sx={{ width: 300 }}
                onChange={(_, value) => {
                    if (value)
                        setClustering(value)
                }}
            >
                <Option value="mean-shift">Mean Shift</Option>
                <Option value="nearest-neighbor">Nearest Neighbor</Option>
            </Select>
            {
                clustering === 'mean-shift' &&
                <Scatter
                    options={options}
                    data={meanShifDataSet} />
            }
            {
                clustering === 'nearest-neighbor' &&
                <Scatter
                    options={options}
                    data={nearestNeighborDataSet}
                />
            }
        </Card>
    )
}