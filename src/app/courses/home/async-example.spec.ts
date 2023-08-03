

fdescribe('Async Testing Example', () => {

  it('should Asynchronous test example with Jasmine done', (done) => {
    let test = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

})
