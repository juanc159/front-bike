export default interface IEmployeeList {
  id?: number
  company_id: null| number
  name: null|string
  last_name: null|string
  type_identifications_id: null|string
  type_identifications_name: null|string
  document_number: null|string
  email: null|string
  residenceAddress: null|string
  residenceDepartament_id: null|number
  residenceCity_id: null|number
  officeDepartament_id: null|number
  officeCity_id: null|number
  paymentMethod_id: null|number
}
