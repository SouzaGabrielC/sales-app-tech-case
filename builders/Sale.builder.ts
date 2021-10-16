import Sale from "../entities/Sale"
import Seller from "../entities/Seller"
import { checkDateStringFormat, isValidDate } from "../utils/DateHelpers"
import { isValidNumber } from "../utils/NumberHelpers"

export default class SaleBuilder {
  id?: number
  seller: Seller
  customerName: string
  date: Date
  itemName: string
  value: number

  setSeller(seller: Seller) {
    this.seller = seller
  } 

  setCustomerName(customerName: string) {
    this.customerName = customerName
  }

  setDate(dateString: string) {
    if (!checkDateStringFormat(dateString)) {
      throw new Error('Date string is not in the format "dd/mm/yyyy"')
    }
    const newDate = new Date(dateString)
    if (!isValidDate(newDate)) {
      throw new Error('Date is not valid')
    }
    this.date = newDate
  }

  setItemName(itemName: string) {
    this.itemName = itemName
  }

  setValue(value: number) {
    if (!isValidNumber(value)) {
      throw new Error('Value has to be a number');
    }

    this.value = value
  }

  setId(id: number) {
    this.id = id
  }

  build(): Sale {
    const sale = new Sale(this)
    return sale 
  }
}