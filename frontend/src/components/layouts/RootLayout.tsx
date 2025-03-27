import { Outlet } from "react-router-dom";
import Header from "./Header";
import useAccessStore from "@/store/store"; // Hämta accessToken
import PlayerComponent from "../Player/PlayerComponent";

export default function RootLayout() {
  const accessToken = useAccessStore((state) => state.accessToken);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {accessToken && <Header />}
      <main className="flex-1">
        <Outlet />
        <div className="sticky bottom-0 w-full">
          {accessToken && <PlayerComponent />}
        </div>
      </main>
    </div>
  );
}
