import SelectElement from 'react-select-element'

class InfiniteSelectElement extends SelectElement {
  incrementActiveIndex () {
    const { activeIndex } = this.state
    const incremented = activeIndex + 1

    this.activeIndex(
      (incremented > this.upperBound) ? this.lowerBound : incremented
    )
  }

  decrementActiveIndex () {
    const { activeIndex } = this.state
    const decremented = activeIndex - 1

    this.activeIndex(
      (decremented < this.lowerBound) ? this.upperBound : decremented
    )
  }
}

export default InfiniteSelectElement
