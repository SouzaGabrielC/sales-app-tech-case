import Sale, { SaleDTO } from "../entities/Sale";

export default interface ISaleRepository {
  get(id: number): Sale | undefined
  save(sale: SaleDTO): void
  getAll(): Sale[]
  update(id: number, updateData: Partial<SaleDTO>): Sale
  remove(id: number): Sale
}