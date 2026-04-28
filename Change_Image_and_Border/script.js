// Map colors for the H1 text change
const colorMap = {
  red: "red",
  blue: "blue",
  green: "green",
  orange: "orange",
};

function change_image(images_id, images_name) {
  document.getElementById(images_id).src = "images/" + images_name + ".jpg";
}

function change_border(images_id, color) {
  const img = document.getElementById(images_id);
  // Apply solid border color directly to the image
  img.style.borderColor = color;
  img.style.borderWidth = "10px";

  // Also update the H1 color as per your original logic
  document.querySelector("h1").style.color = color;
}

function change_opacity(images_id, opacity_value) {
  const img = document.getElementById(images_id);
  // Apply opacity directly to the image element itself
  img.style.opacity = opacity_value;
}
