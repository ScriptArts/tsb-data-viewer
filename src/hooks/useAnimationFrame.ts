import { useCallback, useEffect, useRef } from 'react';

export const useAnimationFrame = (callback: () => boolean) => {
    const rafRef = useRef<number>();

    const loop = useCallback(() => {
        rafRef.current = requestAnimationFrame(loop);
        if (callback() === false) {
            cancelAnimationFrame(rafRef.current);
        }
    }, [callback]);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(loop);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [loop]);
};
