function copyCStr (mod, ptr) {
  let origPtr = ptr
  const collectCString = function *() {
    let memory = new Uint8Array(mod.memory.buffer)
    while (memory[ptr] !== 0) {
      if (memory[ptr] === undefined) {
        throw new Error('Tried to read undef mem')
      }
      yield memory[ptr]
      ptr += 1
    }
  }

  const u8buffer = new Uint8Array(collectCString())
  const utf8Decoder = new TextDecoder('UTF-8')
  const utf8buffer = utf8Decoder.decode(u8buffer)
  mod.dealloc_str(origPtr)
  return utf8buffer
}

function getStr (mod, ptr, len) {
  const getData = function* (ptr, len) {
    let memory = new Uint8Array(mod.memory.buffer)
    for (let index = 0; index < len; index++) {
      if (memory[ptr] === undefined) {
        throw new Error(`Tried to read undef mem at ${ptr}`)
      }
      yield memory[ptr + index]
    }
  }

  const u8buffer = new Uint8Array(getData(ptr / 8, len / 8))
  const utf8Decoder = new TextDecoder('UTF-8')
  const utf8buffer = utf8Decoder.decode(u8buffer)
  return utf8buffer
}

function newString (mod, str) {
  const utf8Encoder = new TextEncoder('UTF-8')
  let stringBuffer = utf8Encoder.encode(str)
  let len = stringBuffer.length
  let ptr = mod.alloc(len + 1)

  let memory = new Uint8Array(mod.memory.buffer)
  for (i = 0; i < len; i++) {
    memory[ptr + i] = stringBuffer[i]
  }

  memory[ptr + len] = 0

  return ptr
}

module.exports = {
  newString,
  copyCStr,
  getStr
}
