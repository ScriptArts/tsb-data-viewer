import { Outlet } from 'react-router-dom';
import { Box } from '@primer/react';
import { Header } from '../components/Header';

export const DefaultLayout = () => {
    return (
        <>
            <Box
                position='sticky'
                top='0'
                left='0'
                width='100vw'
                zIndex='999'
            >
            <Header />
            </Box>
            <Outlet />
        </>
    );
};
