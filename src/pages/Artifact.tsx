import { Box } from '@primer/react';
import { useAppContext } from '../contexts/AppContext';
import { Title } from '../components/Title';

export const Artifact = () => {
    const { artifacts } = useAppContext();

    return (
        <>
            <Title title='神器' />

            <Box>Artifact</Box>
            <Box as='pre' backgroundColor='canvas.default'>{JSON.stringify(artifacts, undefined, 4)}</Box>
        </>
    );
};
