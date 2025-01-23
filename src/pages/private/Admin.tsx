import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import Spinner from "@/components/Spinner";
import useUserData from "@/hooks/api-hooks/useUserData";

const Admin: React.FC = () => {
  const { data, isLoading, isError } = useUserData();

  if (isLoading) {
    return (
      <div className="my-4 flex items-center justify-center">
        <Spinner size={30} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="my-4 text-center text-destructive">
        Something went wrong!
      </div>
    );
  }

  return (
    <div className="my-4 flex items-center flex-col gap-4 justify-center">
      <h1 className="text-2xl font-bold">Admin access page</h1>
      <div className="w-full max-w-sm space-y-2 rounded-md border p-4">
        <div className="flex items-center justify-center">
          <Avatar className="size-20">
            <AvatarImage src={data?.avatar} alt={data?.name} />
            <AvatarFallback>{data?.name}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <span className="font-bold">ID:</span> <span>{data?.id}</span>
        </div>
        <div>
          <span className="font-bold">Name:</span> <span>{data?.name}</span>
        </div>
        <div>
          <span className="font-bold">Email:</span> <span>{data?.email}</span>
        </div>
        <div>
          <span className="font-bold">Role:</span> <span>{data?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Admin;
