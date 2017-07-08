# React.Select.Element

## React Select Element

A React Select Element component.

[An example implementation is available on GitHub.](https://github.com/sequencemedia/React.Select.Element.IO)

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

