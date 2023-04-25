import { Box, Link } from '@primer/react';

export const Footer = () => {
    return (
        <Box
            height='2rem'
            backgroundColor='header.bg'
        >
            <Box
                display='flex'
                alignItems='center'
                maxWidth='xlarge'
                height='100%'
                marginX='auto'
                paddingX='2'
                sx={{ columnGap: '2' }}
            >
                <Box as='small'>&copy; 2023 MT224244</Box>
                <Link
                    href={`https://github.com/${REPO}`}
                    sx={{ color: 'fg.default' }}
                >GitHub</Link>
            </Box>
        </Box>
    );
};
