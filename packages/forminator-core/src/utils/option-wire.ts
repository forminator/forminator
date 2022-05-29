import { ReadonlyWire } from '@forminator/react-wire';
import { Option } from '@forminator/option';

export function waitForSomeValue<T>(wire: ReadonlyWire<Option<T>>): Promise<T> {
  return new Promise((resolve, reject) => {
    const value = wire.getValue();
    if (value.isSome()) {
      resolve(value.value);
    } else {
      const unsubscribe = wire.subscribe((value) => {
        if (value.isSome()) {
          unsubscribe();
          resolve(value.value);
        }
      });
    }
  });
}
