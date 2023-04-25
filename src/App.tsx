import { Navigate, Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from './contexts/AppContext';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Home } from './pages/Home';
import { Artifact } from './pages/Artifact';
import { ArtifactDetail } from './pages/ArtifactDetail';

const router = createHashRouter(createRoutesFromElements(
    <Route
        path='/'
        element={<DefaultLayout />}
        handle={{ name: APP_TITLE }}
    >
        <Route index element={<Home />} />
        <Route path='artifact' handle={{ name: '神器' }}>
            <Route index element={<Artifact />} />
            <Route
                path=':id'
                element={<ArtifactDetail />}
                handle={{ name: '詳細' }}
            />
        </Route>
        <Route path='*' element={<Navigate replace to='/' />} />
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
