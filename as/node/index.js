const fs = require('fs')
const util = require('util')
const path = require('path')
const readFile = util.promisify(fs.readFile)

async function main () {
  const buf = await readFile(path.resolve(__dirname, '../build/optimized.wasm'))

  const res = await WebAssembly.instantiate(new Uint8Array(buf.buffer))

  const { double } = res.instance.exports

  console.log(double(5))
}

main()
