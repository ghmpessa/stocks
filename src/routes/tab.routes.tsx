import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { AddStock, Charts, Stocks } from '../screens'
import RootStack, { StockStackParamList } from './stack.routes'
import { TabBar } from '../components'
import { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamList = {
  Stocks: NavigatorScreenParams<StockStackParamList>
  Add: undefined
  Charts: undefined
}

const Tab = createBottomTabNavigator<RootStackParamList>()

const Tabs: React.FC = () => {
  const { Navigator, Screen } = Tab

  const Fake: React.FC = () => null

  return (
    <Navigator
      initialRouteName='Stocks'
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name='Stocks'
        component={Stocks}
        options={{ tabBarLabel: 'Ações' }}
      />
      <Screen
        name='Add'
        component={Fake}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            navigation.navigate('AddStock')
          },
        })}
      />
      <Screen
        name='Charts'
        component={Charts}
        options={{ tabBarLabel: 'Gráficos' }}
      />
    </Navigator>
  )
}

export default Tabs
