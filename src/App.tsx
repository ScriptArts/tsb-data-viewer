import { createResource, Suspense } from 'solid-js';
import { Router, Routes, Route } from '@solidjs/router';
import { MetaProvider } from '@solidjs/meta';
import { GlobalStyles, Box } from '@suid/material';
import { fetchVersions } from './utils/fetchVersions';

import { Title } from './components/Title';
import { VersionSelector } from './components/VersionSelector';

import { Initialize } from './pages/Initialize';
import { Home } from './pages/Home';
import { SacredTreasure } from './pages/SacredTreasure';

export const App = () => {
    const [data] = createResource(0, fetchVersions);

    return (
        <>
            <GlobalStyles
                styles={{
                    body: {
                        margin: 0,
                        padding: 0,
                        backgroundImage: 'url(bg.jpg)',
                        backgroundAttachment: 'fixed',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        '&::before': {
                            content: '""',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            display: 'block',
                            width: '100%',
                            height: '150vh',
                            backdropFilter: 'blur(6px)',
                            zIndex: -1,
                        },
                    },
                }}
            />
            <MetaProvider>
                <Title />

                <Suspense fallback={Initialize}>
                    <VersionSelector
                        versions={data() || []}
                        sx={{
                            position: 'fixed',
                            top: '1rem',
                            left: '1rem',
                        }}
                    />

                    <Box sx={{ marginTop: '5rem' }}>
                        <Router>
                            <Routes base={BASE_URL}>
                                <Route path='/' component={Home} />
                                <Route path='/sacred_treasure' component={SacredTreasure} />
                            </Routes>
                        </Router>
                    </Box>
                </Suspense>
            </MetaProvider>
        </>
    );
};
