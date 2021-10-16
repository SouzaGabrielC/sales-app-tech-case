import Seller from "../entities/Seller";
import ISellerRepository from "../interfaces/SellerRepository.interface";

export default class SellerService {
  constructor(private sellerRepository: ISellerRepository) {}

  getByName(name: string): Seller {
    try {
      const seller = this.sellerRepository.getByName(name)
      if (typeof seller === 'undefined') {
        throw {
          code: 404,
          msg: 'Seller not found'
        }
      }
      return seller
    } catch (error: unknown) {
      throw error
    }
  }

  getAll(): Seller[] {
    return this.sellerRepository.getAll()
  }
}