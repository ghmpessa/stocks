import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native'

import { Theme } from '../../styles/theme'

import { LineChart } from 'react-native-chart-kit'
import Title from '../../components/Title'
import { handleSection, sortArray } from '../../utils/stock-functions'
import { useAppContext } from '../../contexts/AppContext'

const Charts: React.FC = () => {
  const { state } = useAppContext()
  const { data: stocks } = state

  const values = handleSection(stocks)

  const dates = values.map(item => item.date)
  const sortDates = sortArray('asc', dates)

  const data = values
    .slice(sortDates.length > 7 ? sortDates.length - 8 : 0)
    .map(item =>
      item.data.map(item2 => parseFloat(item2.price)).reduce((a, b) => a + b)
    )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle='light-content'
      />
      <Title title='Gráfico' />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={{ flex: 1, marginVertical: 10 }}
      >
        <LineChart
          data={{
            labels: sortDates
              .slice(sortDates.length > 7 ? sortDates.length - 8 : 0)
              .map(date => {
                const day = date.slice(8).padStart(2, '0')
                const month = date.slice(5, 7).padStart(2, '0')
                const formattedDate = `${day}/${month}`
                return formattedDate
              }),
            datasets: [
              {
                data,
              },
            ],
          }}
          width={Dimensions.get('window').width - 20}
          height={320}
          yAxisLabel='$'
          chartConfig={{
            backgroundColor: Theme.colors.primary.main,
            backgroundGradientFrom: Theme.colors.primary.light,
            backgroundGradientTo: Theme.colors.primary.main,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 4,
              padding: 10,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: Theme.colors.primary.main,
            },
          }}
          style={{
            borderRadius: 4,
            padding: 10,
            alignSelf: 'center',
          }}
        />
        <Text style={styles.text}>Dia x Dinheiro Gasto</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100,
    alignItems: 'center',
  },
  text: {
    fontFamily: Theme.fonts.poppinsMedium,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.25,
  },
})

export default Charts
