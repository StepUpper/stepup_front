import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col items-center overflow-hidden">
      <div className="w-full max-w-5xl">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
