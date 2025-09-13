/**
 *  @typedef {object} OptionType
 *  @property {string} text
 */

const ENTER = 'Enter'
const SPACE = String.fromCharCode(32)

/**
 *  @param {{ key?: string }} event
 *  @returns {boolean}
 */
export function isKeyEnter ({ key }) {
  return key === ENTER
}

/**
 *  @param {{ key?: string }} event
 *  @returns {boolean}
 */
export function isKeySpace ({ key }) {
  return key === SPACE
}

/**
 *  'accesskey' events are raised as clicks with all-zero co-ordinates. All-zero
 *  coordinates are (of course) possible, but unlikely. This is a woolly way of
 *  identifying 'accesskey' events
 */
export function isEventClickLike ({ pageX, pageY, screenX, screenY }) {
  return !(pageX || pageY || screenX || screenY)
}

/**
 *  @param {string | number | boolean | null} [t]
 *  @returns {string}
 */
export function toOptionText (t) {
  return (t !== undefined) ? String(t) : '\uFEFF'
}

/**
 *  @param {string} alpha
 *  @param {omega} omega
 *  @returns {number}
 */
export function forward (alpha, omega) {
  return (alpha < omega) ? -1 : (alpha > omega) ? 1 : 0
}

/**
 *  @param {string} alpha
 *  @param {omega} omega
 *  @returns {number}
 */
export function reverse (alpha, omega) {
  return (alpha < omega) ? 1 : (alpha > omega) ? -1 : 0
}

/**
 *  @param {OptionType} alpha
 *  @param {OptionType} omega
 *  @returns {number}
 */
export function forwardByOptionText ({ text: alpha }, { text: omega }) {
  return (
    forward(
      toOptionText(alpha)
        .toLowerCase(),
      toOptionText(omega)
        .toLowerCase()
    )
  )
}

/**
 *  @param {OptionType} alpha
 *  @param {OptionType} omega
 *  @returns {number}
 */
export function reverseByOptionText ({ text: alpha }, { text: omega }) {
  return (
    reverse(
      toOptionText(alpha)
        .toLowerCase(),
      toOptionText(omega)
        .toLowerCase()
    )
  )
}

/**
 *  @param {string} chars
 *  @returns {(option: OptionType) => boolean}
 */
export function hasExactMatchFor (chars) {
  return function isMatch ({ text }) {
    return (
      toOptionText(text)
        .toLowerCase() === chars // `chars` is lower case
    )
  }
}

/**
 *  @param {string} chars
 *  @returns {(option: OptionType) => boolean}
 */
export function hasStartMatchFor (chars) {
  return function isMatch ({ text }) {
    return (
      toOptionText(text)
        .toLowerCase()
        .startsWith(chars) // `chars` is lower case
    )
  }
}

/**
 *  @param {string} alpha
 *  @returns {(omega: string) => boolean}
 */
export function hasMatch (alpha) {
  return function isMatch (omega) {
    return alpha === omega
  }
}

/**
 *  @param {string} chars
 *  @returns {(option: OptionType) => boolean}
 */
export function hasGreaterThanFor (chars) {
  return function isGreaterThan ({ text }) {
    return ( // find in the duplicated, sorted array
      toOptionText(text)
        .toLowerCase() // the smallest match greater than the chars?
        .localeCompare(chars) > 0
    )
  }
}

/**
 *  @param {string} chars
 *  @returns {(option: OptionType) => boolean}
 */
export function hasSmallerThanFor (chars) {
  return function isSmallerThan ({ text }) {
    return ( // find in the duplicated, sorted array
      toOptionText(text)
        .toLowerCase() // the largest match smaller than the chars?
        .localeCompare(chars) < 0
    )
  }
}

/**
 *  Matches exactly
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {OptionType}
 */
export function getExactMatch (options, chars) {
  return (
    options
      .find(hasExactMatchFor(chars))
  )
}

/**
 *  Matches exactly
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {boolean}
 */
export function hasExactMatch (options, chars) {
  return (
    options
      .some(hasExactMatchFor(chars))
  )
}

/**
 *  Matches exactly
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {number}
 */
export function getExactMatchIndex (options, chars) {
  return (
    options
      .findIndex(hasMatch(getExactMatch(options, chars)))
  )
}

/**
 *  Match from the start of the string
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {OptionType}
 */
export function getStartMatch (options, chars) {
  return (
    options
      .find(hasStartMatchFor(chars))
  )
}

/**
 *  Match from the start of the string
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {boolean}
 */
export function hasStartMatch (options, chars) {
  return (
    options
      .some(hasStartMatchFor(chars))
  )
}

/**
 *  Match from the start of the string
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {number}
 */
export function getStartMatchIndex (options, chars) {
  return (
    options
      .findIndex(hasMatch(getStartMatch(options, chars)))
  )
}

/**
 *  Find the the smallest match greater than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {OptionType}
 */
export function getGreaterThanMatch (options, chars) {
  return (
    options
      .find(hasGreaterThanFor(chars))
  )
}

/**
 *  Find the the smallest match greater than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {boolean}
 */
export function hasGreaterThanMatch (options, chars) {
  return (
    options
      .some(hasGreaterThanFor(chars))
  )
}

/**
 *  Find the the smallest match greater than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {number}
 */
export function getGreaterThanMatchIndex (options, chars) {
  const forwardOptions = options.toSorted(forwardByOptionText)

  return (
    options
      .findIndex(hasMatch(getGreaterThanMatch(
        forwardOptions,
        chars
      )))
  )
}

/**
 *  Find the the largest match smaller than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {OptionType}
 */
export function getSmallerThanMatch (options, chars) {
  return (
    options
      .find(hasSmallerThanFor(chars))
  )
}

/**
 *  Find the the largest match smaller than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {boolean}
 */
export function hasSmallerThanMatch (options, chars) {
  return (
    options
      .some(hasSmallerThanFor(chars))
  )
}

/**
 *  Find the the largest match smaller than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {number}
 */
export function getSmallerThanMatchIndex (options, chars) {
  const reverseOptions = options.toSorted(reverseByOptionText)

  return (
    options
      .findIndex(hasMatch(getSmallerThanMatch(
        reverseOptions,
        chars
      )))
  )
}

/**
 *  @param {{ index?: number, defaultIndex?: number }} props
 *  @returns {number | NaN}
 */
export function getSelectIndex ({ index, defaultIndex }) {
  const i = Number(index)
  if (!isNaN(i)) return i
  else {
    const d = Number(defaultIndex)
    if (!isNaN(d)) return d
  }

  return NaN
}
