import { useCallback, useEffect, useState } from 'react';
import type { Artifact } from '../types/Artifact';

export const useArtifacts = (version?: string) => {
    const [artifacts, setArtifacts] = useState<Artifact[]>([]);

    const fetchArtifacts = useCallback(async (controller: AbortController): Promise<Artifact[] | null> => {
        try {
            const ver = version === 'dev' ? 'data' : version;
            const res = await fetch(
                `https://raw.githubusercontent.com/${DATA_REPO}/${ver}/artifacts.json`,
                { signal: controller.signal },
            );
            return res.json();
        }
        catch {
            return null;
        }
    }, [version]);

    useEffect(() => {
        const controller = new AbortController();

        if (version) {
            (async () => {
                const artifacts = await fetchArtifacts(controller);
                if (artifacts) {
                    setArtifacts(artifacts);
                }
            })();
        }

        return () => controller.abort();
    }, [version, fetchArtifacts]);

    return artifacts;
};
