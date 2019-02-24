import 'allocator/tlsf'

export { memory }

export function hello(name: string): string {
  return 'hello '.concat(name)
}
