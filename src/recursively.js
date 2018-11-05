const expand = (pattern) => {
  const match = /^(?<prefix>.*?)\((?<expression>[^\(\)]*)\)(?<option>\??)(?<suffix>.*)$/.exec(pattern)
  if (!match) return pattern.split(`|`)
  const { prefix, expression, option, suffix } = match.groups
  return Array.from(new Set(expand(expression + (option ? '|' : ''))
    .map(e => expand(prefix + e + suffix))
    .reduce((a, b) => [...a, ...b])))
}

console.log(expand('(a|b|(c|d)|e|f(g|h)?)'))