import {
    Container,
    Grid,
    Typography,
    Card,
    Box,
    Button,
} from '@suid/material';
import { Link } from '@solidjs/router';
import * as Meta from '@solidjs/meta';
import { Title } from '../components/Title';

export const Home = () => {
    return (
        <>
            <Title />
            <Meta.Link rel='preload' as='image' href='icon.png' />
            <Meta.Link rel='preload' as='image' href='sacred_treasure.png' />

            <Container>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '3rem 0',
                        }}
                    >
                        <img src="icon.png" alt="The Sky Blessing" width={256} height={256} />
                        <Typography
                            variant='h4'
                            component='h1'
                            sx={{
                                color: 'white',
                                fontFamily: 'Stick',
                                textShadow: '2px 2px 2px black',
                            }}
                        >{APP_TITLE}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            component={Link}
                            href='./sacred_treasure'
                            sx={{
                                display: 'block',
                                padding: '0',
                                textDecoration: 'none',
                            }}
                        >
                            <Card
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.5rem',
                                }}
                            >
                                <Box
                                    component='img'
                                    src='sacred_treasure.png'
                                    alt='神器'
                                    sx={{
                                        width: '64px',
                                        height: '64px',
                                        imageRendering: 'pixelated',
                                    }}
                                />
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        position: 'absolute',
                                        left: 0,
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        variant='h5'
                                        sx={{
                                            fontFamily: 'Stick',
                                            textAlign: 'center',
                                        }}
                                    >神器</Typography>
                                </Box>
                            </Card>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
