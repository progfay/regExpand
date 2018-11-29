const findBrace = /^(.*?)(\{[^\{\}]*\})(.*)$/
const findBracket = /^(.*?)\(([^\(\)]*)\)(\??)(.*)$/

const translate = (text, dict) => {
  const match = findBrace.exec(text)
  if (!match) return [text]
  const [, prefix, word, suffix] = match
  return dict[word.slice(1, -1)]
    .map(vocabulary => translate(prefix + vocabulary + suffix, dict))
    .reduce((a, b) => [...a, ...b])
    .filter((x, i, self) => self.indexOf(x) === i)
}

const _expand = (text) => {
  const match = findBracket.exec(text)
  if (!match) return text.split(`|`)
  const [, prefix, expression, option, suffix] = match
  return _expand(expression + (option ? '|' : ''))
    .map(exp => _expand(prefix + exp + suffix))
    .reduce((a, b) => [...a, ...b])
    .filter((x, i, self) => self.indexOf(x) === i)
}

const expand = (text, dict = null) => {
  if (!dict) return _expand(text)
  return translate(text, dict)
    .map(_expand)
    .reduce((a, b) => [...a, ...b])
    .filter((x, i, self) => self.indexOf(x) === i)
}

module.exports = expand
