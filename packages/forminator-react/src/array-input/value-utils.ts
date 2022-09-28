export function arrayMoveMutable<ValueType>(
  array: ValueType[],
  fromIndex: number,
  toIndex: number,
) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

export function moveItem<ValueType>(
  array: ValueType[],
  fromIndex: number,
  toIndex: number,
): ValueType[] {
  const newArray = [...array];
  arrayMoveMutable(newArray, fromIndex, toIndex);
  return newArray;
}

export function addItem<ValueType>(
  array: ValueType[],
  index: number,
  value: ValueType,
) {
  const newArray = [...array];
  const newIndex = index === -1 ? array.length : index < 0 ? index + 1 : index;

  if (index >= newArray.length) {
    newArray[index] = value;
  } else {
    newArray.splice(newIndex, 0, value);
  }
  return newArray;
}

export function removeItem<ValueType>(array: ValueType[], index: number) {
  const newArray = [...array];
  const newIndex = index < 0 ? array.length + index : index;
  if (newIndex >= 0 && newIndex < array.length) {
    newArray.splice(newIndex, 1);
  }
  return newArray;
}
