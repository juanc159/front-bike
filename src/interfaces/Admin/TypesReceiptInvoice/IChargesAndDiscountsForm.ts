export default interface IChargesAndDiscountsForm {
  id?: number | null
  in_use:boolean| number | null
  name: string | null
  type_id: number | null
  fee: number
  ledgerAccount_id: number | null
  ledgerAccount_table: string | null
  delete?:number | null
}