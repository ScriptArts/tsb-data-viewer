import { useMemo } from 'react';
import { Box, Text, TreeView } from '@primer/react';
import type { NBTag, CompoundTag } from '../types/Artifact';

type IconProps = {
    tagType: NBTag['type'];
};

type ItemProps = {
    root?: boolean;
    name: string;
    tag: NBTag;
};

type Props = {
    tag?: CompoundTag;
};

const Icon = ({ tagType }: IconProps) => {
    const colors: Record<NBTag['type'], string> = useMemo(() => ({
        string: '#cecece',
        byte: '#b51b28',
        short: '#a309ac',
        int: '#443bb7',
        long: '#10878c',
        float: '#e7e03c',
        double: '#1ebc42',
        byte_array: '#bb8946',
        int_array: '#086bd7',
        long_array: '#09a6c1',
        list: '#ef8c0c',
        compound: '#999999',
    }), []);

    return (
        <Box
            width={16}
            height={16}
            backgroundColor={colors[tagType]}
            sx={{
                maskImage: `url(${BASE_URL}icon/nbt/${tagType}_tag.png)`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
            }}
        />
    );
};

const Item = ({ root, name, tag }: ItemProps) => {
    if (tag.type === 'compound') {
        return (
            <>
                <TreeView.Item id={name} expanded={root}>
                    {!root && (
                        <TreeView.LeadingVisual>
                            <Icon tagType={tag.type} />
                        </TreeView.LeadingVisual>
                    )}
                    <Box display='flex' sx={{ columnGap: '1' }}>
                        {name && <Text>{name}</Text>}
                        <Text color='fg.muted'>{Object.keys(tag.value).length}</Text>
                        <Text color='fg.muted'>{
                            Object.keys(tag.value).length <= 1
                                ? 'entry'
                                : 'entries'
                        }</Text>
                    </Box>
                    <TreeView.SubTree>
                        {[...Object.entries(tag.value)].map(([key, value]) => (
                            <Item key={key} name={key} tag={value} />
                        ))}
                    </TreeView.SubTree>
                </TreeView.Item>
            </>
        );
    }
    else if (tag.type === 'list') {
        return (
            <>
                <TreeView.Item id={name}>
                    <TreeView.LeadingVisual>
                        <Icon tagType={tag.type} />
                    </TreeView.LeadingVisual>
                    <Box display='flex' sx={{ columnGap: '1' }}>
                        {name && <Text>{name}</Text>}
                        <Text color='fg.muted'>{tag.value.length}</Text>
                        <Text color='fg.muted'>{
                            tag.value.length <= 1
                                ? 'entry'
                                : 'entries'
                        }</Text>
                    </Box>
                    <TreeView.SubTree>
                        {tag.value.map((value, idx) => (
                            <Item key={idx} name='' tag={value} />
                        ))}
                    </TreeView.SubTree>
                </TreeView.Item>
            </>
        );
    }
    else if (tag.type === 'byte_array'
        || tag.type === 'int_array'
        || tag.type === 'long_array'
    ) {
        return (
            <TreeView.Item id={name}>
                <TreeView.LeadingVisual>
                    <Icon tagType={tag.type} />
                </TreeView.LeadingVisual>
                <Box display='flex' sx={{ columnGap: '1' }}>
                    {name && <Text>{name}</Text>}
                    <Text color='fg.muted'>{tag.value.length}</Text>
                    <Text color='fg.muted'>{
                        (
                            tag.type === 'byte_array' ? 'byte'
                            : tag.type === 'int_array' ? 'integer'
                            : 'long integer'
                        ) + (tag.value.length > 1 && 's')
                    }</Text>
                </Box>
                <TreeView.SubTree>
                    {[...tag.value].map((value, idx) => (
                        <TreeView.Item key={idx} id={`${idx}`}>
                            {value.toString()}
                        </TreeView.Item>
                    ))}
                </TreeView.SubTree>
            </TreeView.Item>
        );
    }

    return (
        <TreeView.Item id={name}>
            <TreeView.LeadingVisual>
                <Icon tagType={tag.type} />
            </TreeView.LeadingVisual>
            <Box display='flex' sx={{ columnGap: '1' }}>
                {name && <Text>{name}</Text>}
                <Text color='fg.onEmphasis'>{`${tag.value}`}</Text>
            </Box>
        </TreeView.Item>
    );
};

export const NbtTree = ({ tag }: Props) => {
    if (!tag) return (<></>);

    return (
        <Box
            sx={{
                '.PRIVATE_TreeView-item-container': {
                    minHeight: '1.5rem !important',
                },
            }}
        >
            <TreeView>
                <Item root name='' tag={tag} />
            </TreeView>
        </Box>
    );
};
