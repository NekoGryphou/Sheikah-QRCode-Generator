/**
 * @public
 * @desc Core configuration for QR code generation and layout.
 *
 * @returns {Object} Base settings for logo, overlay, and sizing.
 */
export const CONFIG = {
  logoUrl: "../assets/logo.png",
  overlayUrl: "../assets/overlay.png",
  svgSize: 400,
  overlayOffset: {x: 3, y: 1}
};

/**
 * @public
 * @desc Centralized color palette used for styling QR code elements.
 *
 * @returns {Object} A collection of color and gradient definitions.
 */
export const COLORS = {
  dotsColor: "#15a6d3",
  dotsGradient: [
    {offset: 0, color: "#20e3ff"},
    {offset: 1, color: "#15a6d3"}
  ],
  cornerSquare: "#ff942b",
  cornerDot: "#000000",
  cornerDotGradient: [
    {offset: 0, color: "#15a6d3"},
    {offset: 1, color: "#20e3ff"}
  ],
  background: "rgba(0,0,0,0)"
};