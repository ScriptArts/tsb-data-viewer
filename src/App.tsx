import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom';
import { Home } from './pages/Home';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from './contexts/AppContext';
import { Artifact } from './pages/Artifact';
import { DefaultLayout } from './layouts/DefaultLayout';

const router = createHashRouter(createRoutesFromElements(
    <Route
        path='/'
        element={<DefaultLayout />}
        handle={{ name: APP_TITLE }}
    >
        <Route index element={<Home />} />
        <Route
            path='artifact'
            element={<Artifact />}
            handle={{ name: '神器' }}
        />
    </Route>,
));

export const App = () => {
    const { title } = useAppContext();

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <RouterProvider router={router} />
        </>
    );
};
