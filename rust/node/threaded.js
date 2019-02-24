// node --experimental-worker threaded.js

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')

const fs = require('fs')
const util = require('util')
const path = require('path')
const readFile = util.promisify(fs.readFile)

async function compute (wasm, value) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: {
        input: value,
        wasm: wasm
      }
    })
    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', code => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
    })
  })
}

async function worker () {
  const { wasm, input } = workerData

  const res = await WebAssembly.instantiate(wasm)

  const { double } = res.instance.exports

  parentPort.postMessage(double(input))
}

async function main () {
  const buf = await readFile(path.resolve(__dirname, '../wasm-demo/pkg/wasm_demo_bg.wasm'))
  const wasm = new Uint8Array(buf.buffer)

  const res = await compute(wasm, 5)
  console.log(res)
}

if (isMainThread) {
  main()
} else {
  worker()
}
