import { createSignal, createEffect } from 'solid-js';
import { TextField, Menu, MenuItem, Theme, Breakpoint } from '@suid/material';
import { SxProps } from '@suid/system';
import { store } from '../utils/store';

type Props = {
    versions: string[];
    sx?: SxProps<Theme<Breakpoint>>;
};

export const VersionSelector = (props: Props) => {
    const [isOpen, setIsOpen] = createSignal(false);
    const [selectedVersion, setSelectedVersion] = store.selectedVersion;

    createEffect(() => {
        setSelectedVersion(props.versions[1]);
    });

    return (
        <>
            <TextField
                variant='filled'
                size='small'
                label='TSBのバージョン'
                value={selectedVersion() ?? props.versions[0]}
                focused={isOpen()}
                inputProps={{ readOnly: true, color: 'white' }}
                InputLabelProps={{ shrink: true }}
                onClick={() => setIsOpen(!isOpen())}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    '> label': {
                        pointerEvents: 'none',
                    },
                    '.MuiInputBase-input': {
                        cursor: 'pointer',
                    },
                    ...props.sx,
                }}
            >{selectedVersion()}</TextField>
            <Menu
                open={isOpen()}
                onClose={() => setIsOpen(false)}
                sx={{
                    '.MuiMenu-paper': {
                        position: 'fixed',
                        // HACK: 固定値なのヤバそう
                        top: '65px !important',
                        maxHeight: '80vh',
                    },
                }}
            >
                {props.versions.map(version => (
                    <MenuItem
                        dense
                        selected={version === selectedVersion()}
                        onClick={() => {
                            setSelectedVersion(version);
                            setIsOpen(false);
                        }}
                    >{version}</MenuItem>
                ))}
            </Menu>
        </>
    );
};
