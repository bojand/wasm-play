rustc \
--target wasm32-unknown-unknown \
-C opt-level=s \
--crate-type=cdylib \
cap.rs \
-o cap.wasm
