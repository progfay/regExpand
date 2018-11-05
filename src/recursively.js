const expand = (pattern, dict = null) => {
  if (dict) pattern = pattern.replace(/(?<=\{).*?(?=\})/g, s => (dict[s] || s))
  const match = /^(?<prefix>.*?)\((?<expression>[^\(\)]*)\)(?<option>\??)(?<suffix>.*)$/.exec(pattern)
  if (!match) return pattern.split(`|`)
  const { prefix, expression, option, suffix } = match.groups
  return Array.from(new Set(expand(expression + (option ? '|' : ''))
    .map(e => expand(prefix + e + suffix))
    .reduce((a, b) => [...a, ...b])))
}

console.log(expand('{num}(a|b|(c|d)|e|f(g|h)?){num}', { num: '(0|1|2|3|4|5|6|7|8|9)' }))