(function () {

    module("jQuery Tests", {
        setup:function () {
        },
        teardown:function () {

        }
    });

    test("hidden and visible", function () {

        expect(2);

        thenThe(jQuery("<div></div>")).should(beVisible);

        thenThe(jQuery("<div class='hidden'></div>")).should(beHidden);

    });

    test("has class", function () {

        expect(4);

        thenThe(jQuery("<div class='hidden'></div>")).should(haveClass("hidden"));

        thenThe(jQuery("<div class='foo'></div>")).should(haveClass("foo"));

        thenThe(jQuery("<div class='foo'></div>")).should(notHaveClass("hidden"));

        thenThe(jQuery("<div></div>")).should(notHaveClass("foo"));

    });

    test("has text", function () {

        expect(2);

        thenThe(jQuery("<div'>Hello, World</div>"))
            .should(haveText("Hello, World"))
            .should(containText("World"));

    });

    test("not there", function () {

        expect(1);

        thenThe(jQuery(".foo")).should(notBeThere);

    });

    test("present", function () {

        expect(1);

        thenThe(jQuery("<div></div>")).should(beThere);

    });
    
    test("link to", function () {

        expect(1);

        thenThe(jQuery("<a href='www.google.co.uk'>Click Me</a> >"))
            .should(linkTo("www.google.co.uk"));

    });

    test("num elements", function () {

        expect(1);

        thenThe(jQuery("<ul><li>Apples</li><li>Bananas</li><li>Carrots</li></ul> ").find("li"))
            .should(haveSize(3));

    });

})();