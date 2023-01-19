import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native'
import { Theme } from '../../styles/theme'

import List from '../../../assets/list.svg'
import Chart from '../../../assets/charts.svg'
import Add from '../../../assets/add.svg'
import LinearGradient from 'react-native-linear-gradient'

const SCREEN_WIDTH = Dimensions.get('screen').width

const Icon: { [number: string]: React.ReactNode } = {
  Stocks: <List width={24} height={24} />,
  Add: <Add width={24} height={24} />,
  Charts: <Chart width={24} height={24} />,
}

const isIphoneX = () => {
  const dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  )
}
const TabBar: React.FC<BottomTabBarProps> = ({
  descriptors,
  navigation,
  state,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.tabBarLabel as string

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        if (index === 1)
          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.8}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <LinearGradient
                colors={[Theme.colors.primary.light, Theme.colors.primary.main]}
                style={styles.addButton}
              >
                {Icon['Add']}
              </LinearGradient>
            </TouchableOpacity>
          )

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            {Icon[route.name]}
            <Text numberOfLines={1} style={styles.label}>
              {label}
            </Text>
            {isFocused && (
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: Theme.colors.primary.main,
                }}
              />
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#272C34',
    width: SCREEN_WIDTH - 20,
    marginHorizontal: 10,
    marginBottom: 10,
    height: isIphoneX() ? 80 : 60,
    paddingBottom: isIphoneX() ? 25 : 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    flexGrow: 1,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    top: -20,
    elevation: 2,
    backgroundColor: Theme.colors.primary.main,
  },
  label: {
    color: Theme.colors.white,
    fontFamily: Theme.fonts.poppinsMedium,
    fontSize: 12,
  },
  sliding: {
    ...StyleSheet.absoluteFillObject,
    borderTopWidth: 2,
    borderTopColor: Theme.colors.white,
  },
})

export default TabBar
