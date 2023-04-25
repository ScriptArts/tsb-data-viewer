import { Box, Link } from '@primer/react';

export const Footer = () => {
    return (
        <Box
            display='flex'
            alignItems='center'
            height='2rem'
            paddingX='2'
            backgroundColor='header.bg'
            sx={{ columnGap: '2' }}
        >
            <Box as='small'>&copy; 2023 MT224244</Box>
            <Link
                href={`https://github.com/${REPO}`}
                sx={{ color: 'fg.default' }}
            >GitHub</Link>
        </Box>
    );
};
