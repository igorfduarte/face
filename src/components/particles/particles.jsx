import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesComponent = () => {
  const options = useMemo(() => {
    return {
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover:{
            enable:true,
            mode:'repulse'
          }
        },
      },
      particles: {
        move: {
          enable: true,
          speed: { min: 1, max: 4 },
        },
        links: {
          enable: false,
        },
        size: {
          value: { min: 0.5, max: 2 },
        },
        opacity: {
          value: { min: 0.3, max: 0.7 },
        },
      },
    };
  }, []);

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  return <Particles init={particlesInit} options={options} />;
};

export default ParticlesComponent;
