import SaleJsonRepository from "./repositories/SaleJson.repository";
import SaleMemoryRepository from "./repositories/SaleMemory.repository";
import SellerJsonRepository from "./repositories/SellerJson.repository";
import SalesService from "./services/Sales.service";
import SellerService from "./services/Seller.service";
import Terminal from "./utils/TerminalHandler";
import Main from "./views/Main";

const terminal = new Terminal()

async function main() {
  const sellerService = new SellerService(new SellerJsonRepository())
  const saleService = new SalesService(new SaleJsonRepository())
  
  const mainView = new Main(
    terminal,
    sellerService,
    saleService
  )
  
  for(;;) {
    await mainView.render()
  }
}

main().catch((err) => {
  console.error(err)
})
.finally(() => terminal.close())