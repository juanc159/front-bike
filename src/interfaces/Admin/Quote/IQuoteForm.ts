export default interface IQuoteForm {
  id?: number | null;
  typesQuote_id: number | null;
  customer_id: number | null;
  seller_id: number | null;
  currency_id: number | null;
  date_elaboration: string;
  date_expiration: string;
  number: number | null;
  observation: string | null;
}