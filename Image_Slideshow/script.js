const imageList = ["pic1", "pic2", "pic3", "pic4"];
let currentIndex = 0;
let timeLeft = 3;

function runSlider() {
  const wrapper = document.getElementById("slider_wrapper");
  const countdownEl = document.getElementById("countdown");

  setInterval(function () {
    timeLeft--;

    if (timeLeft <= 0) {
      // 1. Determine next image
      let nextIndex = (currentIndex + 1) % imageList.length;

      // 2. Create the "New" image element
      const oldImg = document.getElementById("current_img");
      const newImg = document.createElement("img");

      newImg.src = "images/" + imageList[nextIndex] + ".jpg";
      newImg.classList.add("slide-in-right");
      newImg.id = "current_img"; // Give the new one the main ID

      // 3. Add new image to the wrapper
      wrapper.appendChild(newImg);

      // 4. Slide the old image out
      oldImg.classList.add("slide-out-left");
      oldImg.id = ""; // Remove ID so it doesn't conflict

      // 5. Cleanup: Remove the old image after animation finishes
      setTimeout(() => {
        oldImg.remove();
      }, 800);

      currentIndex = nextIndex;
      timeLeft = 3;
    }

    countdownEl.innerText = timeLeft;
  }, 1000);
}

window.onload = runSlider;
