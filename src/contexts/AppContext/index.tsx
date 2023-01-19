import React, {
  useReducer,
  useRef,
  createContext,
  useContext,
  useEffect,
} from 'react'
import { buildActions } from './build-actions'
import { reducer } from './reducer'
import { AppState, ContextProps } from './types'

export const initialState: AppState = {
  data: [],
  loading: false,
  error: '',
}

const Context = createContext<ContextProps | null>(null)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const actions = useRef(buildActions(dispatch))

  useEffect(() => {
    actions.current.fetchStocks()
  }, [])

  return (
    <Context.Provider value={{ state, actions: actions.current }}>
      {children}
    </Context.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(Context)

  if (typeof context === 'undefined' || context === null) {
    throw new Error(
      'Você precisa usar o useAppContext dentro de<CounterContextProvider />'
    )
  }

  return context
}
