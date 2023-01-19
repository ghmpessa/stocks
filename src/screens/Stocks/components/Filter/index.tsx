import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'

import FilterIcon from '../../../../../assets/filter.svg'
import Asc from '../../../../../assets/sort-asc.svg'
import Desc from '../../../../../assets/sort-desc.svg'

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const APressable = Animated.createAnimatedComponent(Pressable)

type Props = {
  onFilter: (order: 'asc' | 'desc') => void
}

const Filter: React.FC<Props> = ({ onFilter }) => {
  const progress = useSharedValue(0)

  const descStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: progress.value * -60,
      },
    ],
  }))

  const ascStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: progress.value * -110,
      },
    ],
  }))

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.mainIcon}
        onPress={() => {
          progress.value = progress.value === 1 ? withTiming(0) : withTiming(1)
        }}
      >
        <FilterIcon width={24} height={24} />
      </Pressable>
      <APressable
        style={[styles.icons, ascStyles]}
        onPress={() => {
          onFilter('asc')
          progress.value = withTiming(0)
        }}
      >
        <Asc width={20} height={20} />
      </APressable>
      <APressable
        style={[styles.icons, descStyles]}
        onPress={() => {
          onFilter('desc')
          progress.value = withTiming(0)
        }}
      >
        <Desc width={20} height={20} />
      </APressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    right: 5,
  },
  mainIcon: {
    backgroundColor: '#272C34',
    padding: 12,
    borderRadius: 24,
    position: 'absolute',
    bottom: -10,
    zIndex: 10,
  },
  icons: {
    backgroundColor: '#272C34',
    position: 'absolute',
    padding: 8,
    bottom: -5,
    borderRadius: 24,
  },
})

export default Filter
