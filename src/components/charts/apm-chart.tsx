import { Scatter } from "react-chartjs-2";
import { Chart, PointElement } from 'chart.js'
import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import { BracketNameToImage } from "@site/src/data/mapping";

Chart.register(PointElement);

type Bracket = keyof typeof BracketNameToImage
const bracketOrder = Object.keys(BracketNameToImage) as Bracket[];
const bracketColors: { [bracket in Bracket]: string } = {
    Champions: "#1f77b4",
    Paladins: "#ff7f0e",
    Monks: "#2ca02c",
    Mangonels: "#d62728",
    Scorpions: "#9467bd",
    Rams: "#8c564b",
    Knights: "#e377c2",
    "Steppe Lancers": "#7f7f7f",
    Camels: "#bcbd22",
    "Light Cavs": "#17becf",
    Eagles: "#0c5f68",
    Pikemen: "#680c5f",
    Longswords: "#1f77b4",
    Crossbows: "#ff7f0e",
    Skirms: "#2ca02c",
    Spearmen: "#d62728",
    Archers: "#9467bd",
    Militia: "#8c564b",
};

export default function ApmChart({ gamesData }: { gamesData: any[] }): JSX.Element {
    useDelayedColorMode();
    let bracketApm: Map<Bracket, Array<number>> = new Map();
    gamesData.forEach(game => {
        if (!bracketApm.has(game.bracket)) {
            bracketApm.set(game.bracket, []);
        }
        bracketApm.set(game.bracket, [...bracketApm.get(game.bracket), ...game.eapm]);
    });
    const datasets = bracketOrder.map((bracket, index) => ({
        label: bracket,
        data: (bracketApm.get(bracket) ?? []).map(eapm => ({
            x: Math.random() * 0.4 + 0.4,
            y: eapm,
        })),
        xAxisID: `x${index == 0 ? '' : index}`,
        backgroundColor: bracketColors[bracket],
        borderColor: bracketColors[bracket],
    }));

    const style = getComputedStyle(document.body);

    const xLabels = {
        id: 'xLabels',
        beforeDatasetsDraw(chart: Chart<'scatter'>) {
            const { ctx, scales } = chart;
            ctx.save();

            Object.keys(scales).forEach((axis, index) => {
                if (axis == "y") {
                    return;
                }
                ctx.beginPath();
                ctx.strokeStyle = style.getPropertyValue('--ifm-color-emphasis-300');
                ctx.moveTo(scales.x.getPixelForValue(index), scales.x.top);
                ctx.lineTo(scales.x.getPixelForValue(index), scales.x.bottom);
                ctx.stroke();
            });

            chart.data.datasets.forEach(dataset => {
                ctx.fillStyle = style.getPropertyValue('--ifm-color-emphasis-800');
                ctx.textAlign = 'center';
                ctx.fillText(dataset.label, scales[dataset.xAxisID].getPixelForValue(0.5), scales[dataset.xAxisID].bottom + 10);
            });
        }
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'eAPM by bracket',
            },
            legend: {
                display: false,
            },
            tooltip: {
                enables: true,
                callbacks: {
                    label: ({ dataset, parsed }) => {
                        return `${dataset.label}: ${parsed.y}`;
                    },
                },
            },
        },
        layout: {
            padding: {
                bottom: 30
            }
        },
        scales: {
            ...Object.fromEntries(
                bracketOrder.map((bracket, index) => [
                    `x${index == 0 ? '' : index}`,
                    {
                        beginAtZero: true,
                        max: 1,
                        stack: 'strip',
                        grid: { display: false },
                        ticks: { display: false }
                    }
                ])
            ),
            y: {
                grid: {
                    color: style.getPropertyValue('--ifm-color-emphasis-300'),
                },
                ticks: {
                    color: style.getPropertyValue('--ifm-color-emphasis-800'),
                },
            }
        },
    };
    return <Scatter data={{
        datasets
    }} options={options} plugins={[xLabels]}></Scatter>;
};
