import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Box } from '@primer/react';
import { Header } from '../components/Header';

export const DefaultLayout = () => {
    return (
        <>
            <ScrollRestoration />

            <Box
                position='sticky'
                top='0'
                left='0'
                width='100%'
                zIndex='1'
            >
                <Header />
            </Box>
            <Outlet />
        </>
    );
};
