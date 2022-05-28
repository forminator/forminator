export function suppressErrorOutput() {
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => {});

  return spy;
}
