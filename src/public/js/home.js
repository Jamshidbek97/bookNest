document.addEventListener("DOMContentLoaded", function () {
  // Initialize Particles.js
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ff9f43",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ff9f43",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.8,
          },
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  });

  // Book hover effect
  const floatingBook = document.querySelector(".floating-book");
  if (floatingBook) {
    floatingBook.addEventListener("mouseenter", () => {
      floatingBook.style.animationPlayState = "paused";
    });

    floatingBook.addEventListener("mouseleave", () => {
      floatingBook.style.animationPlayState = "running";
    });

    // Add some random particles around the book
    const particleDots = floatingBook.querySelector(".particle-dots");
    for (let i = 0; i < 15; i++) {
      const dot = document.createElement("div");
      dot.className = "particle-dot";
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.width = `${Math.random() * 6 + 2}px`;
      dot.style.height = dot.style.width;
      dot.style.animationDelay = `${Math.random() * 5}s`;
      particleDots.appendChild(dot);
    }
  }
});
