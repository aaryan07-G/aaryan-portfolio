"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { personal } from "@/data/personal";

interface AvatarProps extends Omit<ImageProps, "src" | "alt" | "onError"> {
  src?: string;
  alt?: string;
}

/**
 * Wraps next/image with a graceful fallback: if the configured profile
 * image is missing or fails to load, this renders the person's initials on
 * a subtle glass tint instead of a broken image icon. Used everywhere the
 * profile photo appears (Hero, About, Navbar) so the fallback behavior only
 * has to be implemented once.
 */
export function Avatar({
  src = personal.profileImage,
  alt = personal.displayName,
  className,
  fill,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    const initials = personal.displayName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);

    return (
      <div
        className={`flex items-center justify-center bg-accent/15 font-mono text-text-primary ${
          fill ? "absolute inset-0" : ""
        } ${className ?? ""}`}
        role="img"
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
