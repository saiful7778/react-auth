import { Outlet } from "react-router";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
