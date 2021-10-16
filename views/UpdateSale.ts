import Seller from "../entities/Seller";
import SalesService from "../services/Sales.service";
import SellerService from "../services/Seller.service";
import { checkDateStringFormat, isValidDate } from "../utils/DateHelpers";
import { isValidNumber } from "../utils/NumberHelpers";
import Terminal from "../utils/TerminalHandler";

export default class UpdateSale {
  constructor(
    private terminal: Terminal,
    private saleService: SalesService,
    private sellerService: SellerService
  ) {}

  async sellerName(): Promise<Seller> {
    const sellerName = await this.terminal.question('Enter new seller name: ')
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

  async saleValue(): Promise<number> {
    const value = await this.terminal.question('Enter new sale value (e.g. 1000.30): ')
    const numberValue = Number(value)

    if (!isValidNumber(numberValue)) {
      console.log('Value typed is not a valid number. Please try again.')
      return this.saleValue()
    }

    return numberValue
  }

  async saleDate() {
    const date = await this.terminal.question('Enter new date for the sale "mm/dd/yyyy"(e.g 09/30/2021): ')

    if (!checkDateStringFormat(date)) {
      console.log('Date typed is not in a valid format. Please try again following the example.')
      return this.saleDate()
    }

    const newDate = new Date(date)

    if (!isValidDate(newDate)) {
      console.log('Date typed is not a valid Date. Please try again.')
      return this.saleDate()
    }

    return newDate
  }

  async render() {
    const id = await this.terminal.question('Enter the ID of the sale you would like to update: ')
    const numberId = Number(id)

    if (!isValidNumber(numberId)) {
      console.log('Id provide is not a valid number. Please try again.')
      await this.render()
    }

    try {
      const sale = this.saleService.getSale(numberId)

      console.log(`
Sale:
  - ID: ${sale.id}
  - Seller: ${sale.seller.name}
  - Customer: ${sale.customerName}
  - Item: ${sale.itemName}
  - Value: ${sale.value}
  - Date: ${sale.date.toDateString()}`)
      
      loopLabel: while(true) {

        const updateOption = await this.terminal.question(`
  Update menu:
    (1) Seller
    (2) Customer Name
    (3) Item Name
    (4) Value
    (5) Date
    (6) Exit update
  Type the number of option menu: `)
  
        switchLabel: switch (Number(updateOption)) {
          case 1:
            const seller = await this.sellerName()
            sale.seller = seller
            break switchLabel
          case 2:
            const customerName = await this.terminal.question('Enter new customer name: ')
            sale.customerName = customerName
            break switchLabel
          case 3:
            const itemName = await this.terminal.question('Enter new item name: ')
            sale.itemName = itemName
            break switchLabel
          case 4:
            const value = await this.saleValue()
            sale.value = value
            break switchLabel
          case 5:
            const date = await this.saleDate()
            sale.date = date
            break switchLabel
          case 6:
            break loopLabel
          default:
            console.log('Please provide one of the numbers from the menu.')
            continue loopLabel
        }

        const confirm = await this.terminal.question('Would you like to update now? Choosing "no" you can keep updating fields (yes/no)')

        if (confirm === 'yes' || confirm === 'y') {
          const updatedSale = this.saleService.editSale(numberId, sale)
          console.log(`
Sale new values:
  - ID: ${updatedSale.id}
  - Seller: ${updatedSale.seller.name}
  - Customer: ${updatedSale.customerName}
  - Item: ${updatedSale.itemName}
  - Value: ${updatedSale.value}
  - Date: ${updatedSale.date.toDateString()}`)
          break loopLabel
        }
      }
    } catch (error) {
      console.log('Could not found sale. Please try again.')
      await this.render()
    }
  }
}