export default interface IInvoiceForm {
  id?: number | null;
  typesReceiptInvoice_id: number | null;
  customer_id: number | null;
  seller_id: number | null;
  currency_id: number | null;
  date_elaboration: string;
  number: number | null;
  observation: string | null;
  attachFile:File | null;
}
