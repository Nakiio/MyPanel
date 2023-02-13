/** @type {HTMLDivElement} */
var root = document.querySelector(':root');
// ⚠️ Removed `hexString`, we don't need it.
/** Generates a random hex value between `00` and `ff` */
var randomHex = () =>
  Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");

/** Uses `randomHex` to generate a random color string */
var randomColor = () => `#${[...Array(3)].map(randomHex).join("")}`;

/** Returns a random value between 0 and 360 */
var randomAngle = () => `${Math.floor(Math.random() * 361)}deg`;

/** Generate random linear gradient values */
var randomGradient = () => [randomAngle(), randomColor(), randomColor()];

/** Update UI with new values */
function update() {
  const [angle, color1, color2] = randomGradient();
  var dom = document.getElementsByClassName('project1');
  root.style.setProperty("--color-1", randomColor());
  root.style.setProperty("--color-2", randomColor());
  root.style.setProperty("--angle", randomAngle());

  root.style.setProperty("--color-3", randomColor());
  root.style.setProperty("--color-4", randomColor());
  root.style.setProperty("--angle", randomAngle());

  root.style.setProperty("--color-5", randomColor());
  root.style.setProperty("--color-6", randomColor());
  root.style.setProperty("--angle", randomAngle());
};


update();