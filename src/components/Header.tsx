import { useMatches } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Avatar, Breadcrumbs, Link, Header as PrimerHeader } from '@primer/react';
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

            <PrimerHeader>
                <Avatar
                    src='icon.png'
                    alt=''
                    size={32}
                    sx={{
                        marginRight: 3,
                        boxShadow: 'none',
                    }}
                />
                <Breadcrumbs>
                    {crumbs.map(crumb => {
                        const url = new URL(location.href.replace('/#', ''));
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
            </PrimerHeader>
        </>
    );
};
