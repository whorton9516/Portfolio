import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Header() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Map scrollY (0–300px) → progress (0–1)
  const inputRange = [0, 300];

  // Header height shrinks 400px → 100px
  const headerHeight = useTransform(scrollY, inputRange, [400, 100]);

  // Image shrinks 300px → 60px
  const imageSize = useTransform(scrollY, inputRange, [300, 60]);

  // Text moves from below image → beside it
  const textY = useTransform(scrollY, inputRange, [40, 0]);  // 40px below → aligned
  const textX = useTransform(scrollY, inputRange, [0, 20]);  // slides to the right

  // Whole block slides into top-left
  const containerX = useTransform(scrollY, inputRange, [0, -120]);
  const containerY = useTransform(scrollY, inputRange, [0, -120]);

  return (
    <motion.header
      ref={ref}
      style={{ height: headerHeight }}
      className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{
          x: containerX,
          y: containerY,
          display: "flex",
          alignItems: "center",
          flexDirection: "column", // start vertical
        }}
        className="origin-top-left"
      >
        <motion.img
          src="../assets/me.png"
          alt="Headshot"
          className="rounded-full"
          style={{
            width: imageSize,
            height: imageSize,
          }}
        />
        <motion.span
          className="font-bold text-3xl"
          style={{
            x: textX,
            y: textY,
          }}
        >
          Sam Whorton
        </motion.span>
      </motion.div>
    </motion.header>
  );
}
