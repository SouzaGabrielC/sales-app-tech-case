import Seller, { SellerDTO } from "../entities/Seller";

export default interface ISellerRepository {
  get(id: number): Seller
  getAll(): Seller[]
  getByName(name: string): Seller
  save(seller: SellerDTO): void
  update(id: number, updateData: Partial<SellerDTO>): Seller
  remove(id: number): Seller
}