const title = document.querySelector(".title");
const foodImage = document.querySelector(".food-image");
const decibelMeter = document.querySelector(".decibelmeter");
const startButton = document.querySelector(".btn-start");
const sensitivitySlider = document.querySelector("#sensitivity");
const dropArea = document.querySelector("#dropArea");
const imageInput = document.querySelector("#imageInput");
const removeImageBtn = document.querySelector("#removeImageBtn");

const loadImage = () => {
  const imageSrc = localStorage.getItem("selectedImage");
  if (imageSrc) {
    foodImage.src = imageSrc;
    foodImage.style.display = "block";
    dropArea.style.display = "none";
    removeImageBtn.style.display = "block";
  } else {
    foodImage.style.display = "none";
    dropArea.style.display = "flex";
    removeImageBtn.style.display = "none";
  }
};

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSrc = e.target.result;
      localStorage.setItem("selectedImage", imageSrc);
      loadImage();
    };
    reader.readAsDataURL(file);
  }
});

removeImageBtn.addEventListener("click", () => {
  localStorage.removeItem("selectedImage");
  loadImage();
});

startButton.addEventListener("click", () => {
  const audioContext = new AudioContext();
  const streamPromise = navigator.mediaDevices.getUserMedia({ audio: true });

  streamPromise.then((stream) => {
    const microphone = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    microphone.connect(analyser);

    const decibelInterval = setInterval(() => {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);

      let decibels = 0;
      for (let i = 0; i < dataArray.length; i++) {
        decibels += dataArray[i];
      }

      const sensitivity = sensitivitySlider.value;
      decibels = (10 * decibels) / dataArray.length / sensitivity;
      decibelMeter.style.height = `${decibels}px`;

      // Replace to the screen height
      if (decibels >= 600) {
        title.style.color = "white";
        title.textContent = "YOU WIN!";
        foodImage.classList.add("animate");

        clearInterval(decibelInterval);
      }
    }, 100);
  });
});

// Load the image on page load
document.addEventListener("DOMContentLoaded", loadImage);
