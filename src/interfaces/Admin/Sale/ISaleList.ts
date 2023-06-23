export default interface ISaleList {
  id?: number
  inventory_reference: null | string
  inventory_purchaseValue: null | number
  inventory_saleValue: null | number
  description: null | string
  total: null | number
  utilities: null | number,
  price_vehicle: null | number,
  barter: null | string
}
