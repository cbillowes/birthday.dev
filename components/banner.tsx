import { Code } from "lucide-react";
import Link from "next/link";

const BannerContent = ({
  size,
  showCode,
}: {
  size: "sm" | "lg";
  showCode?: boolean;
}) => {
  return (
    <div className="flex items-center justify-center  space-x-2">
      {showCode && <Code className="h-5 w-5 text-white" />}
      <h1
        className={`font-mono font-bold text-white ${
          size === "sm"
            ? " text-md"
            : "text-4xl sm:text-6xl md:text-7xl lg:text-6xl"
        }`}
      >
        <span className="text-white">clarice</span>
        <span className="text-chart-1">.</span>
        <span className="text-chart-2">is</span>
        <span className="text-chart-5">(</span>
        <span className="text-chart-4">40</span>
        <span className="text-chart-5">)</span>
      </h1>
    </div>
  );
};

export const Banner = ({
  size = "lg",
  to = "",
  showCode = false,
}: {
  size: "sm" | "lg";
  to?: string;
  showCode?: boolean;
}) => {
  const content = <BannerContent size={size} showCode={showCode} />;
  return to ? <Link href={to}>{content}</Link> : content;
};
