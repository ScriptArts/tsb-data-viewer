import { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

type Props = {
    title?: string;
};

export const Title = ({ title }: Props) => {
    const { setTitle } = useAppContext();

    useEffect(() => {
        setTitle(title);
    }, [title, setTitle]);

    return (<></>);
};
