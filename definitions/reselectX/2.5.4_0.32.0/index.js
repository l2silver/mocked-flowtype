//@flow
function defaultEqualityCheck(a, b) {
  return a === b
}

export function defaultMemoize<A>(func: A, equalityCheck: * = defaultEqualityCheck) : A {
  return func;
}

export function createSelectorCreator(memoize : *) : * {
  return (...funcs: Array<*>) : * => {
    const resultFunc : (...args: *[])=>* = funcs.pop()
    const dependencies : Array<(state?: *, props?: *)=>*> = funcs;
    const selector = (state : *, props: *) => {
      const params = dependencies.map(
        dependency => dependency(state, props)
      )
      return resultFunc(...params)
    }
    return selector
  }
}

export const createSelector = createSelectorCreator(defaultMemoize)

// export function createStructuredSelector(selectors, selectorCreator = createSelector) {
//   if (typeof selectors !== 'object') {
//     throw new Error(
//       `createStructuredSelector expects first argument to be an object ` +
//       `where each property is a selector, instead received a ${typeof selectors}`
//     )
//   }
//   const objectKeys = Object.keys(selectors)
//   return selectorCreator(
//     objectKeys.map(key => selectors[key]),
//     (...values) => {
//       return values.reduce((composition, value, index) => {
//         composition[objectKeys[index]] = value
//         return composition
//       }, {})
//     }
//   )
// }
