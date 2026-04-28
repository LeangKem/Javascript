$(document).ready(function () {
  // --- Validation Helper Functions ---
  const checkEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  // Additional functions available for your other project pages:
  const checkNumber = (val) => val !== "" && !isNaN(val);
  const checkPositiveDecimal = (val) =>
    checkNumber(val) && val.includes(".") && parseFloat(val) > 0;
  const checkBoolean = (val) =>
    val.toLowerCase() === "true" || val.toLowerCase() === "false";

  // --- Submit Event Handling ---
  $("#registrationForm").on("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Reset previous errors
    $("input").removeClass("input-error");
    $(".error-text").hide();

    // Validate Username
    if ($("#username").val().trim() === "") {
      showError("#username");
      isValid = false;
    }

    // Validate Email
    if (!checkEmail($("#email").val())) {
      showError("#email");
      isValid = false;
    }

    // Validate Password length
    if ($("#password").val().length < 6) {
      showError("#password");
      isValid = false;
    }

    // Validate Password Match (Password Again logic)
    if (
      $("#confirmPassword").val() !== $("#password").val() ||
      $("#confirmPassword").val() === ""
    ) {
      showError("#confirmPassword");
      isValid = false;
    }

    if (isValid) {
      alert("Form validated successfully!");
    }
  });

  // Function to apply red styles
  function showError(selector) {
    $(selector).addClass("input-error");
    $(selector).next(".error-text").show();
  }

  // Real-time: Clear error as soon as user types
  $("input").on("input", function () {
    $(this).removeClass("input-error");
    $(this).next(".error-text").hide();
  });
});
