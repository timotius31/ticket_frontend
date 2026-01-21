import { useEffect, useState } from 'react';

const images = [
  '/src/assets/slider1.jpg',
  '/src/assets/slider2.jpg',
  '/src/assets/slider3.jpg'
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="slide"
          style={{
            ...styles.image,
            opacity: i === index ? 1 : 0
          }}
        />
      ))}

      {/* LEFT */}
      <button
        style={{ ...styles.arrow, left: 20 }}
        onClick={() =>
          setIndex(index === 0 ? images.length - 1 : index - 1)
        }
      >
        ‹
      </button>

      {/* RIGHT */}
      <button
        style={{ ...styles.arrow, right: 20 }}
        onClick={() =>
          setIndex((index + 1) % images.length)
        }
      >
        ›
      </button>

      {/* DOTS */}
      <div style={styles.dots}>
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            style={{
              ...styles.dot,
              opacity: index === i ? 1 : 0.4
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '70vh',
    minHeight: 420,
    overflow: 'hidden',
    margin: 0,
    padding: 0
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',   // 🔑 maintain ratio, fill screen
    transition: 'opacity 1s ease-in-out'
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 40,
    background: 'rgba(0,0,0,0.4)',
    color: '#fff',
    border: 'none',
    padding: '4px 14px',
    cursor: 'pointer',
    zIndex: 2
  },
  dots: {
    position: 'absolute',
    bottom: 15,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 10,
    zIndex: 2
  },
  dot: {
    width: 10,
    height: 10,
    background: '#fff',
    borderRadius: '50%',
    cursor: 'pointer'
  }
};
