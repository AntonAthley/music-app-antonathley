import React from "react";
import { Track } from "@/types";

interface TrackInfoProps {
  currentTrack?: Track; // Aktuell låt
}

const TrackInfo: React.FC<TrackInfoProps> = ({ currentTrack }) => {
  if (!currentTrack) {
    return null; // Om ingen låt är vald, returnera inget
  }

  return (
    <div className="flex flex-col justify-center h-full">
      {/* För små och medelstora skärmar (visar animation vid hover) */}
      <div className="relative overflow-hidden group max-lg:block hidden">
        <h2 className="text-lg font-bold truncate opacity-100 group-hover:opacity-0 transition-opacity duration-300 max-w-[100px] overflow-hidden">
          {currentTrack.name} {/* Låtens namn */}
        </h2>
        <div className="absolute top-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="inline-block whitespace-nowrap animate-[marquee_10s_linear_infinite] max-w-[100px] overflow-hidden">
            <h2 className="text-lg font-bold">{currentTrack.name}</h2>
          </div>
        </div>
      </div>
      {/* För stora skärmar (visar bara trimmad text) */}
      <h2 className="text-lg font-bold truncate lg:block hidden">
        {currentTrack.name} {/* Låtens namn */}
      </h2>
      <h3 className="text-sm truncate">
        {currentTrack.artists.map((artist) => artist.name).join(", ")}{" "}
        {/* Låtens artister */}
      </h3>
      <p className="text-xs truncate">{currentTrack.album.name}</p>{" "}
      {/* Albumets namn */}
    </div>
  );
};

const marqueeKeyframes = `
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
`;

const style = document.createElement("style");
style.type = "text/css";
style.appendChild(document.createTextNode(marqueeKeyframes));
document.head.appendChild(style);

export default TrackInfo;
