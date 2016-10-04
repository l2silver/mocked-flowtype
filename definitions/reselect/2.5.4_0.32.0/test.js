//@flow
import {
	defaultMemoize,
	createSelector,
	createStructuredSelector
} from './index'

const defaultMemoizeResult1: number = defaultMemoize(()=>1)();
// $shouldError
const defaultMemoizeResult2: string = defaultMemoize(()=>1)();


const defaultSelector = createSelector(
  [
    (state: {}, props: {}): * => 1
  ],
  (num): * => num
)

const num : 1 = defaultSelector({}, {})
// $shouldError
const str : string = defaultSelector({}, {})

const defaultStructuredSelector = createStructuredSelector({
	defaultSelector
})

const objectWithNumber : {defaultSelector: 1} = defaultStructuredSelector({}, {})
// $shouldError
const objectWithNumber2 : {defaultSelector2: 1} = defaultStructuredSelector({}, {})
const objectWithNumber2 : {defaultSelector: string} = defaultStructuredSelector({}, {})