/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { type PropsWithChildren } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

const App = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#282828', flex: 1 }}>
      <StatusBar barStyle='light-content' backgroundColor='#282828' />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={{
          backgroundColor: '#282828',
        }}
      >
        <View
          style={{
            height: 120,
          }}
        ></View>
        <View
          style={{
            height: '100%',
          }}
        ></View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})

export default App
