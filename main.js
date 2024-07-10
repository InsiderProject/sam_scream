var title = document.querySelector(".title");
var foodImage = document.querySelector(".food-image");
var decibelMeter = document.querySelector(".decibelmeter");
var startButton = document.querySelector(".btn-start");

startButton.addEventListener("click", () => {
  var audioContext = new AudioContext();
  var streamPromise = navigator.mediaDevices.getUserMedia({ audio: true });

  streamPromise.then((stream) => {
    var microphone = audioContext.createMediaStreamSource(stream);
    var analyser = audioContext.createAnalyser();
    console.log(microphone.connect(analyser));

    var decibelInterval = setInterval(() => {
      var dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);

      var decibels = 0;
      for (let i = 0; i < dataArray.length; i++) {
        decibels += dataArray[i];
      }

      var level = 2;
      decibels = (10 * decibels) / dataArray.length / level;
      decibelMeter.style.height = decibels + "px";

      if (decibels >= 600) {
        title.style.color = "white";
        title.innerHTML = "YOU WIN!";
        foodImage.classList.add("animate");

        clearInterval(decibelInterval);
      }
    }, 100);
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const dropArea = document.getElementById('dropArea');
//   const imageInput = document.getElementById('imageInput');
//   const imagePreview = document.getElementById('imagePreview');
//   const removeImageBtn = document.getElementById('removeImageBtn');

//   // Load image from localStorage if available
//   const savedImage = localStorage.getItem('savedImage');
//   if (savedImage) {
//       imagePreview.src = savedImage;
//       imagePreview.style.display = 'block';
//       removeImageBtn.style.display = 'block';
//   }

//   function handleFile(file) {
//       const reader = new FileReader();
//       reader.onload = function(e) {
//           const imageDataUrl = e.target.result;
//           imagePreview.src = imageDataUrl;
//           imagePreview.style.display = 'block';
//           removeImageBtn.style.display = 'block';
          
//           // Save image to localStorage
//           localStorage.setItem('savedImage', imageDataUrl);
//       }
//       reader.readAsDataURL(file);
//   }

//   imageInput.addEventListener('change', function() {
//       const file = this.files[0];
//       if (file) {
//           handleFile(file);
//       }
//   });

//   dropArea.addEventListener('dragover', function(e) {
//       e.preventDefault();
//       dropArea.style.borderColor = '#000';
//   });

//   dropArea.addEventListener('dragleave', function() {
//       dropArea.style.borderColor = '#ccc';
//   });

//   dropArea.addEventListener('drop', function(e) {
//       e.preventDefault();
//       dropArea.style.borderColor = '#ccc';
//       const file = e.dataTransfer.files[0];
//       if (file) {
//           handleFile(file);
//       }
//   });

//   dropArea.addEventListener('click', function() {
//       imageInput.click();
//   });

//   removeImageBtn.addEventListener('click', function() {
//       imagePreview.src = '';
//       imagePreview.style.display = 'none';
//       removeImageBtn.style.display = 'none';
      
//       // Remove image from localStorage
//       localStorage.removeItem('savedImage');
//   });
// });
