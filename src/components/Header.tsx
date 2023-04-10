import { useMatches } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Link, Header as PrimerHeader } from '@primer/react';
import { VersionSelector } from './VersionSelector';
import { RouterLink } from './RouterLink';

export const Header = () => {
    const matches = useMatches();

    const crumbs = matches
        .filter(match => match.handle)
        .map(match => ({
            path: match.pathname,
            name: (match.handle as Record<string, string>).name,
        }));

    return (
        <>
            <Helmet>
                <link rel='preload' as='image' type='image/png' href={`${BASE_URL}icon.png`} />
            </Helmet>

            <PrimerHeader sx={{ display: 'block' }}>
                <Box
                    display='flex'
                    flexWrap='wrap'
                    alignItems='center'
                    maxWidth='xlarge'
                    marginX='auto'
                >
                    <Box
                        as='img'
                        src='icon.png'
                        alt=''
                        width='32px'
                        height='32px'
                        marginRight='3'
                    />
                    <Breadcrumbs sx={{ whiteSpace: 'nowrap' }}>
                        {crumbs.map(crumb => {
                            const url = new URL(location.href
                                .replace('/#', '')
                                .replace(BASE_URL, '/'),
                            );
                            return (
                                url.pathname === crumb.path
                                    ? <span key={crumb.path}>{crumb.name}</span>
                                    : <Link
                                        key={crumb.path}
                                        as={RouterLink}
                                        to={crumb.path}
                                    >{crumb.name}</Link>
                            );
                        })}
                    </Breadcrumbs>
                    <VersionSelector sx={{ marginLeft: 4 }} />
                </Box>
            </PrimerHeader>
        </>
    );
};
