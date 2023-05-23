export default interface IWorkingInformationForm {
  id?: number
  company_id: null|number
  employee_id?: null|number
  typeContract_id: null|number
  contractStartDate: null|string
  contractFinalDate: null|string
  salary: null|number
  comprehensive_salary: null|string
  contract_number: null|string
  payroll_group: null|string
  charge_id: null|number
  typeContributor_id: null|number
  subTypeContributor_id: null|number
  health_background_id: null|number
  health_fund_percentage: null|string
  pension_fund_id: null|string
  pension_fund_percentage: null|string
  arl_id: null|number
  risk_class_id: null|number
  code_ciiu: null|string
  code_id: null|number
  compensation_box_id: null|number
  severance_fund_id: null|number
  withholding_deductions: null|string
  reasonRetirement_id: null|number
}
