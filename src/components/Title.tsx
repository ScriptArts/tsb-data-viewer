import * as Meta from '@solidjs/meta';

type Props = {
    title?: string;
};

export const Title = (props: Props) => {
    return (
        <Meta.Title>
            {APP_TITLE + (props.title ? ` - ${props.title}` : '')}
        </Meta.Title>
    );
};
