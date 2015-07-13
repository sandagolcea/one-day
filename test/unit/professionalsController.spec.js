describe('ProfessionalsController', function() {

  beforeEach(module('oneDay'));

  var scope, ctrl, $httpBackend, professionals;

  beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    ctrl = $controller('ProfessionalsController', {
        $scope: scope,
    });

    $httpBackend = _$httpBackend_;
    professionals = ["Jair", "Sanda", "John"];

    $httpBackend
    .expectGET('professionals')
    .respond(professionals); 
    
    $httpBackend
      .flush();
  }));

  it('lists all professionals', function() {
    expect(scope.professionals).toEqual(professionals);
  });

});
