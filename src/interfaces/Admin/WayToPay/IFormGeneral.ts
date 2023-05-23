export default interface IFormGeneral {
    id?: number
    company_id?: number|null
    in_use?: number|null
    code: number|null
    name: string
    related_to_id: number|null
    ledger_account_auxiliary_id: number|null
    payment_method_id: number|null
  }