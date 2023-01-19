import { SectionType, StockType } from '../types/stock'

export const handleSection = (stocks: StockType[]): SectionType[] => {
  const dates = stocks.map(item => item.date)
  const datesNoRepeat = dates.filter(
    (item, index) => dates.indexOf(item) === index
  )
  const sections: SectionType[] = datesNoRepeat.map(date => {
    return {
      date,
      data: stocks.filter(stock => stock.date === date),
    }
  })

  return sections
}

export const sortArray = (order: 'asc' | 'desc', arr: any[]): any[] => {
  const isAsc = order === 'asc'
  const sortedArr = arr.sort((a, b) => {
    const d1 = new Date(typeof b === 'string' ? b : b.date).getTime()
    const d2 = new Date(typeof a === 'string' ? a : a.date).getTime()

    return isAsc ? d2 - d1 : d1 - d2
  })

  return sortedArr
}
