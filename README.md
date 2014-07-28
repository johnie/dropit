# Customselect.js

A lightweight javascript library to easily customize selectboxes

## Documentation

###Plugin usage


**Customize all select elements:**
```
var selectBoxes = new CustomSelect();
```

**Customize only some select elements:**<br>
```
var selectBoxes = new CustomSelect("div#main select.fancy")
```

**Change default classes:**<br>
```
var selectBoxes = new CustomSelect("select", {
	hiddenSelectClass   : "hidden",
	customSelectClass   : "custom",
	activeListClass     : "active",
	selectedOptionClass : "selected"
});
```

## Licence
customselect.js is freely distributable under the terms of the MIT licence.
