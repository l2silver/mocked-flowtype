//@flow
//import {defaultMemoize, createSelector} from './index'

function defaultMemoize(func: *){
  return func
}

const result: number = defaultMemoize(()=>1)();

type statePropFunction<R> = (state: *, props: *)=>R;

export function createSelectorCreator(memoize: *, ...memoizeOptions: Array<any>) {
  return (resultFunc: *, ...funcs: statePropFunction<*>[]) => {
    return (state: *, props: *) => {
      const params = funcs.map(
        dependency => dependency(state, props)
      )
      return resultFunc(...params)
    }
  }
}

export const createSelector = createSelectorCreator(defaultMemoize)

const a : number = createSelector((firstStateProp) => 
  firstStateProp, (state: {number: number}, props)=>state.number)({number: 1}, {number: 1})

// $shouldError
const b : string = createSelector((firstStateProp) => 
  firstStateProp, (state: {number: number}, props)=>state.number)({number: 1}, {number: 1})
