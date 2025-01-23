import Spinner from "@/components/Spinner";
import { useAxiosSecure } from "@/hooks/useAxios";
import { ApiResponseType, UserRole } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";

const SuperAdmin: React.FC = () => {
  const axios = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } =
        await axios.get<
          ApiResponseType<
            { id: number; name: string; email: string; role: UserRole }[]
          >
        >("/api/users");

      if (!data?.status) {
        throw new Error(data?.message);
      }

      return data?.data;
    },
  });

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
    <div className="space-y-4 my-4">
      <h1 className="text-center text-2xl font-semibold">Super admin access page</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user, idx) => (
            <TableRow key={`user-${idx}`}>
              <TableCell className="font-medium">{user?.id}</TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SuperAdmin;
