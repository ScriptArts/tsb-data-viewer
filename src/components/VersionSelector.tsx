import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, SelectPanel, type BoxProps } from '@primer/react';
import { type ItemInput } from '@primer/react/lib/deprecated/ActionList/List';
import { useAppContext } from '../contexts/AppContext';

export const VersionSelector = (props: BoxProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<ItemInput>();
    const [filter, setFilter] = useState('');

    const { versions, version, setVersion } = useAppContext();

    const [searchParams, setSearchParams] = useSearchParams();

    const queryVersion = useMemo(() => searchParams.get('v'), [searchParams]);
    const filteredVersions = useMemo(() => versions
        .filter(version => version.toLowerCase().includes(filter.toLowerCase()))
        .map(version => ({ text: version }),
    ), [versions, filter]);

    const onSelectedChange = useCallback((selected?: ItemInput) => {
        if (selected && selected.text && selected.text !== version) {
            setSelected(selected);
            setSearchParams({ v: selected.text });
        }
    }, [version, setSearchParams]);

    useEffect(() => {
        if (filteredVersions.length > 0 && queryVersion) {
            setSelected(filteredVersions.find(v => v.text === queryVersion));
        }
    }, [queryVersion, filteredVersions]);
    useEffect(() => {
        if (filteredVersions.length > 0) {
            const defaultVersion = filteredVersions[1];
            if (queryVersion === null || !filteredVersions.find(v => v.text === queryVersion)) {
                setSearchParams({ v: defaultVersion.text }, { replace: true });
            }
        }
    }, [queryVersion, filteredVersions, setSearchParams]);
    useEffect(() => setVersion(selected?.text ?? ''), [selected, setVersion]);

    return (
        <Box {...props}>
            <SelectPanel
                showItemDividers
                placeholderText=''
                open={isOpen}
                items={filteredVersions}
                selected={selected}
                loading={versions.length === 0}
                onOpenChange={setIsOpen}
                onSelectedChange={onSelectedChange}
                onFilterChange={setFilter}
                overlayProps={{ maxHeight: 'small' }}
            />
        </Box>
    );
};
