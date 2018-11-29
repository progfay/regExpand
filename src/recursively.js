const findBrace = /^(.*?)(\{[^\{\}]*\})(.*)$/
const findBracket = /^(.*?)\(([^\(\)]*)\)(\??)(.*)$/

const translate = (pattern, dict) => {
  const match = findBrace.exec(pattern)
  if (!match) return [pattern]
  const [, prefix, word, suffix] = match
  return dict[word.slice(1, -1)]
    .map(vocabulary => translate(prefix + vocabulary + suffix, dict))
    .reduce((a, b) => [...a, ...b])
    .filter((x, i, self) => self.indexOf(x) === i)
}

const _expand = (pattern) => {
  const match = findBracket.exec(pattern)
  if (!match) return pattern.split(`|`)
  const [, prefix, expression, option, suffix] = match
  return _expand(expression + (option ? '|' : ''))
    .map(exp => _expand(prefix + exp + suffix))
    .reduce((a, b) => [...a, ...b])
    .filter((x, i, self) => self.indexOf(x) === i)
}

const expand = (pattern, dict = null) => {
  if (!dict) return _expand(pattern)
  return translate(pattern, dict)
    .map(_expand)
    .reduce((a, b) => [...a, ...b])
    .filter((x, i, self) => self.indexOf(x) === i)
}

module.exports = expand
