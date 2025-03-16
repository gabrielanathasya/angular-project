export const createMockRouter = () => {
  return jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
};
