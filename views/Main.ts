import SalesService from "../services/Sales.service";
import SellerService from "../services/Seller.service";
import Terminal from "../utils/TerminalHandler";
import DeleteSale from "./DeleteSale";
import ListSales from "./ListSales";
import NewSale from "./NewSale";
import UpdateSale from "./UpdateSale";

export default class Main {
  private newSaleView: NewSale
  private deleteSaleView: DeleteSale
  private listView: ListSales
  private updateView: UpdateSale

  constructor(
    private terminal: Terminal,
    private sellerService: SellerService,
    private saleService: SalesService
  ) {
    this.newSaleView = new NewSale(
      terminal,
      sellerService,
      saleService
    )

    this.deleteSaleView = new DeleteSale(
      terminal,
      saleService
    )

    this.listView = new ListSales(
      terminal,
      saleService,
      sellerService
    )

    this.updateView = new UpdateSale(
      terminal,
      saleService,
      sellerService
    )
  }

  async render() {
    const option = await this.terminal.question(`
Menu:
  (1) Insert new sale
  (2) Update sale
  (3) Delete sale
  (4) List sales
  (5) Exit
Type the number of menu option: `)

    switch (Number(option)) {
      case 1:
        await this.newSaleView.render()
        break
      case 2:
        await this.updateView.render()
        break
      case 3: 
        await this.deleteSaleView.render()
        break
      case 4:
        await this.listView.render()
        break
      case 5:
        process.exit()
      default: 
        console.log('Please provide one of the options number from the menu.')
    }
  }
}