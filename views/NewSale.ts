import SaleBuilder from "../builders/Sale.builder"
import Seller from "../entities/Seller"
import SalesService from "../services/Sales.service"
import SellerService from "../services/Seller.service"
import Terminal from "../utils/TerminalHandler"
import ListSales from "./ListSales"

export default class NewSale {
  private listSales: ListSales

  constructor(
    private terminal: Terminal,
    private sellerService: SellerService,
    private saleService: SalesService
  ) {
    this.listSales = new ListSales(terminal, saleService, sellerService)
  }

  async sellerName(): Promise<Seller> {
    const sellerName = await this.terminal.question('Enter the seller name: ')
    try {
      const seller = this.sellerService.getByName(sellerName)
      return seller
    } catch (error) {
      if (error.code === 404) {
        console.log('Seller name not found. Please try again.')
        return this.sellerName()
      } else {
        console.error(error)
      }
    }
  }

  async saleValue(saleBuilder: SaleBuilder) {
    const value = await this.terminal.question('Enter the sale value (e.g. 1000.30): ')
    try {
      saleBuilder.setValue(Number(value))
    } catch (error) {
      console.log('Value is not valid, please try again with a valid value format.')
      await this.saleValue(saleBuilder)
    }
  }

  async saleDate(saleBuilder: SaleBuilder) {
    const date = await this.terminal.question('Enter the date of the sale "mm/dd/yyyy"(e.g 09/30/2021): ')
    try {
      saleBuilder.setDate(date)
    } catch (error) {
      console.log('Date is not valid, please try again with a valid date format.')
      await this.saleDate(saleBuilder)
    }
  }

  async render() {
    const saleBuilder = new SaleBuilder()
    
    const seller = await this.sellerName()
    saleBuilder.setSeller(seller)

    const customerName = await this.terminal.question('Enter the customer name: ')
    saleBuilder.setCustomerName(customerName)

    const itemName = await this.terminal.question('Enter the item name: ')
    saleBuilder.setItemName(itemName)

    await this.saleValue(saleBuilder)
    
    await this.saleDate(saleBuilder)

    this.saleService.newSale(saleBuilder.build())

    this.listSales.listAllSalesOrderedByValue()
  }
}