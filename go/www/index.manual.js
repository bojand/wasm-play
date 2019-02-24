const { app } = window.hyperapp
const { div, button, label, input } = window.hyperappHtml

let double = null

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

const importObject = {
  env: {
    io_get_stdout: function () {
      return 1
    }
  }
}

fetch('wasm_demo_bg.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes, importObject))
  .then(results => {
    console.log(results.instance)
    double = results.instance.exports.double
    app(state, actions, view, document.body)
  })
  .catch(e => console.error(e))
