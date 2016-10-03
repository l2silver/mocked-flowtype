//@flow
import {
	createStore,
	combineReducers
} from './index'

function increment(state: *, payload: number) : number{
	return state + 1 + payload
}

function counter(state : number = 0, action: *) {
  switch (action.type) {
  case 'INCREMENT':
    return increment(state, action.payload)
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

const store = createStore(combineReducers({counter}))

store.dispatch({ type: 'INCREMENT', payload: 1 })
store.dispatch({ type: 'INCREMENT', payload: 'one' })
store.dispatch({ type: 'DECREMENT' })