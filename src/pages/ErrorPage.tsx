import { Button } from "@/components/shadcn/ui/button";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  // Check if the error is a route error response (e.g., 404, 500)
  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2 text-center lg:gap-4">
        <div className="text-8xl font-bold">
          {error.status}
          <span className="text-primary">!</span>
        </div>
        <p>{error.statusText}</p>
        {error.data && (
          <pre>
            <code>{JSON.stringify(error.data, null, 2)}</code>
          </pre>
        )}
        <Button asChild>
          <Link to="/">Go back to Home</Link>
        </Button>
      </div>
    );
  }

  // Handle generic errors
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 text-center lg:gap-4">
      <div className="text-4xl font-bold">
        Something went wrong
        <span className="text-primary">!</span>
      </div>
      <p>{(error as Error)?.message || "An unknown error occurred."}</p>
      <Button asChild>
        <Link to="/">Go back to Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
