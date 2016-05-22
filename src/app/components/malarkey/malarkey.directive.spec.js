/* eslint  no-undef: 0*/
/* eslint  vars-on-top: 0*/
/* eslint  dot-notation: 0*/
/* eslint  no-unused-expressions: 0*/
describe('acmeMalarkey', function () {

  beforeEach(module('mastermindUi'));

  it('smoke', function () {
    bard.inject(this, '$compile', '$rootScope');

    function init() {
      var elem, scope = $rootScope.$new(),
        el = $compile('<acme-malarkey extra-values="extra"></acme-malarkey>');

      scope.extra = ['FOO', 'BAR'];
      elem = el(scope);

      scope.$digest();
      return elem;
    }

    expect(init).to.not.throw(Error);
  });
});
