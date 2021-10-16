import SalesService from "../services/Sales.service";
import { isValidNumber } from "../utils/NumberHelpers";
import Terminal from "../utils/TerminalHandler";

export default class DeleteSale {
  constructor(
    private terminal: Terminal,
    private saleService: SalesService
  ) {}
  
  async render() {
    const id = await this.terminal.question('Enter the sale id: ')
    const numberId = Number(id)

    if (!isValidNumber(numberId)) {
      console.log('Id provide is not a valid number. Please try again.')
      await this.render()
    }

    try {
      this.saleService.removeSale(numberId)
    } catch (error) {
      console.log('Could not remove sale.')
    }
  }
}