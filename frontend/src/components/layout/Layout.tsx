import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col items-center overflow-hidden">
      <div className="w-full min-w-80 max-w-5xl">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
