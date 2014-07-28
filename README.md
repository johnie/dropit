# Customselect.js

A lightweight javascript library to easily customize selectboxes

## Documentation

###Plugin usage


**Customize all select elements:**<br>
new CustomSelect()

**Customize only some select elements:**<br>
new CustomSelect("div#main select.fancy")

**Change default classes:**<br>
new CustomSelect("select", {<br>
hiddenSelectClass   : "hidden",<br>
	customSelectClass   : "custom",<br>
	activeListClass     : "active",<br>
	selectedOptionClass : "selected"<br>
})

## Licence
customselect.js is freely distributable under the terms of the MIT licence.
