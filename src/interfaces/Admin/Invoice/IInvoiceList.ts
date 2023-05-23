export default interface IInvoiceList {
  id?: number;
  typesReceiptInvoice_id?: number | null;
  third_id?: number | null;
  user_id?: number | null;
  currencie_id?: number | null;
  date_elaboration: string;
  number: number;
}
