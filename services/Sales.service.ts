import Sale, { SaleDTO } from "../entities/Sale";
import ISaleRepository from "../interfaces/SaleRepository.interface";

export default class SalesService {
  constructor(private saleRepository: ISaleRepository) {}

  newSale(sale: SaleDTO) {
    this.saleRepository.save(sale)
  }

  getSale(id: number) {
    const sale = this.saleRepository.get(id)
    if (typeof sale === 'undefined') {
      throw new Error('Sale not found')
    }
    return sale
  }

  getAllSales(): Sale[] {
    return this.saleRepository.getAll()
  }

  getSalesBySeller(sellerId: number) {
    const sales = this.saleRepository.getAll()
    return sales.filter(sale => sale.seller.id === sellerId)
  }

  editSale(id: number, sale: Partial<Sale>) {
    return this.saleRepository.update(id, sale)
  }

  removeSale(id: number): Sale {
    return this.saleRepository.remove(id)
  }
}