(function () {

    module("jQuery Tests", {
        setup:function () {
        },
        teardown:function () {

        }
    });

    test("hidden and visible", function () {

        thenThe(jQuery("<div></div>")).should(beVisible);

        thenThe(jQuery("<div class='hidden'></div>")).should(beHidden);

    });

    test("has class", function () {

        thenThe(jQuery("<div class='hidden'></div>")).should(haveClass("hidden"));

        thenThe(jQuery("<div class='foo'></div>")).should(haveClass("foo"));

        thenThe(jQuery("<div class='foo'></div>")).should(notHaveClass("hidden"));

        thenThe(jQuery("<div></div>")).should(notHaveClass("foo"));

    });

    test("has text", function () {

        thenThe(jQuery("<div'>Hello, World</div>")).should(haveText("Hello, World"));

    });

})();