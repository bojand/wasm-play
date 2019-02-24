package main

func main() {
}

//go:export double
func double(a int32) int32 {
	return a + a
}
