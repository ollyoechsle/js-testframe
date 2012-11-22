JS-TestFrame
============

A set of sugary assertions for helping with your unit tests.

TestFrame provides simple, chainable should and shouldNot calls, into which you plug an appropriate
assertion for the object you want.

TestFrame is designed to provide assertions for multiple frameworks and test setups, including:
* jQuery
* Sinon JS

TestFrame is also intended to plug into a variety of testing frameworks. See jstestframe.js for details.

Example Assertions
------------------

jQuery
------

```
thenThe(jQuery("<div></div>")).should(beVisible);

thenThe(jQuery("<div class='hidden'></div>")).should(beHidden);
```

Full list of jQuery assertions:

* haveText(String...)

```
thenThe(jQuery("<div><p>Apples</p><p>Bananas</p><p>Cherries</p></div>").find("p"))
    .should(haveText("Apples", "Bananas", "Cherries"))
```

* containText(String)
* haveAttribute(String)
* haveAttribute(String, Value)
* haveClass(String)
* beThere
* linkTo(String)
* haveSize(Number)
* haveValue(String)

Sinon JS
--------

```
sinon.stub(jQuery, "ajax");

...

then(jQuery.ajax).shouldHaveBeen(calledOnce);
```

Full list of Sinon assertions:

* notCalled
* calledOnce
* calledTwice
* calledTimes(Number)
* calledAgain()



