/**
 * @public
 * @desc Returns a DOM element by its ID.
 *
 * @param {string} id - The ID of the element.
 *
 * @returns {HTMLElement|null} The DOM element or null if not found.
 */
export function $(id) {
  return document.getElementById(id);
}

export default class Utils {
  /**
   * @public
   * @desc Fetches an image from a URL and returns it as a Base64-encoded string.
   *
   * @param {string} url - The image URL to fetch.
   *
   * @returns {Promise<string>} A promise that resolves to a Base64-encoded image string.
   */
  static fetchImageAsBase64(url) {
    return fetch(url)
        .then(res => res.blob())
        .then(blob => new Promise(resolve => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        }));
  }

  /**
   * @public
   * @desc Creates an SVG image element for use as an overlay.
   *
   * @param {string} base64 - The Base64 image string.
   * @param {number} size - Width and height of the image.
   * @param {{x: number, y: number}} offset - X and Y offset for positioning.
   *
   * @returns {SVGImageElement} The created SVG image element.
   */
  static createOverlayImage(base64, size, {x, y}) {
    const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    Object.entries({
      href: base64,
      width: size,
      height: size,
      x,
      y
    }).forEach(([key, val]) => img.setAttribute(key, val));
    return img;
  }

  /**
   * @public
   * @desc Renders the provided SVG element inside the #canvas container.
   *
   * @param {SVGElement} svg - The SVG element to render.
   *
   * @returns {void} Updates the DOM with the rendered SVG.
   */
  static renderSvg(svg) {
    const container = $("canvas");
    container.innerHTML = "";
    container.appendChild(svg);
  }

  /**
   * @public
   * @desc Delays execution for a given number of milliseconds.
   *
   * @param {number} ms - The number of milliseconds to wait.
   *
   * @returns {Promise<void>} A promise that resolves after the delay.
   */
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
