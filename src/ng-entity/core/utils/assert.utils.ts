export function ASSERT(bool: boolean, message: string): void {
  if (!bool) {
    throw new Error(message);
  }
}
