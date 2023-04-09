import { useCallback, useEffect, useState } from 'react';
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

export const useVersions = () => {
    const [versions, setVersions] = useState<string[]>([]);

    const fetchTags = useCallback(async (controller: AbortController): Promise<Tag[] | null> => {
        try {
            const res = await fetch(
                `https://api.github.com/repos/${DATA_REPO}/git/refs/tags`,
                { signal: controller.signal },
            );
            return res.json();
        }
        catch {
            return null;
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            const tags = await fetchTags(controller);
            if (tags) {
                const arr = tags.map(x => x.ref.slice(10));

                setVersions([
                    'dev',
                    ...sort(arr).reverse(),
                ]);
            }
        })();

        return () => controller.abort();
    }, [fetchTags]);

    return versions;
};
