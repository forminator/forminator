declare namespace jest {
  interface Matchers<R> {
    toBeNone(): R;
    toBeSome<E = any>(expected?: E): R;
  }
}
