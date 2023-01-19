import React, { useState } from 'react'
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button, Calendar, TextInput } from '../../components'

import { Theme } from '../../styles/theme'

import Hashtag from '../../../assets/hashtag.svg'
import Currency from '../../../assets/currency.svg'
import Name from '../../../assets/name.svg'
import { StockType } from '../../types/stock'
import Title from '../../components/Title'
import { useAppContext } from '../../contexts/AppContext'
import { fetchHoliday } from '../../utils/fetch-holiday'

const AddStock: React.FC = () => {
  const { state, actions } = useAppContext()

  const { data, loading } = state

  const [stock, setStock] = useState<StockType>({
    code: '',
    name: '',
    price: '',
    date: '',
  })

  const isDisabled =
    stock.code.length === 0 ||
    stock.name.length === 0 ||
    stock.price.length === 0 ||
    stock.date.length === 0 ||
    loading

  const handleAdd = () => {
    if (loading) return
    data.push(stock)
    actions.add(data)
  }

  const handleDate = async (date: string) => setStock(p => ({ ...p, date }))

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle='light-content'
      />
      <Title title='Adicionar Ação' back />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={{
          backgroundColor: Theme.colors.background,
        }}
      >
        <View style={styles.contentContainer}>
          <TextInput
            label='Código'
            leftIcon={<Hashtag width={20} height={20} />}
            value={stock.code}
            onChangeText={code => setStock(p => ({ ...p, code }))}
          />
          <TextInput
            label='Nome'
            leftIcon={<Name width={20} height={20} />}
            value={stock.name}
            onChangeText={name => setStock(p => ({ ...p, name }))}
          />
          <TextInput
            label='Valor'
            leftIcon={<Currency width={20} height={20} />}
            value={stock.price}
            keyboardType='numeric'
            onChangeText={price => setStock(p => ({ ...p, price }))}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Data</Text>
            <Calendar onSelect={handleDate} />
          </View>
        </View>
        <Button title='adicionar' onPress={handleAdd} disabled={isDisabled} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    justifyContent: 'space-between',
    flexGrow: 1,
    position: 'relative',
  },
  contentContainer: {
    backgroundColor: Theme.colors.card,
    paddingVertical: 10,
    borderRadius: 4,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginVertical: 20,
    flex: 1,
  },
  inputLabel: {
    fontFamily: Theme.fonts.poppinsMedium,
    color: '#b8b8b8',
    fontSize: 16,
  },
})

export default AddStock
