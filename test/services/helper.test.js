describe('helperService', function() {
    beforeEach(module('videoApp'));

    var _helperService,
        $httpBackend;

    beforeEach(inject(function(_$q_, helperService, _$httpBackend_){
        $q = _$q_;
       
        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();
        
        // Use a Jasmine Spy to return the deferred promise
        // spyOn(helperService, 'http').and.returnValue(deferred.promise);

        _helperService = helperService;

        $httpBackend = _$httpBackend_;
    }));


    it('http request success', function() {
        let data = null,
            mockData = {fake1: 123, fake2: [3,5,7,9]};

        $httpBackend.whenGET('/fake/')
        .respond({status: "success", data: angular.copy(mockData) });

        _helperService.http({ method: 'GET', url: "/fake/" }).then(function(reponse){
            data = reponse;
        });

        $httpBackend.flush();

        expect(data).toEqual(mockData); 
		});

    it('http request fails', function() {
        let data = null,
            mockData = {status:"error","error":"Invalid username or password"};

        $httpBackend.whenGET('/fake/').respond(mockData);

        _helperService.http({ method: 'GET', url: "/fake/" }).then().catch(function(error){
            data = error;
        });

        $httpBackend.flush();

        expect(data).toEqual("Invalid username or password");
    });
});