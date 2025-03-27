import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { usePlayerStore } from "@/store/playerStore";
import { Link } from "react-router-dom"; // Import Link

type Props = {
  artist: {
    name: string;
    popularity: number;
    external_urls: string;
    image: string;
    topTracks: {
      album: {
        id: string; // Add album ID here
        image: string;
        name: string;
        release_date: string;
      };
      artists: { name: string }[]; // Ensure this is an array of artists
      duration_ms: number;
      name: string;
      uri: string;
    }[];
  };
  handlePlayTrack: (uri: string) => void;
};

const ArtistCard: FC<Props> = ({ artist, handlePlayTrack }) => {
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  return (
    <section className="max-w-4xl m-auto py-8">
      <Card className="rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition duration-300">
        <CardHeader className="py-5 px-6 border-b border-gray-200">
          <CardTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
            {artist.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <img
            src={artist.image}
            alt="artist image"
            className="rounded-full w-32 h-32 object-cover shadow-md hover:shadow-lg border-2 border-white transition duration-300"
          />
        </CardContent>

        <CardContent className="p-6">
          <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artist.topTracks.map((track) => (
              <Card
                key={track.uri}
                className="rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition duration-200"
              >
                <CardHeader className="p-3">
                  <CardTitle
                    className="text-sm font-medium truncate text-gray-900 cursor-pointer"
                    onClick={() => {
                      handlePlayTrack(track.uri);
                      togglePlay(true);
                    }}
                  >
                    {track.name}
                  </CardTitle>
                  <img
                    src={track.album.image}
                    alt="Album image"
                    className="rounded mt-3 w-full h-20 object-cover cursor-pointer"
                    onClick={() => {
                      handlePlayTrack(track.uri);
                      togglePlay(true);
                    }}
                  />
                </CardHeader>
                <CardContent className="p-3">
                  <CardDescription className="text-xs text-gray-700">
                    Artist: {track.artists.name}
                  </CardDescription>
                  <CardDescription className="text-xs text-gray-700">
                    {/* Make only the album title clickable */}
                    <Link
                      to={`/album/${track.album.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Album: {track.album.name}
                    </Link>
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </article>
        </CardContent>
      </Card>
    </section>
  );
};

export default ArtistCard;
