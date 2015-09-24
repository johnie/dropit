# dropit

A super-small, non-dependent JavaScript framework that allows you to easily customize selectboxes

## Install

**Bower**

```bash
$ bower install dropit.js
```

**npm**

```bash
$ npm install dropit
```

## Documentation

### Plugin usage

**Customize all select elements:**

```js
var selectBoxes = new Dropit();
```

**Customize only some select elements:**

```js
var selectBoxes = new Dropit('div#main select.fancy')
```

**Change default classes:**

```js
var selectBoxes = new Dropit('select', {
	hiddenSelectClass   : 'hidden',
	dropitClass         : 'custom',
	activeListClass     : 'active',
	selectedOptionClass : 'selected'
});
```

## Contribute

See the [contributing guide](CONTRIBUTING.md)

### Licence

[MIT](licence) © Johnie Hjelm
