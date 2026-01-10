import { useEffect, useState, useRef, RefObject } from "react";
import { MotionValue } from "framer-motion";

export function useCanvasFrames(
    // FIX 1: Allow the canvas ref to be null (initial state)
    canvasRef: RefObject<HTMLCanvasElement>,
    frameCount: number,
    path: string,
    isMobile: boolean,
    scrollProgress: MotionValue<number>
) {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const framesRef = useRef<HTMLImageElement[]>([]);

    // FIX 2: Initialize with 'null' and update type to allow null
    const requestRef = useRef<number | null>(null);

    // 1. Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const indexStr = String(i).padStart(3, "0");
            img.src = `${path}/ezgif-frame-${indexStr}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) setImagesLoaded(true);
            };
            images.push(img);
        }
        framesRef.current = images;
    }, [frameCount, path]);

    // 2. Draw Frame Helper
    const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        // Check if canvas exists before getting context
        const ctx = canvas?.getContext("2d");
        const img = framesRef.current[index];

        if (!canvas || !ctx || !img) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
    };

    // 3. Animation Logic
    useEffect(() => {
        if (!imagesLoaded) return;

        if (isMobile) {
            let frameIndex = 0;
            let lastTime = performance.now();
            const fps = 30;

            const loop = (time: number) => {
                const delta = time - lastTime;
                if (delta >= 1000 / fps) {
                    drawFrame(frameIndex);
                    frameIndex = (frameIndex + 1) % frameCount;
                    lastTime = time;
                }
                requestRef.current = requestAnimationFrame(loop);
            };
            requestRef.current = requestAnimationFrame(loop);

            return () => {
                if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
            };
        }
        else {
            drawFrame(0);
            const unsubscribe = scrollProgress.on("change", (latest) => {
                const frameIndex = Math.min(
                    Math.floor(latest * (frameCount - 1)),
                    frameCount - 1
                );
                requestAnimationFrame(() => drawFrame(frameIndex));
            });
            return () => unsubscribe();
        }
    }, [imagesLoaded, isMobile, scrollProgress]);

    return imagesLoaded;
}