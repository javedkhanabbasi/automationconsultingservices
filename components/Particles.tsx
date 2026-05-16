// Particle background matching client's existing website DOM (30 particles).
// Lime color only, locked. Deterministic positions for SSR consistency.

const PARTICLES = [
  { left: 78.947, top: 52.3462, delay: 14.0863, duration: 13.5146 },
  { left: 3.68968, top: 53.2172, delay: 3.74736, duration: 10.119 },
  { left: 19.1485, top: 51.8582, delay: 7.7984, duration: 15.5116 },
  { left: 15.2132, top: 55.2893, delay: 11.5627, duration: 11.1603 },
  { left: 3.84767, top: 82.6173, delay: 2.39739, duration: 13.1528 },
  { left: 82.0356, top: 64.5781, delay: 0.0830681, duration: 16.7002 },
  { left: 69.75, top: 47.6608, delay: 13.9911, duration: 14.271 },
  { left: 64.7836, top: 10.93, delay: 0.448048, duration: 16.9212 },
  { left: 84.6232, top: 28.8524, delay: 9.74647, duration: 16.6815 },
  { left: 63.6968, top: 47.0369, delay: 6.00665, duration: 16.6054 },
  { left: 6.82246, top: 7.39196, delay: 2.38656, duration: 16.8986 },
  { left: 46.3368, top: 99.1807, delay: 2.14287, duration: 14.6199 },
  { left: 82.5407, top: 35.1696, delay: 12.2322, duration: 15.7132 },
  { left: 26.9873, top: 13.318, delay: 13.3101, duration: 17.8117 },
  { left: 1.08413, top: 99.5093, delay: 12.3873, duration: 14.1003 },
  { left: 68.6072, top: 31.1837, delay: 10.3926, duration: 14.9883 },
  { left: 50.9545, top: 93.6236, delay: 13.6336, duration: 19.166 },
  { left: 51.1665, top: 49.3063, delay: 8.63852, duration: 15.2579 },
  { left: 57.546, top: 27.9394, delay: 11.8974, duration: 17.8509 },
  { left: 53.0046, top: 55.8538, delay: 4.73676, duration: 10.3614 },
  { left: 69.4859, top: 40.9449, delay: 12.4315, duration: 14.2477 },
  { left: 59.842, top: 30.0786, delay: 14.3033, duration: 11.8788 },
  { left: 92.2052, top: 58.132, delay: 8.73547, duration: 11.6514 },
  { left: 64.4987, top: 53.963, delay: 14.2852, duration: 17.0293 },
  { left: 25.8555, top: 53.2738, delay: 14.7636, duration: 19.3736 },
  { left: 82.107, top: 66.0119, delay: 3.30553, duration: 10.4536 },
  { left: 63.1356, top: 81.5023, delay: 4.62004, duration: 11.3623 },
  { left: 7.47702, top: 46.8723, delay: 6.3056, duration: 17.0205 },
  { left: 66.6884, top: 48.7631, delay: 12.2412, duration: 15.5008 },
  { left: 64.8992, top: 2.38466, delay: 6.38595, duration: 15.6421 },
];

export default function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
