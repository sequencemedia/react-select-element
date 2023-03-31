import {
  expect
} from 'chai'

import {
  forward,
  forwardByOptionText,
  reverse,
  reverseByOptionText,
  toOptionText,
  match,
  hasGreaterThanMatch,
  getGreaterThanMatch,
  getGreaterThanMatchIndex,
  greaterThanFor,
  hasSmallerThanMatch,
  getSmallerThanMatch,
  getSmallerThanMatchIndex,
  smallerThanFor,
  hasExactMatch,
  getExactMatch,
  getExactMatchIndex,
  exactMatchFor,
  hasStartMatch,
  getStartMatch,
  getStartMatchIndex,
  startMatchFor,
  getSelectIndex,
  isEventClickLike,
  isKeyEnter,
  isKeySpace
} from 'react-select-element'

describe('`react-select-element`', () => {
  describe('`forward`', () => it('is a function', () => expect(forward).to.be.a('function')))

  describe('`forwardByOptionText`', () => it('is a function', () => expect(forwardByOptionText).to.be.a('function')))

  describe('`reverse`', () => it('is a function', () => expect(reverse).to.be.a('function')))

  describe('`reverseByOptionText`', () => it('is a function', () => expect(reverseByOptionText).to.be.a('function')))

  describe('`toOptionText`', () => it('is a function', () => expect(toOptionText).to.be.a('function')))

  describe('`match`', () => it('is a function', () => expect(match).to.be.a('function')))

  describe('`hasGreaterThanMatch`', () => it('is a function', () => expect(hasGreaterThanMatch).to.be.a('function')))

  describe('`getGreaterThanMatch`', () => it('is a function', () => expect(getGreaterThanMatch).to.be.a('function')))

  describe('`getGreaterThanMatchIndex`', () => it('is a function', () => expect(getGreaterThanMatchIndex).to.be.a('function')))

  describe('`greaterThanFor`', () => it('is a function', () => expect(greaterThanFor).to.be.a('function')))

  describe('`hasSmallerThanMatch`', () => it('is a function', () => expect(hasSmallerThanMatch).to.be.a('function')))

  describe('`getSmallerThanMatch`', () => it('is a function', () => expect(getSmallerThanMatch).to.be.a('function')))

  describe('`getSmallerThanMatchIndex`', () => it('is a function', () => expect(getSmallerThanMatchIndex).to.be.a('function')))

  describe('`smallerThanFor`', () => it('is a function', () => expect(smallerThanFor).to.be.a('function')))

  describe('`hasExactMatch`', () => it('is a function', () => expect(hasExactMatch).to.be.a('function')))

  describe('`getExactMatch`', () => it('is a function', () => expect(getExactMatch).to.be.a('function')))

  describe('`getExactMatchIndex`', () => it('is a function', () => expect(getExactMatchIndex).to.be.a('function')))

  describe('`exactMatchFor`', () => it('is a function', () => expect(exactMatchFor).to.be.a('function')))

  describe('`hasStartMatch`', () => it('is a function', () => expect(hasStartMatch).to.be.a('function')))

  describe('`getStartMatch`', () => it('is a function', () => expect(getStartMatch).to.be.a('function')))

  describe('`getStartMatchIndex`', () => it('is a function', () => expect(getStartMatchIndex).to.be.a('function')))

  describe('`startMatchFor`', () => it('is a function', () => expect(startMatchFor).to.be.a('function')))

  describe('`getSelectIndex`', () => it('is a function', () => expect(getSelectIndex).to.be.a('function')))

  describe('`isEventClickLike`', () => it('is a function', () => expect(isEventClickLike).to.be.a('function')))

  describe('`isKeyEnter`', () => it('is a function', () => expect(isKeyEnter).to.be.a('function')))

  describe('`isKeySpace`', () => it('is a function', () => expect(isKeySpace).to.be.a('function')))

  describe('`forward()`', () => {
    describe('comparing option text', () => {
      describe('the first option text is smaller than the second', () => it('returns -1', () => expect(forward('aaa', 'zzz')).to.equal(-1)))

      describe('the first option text is greater than the second', () => it('returns 1', () => expect(forward('zzz', 'aaa')).to.equal(1)))

      describe('the option text is the same', () => it('returns 0', () => expect(forward('mnmnmn', 'mnmnmn')).to.equal(0)))
    })
  })

  describe('`forwardByOptionText()`', () => {
    describe('comparing options', () => {
      describe('the first option text is smaller than the second', () => it('returns -1', () => expect(forwardByOptionText({ text: 'aaa' }, { text: 'zzz' })).to.equal(-1)))

      describe('the first option text is greater than the second', () => it('returns 1', () => expect(forwardByOptionText({ text: 'zzz' }, { text: 'aaa' })).to.equal(1)))

      describe('the option text is the same', () => it('returns 0', () => expect(forwardByOptionText({ text: 'mnmnmn' }, { text: 'mnmnmn' })).to.equal(0)))
    })
  })

  describe('`reverse()`', () => {
    describe('comparing option text', () => {
      describe('the first option text is smaller than the second', () => it('returns 1', () => expect(reverse('aaa', 'zzz')).to.equal(1)))

      describe('the first option text is greater than the second', () => it('returns -1', () => expect(reverse('zzz', 'aaa')).to.equal(-1)))

      describe('the option text is the same', () => it('returns 0', () => expect(reverse('mnmnmn', 'mnmnmn')).to.equal(0)))
    })
  })

  describe('`reverseByOptionText()`', () => {
    describe('comparing options', () => {
      describe('the first option text is smaller than the second', () => it('returns 1', () => expect(reverseByOptionText({ text: 'aaa' }, { text: 'zzz' })).to.equal(1)))

      describe('the first option text is greater than the second', () => it('returns -1', () => expect(reverseByOptionText({ text: 'zzz' }, { text: 'aaa' })).to.equal(-1)))

      describe('the option text is the same', () => it('returns 0', () => expect(reverseByOptionText({ text: 'mnmnmn' }, { text: 'mnmnmn' })).to.equal(0)))
    })
  })

  describe('`toOptionText()`', () => {
    describe('argument is a string', () => it('returns a string', () => expect(toOptionText('a')).to.equal('a')))

    describe('argument is a number', () => it('returns a string', () => expect(toOptionText(0)).to.equal('0')))

    describe('argument is boolean', () => it('returns a string', () => expect(toOptionText(true)).to.equal('true')))

    describe('argument is undefined', () => it('returns a string', () => expect(toOptionText()).to.equal('\uFEFF')))

    describe('argument is null', () => it('returns a string', () => expect(toOptionText(null)).to.equal('null')))
  })

  describe('`match()`', () => {
    describe('argument is a string', () => {
      let func

      beforeEach(() => {
        func = match('a')
      })

      it('returns a function', () => expect(func).to.be.a('function'))

      describe('the function', () => {
        describe('argument is a matching string', () => it('returns true', () => expect(func('a')).to.be.true))

        describe('argument is a non-matching string', () => it('returns false', () => expect(func('b')).to.be.false))

        describe('argument is a number', () => it('returns false', () => expect(func(1)).to.be.false))

        describe('argument is a boolean', () => it('returns false', () => expect(func(true)).to.be.false))

        describe('argument is undefined', () => it('returns false', () => expect(func()).to.be.false))

        describe('argument is null', () => it('returns false', () => expect(func(null)).to.be.false))
      })
    })

    describe('argument is a number', () => {
      let func

      beforeEach(() => {
        func = match(1)
      })

      it('returns a function', () => expect(match(0)).to.be.a('function'))

      describe('the function', () => {
        describe('argument is a string', () => it('returns false', () => expect(func('a')).to.be.false))

        describe('argument is a matching number', () => it('returns true', () => expect(func(1)).to.be.true))

        describe('argument is a non-matching number', () => it('returns false', () => expect(func(2)).to.be.false))

        describe('argument is a boolean', () => it('returns false', () => expect(func(true)).to.be.false))

        describe('argument is undefined', () => it('returns false', () => expect(func()).to.be.false))

        describe('argument is null', () => it('returns false', () => expect(func(null)).to.be.false))
      })
    })

    describe('argument is boolean', () => {
      let func

      beforeEach(() => {
        func = match(true)
      })

      it('returns a function', () => expect(func).to.be.a('function'))

      describe('the function', () => {
        describe('argument is a string', () => it('returns false', () => expect(func('a')).to.be.false))

        describe('argument is a number', () => it('returns false', () => expect(func(1)).to.be.false))

        describe('argument is a matching boolean', () => it('returns true', () => expect(func(true)).to.be.true))

        describe('argument is a non-matching boolean', () => it('returns false', () => expect(func(false)).to.be.false))

        describe('argument is undefined', () => it('returns false', () => expect(func()).to.be.false))

        describe('argument is null', () => it('returns false', () => expect(func(null)).to.be.false))
      })
    })

    describe('argument is undefined', () => {
      let func

      beforeEach(() => {
        func = match()
      })

      it('returns a function', () => expect(func).to.be.a('function'))

      describe('the function', () => {
        describe('argument is a string', () => it('returns false', () => expect(func('a')).to.be.false))

        describe('argument is a number', () => it('returns false', () => expect(func(1)).to.be.false))

        describe('argument is a matching boolean', () => it('returns false', () => expect(func(true)).to.be.false))

        describe('argument is undefined', () => it('returns true', () => expect(func()).to.be.true))

        describe('argument is not undefined', () => it('returns false', () => expect(func({})).to.be.false))

        describe('argument is null', () => it('returns false', () => expect(func(null)).to.be.false))
      })
    })

    describe('argument is null', () => {
      let func

      beforeEach(() => {
        func = match(null)
      })

      it('returns a function', () => expect(func).to.be.a('function'))

      describe('the function', () => {
        describe('argument is a string', () => it('returns false', () => expect(func('a')).to.be.false))

        describe('argument is a number', () => it('returns false', () => expect(func(1)).to.be.false))

        describe('argument is a boolean', () => it('returns false', () => expect(func(true)).to.be.false))

        describe('argument is undefined', () => it('returns false', () => expect(func()).to.be.false))

        describe('argument is null', () => it('returns true', () => expect(func(null)).to.be.true))

        describe('argument is not null', () => it('returns false', () => expect(func({})).to.be.false))
      })
    })
  })

  describe('`hasGreaterThanMatch()`', () => {
    describe('options has a greater string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' }
      ]

      return it('returns true', () => expect(hasGreaterThanMatch(options, 'zxy')).to.be.true)
    })

    describe('options does not have a greater string', () => {
      const options = [
        { text: 'ccc' },
        { text: 'bbb' },
        { text: 'aaa' }
      ]

      return it('returns false', () => expect(hasGreaterThanMatch(options, 'zxy')).to.be.false)
    })
  })

  describe('`getGreaterThanMatch()`', () => {
    describe('options has a greater string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' }
      ]

      return it('returns an option', () => expect(getGreaterThanMatch(options, 'zxy')).to.eql({ text: 'zzz' }))
    })

    describe('options does not have a greater string', () => {
      const options = [
        { text: 'ccc' },
        { text: 'bbb' },
        { text: 'aaa' }
      ]

      return it('returns undefined', () => expect(getGreaterThanMatch(options, 'zxy')).to.be.undefined)
    })
  })

  describe('`getGreaterThanMatchIndex()`', () => {
    describe('options has a greater string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' }
      ]

      return it('returns 0', () => expect(getGreaterThanMatchIndex(options, 'zxy')).to.equal(0))
    })

    describe('options does not have a greater string', () => {
      const options = [
        { text: 'ccc' },
        { text: 'bbb' },
        { text: 'aaa' }
      ]

      return it('returns -1', () => expect(getGreaterThanMatchIndex(options, 'zxy')).to.equal(-1))
    })
  })

  describe('`greaterThanFor()`', () => {
    let func

    beforeEach(() => {
      func = greaterThanFor('zyx')
    })

    it('returns a function', () => expect(func).to.be.a('function'))

    describe('the function', () => {
      describe('options has a greater string', () => {
        const options = [
          { text: 'aaa' },
          { text: 'bbc' },
          { text: 'ccc' },
          { text: 'xxx' },
          { text: 'yyy' },
          { text: 'zzz' }
        ]

        return it('returns true', () => expect(options.some(func)).to.be.true)
      })

      describe('options does not have a greater string', () => {
        const options = [
          { text: 'aaa' },
          { text: 'bbc' },
          { text: 'ccc' },
          { text: 'www' },
          { text: 'xxx' },
          { text: 'yyy' }
        ]

        return it('returns false', () => expect(options.some(func)).to.be.false)
      })
    })
  })

  describe('`hasSmallerThanMatch()`', () => {
    describe('options has a smaller string', () => {
      const options = [
        { text: 'ccc' },
        { text: 'bbb' },
        { text: 'aaa' }
      ]

      return it('returns true', () => expect(hasSmallerThanMatch(options, 'abc')).to.be.true)
    })

    describe('options does not have a smaller string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' }
      ]

      return it('returns false', () => expect(hasSmallerThanMatch(options, 'abc')).to.be.false)
    })
  })

  describe('`getSmallerThanMatch()`', () => {
    describe('options has a smaller string', () => {
      const options = [
        { text: 'ccc' },
        { text: 'bbb' },
        { text: 'aaa' }
      ]

      return it('returns true', () => expect(getSmallerThanMatch(options, 'abc')).to.eql({ text: 'aaa' }))
    })

    describe('options does not have a smaller string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' }
      ]

      return it('returns false', () => expect(getSmallerThanMatch(options, 'abc')).to.be.undefined)
    })
  })

  describe('`getSmallerThanMatchIndex()`', () => {
    describe('options has a smaller string', () => {
      const options = [
        { text: 'ccc' },
        { text: 'bbb' },
        { text: 'aaa' }
      ]

      return it('returns 2', () => expect(getSmallerThanMatchIndex(options, 'abc')).to.equal(2))
    })

    describe('options does not have a smaller string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' }
      ]

      return it('returns -1', () => expect(getSmallerThanMatchIndex(options, 'abc')).to.equal(-1))
    })
  })

  describe('`smallerThanFor()`', () => {
    let func

    beforeEach(() => {
      func = smallerThanFor('abc')
    })

    it('returns a function', () => expect(func).to.be.a('function'))

    describe('the function', () => {
      describe('options has a smaller string', () => {
        const options = [
          { text: 'zzz' },
          { text: 'yyy' },
          { text: 'xxx' },
          { text: 'ccc' },
          { text: 'bbc' },
          { text: 'aaa' }
        ]

        return it('returns true', () => expect(options.some(func)).to.be.true)
      })

      describe('options does not have a smaller string', () => {
        const options = [
          { text: 'zzz' },
          { text: 'yyy' },
          { text: 'xxx' },
          { text: 'ddd' },
          { text: 'ccc' },
          { text: 'bbb' }
        ]

        return it('returns false', () => expect(options.some(func)).to.be.false)
      })
    })
  })

  describe('`hasExactMatch()`', () => {
    describe('options has a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'abc' }
      ]

      return it('returns true', () => expect(hasExactMatch(options, 'abc')).to.be.true)
    })

    describe('options does not have a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'def' }
      ]

      return it('returns false', () => expect(hasExactMatch(options, 'abc')).to.be.false)
    })
  })

  describe('`getExactMatch()`', () => {
    describe('options has a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'abc' }
      ]

      return it('returns true', () => expect(getExactMatch(options, 'abc')).to.eql({ text: 'abc' }))
    })

    describe('options does not have a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'def' }
      ]

      return it('returns false', () => expect(getExactMatch(options, 'abc')).to.be.undefined)
    })
  })

  describe('`getExactMatchIndex()`', () => {
    describe('options has a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'abc' }
      ]

      return it('returns 3', () => expect(getExactMatchIndex(options, 'abc')).to.equal(3))
    })

    describe('options does not have a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'def' }
      ]

      return it('returns -1', () => expect(getExactMatchIndex(options, 'abc')).to.equal(-1))
    })
  })

  describe('`exactMatchFor()`', () => {
    let func

    beforeEach(() => {
      func = exactMatchFor('abc')
    })

    it('returns a function', () => expect(func).to.be.a('function'))

    describe('the function', () => {
      describe('options has a matching string', () => {
        const options = [
          { text: 'zzz' },
          { text: 'yyy' },
          { text: 'xxx' },
          { text: 'abc' }
        ]

        return it('returns true', () => expect(options.some(func)).to.be.true)
      })

      describe('options does not have a matching string', () => {
        const options = [
          { text: 'zzz' },
          { text: 'yyy' },
          { text: 'xxx' },
          { text: 'def' }
        ]

        return it('returns false', () => expect(options.some(func)).to.be.false)
      })
    })
  })

  describe('`hasStartMatch()`', () => {
    describe('options has a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'abcdef' }
      ]

      return it('returns true', () => expect(hasStartMatch(options, 'abc')).to.be.true)
    })

    describe('options does not have a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'defabc' }
      ]

      return it('returns false', () => expect(hasStartMatch(options, 'abc')).to.be.false)
    })
  })

  describe('`getStartMatch()`', () => {
    describe('options has a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'abcdef' }
      ]

      return it('returns true', () => expect(getStartMatch(options, 'abc')).to.eql({ text: 'abcdef' }))
    })

    describe('options does not have a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'defabc' }
      ]

      return it('returns false', () => expect(getStartMatch(options, 'abc')).to.be.undefined)
    })
  })

  describe('`getStartMatchIndex()`', () => {
    describe('options has a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'abcdef' }
      ]

      return it('returns 3', () => expect(getStartMatchIndex(options, 'abc')).to.equal(3))
    })

    describe('options does not have a matching string', () => {
      const options = [
        { text: 'zzz' },
        { text: 'yyy' },
        { text: 'xxx' },
        { text: 'defabc' }
      ]

      return it('returns -1', () => expect(getStartMatchIndex(options, 'abc')).to.equal(-1))
    })
  })

  describe('`startMatchFor()`', () => {
    let func

    beforeEach(() => {
      func = startMatchFor('abc')
    })

    it('returns a function', () => expect(func).to.be.a('function'))

    describe('the function', () => {
      describe('options has a matching string', () => {
        const options = [
          { text: 'zzz' },
          { text: 'yyy' },
          { text: 'xxx' },
          { text: 'abcdef' }
        ]

        return it('returns true', () => expect(options.some(func)).to.be.true)
      })

      describe('options does not have a matching string', () => {
        const options = [
          { text: 'zzz' },
          { text: 'yyy' },
          { text: 'xxx' },
          { text: 'defabc' }
        ]

        return it('returns false', () => expect(options.some(func)).to.be.false)
      })
    })
  })

  describe('`getSelectIndex()`', () => {
    describe('`index` is defined and `defaultIndex` is defined', () => it('returns a number', () => expect(getSelectIndex({ index: 1, defaultIndex: 2 })).to.equal(1)))

    describe('`index` is not defined and `defaultIndex` is defined', () => it('returns a number', () => expect(getSelectIndex({ defaultIndex: 2 })).to.equal(2)))

    describe('`index` is not defined and `defaultIndex` is not defined', () => it('returns `NaN`', () => expect(getSelectIndex({})).to.be.NaN))
  })

  describe('`isEventClickLike()`', () => {
    /**
     *  Click events have co-ordinates. A click event with co-ordinates is probably a click event (it is not click-like)
     */
    describe('event has co-ordinates', () => it('returns false', () => expect(isEventClickLike({ pageX: 0, pageY: 0, screenX: 0, screenY: 1 })).to.be.false))

    /**
     *  Access-key click events do no have co-ordinates. A click event without co-ordinates is probably not a click event (it is click-like)
     */
    describe('event does not have co-ordinates', () => it('returns true', () => expect(isEventClickLike({ pageX: 0, pageY: 0, screenX: 0, screenY: 0 })).to.be.true))
  })

  describe('`isKeyEnter()`', () => {
    describe('event is an enter key event', () => it('returns true', () => expect(isKeyEnter({ key: 'Enter' })).to.be.true))

    describe('event is not an enter key event', () => it('returns false', () => expect(isKeyEnter({ key: String.fromCharCode(32) })).to.be.false))
  })

  describe('`isKeySpace()`', () => {
    describe('event is a space key event', () => it('returns true', () => expect(isKeySpace({ key: String.fromCharCode(32) })).to.be.true))

    describe('event is not a space key event', () => it('returns false', () => expect(isKeySpace({ key: 'Enter' })).to.be.false))
  })
})
