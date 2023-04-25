import { useCallback, useEffect, useState } from 'react';

export const useLangDate = () => {
    const [langData, setLangData] = useState<Record<string, string>>();

    const fetchLangData = useCallback(async (controller: AbortController): Promise<Record<string, string> | null> => {
        try {
            // TODO: TSBから対応バージョンを取ってきて言語ファイルのバージョンを決めたい
            const res = await fetch(
                'https://raw.githubusercontent.com/misode/mcmeta/1.19.2-assets-json/assets/minecraft/lang/ja_jp.json',
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
            const langData = await fetchLangData(controller);
            if (langData) {
                setLangData(langData);
            }
        })();

        return () => controller.abort();
    }, [fetchLangData]);

    return langData;
};
