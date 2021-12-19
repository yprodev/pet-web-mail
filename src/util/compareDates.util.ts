import { CompareDates } from '../types'

const compareDates: CompareDates = (elementOne, elementTwo) =>
  new Date(elementTwo.header.date).getDate() - new Date(elementOne.header.date).getDate()

export default compareDates
