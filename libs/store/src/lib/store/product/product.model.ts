export interface Product {
  id?: string
  productName: string
  imageUrl: string
  quantity: number
  description: string
  price: number
  transactionProducts?: any[]
  courtGroup?: any,
  courtGroupId: string
}
