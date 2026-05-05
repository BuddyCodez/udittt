import React, { useState } from "react";

interface ShimmerImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Aspect ratio wrapper class, e.g. "aspect-video" or "aspect-square" */
  aspectClass?: string;
  /** Extra class on the outer wrapper */
  className?: string;
  /** Extra class on the <img> itself */
  imgClassName?: string;
}

/**
 * Drop-in image component with a shimmer skeleton while loading,
 * then a smooth fade-in — similar to Next.js blur placeholder.
 */
export const ShimmerImage: React.FC<ShimmerImageProps> = ({
  src,
  alt,
  aspectClass = "aspect-video",
  className = "",
  imgClassName = "",
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${aspectClass} ${className}`}>
      {/* Shimmer skeleton — visible until image loads */}
      {!loaded && !error && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#111111]"
          style={{ backgroundSize: "200% 100%", animation: "shimmer 1.4s linear infinite" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #1e1e1e 40%, #2a1a1a 50%, #1e1e1e 60%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmerSlide 1.4s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#111] font-mono text-xs text-[#8b0000]/60">
          [ image failed ]
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
        {...rest}
      />

      <style>{`
        @keyframes shimmerSlide {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};
