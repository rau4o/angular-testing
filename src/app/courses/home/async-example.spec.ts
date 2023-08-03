import {fakeAsync, flush, tick} from "@angular/core/testing";


fdescribe('Async Testing Example', () => {

  it('should Asynchronous test example with Jasmine done', (done) => {
    let test = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('should Asynchronous test example - setTimeout()', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;
    }, 1000);
    tick(1000);
    // flush() -> same result
    expect(test).toBeTruthy();
  }));

})
