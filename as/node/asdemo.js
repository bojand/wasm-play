const fs = require('fs')
const util = require('util')
const path = require('path')
const readFile = util.promisify(fs.readFile)

const loader = require('assemblyscript/lib/loader')

async function main () {
  const buf = await readFile(path.resolve(__dirname, '../build/greet.wasm'))

  const lib = loader.instantiateBuffer(buf)

  const { hello } = lib

  const input = lib.newString('Bob')
  const res = hello(input)
  const greeting = lib.getString(res)

  console.log(greeting)
}

main()
