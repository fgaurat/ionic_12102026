import "./style.css";
import heroImg from "./assets/hero.png";
import javascriptLogo from "./assets/javascript.svg";
import viteLogo from "./assets/vite.svg";
import { setupCounter } from "./counter.js";
import { setupDevice } from "./test-device.js";

document.querySelector("#app").innerHTML = `

  <button id="counter" type="button" class="counter"></button>
  <hr/>
  <button id="showDeviceInfo" type="button" class="counter">show device info</button>
`;

setupCounter(document.querySelector("#counter"));
setupDevice(document.querySelector("#showDeviceInfo"));
