import * as React from "react";

/**
 * Drop-in replacement for next/image used in ported PetalSphere components.
 * Forwards all props to a native <img>. width/height/fill/priority/quality are
 * accepted and gracefully translated/ignored so the original Next.js JSX works
 * without modification.
 */
type NextImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  unoptimized?: boolean;
};

export const NextImage = React.forwardRef<HTMLImageElement, NextImageProps>(function NextImage(
  { src, alt, width, height, fill, priority: _p, quality: _q, unoptimized: _u, style, className, ...rest },
  ref,
) {
  const fillStyle: React.CSSProperties | undefined = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }
    : style;
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={fill ? undefined : (width as any)}
      height={fill ? undefined : (height as any)}
      loading={_p ? "eager" : "lazy"}
      decoding="async"
      style={fillStyle}
      className={className}
      {...rest}
    />
  );
});

export default NextImage;
