import { useCallback, useEffect, useRef } from 'react';

export const useAnimationFrame = (callback: () => void) => {
    const rafRef = useRef<number>();

    const loop = useCallback(() => {
        rafRef.current = requestAnimationFrame(loop);
        callback();
    }, [callback]);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(loop);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [loop]);
};
