import { Helmet } from 'react-helmet-async';
import { ActionList, Box } from '@primer/react';
import { Title } from '../components/Title';
import { RouterLink } from '../components/RouterLink';

export const Home = () => {
    return (
        <>
            <Title />
            <Helmet>
                <link rel='preload' as='image' type='image/png' href={`${BASE_URL}icon.png`} />
                <link rel='preload' as='image' type='image/png' href={`${BASE_URL}artifact.png`} />
            </Helmet>

            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                marginTop='calc(3vw + 1rem)'
            >
                <Box
                    as='img'
                    src='icon.png'
                    alt=''
                    width='calc(50% + 5vw)'
                    height='calc(50% + 5vw)'
                    maxWidth={256}
                    maxHeight={256}
                />

                <Box
                    as='h1'
                    color='white'
                    fontFamily='JF Dot K12'
                    fontSize='min(50% + 5vw, 2.7rem)'
                    fontWeight='normal'
                    textShadow='2px 2px 2px black'
                >{APP_TITLE}</Box>

                <ActionList
                    sx={{
                        width: 'calc(90% + 5vw)',
                        maxWidth: 'small',
                        li: {
                            height: '100%',
                        },
                    }}
                >
                    <ActionList.LinkItem
                        as={RouterLink}
                        to='/artifact'
                        sx={{
                            alignItems: 'center',
                            padding: 'min(3vw, 1rem)',
                            fontFamily: 'JF Dot K12',
                            fontSize: 'min(50% + 3vw, 1.3rem)',
                            backgroundColor: 'btn.bg',
                            color: 'btn.text',
                            textAlign: 'center',
                        }}
                    >
                        <ActionList.LeadingVisual>
                            <Box
                                as='img'
                                src='artifact.png'
                                alt=''
                                width='min(50% + 3vw, 2rem)'
                                height='min(50% + 3vw, 2rem)'
                                sx={{ imageRendering: 'pixelated' }}
                            />
                        </ActionList.LeadingVisual>
                        神器
                    </ActionList.LinkItem>
                </ActionList>
            </Box>
        </>
    );
};
