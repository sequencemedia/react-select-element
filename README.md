# React.Select.Element

## React Select Element

A React Select Element component.

[An example implementation is available on GitHub.](https://github.com/sequencemedia/React.Select.Element.IO)

### Using ES

```
import SelectElement from 'react-select-element'
```

### Using JS

```
const SelectElement = require('react-select-element')
```

### Implementing in React

```
  <SelectElement
    selectedIndex={4}
    onChange={(selectedIndex) => { /* etc */ }}
    tabIndex={0}
    options={[
      { value: 'A', text: 'Letter A' },
      { value: 'B', text: 'Letter B' },
      { value: 'C', text: 'Letter C' },
      { value: 'D', text: 'Letter D' },
      { value: 'E', text: 'Letter E' }
    ]}
  />
```
