export default interface IGeneralList {
    id?: number
    company_id?: number
    in_use: number|null
    code: string
    name: string
    related_to_name: string
    ledger_account_auxiliary_name: string
    payment_method_name: string
  }