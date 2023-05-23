export default interface IProductForm {
  id?: null| number
  typeProduct_id: null | number
  company_id: null | number 
  code: null | string
  ivaIncluded: null | string
  name: null | string
  price: null | string
  taxCharge_id: null | string
  unitOfMeasurement_id: null | number
  unitOfMeasurement: null | string
  factoryReference: null | string
  barcode: null | string
  description: null | string
  taxClassification_id: null | number
  withholdingTaxes_id: null | string
  valueInpoconsumo: null | string
  applyConsumptionTax: null | string
  model: null | string
  tariffCode: null | string
  mark: null | string
}
