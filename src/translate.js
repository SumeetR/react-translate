import React, { Component, PropTypes } from "react"

export default function translate(displayName, shouldComponentUpdate) {
  let t
  let previousLocale = null
  return (ChildComponent) => { 
    class Translator extends Component {

      static contextTypes = {
        translator: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired,
      }

      shouldComponentUpdate = shouldComponentUpdate

      render() {
        const { translator, locale } = this.context
        if(locale !== previousLocale) {
          t = translator(displayName)
          previousLocale = locale
        }
        return (
          <ChildComponent {...this.props} t={t} />
        )
      }
    }
    Translator.ChildComponent = ChildComponent;
    return Translator
  }
}
