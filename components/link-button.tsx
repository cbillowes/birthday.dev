import { Button } from "@/components/ui/button";
import Link from "next/link";

export const PrimaryLinkButton = ({
  size = "default",
  to,
  children,
}: {
  size?: "default" | "sm" | "lg";
  to: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Button
      asChild
      size={size}
      className="font-normal w-full bg-chart-5 hover:bg-chart-5/90 text-white"
    >
      <Link href={to}>{children}</Link>
    </Button>
  );
};

export const GhostLinkButton = ({
  size = "default",
  to,
  children,
}: {
  size?: "default" | "sm" | "lg";
  to: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Button
      asChild
      variant="outline"
      size={size}
      className="font-normal w-full border-white text-white hover:bg-chart-4/10"
    >
      <Link href={to}>{children}</Link>
    </Button>
  );
};
