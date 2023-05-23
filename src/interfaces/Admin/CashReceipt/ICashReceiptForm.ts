export default interface ICashReceiptForm {
    id?: number;
    crConfigurations_id:null|number;
    company_id?:null|number;
    number:null|number|string;
    customer_id:null|number;
    date_elaboration:null|string;
    perform_id:null|number;
    auxSubAux_id:null|number;
    auxSubAux_table?:null|string;
    currencie_id:null|number;
    received_value:null|number|string;
    observation?:null|string;
    ckeckCashRecipt?:null|boolean|number
  }