//@flow
type Reducer<S, A> = (state: *, action: A)=>S;

class createfakeStore <S, A> {
  reducer: Reducer<S, A>;
  state: S;
  constructor(reducer: Reducer<S, A>, state: S){
    this.reducer = reducer
    this.state = state;
  }
  dispatch(action: A){
    this.reducer(this.state, action)
  }
}

export function createStore<S, A>(reducer: Reducer<S, A>, state: *): createfakeStore<S, A>{
  return new createfakeStore(reducer, state)
}

type reducersObject<S, A, Y: string> = { [key: Y]: Reducer<S, A>};
type combinedState<RO> = {[key: $Keys<RO>]: *};
export function combineReducers<S, A, Y, RO: { [key: string]: Reducer<S, A>}>(reducers: RO) : Reducer<*, A> {
  var finalReducerKeys = Object.keys(reducers)

  return function combination(state: combinedState<RO> = {}, action: A) : * {
    var hasChanged = false
    var nextState = {}
    let broken = false
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = reducers[key]
      var previousStateForKey = state[key]
      var nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        throw new Error('error')
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    if(broken){
      return null
    }
    return hasChanged ? nextState : state
  }
}