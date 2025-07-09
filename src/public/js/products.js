$(document).ready(function () {
  // DOM Elements
  const $addBookBtn = $("#add-book-btn");
  const $bookForm = $("#book-form");
  const $closeFormBtn = $("#close-form-btn");
  const $imageUploads = $(".image-upload");
  const $statusSelects = $(".status-select");
  const $bookFormSubmit = $("#book-form");

  // Initialize form
  initForm();

  // Event Listeners
  $addBookBtn.on("click", showBookForm);
  $closeFormBtn.on("click", hideBookForm);
  $imageUploads.on("change", handleImageUpload);
  $statusSelects.on("change", handleStatusChange);
  $bookFormSubmit.on("submit", validateForm);
  $bookForm.on("reset", resetForm);

  // Functions
  function initForm() {
    // Store initial status values
    $statusSelects.each(function () {
      $(this).data("previous-value", $(this).val());
    });

    // Make entire upload box clickable
    $(".image-upload-box").on("click", function (e) {
      if (!$(e.target).is("input")) {
        $(this).find("input[type='file']").click();
      }
    });
  }

  function showBookForm() {
    $bookForm.slideDown(300);
    $addBookBtn.hide();
    $("html, body").animate(
      {
        scrollTop: $bookForm.offset().top - 20,
      },
      300
    );
  }

  function hideBookForm() {
    $bookForm.slideUp(300);
    $addBookBtn.show();
  }

  function handleImageUpload() {
    const previewId = $(this).data("preview-id");
    const file = this.files[0];
    const $preview = $(`#preview-${previewId}`);

    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        showToast("Please upload only JPEG, PNG or WebP images", "error");
        return;
      }

      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        showToast("Image size should be less than 2MB", "error");
        return;
      }

      // Preview image
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

  function validateForm(e) {
    const requiredFields = ["#title", "#author", "#genre", "#price", "#stock"];
    let isValid = true;

    // Validate required fields
    requiredFields.forEach((field) => {
      const $field = $(field);
      if (!$field.val()) {
        $field.addClass("error");
        isValid = false;
      } else {
        $field.removeClass("error");
      }
    });

    // Validate at least one image is uploaded
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

  function resetForm() {
    // Reset image previews
    $(".preview-image").each(function () {
      $(this)
        .attr("src", "/img/upload.jpg")
        .removeClass("uploaded-image")
        .parent()
        .removeClass("has-image");
    });

    // Clear file inputs
    $(".image-upload").val("");
  }

  function showToast(message, type) {
    const toast = $(`<div class="toast ${type}">${message}</div>`);
    $("body").append(toast);

    setTimeout(() => {
      toast.addClass("show");
    }, 100);

    setTimeout(() => {
      toast.removeClass("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
});
