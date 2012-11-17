(function () {

    module("Sinon Tests", {
        setup:function () {
        },
        teardown:function () {

        }
    });

    test("not called", function () {

        var fn = sinon.stub();

        thenThe(fn).shouldHaveBeen(notCalled);

        fn();

        thenThe(fn).shouldHaveBeen(calledOnce);

    });


})();