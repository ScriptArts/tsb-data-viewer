import { ReactNode, createContext, useCallback, useContext, useState } from 'react';

const context = createContext({} as {
    title: string;
    version: string | undefined;
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

    const setTitle = useCallback((title?: string) => {
        _setTitle(APP_TITLE + (title ? ` / ${title}` : ''));
    }, []);

    return (
        <Provider
            value={{
                title,
                version,
                setTitle,
                setVersion,
            }}
        >
            {props.children}
        </Provider>
    );
};
