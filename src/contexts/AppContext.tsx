import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { useVersions } from '../hooks/useVersions';
import { useArtifacts } from '../hooks/useArtifacts';
import type { Artifact } from '../types/Artifact';

const context = createContext({} as {
    title: string;
    versions: string[];
    version: string | undefined;
    artifacts: Artifact[];
    setTitle: (title?: string) => void;
    setVersion: (version: string) => void;
});

const Provider = context.Provider;

export const useAppContext = () => {
    return useContext(context);
};

type Props = {
    children: ReactNode;
};

export const AppContext = (props: Props) => {
    const [title, _setTitle] = useState(APP_TITLE);
    const [version, setVersion] = useState<string>();

    const versions = useVersions();
    const artifacts = useArtifacts(version);

    const setTitle = useCallback((title?: string) => {
        _setTitle(APP_TITLE + (title ? ` / ${title}` : ''));
    }, []);

    return (
        <Provider
            value={{
                title,
                versions,
                version,
                artifacts,
                setTitle,
                setVersion,
            }}
        >
            {props.children}
        </Provider>
    );
};
