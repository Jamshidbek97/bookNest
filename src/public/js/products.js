$(document).ready(function () {
  // Initialize form fields based on format
  function updateFormFields(format) {
    // Handle page count/duration toggle
    if (format === "AUDIO") {
      $("#pageCountGroup").hide();
      $("#durationGroup").show();
      $("#pages").val(""); // Clear page count
    } else {
      $("#pageCountGroup").show();
      $("#durationGroup").hide();
      $("#duration").val(""); // Clear duration
    }

    // Handle stock logic
    if (format === "EBOOK" || format === "AUDIO") {
      $("#stock").val("9999").prop("disabled", true);
      $("#digitalStockNote").show();
    } else {
      $("#stock").val("").prop("disabled", false);
      $("#digitalStockNote").hide();
    }
  }

  // Initialize form
  function initForm() {
    // Set initial format state
    updateFormFields($("#format").val());

    // Store initial status values
    $(".status-select").each(function () {
      $(this).data("previous-value", $(this).val());
    });

    // Make entire upload box clickable
    $(".image-upload-box").on("click", function (e) {
      if (!$(e.target).is("input")) {
        $(this).find("input[type='file']").click();
      }
    });
  }

  // Show/hide book form
  function showBookForm() {
    $("#book-form").slideDown(300);
    $("#add-book-btn").hide();
    $("html, body").animate(
      {
        scrollTop: $("#book-form").offset().top - 20,
      },
      300
    );
  }

  function hideBookForm() {
    $("#book-form").slideUp(300);
    $("#add-book-btn").show();
  }

  // Handle image upload preview
  function handleImageUpload() {
    const previewId = $(this).data("preview-id");
    const file = this.files[0];
    const $preview = $(`#preview-${previewId}`);

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        showToast("Please upload only JPEG, PNG or WebP images", "error");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        showToast("Image size should be less than 2MB", "error");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        $preview
          .attr("src", e.target.result)
          .addClass("uploaded-image")
          .parent()
          .addClass("has-image");
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle book status changes
  async function handleStatusChange() {
    const $select = $(this);
    const bookId = $select.data("book-id");
    const newStatus = $select.val();
    const previousValue = $select.data("previous-value");

    try {
      const response = await axios.post(`/admin/product/${bookId}`, {
        productStatus: newStatus,
      });

      if (response.data.success) {
        showToast("Book status updated successfully", "success");
        $select.data("previous-value", newStatus);
      } else {
        showToast("Failed to update book status", "error");
        $select.val(previousValue);
      }
    } catch (error) {
      console.error("Error updating book status:", error);
      showToast("Error updating book status", "error");
      $select.val(previousValue);
    }
  }

  // Validate form before submission
  function validateForm(e) {
    const requiredFields = ["#title", "#author", "#genre", "#price", "#stock"];
    let isValid = true;

    requiredFields.forEach((field) => {
      const $field = $(field);
      if (!$field.val()) {
        $field.addClass("error");
        isValid = false;
      } else {
        $field.removeClass("error");
      }
    });

    if ($(".has-image").length === 0) {
      showToast("Please upload at least one cover image", "error");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $(".error").first().offset().top - 20,
        },
        300
      );
    }
  }

  // Reset form fields
  function resetForm() {
    $(".preview-image").each(function () {
      $(this)
        .attr("src", "/img/upload.jpg")
        .removeClass("uploaded-image")
        .parent()
        .removeClass("has-image");
    });
    $(".image-upload").val("");
    updateFormFields($("#format").val()); // Reset format-based fields
  }

  // Show toast notifications
  function showToast(message, type) {
    const toast = $(`<div class="toast ${type}">${message}</div>`);
    $("body").append(toast);

    setTimeout(() => toast.addClass("show"), 100);
    setTimeout(() => {
      toast.removeClass("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Initialize everything when page loads
  initForm();

  // Set up event listeners
  $("#format").on("change", function () {
    updateFormFields($(this).val());
  });

  $("#add-book-btn").on("click", showBookForm);
  $("#close-form-btn").on("click", hideBookForm);
  $(".image-upload").on("change", handleImageUpload);
  $(".status-select").on("change", handleStatusChange);
  $("#book-form").on("submit", validateForm);
  $("#book-form").on("reset", resetForm);
});
