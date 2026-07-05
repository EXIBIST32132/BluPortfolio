type ClockIllustrationProps = {
  angle: number;
  activeTitle: string;
  resting?: boolean;
  reducedMotion?: boolean;
};

export function ClockIllustration({
  angle,
  activeTitle,
  resting,
  reducedMotion,
}: ClockIllustrationProps) {
  const pointingAngle = angle + 90;
  const handStyle = {
    transform: `rotate(${pointingAngle}deg)`,
    transition: reducedMotion
      ? "none"
      : "transform var(--duration-base) var(--ease-out-soft)",
  };

  const shortHandStyle = {
    transform: `rotate(${pointingAngle}deg)`,
    transition: reducedMotion
      ? "none"
      : "transform var(--duration-base) var(--ease-out-soft)",
  };

  return (
    <div
      className={`clock-illustration${resting ? " clock-illustration-resting" : ""}`}
      aria-label={resting ? "Contents clock in resting state" : `Clock pointing to ${activeTitle}`}
    >
      <svg viewBox="0 0 220 220" role="img" data-testid="clock-face">
        <title>Interactive contents clock</title>
        <circle className="clock-face" cx="110" cy="110" r="94" />
        <circle className="clock-ring" cx="110" cy="110" r="78" />
        {Array.from({ length: 12 }).map((_, index) => {
          const tickAngle = index * 30;
          return (
            <line
              className="clock-tick"
              key={tickAngle}
              x1="110"
              x2="110"
              y1="22"
              y2={index % 3 === 0 ? "36" : "30"}
              transform={`rotate(${tickAngle} 110 110)`}
            />
          );
        })}
        <g className="clock-hand clock-hand-short" style={shortHandStyle}>
          <line x1="110" x2="110" y1="110" y2="61" />
        </g>
        <g className="clock-hand clock-hand-long" style={handStyle} data-testid="clock-hand">
          <line x1="110" x2="110" y1="110" y2="32" />
          <circle cx="110" cy="32" r="5" />
        </g>
        <circle className="clock-pin" cx="110" cy="110" r="8" />
      </svg>
      <span className="clock-caption">{activeTitle}</span>
    </div>
  );
}
