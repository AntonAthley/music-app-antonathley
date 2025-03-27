import React, { useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface VolumeSliderProps {
  volume: number; // Aktuell volym
  onVolumeChange: (value: number) => void; // Funktion för att ändra volym
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({
  volume,
  onVolumeChange,
}) => {
  // Beräkna volymprocent för ikonval
  const volumePercent = volume * 100;

  // Välj lämplig ikon baserat på volymnivå
  const getVolumeIcon = () => {
    if (volumePercent === 0) {
      return <i className="fa-solid fa-volume-off"></i>; // Volym av
    } else if (volumePercent <= 50) {
      return <i className="fa-solid fa-volume-low"></i>; // Låg volym
    } else {
      return <i className="fa-solid fa-volume-high"></i>; // Hög volym
    }
  };

  // Lägg till FontAwesome om det inte redan finns
  useEffect(() => {
    if (!document.getElementById("font-awesome-css")) {
      const link = document.createElement("link");
      link.id = "font-awesome-css";
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="text-black w-8 text-center">{getVolumeIcon()}</div>{" "}
      {/* Visar volymikonen */}
      <div className="w-24">
        <Slider
          min={0}
          max={100} // Maxvärde för volym
          step={1} // Stegstorlek för slider
          value={volumePercent} // Aktuell volymprocent
          onChange={onVolumeChange} // Funktion som anropas vid ändring
          id="volume"
        />
      </div>
    </div>
  );
};

export default VolumeSlider;
