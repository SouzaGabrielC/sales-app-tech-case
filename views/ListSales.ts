import SalesService from "../services/Sales.service";
import Terminal from "../utils/TerminalHandler";
import cli from 'cli-ux'
import SellerService from "../services/Seller.service";

export default class ListSales {
  constructor(
    private terminal: Terminal,
    private saleService: SalesService,
    private sellerService: SellerService
  ) {}

  listAllSalesOrderedByValue () {
    const salesOrdered = this.saleService.getAllSales()
    console.log('')
    cli.table(salesOrdered, {
      id: {
        header: 'Sale ID'
      },
      seller: {
        get: row => row.seller.name 
      },
      customerName: {
        header: 'Customer Name'
      },
      itemName: {
        header: 'Item Name'
      },
      value: {
        header: 'Sale Value'
      },
      date: {
        header: 'Sale Date',
        get: row => row.date.toDateString()
      }
    })
  }

  listSellersAmountSold() {
    const sellers = this.sellerService.getAll()
    const sellersData = []
    
    for(const seller of sellers) {
      const amount = this.saleService.getSalesBySeller(seller.id).reduce<number>((amount, sale) => amount + sale.value , 0)
      sellersData.push({
        ...seller,
        amountSold: amount
      })
    }

    sellersData.sort((prev, next) => next - prev)
    console.log('')
    cli.table(sellersData, {
      id: {
        header: 'Seller ID'
      },
      name: {
        header: 'Seller Name'
      },
      amountSold: {
        header: 'Total sales amount'
      }
    })
  }

  async render() {
    const option = await this.terminal.question(`
List menu:
    (1) List all sales ordered by value
    (2) List sellers total amount sold
    (3) Back to main menu
Type the number of menu option: `)

    switch (Number(option)) {
      case 1:
        this.listAllSalesOrderedByValue()
        break
      case 2:
        this.listSellersAmountSold()
        break
      case 3:
        break
      default: 
        console.log('Please type a valid number option from the list menu.')
        await this.render()
    }
  }
}