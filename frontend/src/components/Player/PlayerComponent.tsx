import { useEffect, useState, useRef } from "react";
import { usePlayerStore } from "@/store/playerStore";
import useAccessStore from "@/store/store.ts";
import axios from "axios";
import { Track } from "@/types";

import TrackInfo from "@/components/Player/TrackInfo";
import PlaybackControls from "@/components/Player/PlaybackControls";
import VolumeSlider from "@/components/Player/VolumeSlider";
import TrackSlider from "@/components/Player/TrackSlider";

const PlayerComponent = () => {
  const { accessToken } = useAccessStore();
  const { trackUri, isPlaying, deviceId, setDeviceId, togglePlay } =
    usePlayerStore();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const positionUpdateInterval = useRef<number | null>(null);

  const startPositionUpdates = () => {
    if (!positionUpdateInterval.current && player) {
      positionUpdateInterval.current = window.setInterval(() => {
        player?.getCurrentState().then((state) => {
          if (state) {
            setPosition(state.position);
          }
        });
      }, 500);
    }
  };

  const stopPositionUpdates = () => {
    if (positionUpdateInterval.current) {
      clearInterval(positionUpdateInterval.current);
      positionUpdateInterval.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startPositionUpdates();
    } else {
      stopPositionUpdates();
    }

    return () => stopPositionUpdates();
  }, [isPlaying, player]);

  useEffect(() => {
    if (!accessToken) return;

    if (window.Spotify) {
      initializePlayer();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    script.onload = () => initializePlayer();
    document.body.appendChild(script);
  }, [accessToken]);

  const initializePlayer = () => {
    const spotifyPlayer = new window.Spotify.Player({
      name: "My Custom Spotify Player",
      getOAuthToken: (cb) => cb(accessToken),
      volume: volume,
    });

    setPlayer(spotifyPlayer);

    spotifyPlayer.addListener("ready", ({ device_id }) => {
      setDeviceId(device_id);
      axios.put(
        "https://api.spotify.com/v1/me/player",
        { device_ids: [device_id] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    });

    spotifyPlayer.addListener("player_state_changed", (state) => {
      if (!state) return;
      setCurrentTrack(state.track_window.current_track);
      setDuration(state.duration);
      setPosition(state.position);
    });

    spotifyPlayer.connect().then((success) => {});
  };

  const handlePlayPause = async () => {
    if (!player) return;
    if (isPlaying) {
      player.pause();
      stopPositionUpdates();
      togglePlay(false);
    } else {
      player.resume();
      startPositionUpdates();
      togglePlay(true);
    }
  };

  const handleSeek = (value: number) => {
    if (player) {
      player.seek(value).then(() => {
        setPosition(value);
      });
    }
  };

  const handleVolumeChange = (value: number) => {
    if (player) {
      const newVolume = value / 100;
      player.setVolume(newVolume).then(() => {
        setVolume(newVolume);
      });
    }
  };

  useEffect(() => {
    if (player) {
      player.setVolume(volume);
    }
  }, [player, volume]);

  return (
    <div className="player-container p-2 flex justify-center bg-yellow-400 border-t-4 border-black max-h-[150px]">
      {currentTrack ? (
        <div className="flex flex-col w-full mx-4 bg-colors-customYellow border-4 border-black rounded-md p-2">
          <div className="flex items-center justify-between h-20">
            <div className="hidden md:flex items-center gap-2 h-full mt-6 ml-5 text-left">
              <img
                src={currentTrack.album.images[0]?.url}
                alt="Album Cover"
                className="rounded-md border-2 border-black h-16 w-16 object-cover my-auto"
              />
              <div className="flex items-center h-full">
                <TrackInfo currentTrack={currentTrack} />
              </div>
            </div>

            <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex items-center mx-auto md:mx-0">
              <PlaybackControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onPrevious={() => player?.previousTrack()}
                onNext={() => player?.nextTrack()}
              />
            </div>

            <div className="hidden md:flex items-center h-full mt-6 mr-5">
              <VolumeSlider
                volume={volume}
                onVolumeChange={handleVolumeChange}
              />
            </div>
          </div>

          <div className="flex justify-center w-full mt-2">
            <div className="w-full md:w-1/2">
              <TrackSlider
                position={position}
                duration={duration}
                onSeek={handleSeek}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>No song is playing...</p>
      )}
    </div>
  );
};

export default PlayerComponent;
