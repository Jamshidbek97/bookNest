document.addEventListener("DOMContentLoaded", function () {
  // Initialize Particles.js
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
        value: "#ff9f43",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 3,
        random: true,
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
    },
    retina_detect: true,
  });

  $(".user-status-select").on("change", async function () {
    const userId = $(this).data("user-id");
    const newStatus = $(this).val();
    const $row = $(this).closest("tr");
    const previousStatus = $row.attr("class").split(" ")[1]; // Get previous status class

    try {
      const response = await axios.post(`/admin/user/edit/${userId}`, {
        memberStatus: newStatus,
      });

      if (response.data) {
        // Update UI
        $row.removeClass(previousStatus).addClass(newStatus.toLowerCase());
        $(this)
          .next(".status-indicator")
          .removeClass(previousStatus)
          .addClass(newStatus.toLowerCase());

        showToast(`User status updated to ${newStatus}`, "success");
      } else {
        // Revert on failure
        $(this).val(previousStatus.toUpperCase());
        showToast("Failed to update user status", "error");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      $(this).val(previousStatus.toUpperCase());
      showToast("Error updating user status", "error");
    }
  });

  // Toast notification function
  function showToast(message, type) {
    const toast = $(`<div class="toast ${type}">${message}</div>`);
    $("body").append(toast);

    setTimeout(() => toast.addClass("show"), 100);
    setTimeout(() => {
      toast.removeClass("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
});
