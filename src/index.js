const getPairClosingBracketIndex = (pattern) => {
  const len = pattern.length
  let count = 1
  let opening = pattern.indexOf('(', 1)
  let closing = pattern.indexOf(')', 1)
  while (true) {
    if (opening === -1) opening = len
    if (opening < closing) {
      count++
      opening = pattern.indexOf('(', opening + 1)
    } else {
      count--
      if (count === 0) return closing
      closing = pattern.indexOf(')', closing + 1)
    }
    console.log({opening, closing, count})
    if (closing === -1) return -1
  }
}

const scan = (pattern) => {
  const openingBracketIndex = pattern.indexOf('(')
  switch (openingBracketIndex) {
    case -1:
      return [pattern]

    case 0:
      const pairClosingBracketIndex = getPairClosingBracketIndex(pattern)
      return [pattern.substring(0, pairClosingBracketIndex + 1)]
        .concat(scan(pattern.substring(pairClosingBracketIndex + 1)))

    default:
      console.log(pattern.substring(openingBracketIndex))
      return [pattern.substring(0, openingBracketIndex)].concat(scan(pattern.substring(openingBracketIndex)))
  }
}

console.log(scan('((())((()))((())()))adfadsfadsf((()())())()'))
