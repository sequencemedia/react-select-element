const ENTER = 'Enter'
const SPACE = String.fromCharCode(32)

export const isKeyEnter = ({ key }) => key === ENTER

export const isKeySpace = ({ key }) => key === SPACE

/*
 *  'accesskey' events are raised as clicks with all-zero co-ordinates. All-zero
 *  coordinates are (of course) possible, but unlikely. This is a woolly way of
 *  identifying 'accesskey' events
 */
export const isEventClickLike = ({ pageX, pageY, screenX, screenY }) => !(pageX || pageY || screenX || screenY)

export const toOptionText = (t) => (t !== undefined) ? String(t) : '\uFEFF'

export const forward = (alpha, omega) => (alpha < omega) ? -1 : (alpha > omega) ? 1 : 0

export const reverse = (alpha, omega) => (alpha < omega) ? 1 : (alpha > omega) ? -1 : 0

export const forwardByOptionText = ({ text: alpha }, { text: omega }) => (
  forward(
    toOptionText(alpha).toLowerCase(),
    toOptionText(omega).toLowerCase()
  )
)

export const reverseByOptionText = ({ text: alpha }, { text: omega }) => (
  reverse(
    toOptionText(alpha).toLowerCase(),
    toOptionText(omega).toLowerCase()
  )
)

export const exactMatchFor = (chars) => ({ text }) => (
  toOptionText(text)
    .toLowerCase() === chars // `chars` is lower case
)

export const startMatchFor = (chars) => {
  return ({ text }) => (
    toOptionText(text)
      .toLowerCase()
      .startsWith(chars) // `chars` is lower case
  )
}

export const match = (alpha) => (omega) => alpha === omega

export const greaterThanFor = (chars) => ({ text }) => ( // find in the duplicated, sorted array
  toOptionText(text) // the smallest match greater than the chars?
    .toLowerCase() > chars
)

export const smallerThanFor = (chars) => ({ text }) => ( // find in the duplicated, sorted array
  toOptionText(text) // the largest match hasSmallerThanMatch than the chars?
    .toLowerCase() < chars
)

/*
 * Matches exactly
 */
export const getExactMatch = (options, chars) => options.find(exactMatchFor(chars))

/*
 * Matches exactly
 */
export const hasExactMatch = (options, chars) => options.some(exactMatchFor(chars))

/*
 * Matches exactly
 */
export const getExactMatchIndex = (options, chars) => (
  options
    .findIndex(match(
      getExactMatch(options, chars)
    ))
)

/*
 * Match from the start of the string
 */
export const getStartMatch = (options, chars) => options.find(startMatchFor(chars))

/*
 * Match from the start of the string
 */
export const hasStartMatch = (options, chars) => options.some(startMatchFor(chars))

/*
 * Match from the start of the string
 */
export const getStartMatchIndex = (options, chars) => (
  options
    .findIndex(match(
      getStartMatch(options, chars)
    ))
)

/*
 *  Find the the smallest match greater than the chars!
 */
export const getGreaterThanMatch = (options, chars) => options.find(greaterThanFor(chars))

/*
 *  Find the the smallest match greater than the chars!
 */
export const hasGreaterThanMatch = (options, chars) => options.some(greaterThanFor(chars))

export const getGreaterThanMatchIndex = (options, chars) => (
  options
    .findIndex(match(
      getGreaterThanMatch(
        Array.from(options).sort(forwardByOptionText),
        chars
      )
    ))
)

/*
 *  Find the the largest match smaller than the chars!
 */
export const getSmallerThanMatch = (options, chars) => options.find(smallerThanFor(chars))

/*
 *  Find the the largest match smaller than the chars!
 */
export const hasSmallerThanMatch = (options, chars) => options.some(smallerThanFor(chars))

export const getSmallerThanMatchIndex = (options, chars) => (
  options
    .findIndex(match(
      getSmallerThanMatch(
        Array.from(options).sort(reverseByOptionText),
        chars
      )
    ))
)

export const getSelectIndex = ({ index, defaultIndex }) => !isNaN(index) ? Number(index) : Number(defaultIndex)
