import { Box } from '@primer/react';
import { useAppContext } from '../contexts/AppContext';
import { Title } from '../components/Title';

export const SacredTreasure = () => {
    const { version } = useAppContext();

    return (
        <>
            <Title title='神器' />

            <Box>Sacred Treasure {version}</Box>
        </>
    );
};
