import SaleBuilder from "../builders/Sale.builder";
import Seller from "./Seller";

export default class Sale {
  id: number
  seller: Seller
  customerName: string
  date: Date
  itemName: string
  value: number

  constructor(saleBuilder: SaleBuilder) {
    this.seller = saleBuilder.seller
    this.customerName = saleBuilder.customerName
    this.date = saleBuilder.date
    this.itemName = saleBuilder.itemName
    this.value = saleBuilder.value
  }
}

export type SaleDTO = Omit<Sale, 'id'>