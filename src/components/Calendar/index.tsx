import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native'

import { Theme } from '../../styles/theme'

import {
  Calendar as RNCalendar,
  LocaleConfig,
  DateData,
  CalendarListProps,
} from 'react-native-calendars'

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { ArrowIcon } from './components'
import CalendarIcon from '../../../assets/calendar.svg'
import { fetchHoliday } from '../../utils/fetch-holiday'

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
  period?: string
} & CalendarListProps

const Calendar: React.FC<Props> = ({ onSelect, period, ...props }) => {
  const [date, setDate] = useState('')
  const [dateError, setDateError] = useState('')

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

  const handleDate = async (date: DateData) => {
    try {
      const holidays: string[] = await fetchHoliday(date.year)

      if (holidays.includes(date.dateString))
        return setDateError('Você selecionou um feriado!')

      const formattedDate = `${date.day
        .toString()
        .padStart(2, '0')}-${date.month.toString().padStart(2, '0')}-${
        date.year
      }`
      const auxDate = `${date.year}-${date.month
        .toString()
        .padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`
      setDate(formattedDate)
      onSelect(auxDate)
      handleOpen()
    } catch (error) {
      if (error === 'InternalError') return
      Alert.alert('Erro!', 'Algo deu errado.')
    }
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
      <Pressable
        onPress={handleOpen}
        style={{ height: dateError ? 75 : 50, marginBottom: 10 }}
      >
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CalendarIcon width={20} height={20} />
            <Text style={styles.text}>{date || period}</Text>
          </View>
          <AnimArrowIcon style={iconStyle} />
        </View>
      </Pressable>
      {dateError && <Text style={styles.error}>{dateError}</Text>}
      <RNCalendar
        theme={{
          arrowColor: Theme.colors.primary.main,
          backgroundColor: 'black',
        }}
        style={styles.calendar}
        markedDates={{
          [date]: { selected: true, selectedColor: Theme.colors.primary.main },
        }}
        onDayPress={handleDate}
        {...props}
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
  error: {
    height: 20,
    marginVertical: 10,
    fontFamily: Theme.fonts.poppinsRegular,
    color: 'red',
    alignSelf: 'center',
  },
})

export default Calendar
