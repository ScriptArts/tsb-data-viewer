import { Title } from '../components/Title';
import { store } from '../utils/store';

export const SacredTreasure = () => {
    const [selectedVersion] = store.selectedVersion;

    return (
        <>
            <Title title='神器' />
            <div>Sacred Treasure {selectedVersion()}</div>
        </>
    );
};
