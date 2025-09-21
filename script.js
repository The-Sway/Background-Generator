// Element references
var body = document.getElementById("gradient");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var color1Hex = document.querySelector(".color1-hex");
var color2Hex = document.querySelector(".color2-hex");
var angle = document.querySelector(".angle");
var angleValue = document.querySelector(".angle-value");
var swapBtn = document.querySelector(".swap");
var randomBtn = document.querySelector(".random");
var copyBtn = document.querySelector(".copy");
var cssOutput = document.querySelector(".css-output");
var copiedMsg = document.querySelector(".copied-msg");

function buildGradientString() {
  return "linear-gradient(" + angle.value + "deg, " + color1.value + ", " + color2.value + ")";
}

function setGradient() {
  var g = buildGradientString();
  body.style.background = g;
  cssOutput.textContent = "background: " + g + ";";
  // keep hex text inputs in sync
  if (color1Hex) color1Hex.value = color1.value.toUpperCase();
  if (color2Hex) color2Hex.value = color2.value.toUpperCase();
  if (angleValue) angleValue.textContent = angle.value + "°";
}

function swapColors() {
  var a = color1.value;
  color1.value = color2.value;
  color2.value = a;
  setGradient();
}

function randomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function randomize() {
  color1.value = randomColor();
  color2.value = randomColor();
  setGradient();
}

function copyCSS() {
  var text = cssOutput.textContent;
  navigator.clipboard &&
    navigator.clipboard.writeText(text).then(
      function () {
        copiedMsg.classList.add("copied");
        setTimeout(function () {
          copiedMsg.classList.remove("copied");
        }, 1200);
      },
      function () {
        // fallback
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          copiedMsg.classList.add("copied");
          setTimeout(function () {
            copiedMsg.classList.remove("copied");
          }, 1200);
        } catch (e) {}
        ta.remove();
      }
    );
}

// wire events
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
angle.addEventListener("input", setGradient);
swapBtn.addEventListener("click", swapColors);
randomBtn.addEventListener("click", randomize);
copyBtn.addEventListener("click", copyCSS);

// initialize UI on load
setGradient();
