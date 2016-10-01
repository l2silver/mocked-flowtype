//@flow
function defaultEqualityCheck(a, b) {
  return a === b
}

export function defaultMemoize<A>(func: A, equalityCheck: * = defaultEqualityCheck) : A {
  return func;
}

type stateType = {string?: *};
type propsType = {string?: *};

type statePropFunction<S: stateType, P: propsType, R> = (state: S, props: P)=>R;
type resultFuncType<R, Z> = (...args: Array<R>)=>Z;
type selectorFunc<S, P, Z> = (state: S, props: P)=>Z;
type selectorCreatorFunc <R, Z: *, S: *, P: *, F: Array<statePropFunction<S, P, R>>, RF: resultFuncType<R, Z>> =  (funcs: F, resultFunc: RF)=>selectorFunc<S, P, Z>;
type selectorsObject<S, P, Z, Y: string> = { [key: Y]: selectorFunc<S, P, Z>};
export function createSelectorCreator() : * {
  return createSelector
}

export function createSelector<R, Z: *, S: *, P: *, F: Array<statePropFunction<S, P, R>>, RF: resultFuncType<R, Z>> (funcs: F, resultFunc: RF) : selectorFunc<S, P, Z> {
  return function selector(state: S, props: P) : Z {
    const params = funcs.map(
      dependency => dependency(
        state,
        props
      )
    )
    return resultFunc(...params)
  }
}

export function createStructuredSelector <S : stateType, P: propsType, Z: *, SO: selectorsObject<S, P, Z, *>>(selectors: SO, selectorCreator : selectorCreatorFunc<*,Z,S,P,*,*> = createSelector) : selectorFunc<S, P, {[key: string]: Z}> {
  const objectKeys = Object.keys(selectors)
  return selectorCreator(
    objectKeys.map( (key: string ) => selectors[key]),
    (...values: Array<Z>) => {
      return values.reduce((composition, value, index) => {
        composition[objectKeys[index]] = value
        return composition
      }, {})
    }
  )
}
