export default interface ITypesReceiptInvoiceForm {
    id?: number | null
    company_id:number
    inUse:boolean|number
    voucherCode:null|string|number
    voucherName:null|string
    useAsElectronicDocument:boolean|number
    resolutionNumberDian:null|number
    effectiveDate:null|string
    validityInMonths_id:null|number
    endDateValidity:null|string
    prefix:null|string
    initialNumbering:null|number
    finalNumbering:null|number
    nextInvoiceNumber:null|number|string
    automaticNumbering:number|boolean
    deliveryOrder:number|boolean
    purchaseOrder:number|boolean
    includeDecimals:number|boolean
    activateVendorsByItem:number|boolean
    enableCrossRemittances:number|boolean
    discountTypePerItem_id:number|null
    LedgerAccountsDiscount_id:number|null
    LedgerAccountsGift_id:number|null
    LedgerAccountsDiscount_table:string | null
    LedgerAccountsGift_table:string | null
    reteIva:number|boolean
    reteIca:number|boolean
    selfRetaining:number|boolean
    invoicingIncomeForThirdParties:number|boolean
    copaysAdvances:number|boolean
    format_id:number | null
    titleForDisplay:string | null
    departament_id:string | null
    city_id:string | null
    address:string | null
    observations:string | null
    affair:string | null
    attachFile:File | null
  }