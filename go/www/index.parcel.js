import { app } from 'hyperapp'
import { div, button, label, input } from '@hyperapp/html'

import { double } from './wasm_demo_bg.wasm'

const state = {
  value: 5,
  input: 5
}

const actions = {
  do: () => state => {
    const r = double(Number.parseInt(state.input))
    return { input: r, value: r }
  },
  input: ({ value }) => ({ input: value })
}

const view = (state, actions) =>
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
  ])

app(state, actions, view, document.body)
