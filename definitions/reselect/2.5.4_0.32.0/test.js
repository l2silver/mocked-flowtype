//@flow
import {defaultMemoize, createSelector, createStructuredSelector} from './index'

const defaultMemoizeResult1: number = defaultMemoize(()=>1)();
// $shouldError
const defaultMemoizeResult2: string = defaultMemoize(()=>1)();


const defaultSelector = createSelector(
  [
    (state: {}, props: {}): number =>1
  ],
  (num): number => num
)

const num : number = defaultSelector({}, {})
// $shouldError
const str : string = defaultSelector({}, {})

const defaultStructuredSelector = createStructuredSelector({
	defaultSelector,
})

const objectWithNumber : {defaultSelector: number} = defaultStructuredSelector({}, {})
// $ shouldError
const objectWithString : {defaultSelector: string} = defaultStructuredSelector({}, {})