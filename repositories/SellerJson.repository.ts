import { readFileSync, writeFileSync } from 'fs';
import path from 'path'
import Seller from "../entities/Seller";
import ISellerRepository from "../interfaces/SellerRepository.interface";

export default class SellerJsonRepository implements ISellerRepository {
  private sellersJsonPath: string

  constructor() {
    this.sellersJsonPath = path.resolve('json/Sellers.json')
  }

  get(id: number): Seller | undefined {
    const sellers = this.readFile()

    return sellers.find(seller => seller.id === id)
  }

  getAll() {
    const sellers = this.readFile()
    return sellers
  }

  getByName(name: string): Seller {
    const sellers = this.readFile()

    return sellers.find(seller => seller.name === name)
  }

  save(seller: Seller): void {
    throw new Error("Method not implemented.");
  }

  update(id: number, updateData: Partial<Seller>): Seller {
    throw new Error("Method not implemented.");
  }

  remove(id: number): Seller {
    throw new Error("Method not implemented.");
  }

  readFile(): Seller[] {
    return JSON.parse(readFileSync(this.sellersJsonPath, 'utf-8')).sellers as Seller[]
  }

  updateFile(sellers: Seller[]): void {
    const jsonContent = {
      sellers
    }

    writeFileSync(this.sellersJsonPath, JSON.stringify(jsonContent))
  }
}