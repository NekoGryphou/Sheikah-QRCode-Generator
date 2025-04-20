// ui.js
import {QRCodeManager} from "./qr-manager.js";
import {$} from "./utils.js";

/**
 * @class UIManager
 * @desc Handles DOM setup, input events, and integrates with QRCodeManager.
 */
export class UIManager {
  /**
   * @public
   * @constructor
   * @param {Object} config - The application configuration object.
   */
  constructor(config) {
    this.config = config;
    this.input = $("qrDataInput");
    this.canvas = $("canvas");
    this.generateBtn = $("generateBtn");
    this.downloadBtn = $("downloadBtn");
    this.qrManager = new QRCodeManager(config);
  }

  /**
   * @public
   * @desc Initializes the UI setup and binds DOM event listeners.
   */
  init() {
    this._setupCanvas();
    this._setDefaultInput();
    this._setupListeners();
  }

  /**
   * @private
   * @desc Applies configured dimensions to the canvas element.
   */
  _setupCanvas() {
    this.canvas.style.width = this.canvas.style.height = `${this.config.svgSize}px`;
  }

  /**
   * @private
   * @desc Sets the input field to a default value if specified in the config.
   */
  _setDefaultInput() {
    if (this.config.defaultData) {
      this.input.value = this.config.defaultData;
    }
    this._toggleGenerateButton();
  }

  /**
   * @private
   * @desc Binds input, generate, and download event listeners.
   */
  _setupListeners() {
    this.input.addEventListener("input", () => this._toggleGenerateButton());

    this.generateBtn.addEventListener("click", async () => {
      const data = this.input.value.trim();
      if (!data) return;
      await this.qrManager.generate(data);
    });

    this.downloadBtn.addEventListener("click", () => this.qrManager.download());
  }

  /**
   * @private
   * @desc Enables or disables the generate button based on input content.
   */
  _toggleGenerateButton() {
    this.generateBtn.disabled = this.input.value.trim() === "";
  }
}
