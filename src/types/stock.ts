export type StockType = {
  code: string
  name: string
  price: string
  date: string
}

export type SectionType = {
  date: string
  data: StockType[]
}
