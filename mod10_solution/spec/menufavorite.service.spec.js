describe('menucategories', function () {

  var menuFavorite;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuFavorite = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('API should return favorite menu item', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/' + 'A11' + '.json')
      .respond({id: 11, short_name: "A11"});

    menuFavorite.getFavorite("A11")
      .then(function(response) {
        expect(response)
          .toEqual({id: 11, short_name: "A11"});
      }
    );
    $httpBackend.flush();
  });
});