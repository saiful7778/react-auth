import { cn } from "@/lib/shadcn/utils";
import { Loader } from "lucide-react";
import { forwardRef } from "react";

interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number | undefined;
}

const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("inline-block animate-spinner", className)}
        {...props}
      >
        <Loader size={size} />
      </span>
    );
  },
);
Spinner.displayName = "Spinner";

export default Spinner;
