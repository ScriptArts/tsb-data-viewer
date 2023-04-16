import { ActionList, Box } from '@primer/react';
import { Virtuoso } from 'react-virtuoso';
import { useAppContext } from '../contexts/AppContext';
import { Title } from '../components/Title';
import { RouterLink } from '../components/RouterLink';
import { TextComponent } from '../components/TextComponent';

export const Artifact = () => {
    const { artifacts } = useAppContext();

    return (
        <>
            <Title title='神器' />

            <Box
                marginX='auto'
                marginY='3'
                paddingX='3'
                sx={{
                    maxWidth: 'medium',
                    li: {
                        width: '100%',
                    },
                }}
            >
                <Virtuoso
                    useWindowScroll
                    data={artifacts}
                    itemContent={(idx, artifact) => (
                        <Box key={idx} paddingY='1'>
                            <ActionList.LinkItem
                                as={RouterLink}
                                to={`/artifact/${artifact.id}`}
                                sx={{
                                    paddingX: '3',
                                    backgroundColor: 'minecraft.tooltip.bg',
                                }}
                                style={{ width: '50%' }}
                            >
                                <Box as='span' fontFamily='Monocraft'>{artifact.id}</Box>
                                <ActionList.Description variant='block' sx={{ marginY: '2' }}>
                                    <TextComponent
                                        raw={artifact.name}
                                        fontSize='min(30% + 2vw, 1.3rem)'
                                    />
                                </ActionList.Description>
                            </ActionList.LinkItem>
                        </Box>
                    )}
                />
            </Box>
        </>
    );
};
