import CivChartConfig, { FilterLegendConfig } from "@site/src/utils/civ-chart-config";
import Chart from "./chart";
import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import { merge } from 'lodash-es';
import { Filter } from "../filter/filter-dialog";

export default function CivBanChart({ draftsData, filter }: { draftsData: { civDrafts: any[] }, filter: Filter }): JSX.Element {
    useDelayedColorMode();
    const draftPickData: { [key: string]: { player: number, admin: number } } = draftsData.civDrafts.reduce(
        (acc, draft) => {
            const civBans = draft.draft.filter(v => v.action === 'ban');
            for (const ban of civBans) {
                const civName = ban.map;
                if (!acc.hasOwnProperty(civName)) {
                    acc[civName] = { player: 0, admin: 0 };
                }
                acc[civName][ban.type] = acc[civName][ban.type] + 1;
            }
            return acc;
        },
        {},
    );
    const player_data = [];
    const admin_data = [];
    const keys = [];
    for (const [key, value] of Object.entries(draftPickData).sort(([_ka, a], [_kb, b]) => b.player + b.admin - a.player - a.admin)) {
        player_data.push(value.player);
        admin_data.push(value.admin);
        keys.push(key);
    }

    const style = getComputedStyle(document.body);
    const options = merge(CivChartConfig(style, player_data), FilterLegendConfig(style, filter, false), {
        plugins: {
            title: { display: true, text: 'Civilization bans' },
            tooltip: { enables: true },
        },
        scale: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    });
    return <Chart data={{
        datasets: [{
            data: player_data,
            backgroundColor: player_data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary') : style.getPropertyValue('--ifm-color-secondary')),
            borderColor: player_data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary-dark') : style.getPropertyValue('--ifm-color-secondary-dark')),
            borderWidth: 2,
            label: "Player bans"
        },
        {
            data: admin_data,
            backgroundColor: admin_data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary-lightest') : style.getPropertyValue('--ifm-color-secondary-lightest')),
            borderColor: admin_data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary-dark') : style.getPropertyValue('--ifm-color-secondary-dark')),
            borderWidth: 2,
            label: "Admin bans"
        }], labels: keys
    }} options={options}></Chart>;
};
