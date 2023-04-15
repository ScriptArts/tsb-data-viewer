import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, BaseStyles, theme } from '@primer/react';
import { createGlobalStyle } from 'styled-components';
import deepmerge from 'deepmerge';
import { App } from './App';
import { AppContext } from './contexts/AppContext';

// https://www.planetminecraft.com/blog/changing-hardcoded-colours-1-18-1-17-core-shaders/
// https://codepen.io/devbobcorn/pen/wvzxxLv
const minecraft = {
    tooltip: {
        bg: 'rgba(16, 0, 16, 0.95)',
        border: 'rgba(40, 0, 125, 0.95)',
    },
};

const customTheme = deepmerge(theme, {
    colorSchemes: {
        dark: {
            colors: {
                minecraft,
            },
        },
        light: {
            colors: {
                minecraft,
            },
        },
    },
});

const GlobalStyle = createGlobalStyle`
    /* http://jikasei.me/font/jf-dotfont */
    @font-face {
        font-family: 'JF Dot K12';
        font-display: swap;
        src:
            url(${BASE_URL}JF-Dot-K12.woff2)
            format('woff2');
    }
    /* https://github.com/IdreesInc/Monocraft */
    @font-face {
        font-family: 'Monocraft';
        font-display: swap;
        src:
            url(${BASE_URL}Monocraft.woff2)
            format('woff2');
    }
    body {
        margin: 0;
        padding: 0;
        background-image: url(${BASE_URL}bg.jpg);
        background-attachment: fixed;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        &::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 150vh;
            backdrop-filter: blur(6px);
            z-index: -1;
        }
    }
`;

const rootElem = document.querySelector<HTMLElement>('#root');
if (rootElem) {
    createRoot(rootElem).render(
        <StrictMode>
            <HelmetProvider>
                <ThemeProvider theme={customTheme} colorMode='dark'>
                    <BaseStyles>
                        <AppContext>
                            <GlobalStyle />
                            <App />
                        </AppContext>
                    </BaseStyles>
                </ThemeProvider>
            </HelmetProvider>
        </StrictMode>,
    );
}
