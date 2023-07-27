import SelectElement from 'react-select-element'

export default class SelectSelectElement extends SelectElement {
  incrementActiveIndex () {
    super.incrementActiveIndex()

    const { activeIndex } = this.state

    this.selectIndex(
      Math.min(activeIndex + 1, this.upperBound)
    )
  }

  decrementActiveIndex () {
    super.decrementActiveIndex()

    const { activeIndex } = this.state

    this.selectIndex(
      Math.max(activeIndex - 1, this.lowerBound)
    )
  }
}
