(function () {

    module("Sinon Tests", {
        setup:function () {
        },
        teardown:function () {

        }
    });

    test("call count", function () {

        expect(2);

        given(fn = sinon.stub());

        thenThe(fn).shouldHaveBeen(notCalled);

        when(fn.call(window));

        thenThe(fn).shouldHaveBeen(calledOnce);

    });

    test("called again", function () {

        given(fn = sinon.stub());

        when(fn.call(window));

        thenThe(fn).shouldHaveBeen(calledOnce);

        when(fn.call(window));

        thenThe(fn).shouldHaveBeen(calledAgain);

    });

    var fn;

})();