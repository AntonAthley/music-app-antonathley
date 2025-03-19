import { Outlet } from "react-router-dom";
import Header from "./Header";
import useAccessStore from "@/store/store"; // Hämta accessToken

export default function RootLayout() {
  const accessToken = useAccessStore((state) => state.accessToken);

  return (
    <div>
      {accessToken && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
