import useCookie from "@/hooks/useCookie";
import { Button } from "./shadcn/ui/button";

const CookieCounter: React.FC = () => {
  const [counterValue, setCounterValue] = useCookie("counter", "1");

  return (
    <div className="flex w-full max-w-xs flex-col items-center justify-center gap-4 rounded-md border p-4">
      <div className="text-xl font-bold text-nowrap">Store in browser cookie</div>
      <div className="text-xl font-bold">{counterValue}</div>
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={() => setCounterValue((prev) => String(Number(prev) + 1))}
        >
          Increment
        </Button>
        <Button
          onClick={() => setCounterValue((prev) => String(Number(prev) - 1))}
        >
          Decrement
        </Button>
      </div>
    </div>
  );
};

export default CookieCounter;
