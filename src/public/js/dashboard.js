// Toggle sidebar on mobile
document.querySelector(".sidebar-toggle").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("active");
});

// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector(".sidebar-toggle");

  if (!sidebar.contains(e.target) && e.target !== toggleBtn) {
    sidebar.classList.remove("active");
  }
});

// Add sidebar class to body when sidebar exists
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".sidebar")) {
    document.body.classList.add("has-sidebar");
  }
});
