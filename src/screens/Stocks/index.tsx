import React, { useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Title from '../../components/Title'
import { useAppContext } from '../../contexts/AppContext'

import { Theme } from '../../styles/theme'
import { SectionType } from '../../types/stock'
import { handleSection, sortArray } from '../../utils/stock-functions'
import { Filter, SectionHeader, SectionItem } from './components'

const Stocks: React.FC = () => {
  const { state } = useAppContext()
  const { data: stocks } = state

  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const sections: SectionType[] = handleSection(stocks)
  const sortSections = sortArray(order, sections)

  return (
    <SafeAreaView
      style={{
        backgroundColor: Theme.colors.background,
        flex: 1,
      }}
    >
      <StatusBar
        backgroundColor={Theme.colors.background}
        barStyle='light-content'
      />
      <Title title='Minhas Ações' />

      <Filter onFilter={order => setOrder(order)} />

      <SectionList
        sections={sortSections}
        contentContainerStyle={styles.scrollContainer}
        keyExtractor={(item, index) => `${item.code}${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <SectionItem isFirstItem={index === 0} item={item} />
        )}
        renderSectionHeader={({ section: { date } }) => (
          <SectionHeader date={date} />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyLabel}>Nenhuma ação registrada.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 90,
    justifyContent: 'space-between',
    flexGrow: 1,
    position: 'relative',
  },
  contentContainer: {
    backgroundColor: '#242632',
    paddingVertical: 10,
    borderRadius: 4,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginVertical: 20,
    flex: 1,
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
  price: {
    fontFamily: Theme.fonts.poppinsMedium,
    color: '#b8b8b8',
    lineHeight: 30,
    marginTop: 4,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyLabel: {
    fontFamily: Theme.fonts.poppinsRegular,
    color: Theme.colors.white,
    fontSize: 14,
    lineHeight: 20,
  },
})

export default Stocks
