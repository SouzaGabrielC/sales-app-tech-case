import { readFileSync, writeFileSync } from 'fs';
import path from 'path'
import Sale, { SaleDTO } from "../entities/Sale";
import ISaleRepository from "../interfaces/SaleRepository.interface";

export default class SaleJsonRepository implements ISaleRepository{
  private salesJsonPath: string

  constructor() {
    this.salesJsonPath = path.resolve('json/Sales.json')
  }

  get(id: number): Sale {
    const { sales } = this.readFile()
    return sales.find(sale => sale.id === id)
  }

  save(sale: SaleDTO): void {
    let { sales, lastId } = this.readFile()
    lastId += 1
    const newSale: Sale = {
      id: lastId,
      ...sale
    }

    if (sales.length === 0) {
      sales.push(newSale)
      this.updateFile(sales, lastId)
      return 
    }

    sales.unshift(newSale)
    sales.sort((prevSale, nextSale) => nextSale.value - prevSale.value)

    this.updateFile(sales, lastId)
  } 

  getAll(): Sale[] {
    const { sales } = this.readFile()
    return sales
  }

  update(id: number, updateData: Partial<SaleDTO>): Sale {
    const { sales, lastId } = this.readFile()
    const sale = sales.find(sale => sale.id === id)
    
    if (typeof sale === 'undefined') {
      throw new Error('Could not update: Sale not found.')
    }

    Object.keys(updateData).forEach(key => {
      sale[key] = updateData[key]
    })

    this.updateFile(sales, lastId)

    return sale
  }

  remove(id: number): Sale {
    const { sales, lastId } = this.readFile()
    const saleIndex = sales.findIndex(sale => sale.id === id)
    
    if (saleIndex === -1) {
      throw new Error('Could not delete Sale: Sale not found.')
    }
    
    const sale = sales[saleIndex]
    sales.splice(saleIndex)

    this.updateFile(sales, lastId)
    return sale
  }
  
  readFile(): { sales: Sale[], lastId: number } {
    const {sales, lastId } = JSON.parse(readFileSync(this.salesJsonPath, 'utf-8'))

    sales.forEach(sale => {
      sale.date = new Date(sale.date)
    });

    return {
      sales,
      lastId
    }
  }

  updateFile(sales: Sale[], lastId: number): void {
    const jsonContent = {
      sales,
      lastId
    }

    writeFileSync(this.salesJsonPath, JSON.stringify(jsonContent))
  }
}