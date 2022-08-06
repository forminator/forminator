declare global {
  namespace jest {
    interface Matchers<R> {
      toBeNone(): R;
      toBeSome<E = any>(expected?: E): R;
      toEqualSome<E = any>(expected: E): R;
    }
  }
}
