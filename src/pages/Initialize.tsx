import { Box, CircularProgress } from '@suid/material';

export const Initialize = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                color: 'white',
            }}
        >
            <CircularProgress size='5rem' color='inherit' />
        </Box>
    );
};
