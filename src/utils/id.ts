import { nanoid } from 'nanoid';
import { useState } from 'react';

export function createId(prefix: string = '') {
  return prefix + nanoid();
}

export function useId(prefix: string = '') {
  const [id] = useState(() => createId(prefix));
  return id;
}
