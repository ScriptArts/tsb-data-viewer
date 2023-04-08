import { Box } from '@primer/react';
import { useAppContext } from '../contexts/AppContext';
import { Title } from '../components/Title';

export const Artifact = () => {
    const { version } = useAppContext();

    return (
        <>
            <Title title='神器' />

            <Box>Artifact {version}</Box>
        </>
    );
};
