import React, { useEffect, useState } from "react";

const IMAGE_PROXY = "https://wsrv.nl/?url=";

/**
 * Some networks (a number of Indian ISPs, corporate proxies) reset connections to
 * *.githubusercontent.com while leaving api.github.com reachable, which leaves the
 * avatar broken even though the profile data loads. Fall back to an image proxy,
 * then to an initials circle, so the UI never shows a broken image.
 */
const buildProxyUrl = (url: string) =>
  `${IMAGE_PROXY}${encodeURIComponent(url.replace(/^https?:\/\//, ""))}`;

const getInitials = (name: string) =>
  name
    .split(/[\s-_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";

interface AvatarProps {
  src: string;
  name: string;
  className?: string;
  /** Tailwind text size for the initials fallback. */
  fallbackTextClassName?: string;
}

type Stage = "direct" | "proxy" | "initials";

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  className = "",
  fallbackTextClassName = "text-base",
}) => {
  const [stage, setStage] = useState<Stage>("direct");

  useEffect(() => {
    setStage("direct");
  }, [src]);

  if (!src || stage === "initials") {
    return (
      <div
        role="img"
        aria-label={name}
        className={`flex items-center justify-center bg-subtle border border-line text-muted font-semibold select-none ${fallbackTextClassName} ${className}`}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={stage === "direct" ? src : buildProxyUrl(src)}
      alt={name}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setStage(stage === "direct" ? "proxy" : "initials")}
      className={className}
    />
  );
};

export default Avatar;
