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
    if (closing === -1) return -1
  }
}

const scan = (pattern) => {
  const openingBracketIndex = pattern.indexOf('(')
  switch (openingBracketIndex) {
    case -1:
      return pattern

    case 0:
      const pairClosingBracketIndex = getPairClosingBracketIndex(pattern)
      return [scan(pattern.substring(0, pairClosingBracketIndex + 1).slice(1, -1))]
        .concat(scan(pattern.substring(pairClosingBracketIndex + 1)) || [])

    default:
      return [pattern.substring(0, openingBracketIndex)]
        .concat(scan(pattern.substring(openingBracketIndex)) || [])
  }
}

const parse = (element) => {
  if (typeof element === 'string') {
    return element.split('|').filter(s => s)
  } else {
    return element.map(parse)
  }
}

const expand = (pattern) => {
  return scan(pattern)
    .map(parse)
}

console.log(expand('(a|b|c|d|e|(f|g))-(1|2|3|4|5)'))
