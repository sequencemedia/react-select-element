import React, {
  createRef,
  useState
} from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import {
  getSelectIndex
} from '#common'

import Disabled from './Disabled'
import ReadOnly from './ReadOnly'
import Select from './Select'

export default function SelectElement (props) {
  const [id] = useState(() => {
    const {
      id
    } = props

    return id || nanoid()
  })
  const [selectIndex, setSelectIndex] = useState(() => getSelectIndex(props))
  const [activeIndex, setActiveIndex] = useState(0)

  const selectOptionRef = createRef()
  const optionsRef = createRef()
  const activeOptionRef = createRef()

  const { disabled = false } = props

  if (disabled) {
    return (
      <Disabled
        id={id}
        selectIndex={selectIndex}
        activeIndex={activeIndex}
        selectOptionRef={selectOptionRef}
        optionsRef={optionsRef}
        activeOptionRef={activeOptionRef}
        {...props}
      />
    )
  }

  const { readOnly = false } = props

  if (readOnly) {
    return (
      <ReadOnly
        id={id}
        selectIndex={selectIndex}
        activeIndex={activeIndex}
        selectOptionRef={selectOptionRef}
        optionsRef={optionsRef}
        activeOptionRef={activeOptionRef}
        {...props}
      />
    )
  }

  function handleSelectIndexChange (index) {
    /*
     * Is the index different to the index stored in state?
     */
    if (index !== selectIndex) {
      const { onChange } = props

      /*
       *  Always invoke 'onChange' if it is available
       */
      if (onChange instanceof Function) onChange(index)

      /*
       *  Update the state
       */
      setSelectIndex(index)
    }
  }

  function handleActiveIndexChange (index) {
    if (index !== activeIndex) setActiveIndex(index)
  }

  return (
    <Select
      id={id}
      selectIndex={selectIndex}
      handleSelectIndexChange={handleSelectIndexChange}
      activeIndex={activeIndex}
      handleActiveIndexChange={handleActiveIndexChange}
      selectOptionRef={selectOptionRef}
      optionsRef={optionsRef}
      activeOptionRef={activeOptionRef}
      {...props}
    />
  )
}

SelectElement.propTypes = {
  id: PropTypes.string,
  defaultIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  tabIndex: PropTypes.number,
  accessKey: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool
      ])
    })
  ),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  children: PropTypes.node
}
