const regExp = /^(.*?)\(([^\(\)]*)\)(\??)(.*)$/

const expand = (pattern, dict = null) => {
  if (dict) {
    pattern = pattern.replace(/\{.*?\}/g, key => {
      key = key.slice(1, -1)
      return dict[key] || key
    })
  }

  const match = regExp.exec(pattern)
  if (!match) return pattern.split(`|`)
  const [_, prefix, expression, option, suffix] = match
  return expand(expression + (option ? '|' : ''))
    .map(exp => expand(prefix + exp + suffix))
    .reduce((a, b) => [...a, ...b])
    .filter((x, i, self) => self.indexOf(x) === i)
}

console.log(expand('{num}(a|b|(c|d)|e|f(g|h)?)', { num: '(0|1|2|3|4|5|6|7|8|9)' }))
