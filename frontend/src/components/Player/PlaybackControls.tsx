import React from "react";
import {
  PreviousButton,
  PlayButton,
  PauseButton,
  NextButton,
} from "@/components/ui/PlayerButtons";

interface PlaybackControlsProps {
  isPlaying: boolean; // Indikerar om musiken spelas
  onPlayPause: () => void; // Funktion för att spela/pausa
  onPrevious: () => void | undefined; // Funktion för att gå till föregående låt
  onNext: () => void | undefined; // Funktion för att gå till nästa låt
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex gap-3 justify-center">
      <PreviousButton onClick={onPrevious} /> {/* Knapp för föregående låt */}
      {isPlaying ? (
        <PauseButton onClick={onPlayPause} /> // Pausknapp
      ) : (
        <PlayButton onClick={onPlayPause} /> // Spelknapp
      )}
      <NextButton onClick={onNext} /> {/* Knapp för nästa låt */}
    </div>
  );
};

export default PlaybackControls;
