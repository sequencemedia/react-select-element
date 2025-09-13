const ENTER = 'Enter'
const SPACE = String.fromCharCode(32)

export function isKeyEnter ({ key }) {
  return key === ENTER
}

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

export function toOptionText (t) {
  return (t !== undefined) ? String(t) : '\uFEFF'
}

export function forward (alpha, omega) {
  return (alpha < omega) ? -1 : (alpha > omega) ? 1 : 0
}

export function reverse (alpha, omega) {
  return (alpha < omega) ? 1 : (alpha > omega) ? -1 : 0
}

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

export function hasExactMatchFor (chars) {
  return function isMatch ({ text }) {
    return (
      toOptionText(text)
        .toLowerCase() === chars // `chars` is lower case
    )
  }
}

export function hasStartMatchFor (chars) {
  return function isMatch ({ text }) {
    return (
      toOptionText(text)
        .toLowerCase()
        .startsWith(chars) // `chars` is lower case
    )
  }
}

export function hasMatch (alpha) {
  return function isMatch (omega) {
    return alpha === omega
  }
}

export function hasGreaterThanFor (chars) {
  return function isGreaterThan ({ text }) {
    return ( // find in the duplicated, sorted array
      toOptionText(text)
        .toLowerCase() // the smallest match greater than the chars?
        .localeCompare(chars) > 0
    )
  }
}

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
 */
export function getExactMatch (options, chars) {
  return (
    options
      .find(hasExactMatchFor(chars))
  )
}

/**
 *  Matches exactly
 */
export function hasExactMatch (options, chars) {
  return (
    options
      .some(hasExactMatchFor(chars))
  )
}

/**
 *  Matches exactly
 */
export function getExactMatchIndex (options, chars) {
  return (
    options
      .findIndex(hasMatch(getExactMatch(options, chars)))
  )
}

/**
 *  Match from the start of the string
 */
export function getStartMatch (options, chars) {
  return (
    options
      .find(hasStartMatchFor(chars))
  )
}

/**
 *  Match from the start of the string
 */
export function hasStartMatch (options, chars) {
  return (
    options
      .some(hasStartMatchFor(chars))
  )
}

/**
 *  Match from the start of the string
 */
export function getStartMatchIndex (options, chars) {
  return (
    options
      .findIndex(hasMatch(getStartMatch(options, chars)))
  )
}

/**
 *  Find the the smallest match greater than the chars!
 */
export function getGreaterThanMatch (options, chars) {
  return (
    options
      .find(hasGreaterThanFor(chars))
  )
}

/**
 *  Find the the smallest match greater than the chars!
 */
export function hasGreaterThanMatch (options, chars) {
  return (
    options
      .some(hasGreaterThanFor(chars))
  )
}

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
 */
export function getSmallerThanMatch (options, chars) {
  return (
    options
      .find(hasSmallerThanFor(chars))
  )
}

/**
 *  Find the the largest match smaller than the chars!
 */
export function hasSmallerThanMatch (options, chars) {
  return (
    options
      .some(hasSmallerThanFor(chars))
  )
}

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

export function getSelectIndex ({ index, defaultIndex }) {
  const i = Number(index)
  if (!isNaN(i)) return i
  else {
    const d = Number(defaultIndex)
    if (!isNaN(d)) return d
  }

  return NaN
}
