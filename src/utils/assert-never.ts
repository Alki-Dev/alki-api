export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
}

export function isAssertNeverError(error: Error): boolean {
  return error.message.startsWith('Unexpected object');
}
