import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AddStock, Stocks } from '../screens'
import Tabs from './tab.routes'

export type StockStackParamList = {
  AddStock: undefined
  Tab: undefined
}

const Stack = createNativeStackNavigator<StockStackParamList>()

const StockStack: React.FC = () => {
  const { Navigator, Screen } = Stack
  return (
    <Navigator
      initialRouteName='Tab'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='Tab' component={Tabs} />
      <Screen name='AddStock' component={AddStock} />
    </Navigator>
  )
}

export default StockStack
