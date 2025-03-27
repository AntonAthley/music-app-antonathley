import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import useAccessStore from "@/store/store";
import { usePlayerStore } from "@/store/playerStore";
import axios from "axios";

interface AlbumDetails {
  name: string;
  artists: { name: string }[];
  images: { url: string }[];
  tracks: { items: any[] };
}

const AlbumId = () => {
  // State för albuminformation
  const [album, setAlbum] = useState<AlbumDetails | null>(null);
  // Hämta nuvarande plats i URL
  const location = useLocation();
  const path = location.pathname;
  // Extrahera album-ID från URL
  const albumId = path.startsWith("/album/") ? path.substring(7) : null;
  // Hämta access-token från store
  const accessToken = useAccessStore().accessToken;
  // Funktioner för att hantera musikspelare
  const setTrack = usePlayerStore((state) => state.setTrack);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const deviceId = usePlayerStore((state) => state.deviceId);

  // Funktion för att spela en låt
  const handlePlayTrack = async (uri: string) => {
    try {
      setTrack(uri); // Sätt låtens URI i store
      await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, // Använd korrekt deviceId
        {
          uris: [uri],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      togglePlay(true); // Spela låten
    } catch (error) {
      console.error("Error playing track:", error); // Logga fel
    }
  };

  useEffect(() => {
    async function fetchAlbumDetails() {
      // Hämta albumdetaljer om access-token och album-ID finns
      if (accessToken && albumId) {
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/albums/${albumId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log("Album details:", response.data); // Logga albumdetaljer
          setAlbum(response.data); // Sätt albuminformation i state
        } catch (error) {
          console.error("Error fetching album details:", error); // Logga fel
        }
      }
    }

    fetchAlbumDetails(); // Anropa funktionen för att hämta albumdetaljer
  }, [accessToken, albumId]);

  return (
    <main className="p-4">
      {album ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="ld:flex">
            <div className="ld:shrink-0">
              <img
                className="h-48 w-full object-cover w-full"
                src={album.images[0]?.url}
                alt={album.name}
              />
            </div>
            <div className="p-8 text-center ">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold text-left">
                Album
              </div>

              <h2 className="block mt-1 text-lg leading-tight font-medium text-black text-left">
                {album.name}
              </h2>
              <p className="mt-2 text-gray-500 text-left">
                Artist: {album.artists.map((artist) => artist.name).join(", ")}
              </p>
              <ul className="mt-4 text-left">
                {album.tracks.items.map((track: any, index: number) => (
                  <li
                    key={track.id}
                    className="py-2 border-b border-gray-200 last:border-b-0 flex items-center hover:bg-gray-50 cursor-pointer"
                    onClick={() => handlePlayTrack(track.uri)}
                  >
                    <span>
                      {index + 1}. {track.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading album details...</p> // Meddelande vid laddning
      )}
    </main>
  );
};

export default AlbumId;
