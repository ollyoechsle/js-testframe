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

* haveText(String)
* haveText(String...)

```
thenThe(jQuery("<div><p>Apples</p><p>Bananas</p><p>Cherries</p></div>").find("p"))
    .should(haveText("Apples", "Bananas", "Cherries"))
```

* containText(String)
* haveAttribute(String)
* haveAttribute(String, Value)
* haveAttribute(String, Value...)

```
thenThe(jQuery('<tr><th data-id="1"></th><th data-id="2"></th><th data-id="3"></th></tr>').find("th"))
    .should(haveAttribute("data-id", "1", "2", "3"))
```

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



