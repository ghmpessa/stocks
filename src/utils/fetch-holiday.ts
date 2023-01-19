import axios, { AxiosResponse } from 'axios'

export const fetchHoliday = async (year: number) => {
  let response: AxiosResponse
  try {
    response = await axios.get(
      `https://brasilapi.com.br/api/feriados/v1/${year})`
    )
    const { data: holidays } = response
    return holidays
  } catch (error: any) {
    const { name } = error.response.data
    return name
  }
}
