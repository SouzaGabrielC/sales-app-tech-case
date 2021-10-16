export default class Seller {
  id: number
  name: string
}

export type SellerDTO = Omit<Seller, 'id'>