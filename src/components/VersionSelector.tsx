import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, SelectPanel, type BoxProps } from '@primer/react';
import { type ItemInput } from '@primer/react/lib/deprecated/ActionList/List';
import { useAppContext } from '../contexts/AppContext';

export const VersionSelector = (props: BoxProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

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

    const overlayTop = useCallback(() => {
        if (!buttonRef.current) return 0;
        const { offsetTop, clientHeight } = buttonRef.current;

        return offsetTop + clientHeight + 8;
    }, []);

    const onSelectedChange = useCallback((selected?: ItemInput) => {
        if (selected && selected.text && selected.text !== version) {
            setSelected(selected);
            setSearchParams({ v: selected.text });
        }
    }, [setSearchParams, version]);

    useEffect(() => {
        const find = filteredVersions.find(v => v.text === queryVersion);
        if (find) setSelected(find);
    }, [filteredVersions, queryVersion]);
    useEffect(() => {
        if (filteredVersions.length > 0) {
            const defaultVersion = filteredVersions[1];
            if (queryVersion === null || !versions.find(v => v === queryVersion)) {
                setSearchParams({ v: defaultVersion.text }, { replace: true });
            }
        }
    }, [filteredVersions, queryVersion, setSearchParams, versions]);
    useEffect(() => setVersion(selected?.text ?? ''), [selected, setVersion]);

    return (
        <Box {...props}>
            <SelectPanel
                anchorRef={buttonRef}
                showItemDividers
                placeholderText=''
                open={isOpen}
                items={filteredVersions}
                selected={selected}
                loading={versions.length === 0}
                onOpenChange={setIsOpen}
                onSelectedChange={onSelectedChange}
                onFilterChange={setFilter}
                overlayProps={{
                    maxHeight: 'small',
                    position: 'fixed',
                    top: overlayTop(),
                }}
            />
        </Box>
    );
};
