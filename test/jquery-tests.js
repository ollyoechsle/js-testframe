(function () {

    module("jQuery Tests");

    test("hidden and visible", function () {

        expect(4);

        thenThe(jQuery("<div></div>"))
            .should(beVisible)
            .shouldNot(beHidden);

        thenThe(jQuery("<div class='hidden'></div>"))
            .should(beHidden)
            .shouldNot(beVisible);

    });

    test("has class", function () {

        expect(6);

        thenThe(jQuery("<div class='hidden'></div>"))
            .should(haveClass("hidden"))
            .shouldNot(haveClass("foo"));

        thenThe(jQuery("<div class='foo'></div>"))
            .should(haveClass("foo"))
            .shouldNot(haveClass("hidden"));

        thenThe(jQuery("<div></div>"))
            .shouldNot(haveClass("foo"))
            .shouldNot(haveClass("hidden"));

    });

    test("has text", function () {

        expect(4);

        thenThe(jQuery("<div'>Hello, World</div>"))
            .should(haveText("Hello, World"))
            .should(containText("World"))
            .should(containText("Hello"))
            .shouldNot(containText("Giraffe"))

    });

    test("has text array", function () {

        expect(3);

        thenThe(jQuery("<div><p>Apples</p><p>Bananas</p><p>Cherries</p></div>").find("p"))
            .should(haveText("Apples", "Bananas", "Cherries"))

    });

    test("not there", function () {

        expect(1);

        thenThe(jQuery(".foo")).shouldNot(beThere);

    });

    test("present there", function () {

        expect(1);

        thenThe(jQuery("<div></div>")).should(beThere);

    });

    test("link to", function () {

        expect(2);

        thenThe(jQuery("<a href='www.google.co.uk'>Click Me</a> >"))
            .should(linkTo("www.google.co.uk"))
            .shouldNot(linkTo("www.yahoo.co.uk"));

    });

    test("num elements", function () {

        expect(2);

        thenThe(jQuery("<ul><li>Apples</li><li>Bananas</li><li>Carrots</li></ul> ").find("li"))
            .should(haveSize(3))
            .shouldNot(haveSize(4));

    });

    test("attr", function () {

        expect(4);

        thenThe(jQuery("<p data-foo='123'> "))
            .should(haveAttribute("data-foo"))
            .shouldNot(haveAttribute("data-bar"))
            .should(haveAttribute("data-foo", "123"))
            .shouldNot(haveAttribute("data-foo", "456"))

    });

    test("undefined attr", function () {

        expect(2);

        thenThe(jQuery("<p data-foo='0'> "))
            .should(haveAttribute("data-foo"))
            .should(haveAttribute("data-foo", "0"))

    });

    test("have value", function () {

        expect(2);

        thenThe(jQuery("<select><option value='1'></option><option value='2' selected></option></select>"))
            .should(haveValue("2"))
            .shouldNot(haveValue("1"))

    });

})();