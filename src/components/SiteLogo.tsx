import { cn } from "@/lib/shadcn/utils";
import { forwardRef } from "react";
import { Link } from "react-router";

interface SiteLogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  to?: string | undefined;
}

const SiteLogo = forwardRef<HTMLAnchorElement, SiteLogoProps>(
  ({ className, to = "/", ...props }, ref) => {
    return (
      <Link
        to={to}
        ref={ref}
        className={cn("text-xl font-bold uppercase text-primary", className)}
        {...props}
      >
        React-Auth
      </Link>
    );
  },
);

SiteLogo.displayName = "SiteLogo";

export default SiteLogo;
