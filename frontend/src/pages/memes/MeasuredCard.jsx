import React, { useRef, useEffect } from "react";
import MemeCard from "../../components/MemeCard"; // adjust this path as needed

const MeasuredCard = ({ meme, onResize }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      onResize(meme._id, entry.contentRect.height);
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [meme._id, onResize]);

  return (
    <div ref={ref} className="measured-card">
      <MemeCard meme={meme} />
    </div>
  );
};

export default MeasuredCard;
