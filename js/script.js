import {CONFIG} from "./config.js";
import {UIManager} from "./ui.js";

window.addEventListener(
    "DOMContentLoaded",
    () => new UIManager(CONFIG)
        .init()
);