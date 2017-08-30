describe('videoService', function() {
    var _rates = [1, 2, 3, 4, 5];

    beforeEach(module('videoApp'));

    describe('rate average', function() {
        it('ratings populated average',
    		  inject(function(videoService) {

            var _video = { ratings:[5,4,3,2,1,4,3] },
                _avg = 3.14;

            var avg = videoService.rateAvg(_video);
            expect(avg).toEqual(_avg);
    		}));

        it('ratings null',
          inject(function(videoService) {
            expect(videoService.rateAvg({})).toEqual(0);
        }));

        it('ratings empty',
          inject(function(videoService) {
            expect(videoService.rateAvg({ ratings:[] })).toEqual(0);
        }));
    });
});