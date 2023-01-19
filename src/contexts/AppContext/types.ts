import { StockType } from '../../types/stock'
import { Actions } from './action-types'

export type AppState = {
  data: StockType[]
  loading: boolean
  error: string
}

export type ContextProps = {
  state: AppState
  actions: any
}

export type ReducerType = {
  type: Actions
  payload?: any
}
