import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div>

      <h2>User Panel</h2>

      <Outlet />

    </div>
  );
}

export default UserLayout;