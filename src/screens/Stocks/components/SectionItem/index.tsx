import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Animated, { SlideInDown } from 'react-native-reanimated'

import Currency from '../../../../../assets/currency.svg'
import { Theme } from '../../../../styles/theme'
import { StockType } from '../../../../types/stock'

type Props = {
  isFirstItem: boolean
  item: StockType
}

const SectionItem: React.FC<Props> = ({ isFirstItem, item }) => {
  return (
    <Animated.View
      entering={SlideInDown.duration(600)}
      style={[
        styles.container,
        isFirstItem && {
          marginTop: 0,
        },
      ]}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: Theme.fonts.poppinsMedium,
          letterSpacing: 1.25,
          color: Theme.colors.primary.darker,
          position: 'absolute',
          top: 0,
          left: 5,
          borderBottomColor: Theme.colors.primary.dark,
        }}
      >
        {`#${item.code}`}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontFamily: Theme.fonts.poppinsMedium,
          color: '#b2b2b2',
        }}
      >
        {item.name}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceTitle}>Valor</Text>
        <View style={styles.priceRow}>
          <Currency width={16} height={16} />
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: Theme.colors.card,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 8,
    elevation: 1,
    borderWidth: 0.5,
    borderColor: Theme.colors.primary.darker,
    shadowColor: Theme.colors.primary.darker,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceTitle: {
    fontFamily: Theme.fonts.poppinsRegular,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    color: '#b1b1b1',
    fontSize: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  price: {
    fontFamily: Theme.fonts.poppinsMedium,
    color: '#b8b8b8',
    lineHeight: 24,
    fontSize: 16,
  },
})

export default SectionItem
