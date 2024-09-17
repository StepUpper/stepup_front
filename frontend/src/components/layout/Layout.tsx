import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col items-center overflow-hidden">
<<<<<<< HEAD
      <div className="size-full max-w-5xl">
=======
      <div className="w-full min-w-80 max-w-5xl">
>>>>>>> e4c45409e87fe453f13e7ce474ac397e064c5406
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
