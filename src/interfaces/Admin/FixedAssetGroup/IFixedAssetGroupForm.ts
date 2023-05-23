export default interface IFixedAssetGroupForm {
  id: number | null,
  company_id: number | null,
  code: string | null,
  name: string | null,
  vrBuys_id: number | null,
  vrBuys_table: string | null,
  depreciation_id: number | null,
  depreciation_table: string | null,
  depreciationExpense_id: number | null,
  depreciationExpense_table: string | null,
  fiscalDepreciation_id: number | null,
  fiscalDepreciation_table: string | null,
  taxDepreciationExpense_id: number | null,
  taxDepreciationExpense_table: string | null
}
