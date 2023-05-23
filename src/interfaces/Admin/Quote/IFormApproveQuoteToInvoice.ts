export default interface IFormApproveQuoteToInvoice {
  quoute_id: number | null
  typesReceiptInvoice_id: number | null
  number: number | null
  arrayWayToPay: Array<object>
}