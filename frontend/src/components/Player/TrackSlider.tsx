import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import timeConverter from "@/helpers/timeConverter";

interface TrackSliderProps {
  position: number; // Aktuell position i låten
  duration: number; // Låtens totala längd
  onSeek: (value: number) => void; // Funktion för att söka i låten
}

const TrackSlider: React.FC<TrackSliderProps> = ({
  position,
  duration,
  onSeek,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-black min-w-12 text-right">
        {timeConverter(position)} {/* Visar aktuell tid */}
      </span>

      <div className="flex-1">
        <Slider
          min={0}
          max={duration} // Maxvärde är låtens längd
          value={position} // Aktuell position
          onChange={onSeek} // Funktion som anropas vid ändring
          step={100} // Stegstorlek för slider
        />
      </div>

      <span className="text-sm text-black min-w-12 text-left">
        {timeConverter(duration)} {/* Visar total längd */}
      </span>
    </div>
  );
};

export default TrackSlider;
