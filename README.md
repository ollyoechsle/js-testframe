JS-TestFrame
============

A set of sugary assertions for helping with your unit tests.

TestFrame provides simple, chainable should and shouldNot calls, into which you plug an appropriate
assertion for the object you want.

TestFrame is designed to provide assertions for multiple frameworks and test setups, including:
* jQuery
* Sinon JS

TestFrame is also intended to plug into a variety of testing frameworks. See jstestframe.js for details.

General Usage
-----------------

```
thenThe(jQuery obj | sinon stub)
    .should|shouldNot(assertion, [mapper])
    [.should..]
```

jQuery Assertions
-----------------

```
thenThe(jQuery("<div></div>")).should(beVisible);

thenThe(jQuery("<div class='hidden'></div>")).should(beHidden);
```

Full list of jQuery assertions:

* haveText(Value)
* haveText(Values...)

```
thenThe(jQuery("<div><p>Apples</p><p>Bananas</p><p>Cherries</p></div>").find("p"))
    .should(haveText("Apples", "Bananas", "Cherries"))
```

* containText(String)
* haveAttribute(String)
* haveAttribute(String, Value)
* haveAttribute(String, Values...)

```
thenThe(jQuery('<tr><th data-id="1"></th><th data-id="2"></th><th data-id="3"></th></tr>').find("th"))
    .should(haveAttribute("data-id", "1", "2", "3"))
```

* haveClass(String)
* beThere
* linkTo(String)
* haveSize(Number)
* haveStyle(CssProperty)
* haveStyle(CssProperty, Value)
* haveStyle(CssProperty, Values...)
* haveValue(String)

jQuery Mappers
--------------

Mappers are little preprocessors which are run before the element is passed to the assertable. They
 allow you to make more readable, shorter assertions.

For example:

```
<tbody>
<tr>
    <td>Apple</td>
    <td><span class="icon" style="background-color: green"></span></td>
</tr>
<tr>
    <td>Banana</td>
    <td><span class="icon" style="background-color: yellow"></span></td>
</tr>
<tr>
    <td>Orange</td>
    <td><span class="icon" style="background-color: orange"></span></td>
</tr>
</tbody>
```

If you want to inspect the label and the colour, then you can some gynmastics with CSS selectors,
and you need to create

```
thenThe(jQuery('tbody tr td:first-child'))
    .should(haveText("Apple", "Banana", "Orange"));

thenThe(jQuery('tbody tr .icon'))
    .should(haveStyle("background-color", "green", "yellow", "orange"))
```

But with mappers you can reuse and make things easier to read and continue to chain your shoulds together.

```
thenThe(jQuery('tbody tr'))
    .should(haveText("Apple", "Banana", "Orange"), inElement("td:first-child"))
    .should(haveStyle("background-color", "green", "yellow", "orange"), inElement(".icon"));

```

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



