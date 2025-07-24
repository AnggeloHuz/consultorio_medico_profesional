import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var misoptions = {
    responsive : true,
    animation : false,
    plugins : {
        legend : {
            display : false
        }
    },
    scales : {
        y : {
            min : 0,
            max : 30
        },
        x: {
            ticks: { color: 'rgba(44, 82, 130)'}
        }
    }
};


export default function BarsChart({unidad, label}) {
    return <Bar data={{
        labels: [label],
        datasets: [
            {
                label: 'Cantidad',
                data: [unidad],
                backgroundColor: 'rgba(44, 82, 130, 0.8)'
            }
        ]
    }} options={misoptions} />
}