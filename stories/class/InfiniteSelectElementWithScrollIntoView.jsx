import InfiniteSelectElement from './InfiniteSelectElement'

class InfiniteSelectElementWithScrollIntoView extends InfiniteSelectElement {
  handleKeyArrowUp () {
    super.handleKeyArrowUp()

    const sibling = this.getActiveOptionPreviousSibling()

    if (sibling) this.scrollOptionIntoView(sibling)
    else {
      const sibling = this.getOptionsLastChild()

      if (sibling) this.scrollOptionIntoView(sibling)
    }
  }

  handleKeyArrowDown () {
    super.handleKeyArrowDown()

    const sibling = this.getActiveOptionNextSibling()

    if (sibling) this.scrollOptionIntoView(sibling)
    else {
      const sibling = this.getOptionsFirstChild()

      if (sibling) this.scrollOptionIntoView(sibling)
    }
  }
}

export default InfiniteSelectElementWithScrollIntoView
