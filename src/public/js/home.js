particlesJS("particles-js", {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffe09f",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.6,
      random: true,
    },
    size: {
      value: 4,
      random: true,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.5,
        },
      },
    },
  },
  retina_detect: true,
});
