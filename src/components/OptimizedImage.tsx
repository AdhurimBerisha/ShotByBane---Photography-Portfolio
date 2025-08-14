import React, { useState, useEffect, useRef, useCallback } from "react";
import { preloadImage } from "../utils/imageOptimization";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  placeholder?: string;
  fallback?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  onLoad,
  onError,

  fallback = "https://via.placeholder.com/400x300?text=Image+Not+Found",
}) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (isInView && src && !hasError) {
      const loadImage = async () => {
        try {
          await preloadImage(src);
          setImageSrc(src);
          setIsLoaded(true);
          onLoad?.();
        } catch (error) {
          console.error("Failed to load image:", src, error);
          setHasError(true);
        }
      };

      loadImage();
    }
  }, [isInView, src, hasError, onLoad]);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true);
      onError?.(e);
    },
    [onError]
  );

  const retryLoad = useCallback(() => {
    setHasError(false);
    setIsLoaded(false);
    setImageSrc("");
    setIsInView(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 rounded-lg flex flex-col items-center justify-center p-4">
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">
            Failed to load image
          </div>
          <button
            onClick={retryLoad}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {imageSrc && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...(width && { width })}
          {...(height && { height })}
        />
      )}

      {hasError && fallback && (
        <img
          src={fallback}
          alt={`${alt} (fallback)`}
          className="w-full h-full object-cover opacity-50"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
