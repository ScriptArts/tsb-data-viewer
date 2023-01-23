import { sort } from 'semver';

type Tag = {
    ref: string;
    node_id: string;
    url: string;
    object: {
        sha: string;
        type: string;
        url: string;
    };
};

export const fetchVersions = async () => {
    try {
        const res = await fetch('https://api.github.com/repos/MT224244/tsb-data/git/refs/tags');
        const json: Tag[] = await res.json();

        const arr = json.map(x => x.ref.slice(10));

        return [
            'dev',
            ...sort(arr).reverse(),
        ];
    }
    catch {
        return [];
    }
};
