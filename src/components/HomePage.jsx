import React from "react";
import { CiViewTimeline } from "react-icons/ci";

function HomePage() {
  const backgroundImage =
    "https://cdn.pixabay.com/photo/2017/03/30/21/45/time-2189800_1280.jpg";

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
      className="relative"
    >

    </div>
  );
}

export default HomePage;
