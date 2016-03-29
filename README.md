# react-translate

> Internationalization for react

[![Build Status](https://travis-ci.org/SumeetR/react-translate.svg?branch=master)](https://travis-ci.org/SumeetR/react-translate)

## Info

This project is a fork of [bloodyowl's](https://github.com/bloodyowl) [react-translate](https://github.com/bloodyowl/react-translate) repository. Its goal is to add features extending the capabilities of react-translate. Currently the features added are:
* Referencing Translation
* Expose Child Component

## Install

```console
$ npm install --save react-translate
```

## Import

```javascript
// at the top of your app
import { TranslatorProvider } from "react-translate"
// when you require a translator
import { translate } from "react-translate"
```

## API

### `<TranslatorProvider translations={object} />`

A component that provides the translation data to the `translate()` calls in the component hierarchy below.
You can't use translate() without wrapping the a component (e.g., the root component) in <TranslatorProvider>.

```javascript
import { render } from "react-dom"
import { TranslatorProvider } from "react-translate"

// …

render(
  <TranslatorProvider translations={object}>
    <App />
  </TranslatorProvider>,
  mountNode
)
```

### translate(displayName[, shouldComponentUpdate])

Connects a component to the translations provided by `<TranslatorProvider>`. It passes a `t` function to your component's props. It returns a new, connected component class (i.e., it does not modify the component class passed to it).

#### Arguments

- `displayName` (*String*) Name of the component in the translations. It is required because we cannot rely on the `component.name` with minified code.
- `shouldComponentUpdate` optional, (*Function*) Custom `shouldComponentUpdate` for the component.

#### Usage

```javascript
// with a React class, using it as a decorator
@translate("Header")
class Header extends Component {
  render() {
    const { t } = this.props
    return (
      <div>
        {t("TITLE")}
      </div>
    )
  }
}

// with a stateless component function
const Header = ({ t }) => (
  <div>
    {t("TITLE")}
  </div>
)

export default translate("Header")(Header)
```

### t(key [, params])

The `t` function passed a prop is the one that returns your translations given the key, and optionally some parameters.

```javascript
// for a simple key
t("KEY") // "value"
// for a key with a parameter
t("KEY", { foo: "bar" }) // replaces "{{foo}}" in the translation with "bar"
// for a key with a numeral parameter, which makes `t` choose between singular
// and plural
t("KEY", { n: 2 })
```

## Organizing the `translations` object

Translations should be grouped by component:

```js
const translations = {
  // the `locale` parameter is mandatory, it enables react-translate to use
  // the right rules for singular and plural
  locale: "fr",
  ComponentName: {
    SIMPLE_KEY: "Helloworld",
    KEY_WITH_PARAMS: "Hello {{name}}",
    KEY_WITH_PLURAL: [
      "You have {{n}} message",
      "You have {{n}} messages",
    ],
  },
}
```
## Creating a reference in the `translations` object

To create a reference in the `translations` object that returns another translation's value, simply include `@:` and the translation key to be referenced:

```js
const translations = {
  locale: "es",
  FirstComponent: {
    FIRST_KEY: "Hola Mundo!"
  },
  SecondComponent: {
    SECOND_KEY: "@:FirstComponent.FIRST_KEY"
  }
}
```

Hence `t('SECOND_KEY)'`, when used in `SecondComponent`, will return "Hola Mundo!"

### Access Original Component

When using the translate decorator, the Comoponent will be wrapped with <Translator>. To obtain the original Component use the following:

```js
component.ChildComponent
```

## How do I load translations ?

React Translate does not give you a specific way to load translations, its goal is only to provide a way to pass translations down to your app components'.

You can use a simple XHR call, put translations in a `<script>` in
your HTML page, or any other way you find adequate.

## Usage example

You can checkout bloodyowl's example [here](https://github.com/bloodyowl/react-translate-example)
