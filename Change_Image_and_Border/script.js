const colorMap = {
  'red': [255, 0, 0],
  'blue': [0, 0, 255],
  'green': [0, 255, 0],
  'orange': [255, 165, 0]
};

let borderColor = '#ccc';
let borderOpacity = 1.0;

function change_image(images_id, images_name) {
  document.getElementById(images_id).src =
    "images/" + images_name + ".jpg";
}

function change_border(images_id, color) {
  borderColor = color;
  updateBorder(images_id);
  document.querySelector('h1').style.color = color;
}

function change_opacity(images_id, opacity) {
  borderOpacity = opacity;
  updateBorder(images_id);
}

function updateBorder(images_id) {
  const img = document.getElementById(images_id);
  let rgb;
  if (borderColor in colorMap) {
    rgb = colorMap[borderColor];
  } else if (borderColor === '#ccc') {
    rgb = [204, 204, 204];
  } else {
    rgb = [204, 204, 204];
  }
  img.style.border = `10px solid rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${borderOpacity})`;
}
