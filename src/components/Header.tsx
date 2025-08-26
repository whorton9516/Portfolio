import { useEffect, useState } from "react";

type Props = { progress: number };

function HeaderContent({ progress }: Props) {
  // Interpolations
  const headerHeight = 150 - 70 * progress; // 150px → 80px
  const scale = 1 - 0.4 * progress;         // 1 → 0.6
  const xOffset = 0 + 60 * progress;        // slide text right
  const yOffset = 0 - 40 * progress;        // slide text up

  return (
    <header
      style={{
        height: headerHeight,
        transition: "height 0.1s linear",
      }}
      className="fixed top-0 left-0 w-full bg-white shadow-md flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="flex items-center"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          transition: "transform 0.1s linear",
        }}
      >
        <img
          src="/headshot.png"
          alt="Headshot"
          className="rounded-full"
          style={{
            width: `${80 - 30 * progress}px`, // 80px → 50px
            height: `${80 - 30 * progress}px`,
          }}
        />
        <span
          style={{
            transform: `translate(${xOffset}px, ${yOffset}px)`,
            marginLeft: progress > 0.3 ? "12px" : "0px", // starts below, moves beside
            transition: "margin-left 0.1s linear",
          }}
          className="font-bold text-xl"
        >
          Your Name
        </span>
      </div>
    </header>
  );
}

export default function Header() {
  const [progress, setProgress] = useState(0); // 0 = top, 1 = fully shrunk

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 200; // pixels over which animation happens
      const y = Math.min(window.scrollY, maxScroll);
      setProgress(y / maxScroll); // clamp between 0 and 1
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <HeaderContent progress={progress} />;
}