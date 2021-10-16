import Sale, { SaleDTO } from "../entities/Sale";
import ISaleRepository from "../interfaces/SaleRepository.interface";

export default class SaleMemoryRepository implements ISaleRepository{
  private sales: Sale[]

  private lastId = 0

  constructor() {
    this.sales = []
  }

  getAll(): Sale[] {
    return this.sales
  }
  
  get(id: number): Sale | undefined {
    return {
      ...this.sales.find(sale => sale.id === id)
    }
  }

  save(sale: SaleDTO): void {
    this.lastId += 1
    const newSale: Sale = {
      id: this.lastId,
      ...sale
    }
    if (this.sales.length === 0) {
      this.sales.push(newSale)
      return 
    }

    this.sales.unshift(newSale)
    this.sales.sort((prevSale, nextSale) => nextSale.value - prevSale.value)
  }

  update(id: number, updateData: Partial<Sale>): Sale {
    const sale = this.sales.find(sale => sale.id === id)
    
    if (typeof sale === 'undefined') {
      throw new Error('Could not update: Sale not found.')
    }

    Object.keys(updateData).forEach(key => {
      sale[key] = updateData[key]
    })

    return sale
  }

  remove(id: number): Sale {
    const saleIndex = this.sales.findIndex(sale => sale.id === id)
    
    if (saleIndex === -1) {
      throw new Error('Could not delete Sale: Sale not found.')
    }
    
    const sale = this.sales[saleIndex]
    this.sales.splice(saleIndex)
    return sale
  }
}