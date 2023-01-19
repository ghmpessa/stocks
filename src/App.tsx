import React from 'react'
import RootStack from './routes/stack.routes'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './routes/tab.routes'
import StockStack from './routes/stack.routes'

const App = () => {
  return (
    <NavigationContainer>
      <StockStack />
    </NavigationContainer>
  )
}

export default App
