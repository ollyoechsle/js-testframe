(function () {

    module("Sinon Tests", {
        setup:function () {
        },
        teardown:function () {

        }
    });

    test("call count", function () {

        expect(3);

        given(fn = sinon.stub());

        thenThe(fn)
            .shouldHaveBeen(notCalled)
            .shouldNotHaveBeen(calledOnce);

        when(fn.call(window));

        thenThe(fn).shouldHaveBeen(calledOnce);

    });

    test("called again", function () {

        expect(4);

        given(fn = sinon.stub());

        when(fn.call(window));

        thenThe(fn)
            .shouldHaveBeen(calledOnce)
            .shouldNotHaveBeen(calledAgain);

        when(fn.call(window));

        thenThe(fn)
            .shouldHaveBeen(calledAgain)
            .shouldHaveBeen(calledTwice);

    });

    var fn;

})();