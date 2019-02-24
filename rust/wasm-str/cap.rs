use std::mem;
use std::ffi::CString;
use std::os::raw::{c_char, c_void};

#[no_mangle]
pub extern "C" fn alloc(size: usize) -> *mut c_void {
    let mut buf = Vec::with_capacity(size);
    let ptr = buf.as_mut_ptr();
    mem::forget(buf);
    return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn dealloc_str(ptr: *mut c_char) {
    unsafe {
        let _ = CString::from_raw(ptr);
    }
}

#[no_mangle]
pub fn cap(ptr: *mut c_char) -> *mut c_char {
    let mut s: String;

    unsafe {
        s = CString::from_raw(ptr).into_string().unwrap();
    }
    
    s = s.to_uppercase();

    let c_string = CString::new(s).unwrap();
    c_string.into_raw()
}
