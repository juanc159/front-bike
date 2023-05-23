export default interface ICashReceiptConfigurationForm {
  id?: number | null
  company_id: number | null
  code: string | null
  title: string | null
  description: string | null
  printFormat: string | null
  manageCostCenters: string | null
  isRequired: boolean | null | number
  default: string | null
  automaticNumbering: boolean | null
  consecutive: string | null
  subject: string | null
  ledgerAccount_id: number | null
  table: string | null
}
