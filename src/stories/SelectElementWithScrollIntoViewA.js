import SelectElement from 'react-select-element'

export default class SelectWithScrollIntoViewA extends SelectElement {
  componentDidUpdate () {
    const activeOption = this.getActiveOption()

    if (activeOption) this.scrollOptionIntoView(activeOption)
  }
}
