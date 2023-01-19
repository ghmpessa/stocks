import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native'

import { Theme } from '../../styles/theme'

import {
  Calendar as RNCalendar,
  LocaleConfig,
  DateData,
} from 'react-native-calendars'

import CalendarIcon from '../../../assets/calendar.svg'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ArrowIcon } from './components'

const AnimArrowIcon = Animated.createAnimatedComponent(ArrowIcon)

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: 'Hoje',
}

LocaleConfig.defaultLocale = 'br'

type Props = {
  onSelect: (date: string) => void
}

const Calendar: React.FC<Props> = ({ onSelect }) => {
  const [date, setDate] = useState('')
  const open = useSharedValue(false)

  const containerStyle = useAnimatedStyle(() => ({
    height: !open.value ? withTiming(50) : withTiming(384),
  }))

  const rotate = useDerivedValue(() => {
    return open.value ? withTiming(180) : withTiming(0)
  })

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${rotate.value}deg`,
      },
    ],
  }))

  const handleDate = (date: DateData) => {
    const formattedDate = `${date.day.toString().padStart(2, '0')}/${date.month
      .toString()
      .padStart(2, '0')}/${date.year}`
    setDate(formattedDate)
    onSelect(formattedDate)
    handleOpen()
  }

  const handleOpen = () => {
    open.value = !open.value
  }

  return (
    <Animated.View
      style={[
        {
          flexGrow: 1,
          overflow: 'hidden',
        },
        containerStyle,
      ]}
    >
      <Pressable onPress={handleOpen} style={{ height: 50, marginBottom: 10 }}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CalendarIcon width={20} height={20} />
            <Text style={styles.text}>{date}</Text>
          </View>
          <AnimArrowIcon style={iconStyle} />
        </View>
      </Pressable>
      <RNCalendar
        theme={{ arrowColor: '#4e41c7', backgroundColor: 'black' }}
        style={styles.calendar}
        markedDates={{
          [date]: { selected: true, selectedColor: '#4e41c7' },
        }}
        onDayPress={handleDate}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginBottom: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: '#2a303b',
    paddingHorizontal: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontFamily: Theme.fonts.poppinsRegular,
    lineHeight: 20,
    marginLeft: 8,
  },
  calendar: {
    borderRadius: 4,
  },
})

export default Calendar
