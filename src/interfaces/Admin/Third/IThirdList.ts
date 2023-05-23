export default interface IThirdList {
    id?: number
    name:string
    last_name:string
    trade_name:string
    identifications:string
    branch_code:string
    city:string
    address:string
    contact_name:string
    contact_last_name:string
    nametypeIdentificaction:string
    nametypeRegimenIva:string
    email_fac:string
    state:number|string
    indicative:string
    phone_fac:string
    postal_code:string
    observations:string
    basic_data_types_id?:number|null
    type_identifications_id?:number|null
    type_regime_ivas_id?:number|null
    seller_id?:number|null
    debt_seller_id?:number|null
    company_id?:number|null
  }