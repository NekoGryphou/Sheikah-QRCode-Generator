import Utils, {$} from "./utils.js";
import {COLORS} from "./config.js";

/**
 * @class QRCodeManager
 * @desc Handles QR code generation, styling, overlay rendering, and downloading.
 */
export class QRCodeManager {
  /**
   * @public
   * @desc Creates a new QRCodeManager instance with configuration options.
   *
   * @param {Object} config - Configuration for QR code generation.
   * @param {string} config.logoUrl - URL of the center logo image.
   * @param {string} config.overlayUrl - URL of the overlay image.
   * @param {number} config.svgSize - Size of the SVG container.
   * @param {{x: number, y: number}} config.overlayOffset - Overlay image position offset.
   *
   * @returns {QRCodeManager} Instance of QRCodeManager.
   */
  constructor(config) {
    this.config = config;
    this.qrCode = this._createQRCode(config);
  }

  /**
   * @public
   * @desc Generates a QR code from the given data and renders it with an overlay.
   *
   * @param {string} data - Data to encode in the QR code.
   *
   * @returns {Promise<void>} Resolves when the QR code is rendered and overlay is applied.
   */
  async generate(data) {
    this.qrCode.update({data});
    await Utils.delay(1500);
    await this._addOverlay();
  }

  /**
   * @private
   * @desc Adds an overlay image on top of the rendered QR code.
   *
   * @returns {Promise<void>} Resolves when the overlay is created and appended.
   */
  async _addOverlay() {
    const base64 = await Utils.fetchImageAsBase64(this.config.overlayUrl);
    const overlay = Utils.createOverlayImage(base64, this.config.svgSize, this.config.overlayOffset);
    this._svgRef.appendChild(overlay);
    Utils.renderSvg(this._svgRef);
    $("downloadBtn").disabled = false;
  }

  /**
   * @public
   * @desc Downloads the current QR code as an SVG file.
   *
   * @returns {void} Initiates download of the SVG file to the user's device.
   */
  download() {
    if (!this._svgRef) return;

    const svgContent = new XMLSerializer().serializeToString(this._svgRef);
    const blob = new Blob([svgContent], {type: "image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(blob);

    this._triggerDownload(url, "qr-code.svg");
    URL.revokeObjectURL(url);
  }

  /**
   * @private
   * @desc Triggers a file download using a temporary anchor tag.
   *
   * @param {string} url - The Blob URL of the file.
   * @param {string} filename - The desired name of the downloaded file.
   *
   * @returns {void} Initiates download and removes the anchor element.
   */
  _triggerDownload(url, filename) {
    const link = Object.assign(document.createElement("a"), {href: url, download: filename});
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * @private
   * @desc Creates and configures a new QRCodeStyling instance.
   *
   * @param {Object} config - Configuration object for QR code styling.
   *
   * @returns {QRCodeStyling} A QRCodeStyling instance with the applied settings.
   */
  _createQRCode(config) {
    return new QRCodeStyling({
      type: "canvas",
      shape: "circle",
      width: config.svgSize,
      height: config.svgSize,
      margin: 77,
      qrOptions: {
        typeNumber: "0",
        mode: "Byte",
        errorCorrectionLevel: "Q"
      },
      imageOptions: {
        saveAsBlob: true,
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 3
      },
      dotsOptions: {
        type: "classy",
        color: COLORS.dotsColor,
        roundSize: true,
        gradient: {
          type: "radial",
          rotation: 0,
          colorStops: COLORS.dotsGradient
        }
      },
      backgroundOptions: {
        round: 0,
        color: COLORS.background
      },
      image: config.logoUrl,
      cornersSquareOptions: {
        color: COLORS.cornerSquare
      },
      cornersDotOptions: {
        color: COLORS.cornerDot,
        gradient: {
          type: "linear",
          rotation: 0,
          colorStops: COLORS.cornerDotGradient
        }
      }
    });
  }

  /**
   * @private
   * @desc Returns a reference to the internal SVG element used by the QR code.
   *
   * @returns {SVGElement|null} The QR code's internal SVG element, or null if unavailable.
   */
  get _svgRef() {
    return this.qrCode?._svg;
  }
}
