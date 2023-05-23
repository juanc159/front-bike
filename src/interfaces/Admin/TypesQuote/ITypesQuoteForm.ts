export default interface ITypesQuoteForm {
  id?: number | null
  company_id: number
  inUse: boolean | number
  voucherCode: null | string | number
  voucherName: null | string
  initialNumbering: null | number
  proxNumberQuote: null | number
  automaticNumbering: number | boolean
  includeDecimals: number | boolean
  discountTypePerItem_id: number | null
  format_id: number | null
  titleForDisplay: string | null
  header: string | null
  conditionsObservations: string | null
  subjectMail: string | null
  contentMail: string | null
}