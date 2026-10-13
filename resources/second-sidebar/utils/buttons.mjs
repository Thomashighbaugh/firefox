/**
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
export function isLeftMouseButton(event) {
  return event.button === 0;
}

/**
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
export function isMiddleMouseButton(event) {
  return event.button === 1;
}

/**
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
export function isRightMouseButton(event) {
  return event.button === 2;
}

/**
 * Bind a callback to a left-click on `target`, ignoring other buttons.
 * Replaces the repeated `addEventListener("click", (e) => { if (isLeftMouseButton(e)) … })`
 * pattern.
 * @param {{addEventListener: Function}} target
 * @param {(event: MouseEvent) => void} callback
 * @param {object} [opts]
 * @param {boolean} [opts.preventDefault]
 * @param {boolean} [opts.stopPropagation]
 */
export function onLeftClick(
  target,
  callback,
  { preventDefault = false, stopPropagation = false } = {},
) {
  target.addEventListener("click", (event) => {
    if (preventDefault) {
      event.preventDefault();
    }
    if (stopPropagation) {
      event.stopPropagation();
    }
    if (isLeftMouseButton(event)) {
      callback(event);
    }
  });
}
