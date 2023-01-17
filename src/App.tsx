import { Router, Routes, Route } from '@solidjs/router';
import { Home } from './pages/Home.tsx';

export const App = () => {
    return (
        <Router>
            <Routes base={BASE_URL}>
                <Route path='/' component={Home} />
            </Routes>
        </Router>
    );
};
