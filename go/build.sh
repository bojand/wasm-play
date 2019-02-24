# GOOS=js GOARCH=wasm go build -o wasm_demo_bg.wasm
docker run --rm -v $(pwd):/src tinygo/tinygo build -o /src/wasm_demo_bg.wasm -target wasm /src/lib.go
cp wasm_demo_bg.wasm www/wasm_demo_bg.wasm
cp wasm_demo_bg.wasm node/wasm_demo_bg.wasm
