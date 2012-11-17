(function () {

    module("jQuery Tests", {
        setup:function () {
        },
        teardown:function () {

        }
    });

    test("gets top keywords when no tags", function () {

        thenThe(jQuery("<div></div>")).should(beVisible);

        thenThe(jQuery("<div class='hidden'></div>")).should(beHidden);

    });

})();