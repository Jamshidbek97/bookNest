function validateSignupForm() {
  let isValid = true;

  $(
    ".member-nick, .member-phone, .member-email, .member-password, .confirm-password, .member-image"
  ).css("border", "");

  const memberNick = $(".member-nick").val().trim();
  const memberPhone = $(".member-phone").val().trim();
  const memberEmail = $(".member-email").val().trim();
  const memberPassword = $(".member-password").val();
  const confirmPassword = $(".confirm-password").val();
  const memberImage = $(".member-image").get(0)?.files[0]?.name || null;

  if (!memberNick) {
    $(".member-nick").css("border", "1px solid red");
    isValid = false;
  }

  if (!memberPhone) {
    $(".member-phone").css("border", "1px solid red");
    isValid = false;
  }

  if (!memberEmail || !validateEmail(memberEmail)) {
    console.log("Email issue:", memberEmail);
    $(".member-email").css("border", "1px solid red");
    alert("Please enter a valid email address.");
    isValid = false;
  }

  if (!memberPassword) {
    $(".member-password").css("border", "1px solid red");
    isValid = false;
  }

  if (!confirmPassword) {
    $(".confirm-password").css("border", "1px solid red");
    isValid = false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Passwords do not match.");
    $(".member-password, .confirm-password").css("border", "1px solid red");
    isValid = false;
  }

  if (!memberImage) {
    alert("Please upload a restaurant image.");
    $(".member-image").css("border", "1px solid red");
    isValid = false;
  }

  if (!isValid) {
    alert("Please fix the highlighted fields.");
  }

  return isValid;
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  return regex.test(email);
}

$(function () {
  $(".upload-hidden").on("change", function () {
    const uploadFile = this.files[0];

    if (!uploadFile) return;

    const validTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validTypes.includes(uploadFile.type)) {
      alert("Please upload only jpg, jpeg, or png format.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      $(".upload-img-frame").attr("src", e.target.result).addClass("success");
    };
    reader.readAsDataURL(uploadFile);

    $(this).siblings(".upload-name").val(uploadFile.name);
  });
});
