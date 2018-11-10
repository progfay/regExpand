const expand = require('./recursively')

console.time('time')

for (let i = 0; i < 10000; i++) {
  expand(
    '{num}(a|b|(c|d)|e|f(g|h)?)',
    { num: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] })
}

console.timeEnd('time')

const output = expand(
  '{num}(a|b|(c|d)|e|f(g|h)?)',
  { num: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] }).join(',')
const answer = '0a,0b,0c,0e,0fg,0fh,0f,0d,1a,1b,1c,1e,1fg,1fh,1f,1d,2a,2b,2c,2e,2fg,2fh,2f,2d,3a,3b,3c,3e,3fg,3fh,3f,3d,4a,4b,4c,4e,4fg,4fh,4f,4d,5a,5b,5c,5e,5fg,5fh,5f,5d,6a,6b,6c,6e,6fg,6fh,6f,6d,7a,7b,7c,7e,7fg,7fh,7f,7d,8a,8b,8c,8e,8fg,8fh,8f,8d,9a,9b,9c,9e,9fg,9fh,9f,9d'
console.log(`test: ${output === answer ? '\u001b[32m' + 'pass' : '\u001b[31m' + 'failure'}\u001b[0m`)
if (output !== answer) {
  console.log({ output, answer })
}
