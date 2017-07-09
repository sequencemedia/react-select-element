# React.Select.Element

## React Select Element

`react-select-element` implements standard `HTML` `<select />` behaviour, but without using any `<form />` elements whatsoever. (It can, of course, be composed into components which implement those elements.) While it can be used as-is, it's expected that the component will be extended by your own components, and its behaviour modified to suit your needs.

[An example implementation is available on GitHub.](https://github.com/sequencemedia/React.Select.Element.IO) While the component modifies some `className` attributes on its elements, the `react-select-element` package does not contain any `CSS` stylesheets: it's expected that you will write your own, but the example implementation contains [a simple stylesheet](https://github.com/sequencemedia/React.Select.Element.IO/blob/master/public/assets/css/react-select-element.css) which should help you start.

### Using ES

```
import Select from 'react-select-element'
```

### Using JS

```
const Select = require('react-select-element')
```

### Implementing in React

Either:

```
  <Select
    index={this.state.index}
    onChange={(index) => { 
      this.setState({ index }) 
    }}
    tabIndex={0}
    accessKey='S'
    options={[
      { value: 'A', text: 'Letter A' },
      { value: 'B', text: 'Letter B' },
      { value: 'C', text: 'Letter C' },
      { value: 'D', text: 'Letter D' },
      { value: 'E', text: 'Letter E' }
    ]}
  />
```
Or:

```
  <Select
    defaultIndex={0}
    tabIndex={0}
    accessKey='S'
    options={[
      { value: 'A', text: 'Letter A' },
      { value: 'B', text: 'Letter B' },
      { value: 'C', text: 'Letter C' },
      { value: 'D', text: 'Letter D' },
      { value: 'E', text: 'Letter E' }
    ]}
  />
```
Otherwise:

```
  <Select
    disabled
  />
```

### Extending the component

#### 1. `<InfiniteSelect />`

In standard behaviour, when the options are visible the user can move up and down the list by pressing the "arrow up" and "arrow down" keys on their keyboard -- but the movement is constrained, and will stop at the first or the last item in the list.

You want to modify that behaviour. 

By pressing the "arrow up" key, the user should move through each item to the _first item_ in the list; then, by pressing again, they should move to the _last item_. 

Similarly, by pressing the "arrow down" key, the user should move through each item to the _last item_ in the list; then, pressing again, they should move to the _first item_.

To achieve this, you can `extend` the component and override two of its methods.

```
class InfiniteSelect extends Select {
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
```  
[An example implementation is available on GitHub.](https://github.com/sequencemedia/React.Select.Element.IO) Clone that repository, install and start the package, then look for the example titled `Infinite Select Component`.

#### 2. `<SelectSelect />`

In standard behaviour, controlling components are only notified of a change to the selected `index` on `click` or keyboard `enter` events. 

You want to modify that behaviour.

You want controlling components to be notified of a change whenever the the "arrow up" or "arrow down" keys are pressed. (In effect, each option is selected when the user moves through the list.)

To achieve this, you can extend the component and modify the same two methods as before.

```
class SelectSelect extends Select {
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
```
Invoking `super.incrementActiveIndex()` or `super.decrementActiveIndex()` in the overriding method ensures that existing behaviour remains unchanged, while the additional statements below those calls modify the behaviour of the component.

[An example implementation is available on GitHub.](https://github.com/sequencemedia/React.Select.Element.IO) Clone that repository, install and start the package, then look for the example titled `Select Select Component`.

#### 3. `<HiddenSelect />`

`react-select-element` does not use any `<form />` elements whatsoever.

You want to compose it into a `<form />`.

In this case, you've chosen to compose the `<Select />` into a controlling component, which renders the `value` of the selected option into an `<input type='hidden' />`.

```
class HiddenSelect extends Component {
  state = {}

  handleIndexChange = (index) => {
    const { options, onChange } = this.props
    const { value } = options[index]

    this.setState({ value })
    onChange(index)
  }

  render () {
    const { value } = this.state

    return (
      <div className='hidden-select'>
        <Select
          {...this.props}
          onChange={this.handleIndexChange}
        />
        <input name='hidden-select' type='hidden' value={value} />
      </div>
    )
  }
}

HiddenSelect.propTypes = {
  ...Select.propTypes,
  onChange: PropTypes.func
}

HiddenSelect.defaultProps = {
  ...Select.defaultProps,
  onChange: () => {}
}

```
[Again, an example implementation is available on GitHub.](https://github.com/sequencemedia/React.Select.Element.IO) Clone that repository, install and start the package, then look for the example titled `Hidden Select Component`.