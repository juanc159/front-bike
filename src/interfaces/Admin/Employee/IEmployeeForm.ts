export default interface IEmployeeForm {
  id?: null|number
  company_id: null|number
  name: null|string
  last_name: null|string
  type_identifications_id: null|string
  document_number: null|string
  email: null|string
  residenceAddress: null|string
  cellPhoneNumber: null|number
  residenceDepartament_id: null|number
  residenceCity_id: null|number
  officeDepartament_id: null|number
  officeCity_id: null|number
  paymentMethod_id: null|number
  residenceOffice: null|string 
  cellPhoneNumberPay: null|number
  kind_procedure_id: null|number
  banking_entity_id: null|number
  account_number: null|number
  account_type_id: null|number
}
