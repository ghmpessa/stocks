import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StockStack from './routes/stack.routes'
import { AppProvider } from './contexts/AppContext'

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <StockStack />
      </AppProvider>
    </NavigationContainer>
  )
}

export default App
