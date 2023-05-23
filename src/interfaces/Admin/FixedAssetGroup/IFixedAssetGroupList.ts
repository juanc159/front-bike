export default interface IFixedAssetGroupList {
    id?: number,
    company_id: number | null,
    inUse: boolean | null,
    code: string | null,
    name: string | null,
    vrBuys_name: string | null,
    depreciation_name: string | null,
    depreciationExpense_name: string | null,
    fiscalDepreciation_name: string | null,
    taxDepreciationExpense_name: string | null,
}
