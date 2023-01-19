import { Actions } from './action-types'
import { AppState, ReducerType } from './types'

export const reducer = (state: AppState, action: ReducerType): AppState => {
  switch (action.type) {
    case Actions.ADD: {
      return { ...state, data: action.payload, loading: false }
    }
    case Actions.LOADING: {
      return { ...state, loading: true }
    }
    case Actions.LOADED: {
      return { ...state, data: action.payload, loading: false }
    }
    case Actions.ERROR: {
      return { ...state, error: action.payload, loading: false }
    }
  }
}
