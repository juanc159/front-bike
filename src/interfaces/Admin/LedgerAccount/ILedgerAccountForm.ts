export default interface ILedgerAccountForm {
    id?: number|undefined
    code:string
    name: string
    ledgerAccountClass_id?:number
    ledgerAccountGroup_id?:number
    company_id:number|null
    ledgerAccountCategory_id?:number
    ledgerAccountBalance_id?:number
    tax_difference_account?:boolean|number
    active?:boolean|number
    relatedTo?:string
  }