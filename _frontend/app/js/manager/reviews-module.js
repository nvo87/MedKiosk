var ReviewsModule = (function () {
    var REVIEWS = [];  

    function _init(reviewsJSON, SETTINGS) {
        REVIEWS = reviewsJSON;
        _setUpListeners();
    }

    function _setUpListeners() {

    }

    function _getAllReviews(){
        return REVIEWS;
    }

    return {
        init: _init,
        getAllReviews: _getAllReviews
    }

}());
