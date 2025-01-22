import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden p-4">
      <div className="container mx-auto">
        <Topbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
