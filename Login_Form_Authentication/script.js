$(document).ready(function () {
  // --- LOGIN LOGIC (for Login.html) ---
  $("#btnLogin").on("click", function () {
    const user = $("#username").val().trim();
    const pass = $("#password").val().trim();

    if (user === "admin" && pass === "1234") {
      document.cookie = "user=" + user + "; path=/";
      window.location.href = "protected.html";
    } else {
      alert("Wrong credentials!");
    }
  });

  // --- PROTECTED PAGE LOGIC (for protected.html) ---

  // 1. Logout: Clears the cookie and goes back to login
  $("#btnLogout").on("click", function () {
    // Set cookie to expire in the past to delete it
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("Logging out...");
    window.location.href = "Login.html";
  });

  // 2. CheckCookies: Shows what is saved in the browser
  $("#btnCheckCookies").on("click", function () {
    if (
      document.cookie.split(";").some((item) => item.trim().startsWith("user="))
    ) {
      alert("Cookie Found: " + document.cookie);
    } else {
      alert("No active cookie found. Please login again.");
    }
  });
});
