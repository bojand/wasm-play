const fs = require('fs')
const util = require('util')
const path = require('path')
const readFile = util.promisify(fs.readFile)

const importObject = {
  env: {
    io_get_stdout: function () {
      return 1
    }
  }
}

async function main () {
  const buf = await readFile(path.resolve(__dirname, '../wasm_demo_bg.wasm'))
  const res = await WebAssembly.instantiate(new Uint8Array(buf.buffer), importObject)
  const { double } = res.instance.exports

  console.log(double(5))
}

main()
