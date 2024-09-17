import { useState } from 'react';
import styles from './filter-dialog.module.css'
import FilterMapItem from './filter-map-item';
import { pull, uniq, merge, cloneDeep } from 'lodash-es';
import FilterBracketItem from './filter-bracket-item';
import FilterStageItem from './filter-stage-item';
import useBaseUrl from '@docusaurus/useBaseUrl';

export type Filter = {
    maps: string[],
    brackets: string[],
    stages: string[],
    appliedFilters: {
        any: boolean,
        stages: boolean,
        brackets: boolean,
        maps: boolean,
    },
};

export default function FilterDialog(): JSX.Element {
    const onClickHandler = (isApplied) => {
        const dialog = document.getElementById('filter-dialog') as HTMLDialogElement;
        if (isApplied && typeof (window as any).setFilter === 'function') {
            (window as any).setFilter(filter);
        }
        dialog.close();
    };
    const defaultFilter: Filter = {
        maps: [
            "SPEC Archipelago", "SPEC Bog Islands", "SPEC Crater Lake", "SPEC Islands", 'SPEC Migration', 'SPEC Northern Isles', 'SPEC Pacific Islands', 'SPEC The Passage', 'SPEC Water Nomad',
        ],
        brackets: [
            'Commodore', 'Captain', 'Discoverer', 'Sailor',
        ],
        stages: [
            'Group', 'Quarter Final', 'Semi Final', 'Final',
        ],
        appliedFilters: {
            any: false,
            stages: false,
            brackets: false,
            maps: false,
        },
    };
    const [filter, setFilter] = useState(cloneDeep(defaultFilter));
    const onMapFilterChange = (mapname, value) => {
        const newSelectedMaps = value === false ? pull(filter.maps, mapname) : uniq(filter.maps.concat(mapname));
        setFilter(merge({}, filter, {
            maps: newSelectedMaps,
            appliedFilters: {
                maps: newSelectedMaps.length != defaultFilter.maps.length,
                any: filter.appliedFilters.stages || filter.appliedFilters.brackets || newSelectedMaps.length != defaultFilter.maps.length,
            },
        }));
    };
    const onBracketFilterChange = (bracketName, value) => {
        const newSelectedBrackets = value === false ? pull(filter.brackets, bracketName) : uniq(filter.brackets.concat(bracketName));
        setFilter(merge({}, filter, {
            brackets: newSelectedBrackets,
            appliedFilters: {
                brackets: newSelectedBrackets.length != defaultFilter.brackets.length,
                any: filter.appliedFilters.stages || newSelectedBrackets.length != defaultFilter.brackets.length || filter.appliedFilters.maps,
            },
        }));
    };
    const onStageFilterChange = (stageName, value) => {
        const newSelectedStages = value === false ? pull(filter.stages, stageName) : uniq(filter.stages.concat(stageName));
        setFilter(merge({}, filter, {
            stages: newSelectedStages,
            appliedFilters: {
                stages: newSelectedStages.length != defaultFilter.stages.length,
                any: newSelectedStages.length != defaultFilter.stages.length || filter.appliedFilters.brackets || filter.appliedFilters.maps,
            },
        }));
    };

    return (
        <dialog id="filter-dialog" className={styles['dialog']}>
            <h2>Maps</h2>
            <div className={styles['map-container']}>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Archipelago.png')}
                    value={filter.maps.includes('SPEC Archipelago')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Archipelago')}
                    name="Archipelago">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Bog_Islands.png')}
                    value={filter.maps.includes('SPEC Bog Islands')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Bog Islands')}
                    name="Bog Islands">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Crater_Lake.png')}
                    value={filter.maps.includes('SPEC Crater Lake')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Crater Lake')}
                    name="Crater Lake">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Migration.png')}
                    value={filter.maps.includes('SPEC Migration')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Migration')}
                    name="Migration">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Northern_Isles.png')}
                    value={filter.maps.includes('SPEC Northern Isles')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Northern Isles')}
                    name="Northern Isles">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Pacific_Islands.png')}
                    value={filter.maps.includes('SPEC Pacific Islands')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Pacific Islands')}
                    name="Pacific Islands">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Islands.png')}
                    value={filter.maps.includes('SPEC Islands')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Islands')}
                    name="Islands">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_The_Passage.png')}
                    value={filter.maps.includes('SPEC The Passage')}
                    onChange={onMapFilterChange.bind(this, 'SPEC The Passage')}
                    name="The Passage">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/SPEC_Water_Nomad.png')}
                    value={filter.maps.includes('SPEC Water Nomad')}
                    onChange={onMapFilterChange.bind(this, 'SPEC Water Nomad')}
                    name="Water Nomad">
                </FilterMapItem>
            </div>
            <hr />
            <h2>Brackets</h2>
            <div className={styles['map-container']}>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Champion.webp')}
                    value={filter.brackets.includes('Commodore')}
                    onChange={onBracketFilterChange.bind(this, 'Commodore')}
                    name={"Commodore"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Monk.webp')}
                    value={filter.brackets.includes('Captain')}
                    onChange={onBracketFilterChange.bind(this, 'Captain')}
                    name={"Captain"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Mangonel.webp')}
                    value={filter.brackets.includes('Discoverer')}
                    onChange={onBracketFilterChange.bind(this, 'Discoverer')}
                    name={"Discoverer"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Knight.webp')}
                    value={filter.brackets.includes('Sailor')}
                    onChange={onBracketFilterChange.bind(this, 'Sailor')}
                    name={"Sailor"}>
                </FilterBracketItem>
            </div>
            <hr />
            <h2>Stages</h2>
            <div className={styles['map-container']}>
                <FilterStageItem
                    value={filter.stages.includes('Group')}
                    onChange={onStageFilterChange.bind(this, 'Group')}
                    name="Group">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Quarter Final')}
                    onChange={onStageFilterChange.bind(this, 'Quarter Final')}
                    name="Quarterfinals">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Semi Final')}
                    onChange={onStageFilterChange.bind(this, 'Semi Final')}
                    name="Semifinals">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Final')}
                    onChange={onStageFilterChange.bind(this, 'Final')}
                    name="Finals">
                </FilterStageItem>
            </div>
            <hr />
            <div className={styles['action-container']}>
                <button onClick={onClickHandler.bind(this, true)} className={`${styles['action-btn']}`}>APPLY FILTERS</button>
                <button onClick={onClickHandler.bind(this, false)} className={`${styles['action-btn']}`}>CANCEL</button>
            </div>
        </dialog>
    );
}
