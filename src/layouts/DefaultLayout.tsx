import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Box } from '@primer/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const DefaultLayout = () => {
    return (
        <Box
            position='relative'
            minHeight='100vh'
            paddingBottom='2rem'
            sx={{ boxSizing: 'border-box' }}
        >
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
            <Box
                position='absolute'
                bottom='0'
                width='100%'
            >
                <Footer />
            </Box>
        </Box>
    );
};
