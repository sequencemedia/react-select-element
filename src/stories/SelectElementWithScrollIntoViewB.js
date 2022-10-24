import SelectElement from 'react-select-element'

export default class SelectWithScrollIntoViewB extends SelectElement {
  handleKeyArrowUp (event) {
    super.handleKeyArrowUp()

    const sibling = this.getActiveOptionPreviousSibling()

    if (sibling) this.scrollOptionIntoView(sibling)
  }

  handleKeyArrowDown (event) {
    super.handleKeyArrowDown()

    const sibling = this.getActiveOptionNextSibling()

    if (sibling) this.scrollOptionIntoView(sibling)
  }
}
