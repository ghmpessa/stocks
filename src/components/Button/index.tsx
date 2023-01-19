import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { Theme } from '../../styles/theme'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const APressable = Animated.createAnimatedComponent(Pressable)

type Props = {
  title: string
  onPress?: () => void
  disabled?: boolean
}

const Button: React.FC<Props> = ({ title, onPress, disabled }) => {
  const progress = useSharedValue(1)

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: progress.value }],
  }))

  return (
    <APressable
      style={[styles.button, style, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      onPressIn={() => (progress.value = withTiming(0.9))}
      onPressOut={() => (progress.value = withTiming(1))}
      disabled={disabled}
    >
      <LinearGradient
        colors={[Theme.colors.primary.light, Theme.colors.primary.main]}
        style={styles.container}
      >
        <Text style={styles.buttonLabel}>{title}</Text>
      </LinearGradient>
    </APressable>
  )
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    borderRadius: 4,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonLabel: {
    fontFamily: Theme.fonts.poppinsBold,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    fontSize: 16,
    lineHeight: 24,
    color: Theme.colors.white,
  },
})

export default Button
