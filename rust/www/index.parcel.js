import { app } from 'hyperapp'
import { div, button, label, input } from '@hyperapp/html'

// import { double } from './lib.rs'
import { double } from './wasm_demo_bg.wasm'

import capWasm from './cap.wasm'

import { newString, copyCStr } from './wasm-utils.js'

const wasmCap = capWasm.cap

const cap = s => {
  let outptr = wasmCap(newString(capWasm, s))
  return copyCStr(capWasm, outptr)
}

const state = {
  value: 5,
  input: 5,
  strValue: 'Hello World!',
  strInput: ''
}

const actions = {
  do: () => state => {
    const r = double(Number.parseInt(state.input))
    return { ...state, input: r, value: r }
  },
  input: ({ value }) => ({ input: value }),
  cap: () => state => {
    const r = cap(state.strInput)
    return { ...state, strInput: r, strValue: r }
  },
  strInput: ({ value }) => ({ strInput: value })
}

const view = (state, actions) =>
  div([
    div([
      label(state.value),
      input({
        type: 'text',
        value: state.input,
        placeholder: state.value,
        onkeyup: e => {
          if (e.keyCode === 13) actions.do()
        },
        oninput: e => {
          actions.input({ value: e.target.value })
        }
      }),
      button({ onclick: actions.do }, 'Click me')
    ]),
    div([
      label(state.strValue),
      input({
        type: 'text',
        value: state.strInput,
        placeholder: state.strValue,
        onkeyup: e => {
          if (e.keyCode === 13) actions.cap()
        },
        oninput: e => {
          actions.strInput({ value: e.target.value })
        }
      }),
      button({ onclick: actions.cap }, 'Click me')
    ])
  ])

app(state, actions, view, document.body)
