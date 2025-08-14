import { useState, useEffect, useCallback, useRef } from "react";

interface ImageLoadState {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  loadTime: number | null;
}

interface UseImagePerformanceOptions {
  priority?: boolean;
  preload?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

export const useImagePerformance = (
  src: string,
  options: UseImagePerformanceOptions = {}
) => {
  const {
    priority = false,
    preload = false,
    retryCount = 3,
    retryDelay = 1000,
  } = options;

  const [state, setState] = useState<ImageLoadState>({
    isLoading: false,
    isLoaded: false,
    hasError: false,
    loadTime: null,
  });

  const [retryAttempts, setRetryAttempts] = useState(0);
  const loadStartTime = useRef<number | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const loadImage = useCallback(async () => {
    if (!src) return;

    setState((prev) => ({ ...prev, isLoading: true, hasError: false }));
    loadStartTime.current = performance.now();

    try {
      const img = new window.Image();

      const loadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image failed to load"));
      });

      img.src = src;
      await loadPromise;

      const loadTime = performance.now() - (loadStartTime.current || 0);

      setState({
        isLoading: false,
        isLoaded: true,
        hasError: false,
        loadTime,
      });

      if ("caches" in window) {
        try {
          const cache = await caches.open("photography-images-v1");
          const response = await fetch(src);
          if (response.ok) {
            await cache.put(src, response);
          }
        } catch (error) {
          console.warn("Failed to cache image:", error);
        }
      }
    } catch (error) {
      console.error("Image load error:", error);

      if (retryAttempts < retryCount) {
        setRetryAttempts((prev) => prev + 1);
        setTimeout(() => {
          loadImage();
        }, retryDelay);
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        hasError: true,
      }));
    }
  }, [src, retryAttempts, retryCount, retryDelay]);

  const retry = useCallback(() => {
    setRetryAttempts(0);
    setState((prev) => ({ ...prev, hasError: false }));
    loadImage();
  }, [loadImage]);

  useEffect(() => {
    if (preload && src) {
      loadImage();
    }
  }, [preload, src, loadImage]);

  useEffect(() => {
    if (priority && src) {
      loadImage();
    }
  }, [priority, src, loadImage]);

  useEffect(() => {
    setState({
      isLoading: false,
      isLoaded: false,
      hasError: false,
      loadTime: null,
    });
    setRetryAttempts(0);
  }, [src]);

  return {
    ...state,
    retry,
    retryAttempts,
    ref: imageRef,
  };
};

export const useBatchImageLoading = (urls: string[]) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount] = useState(urls.length);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (urls.length === 0) {
      setIsComplete(true);
      return;
    }

    let mounted = true;
    const loadPromises = urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            if (mounted) {
              setLoadedCount((prev) => prev + 1);
              resolve();
            }
          };
          img.onerror = () => resolve();
          img.src = url;
        })
    );

    Promise.all(loadPromises).then(() => {
      if (mounted) {
        setIsComplete(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, [urls]);

  return {
    loadedCount,
    totalCount,
    isComplete,
    progress: totalCount > 0 ? loadedCount / totalCount : 0,
  };
};
