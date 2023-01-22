import { Router, Routes, Route } from '@solidjs/router';
import { MetaProvider } from '@solidjs/meta';
import { GlobalStyles } from '@suid/material';

import { Home } from './pages/Home';
import { SacredTreasure } from './pages/SacredTreasure';

export const App = () => {
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
                <Router>
                    <Routes base={BASE_URL}>
                        <Route path='/' component={Home} />
                        <Route path='/sacred_treasure' component={SacredTreasure} />
                    </Routes>
                </Router>
            </MetaProvider>
        </>
    );
};
