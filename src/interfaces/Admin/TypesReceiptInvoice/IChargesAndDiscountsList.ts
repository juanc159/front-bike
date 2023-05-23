export default interface IChargesAndDiscountsList {
  id?: number | null
  in_use:boolean| number | null
  name: string | null
  type_name?: string
  type_id: number | null
  fee: number
  ledgerAccount_name?: string
  ledgerAccount_id: number | null
  ledgerAccount_table: string | null
  delete?:number | null
}