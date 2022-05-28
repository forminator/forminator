let lastId = 0;

export function createId(prefix: string = ''): string {
  const id = lastId++;
  return `${prefix}${id}`;
}
