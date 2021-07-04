export function distinct<T>(value: T, index: number, self: any[]) {
  return self.indexOf(value) == index;
}
