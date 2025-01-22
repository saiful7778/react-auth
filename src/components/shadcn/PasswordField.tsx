import { forwardRef, useState } from "react";
import { Input } from "./ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "./ui/button";

const PasswordField = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input ref={ref} type={passwordShow ? "text" : "password"} {...props} />
      <Button
        onClick={() => setPasswordShow((prev) => !prev)}
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 z-10 size-7 -translate-y-1/2 rounded-sm"
        type="button"
      >
        {passwordShow ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
      </Button>
    </div>
  );
});
PasswordField.displayName = "Password";

export default PasswordField;
