export default interface IQuoteList {
  id: number;
  typesQuote_id: number;
  customer_id: number;
  seller_id: number;
  currency_id: number;
  company_id: number;
  date_elaboration: string;
  number: number;
  gross_total: number;
  discount: number;
  subtotal: number;
  total_form_payment: number;
  net_total: number;
  type_name: string;
  third_name: string;
  user_name: string;
  currency_name: string;
  company_name: string;
  state_id: number;
  state_name: string;
}
