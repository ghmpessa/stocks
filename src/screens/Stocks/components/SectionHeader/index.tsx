import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { Theme } from '../../../../styles/theme'
import { Months } from '../../../../utils/constants'

type Props = {
  date: string
}

const SectionHeader: React.FC<Props> = ({ date }) => {
  const day = date.slice(8)
  const month = parseInt(date.slice(5, 7))
  const year = date.slice(0, 4)
  const title = `${day} de ${Months[month]} de ${year}`

  return (
    <Animated.View
      entering={SlideInDown.duration(600)}
      style={styles.container}
    >
      <View style={styles.decoration} />
      <Text style={styles.divider}>{title}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  decoration: {
    width: 4,
    height: 20,
    marginRight: 4,
    backgroundColor: Theme.colors.primary.main,
  },
  divider: {
    fontFamily: Theme.fonts.poppinsMedium,
    color: '#b8b8b8',
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginVertical: 10,
    lineHeight: 20,
  },
})

export default SectionHeader
