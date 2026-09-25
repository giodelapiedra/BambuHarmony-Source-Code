const paths = {
  gentle:     'M0,24 C360,72 1080,72 1440,24 L1440,80 L0,80 Z',
  asymmetric: 'M0,64 C380,4 980,78 1440,20 L1440,80 L0,80 Z',
  ripple:     'M0,44 C220,78 480,8 720,46 C960,78 1200,12 1440,48 L1440,80 L0,80 Z',
};

function WaveDivider({ from, to, shape = 'gentle', flip = false, height = 64 }) {
  return (
    <div
      aria-hidden="true"
      style={{ background: from, lineHeight: 0, fontSize: 0, display: 'block' }}
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height: `${height}px`,
          transform: flip ? 'scaleX(-1)' : undefined,
        }}
      >
        <path d={paths[shape]} fill={to} />
      </svg>
    </div>
  );
}

export default WaveDivider;
