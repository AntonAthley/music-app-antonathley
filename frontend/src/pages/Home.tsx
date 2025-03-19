import ListContainer from "@/components/ui/listContainer";
import SearchBar from "@/components/SearchBar";
import Login from "./Login";
import useAccessStore from "@/store/store";
import useAuth from "@/helpers/useAuth";
import SongListContainer from "@/components/ui/SongListContainer";
import { useEffect } from "react";

export default function Home() {
  // Hämta auth code från URL:en
  const code = new URLSearchParams(window.location.search).get("code");
  const token = useAccessStore((state) => state.accessToken);

  // Använd auth code för att få access token
  useAuth(code || "");

  // Ta bort auth code från URL:en efter användning
  useEffect(() => {
    if (code) {
      window.history.replaceState({}, "", "/");
    }
  }, [code]);

  console.log("code:", code);
  console.log("accesstoken:", token);

  return (
    <div>
      {code || token ? (
        <div>
          <h1 className="text-4xl text-white">
            Search for a song or an artist
          </h1>
          <SearchBar />
          <section className="flex flex-col justify-center p-2 align-middle md:flex-row lg:flex-row">
            <ListContainer />
            <SongListContainer />
          </section>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}
