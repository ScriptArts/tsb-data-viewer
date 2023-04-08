import { forwardRef, useEffect, type ForwardRefRenderFunction, useState } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const _RouterLink: ForwardRefRenderFunction<
    HTMLAnchorElement,
    LinkProps
> = ({ children, to, ...linkProps }, ref) => {
    const [href, setHref] = useState('');

    const { version } = useAppContext();

    useEffect(() => {
        if (version) {
            const url = new URL(`${to}`, location.origin);
            url.searchParams.set('v', version);
            setHref(url.href);
        }
    }, [to, version]);

    return (
        <Link
            ref={ref}
            {...linkProps}
            to={href}
        >{children}</Link>
    );
};

export const RouterLink = forwardRef(_RouterLink);
