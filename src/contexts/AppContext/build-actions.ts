import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StockType } from '../../types/stock'
import { Actions } from './action-types'
import { ReducerType } from './types'

export const buildActions = (dispatch: React.Dispatch<ReducerType>) => {
  return {
    add: (payload: StockType[]) => handleAdd(payload, dispatch),
    fetchStocks: () => fetchStocks(dispatch),
  }
}

const handleAdd = async (
  data: StockType[],
  dispatch: React.Dispatch<ReducerType>
) => {
  try {
    dispatch({ type: Actions.LOADING })
    await AsyncStorage.setItem('@stocks', JSON.stringify(data))
    dispatch({ type: Actions.ADD, payload: data })
  } catch (error) {
    dispatch({ type: Actions.ERROR, payload: 'Algo deu errado.' })
  }
}

const fetchStocks = async (dispatch: React.Dispatch<ReducerType>) => {
  try {
    dispatch({ type: Actions.LOADING })
    const response = await AsyncStorage.getItem('@stocks')
    if (response) {
      const data = JSON.parse(response)
      dispatch({ type: Actions.LOADED, payload: data })
    } else {
      dispatch({ type: Actions.LOADED, payload: [] })
    }
  } catch (error) {
    dispatch({ type: Actions.ERROR, payload: 'Algo deu errado.' })
  }
}
