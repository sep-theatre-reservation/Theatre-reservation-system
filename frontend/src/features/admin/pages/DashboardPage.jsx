import { Outlet } from "react-router-dom";
import AvatarComponent from "../../shared/components/AddAvatarComponent";

function DashboardPage() {
  return (
    <>
      <h2>Carousel Images</h2>
      <AvatarComponent />
      <Outlet />
    </>
  );
}

export default DashboardPage;
