import render from "./render"
import getPluralType from "./getPluralType"

const getValue = (componentName, keys) => {
  if (!keys.hasOwnProperty(componentName)) {
    return (key) => `${componentName}.${key}`
  } else {

  }
}

const createTranslator = (keys) => {
  const pluralType = getPluralType(keys.locale)
  return (componentName) => {
    if (!keys.hasOwnProperty(componentName)) {
      return (key) => `${componentName}.${key}`
    }
    const componentKeys = keys[componentName]
    return (key, params) => {
      let translation = componentKeys[key]
      // Check if translation is a reference and find the reference
      if (translation !== undefined && translation.indexOf("@:") === 0) {
        // Remove @: and split string by '.' to find reference and find translation
        const reference = translation.replace("@:", '').split('.');
        // Check if component exists
        if (keys.hasOwnProperty(reference[0])) { 
          translation = keys[reference[0]][reference[1]];
        } else {
          translation = undefined;
        }
      }
      if (translation === undefined) {
        return `${componentName}.${key}`
      }
      if(Array.isArray(translation)) {
        // plural
        if (params != null && typeof params.n === "number") {
          translation = translation[pluralType(params.n)]
        }
        else {
          return render(translation.join("\n"), params)
        }
      }
      return render(translation, params)
    }
  }
}

export default createTranslator
