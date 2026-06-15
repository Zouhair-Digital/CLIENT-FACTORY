import Image from "next/image";

type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
  light?: boolean;
};

export default function Logo({ variant = "full", className = "", light = true }: LogoProps) {
  const ringColor = light ? "#FFFFFF" : "#071B34";

  const Mark = (
    <svg
      viewBox="0 0 100 100"
      className="h-10 w-10 shrink-0"
      aria-hidden="true"
    >
      {/* C ring */}
      <path
        d="M68 22 A33 33 0 1 0 68 78"
        fill="none"
        stroke={ringColor}
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* F mark with banner tail */}
      <polygon
        points="42,22 82,22 82,38 58,38 58,50 76,50 76,66 58,66 58,90 42,72"
        fill="#D4AF37"
      />
    </svg>
  );

  if (variant === "mark") {
    return <div className={`h-10 w-10 ${className}`}>{Mark}</div>;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/factory-logo.png"
        alt="Client Factory"
        width={220}
        height={56}
        className="h-10 w-auto"
        priority
      />
    </div>
  );
}
