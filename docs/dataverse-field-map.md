# Dataverse Field Map: PMT Plants Excellence Review System

## Verification Status

This document is based on the generated Power Apps Code App models and the `power.config.json` data-source registration currently in this repository. Generated files under `src/generated/` are authoritative and must not be edited manually.

Verified on 2026-09-13 from:

- `power.config.json`
- `.power/schemas/dataverse/*.Schema.json`
- `src/generated/models/*.ts`
- `src/generated/services/*.ts`

The generated models use the `apma_` publisher prefix. No logical names in this document are placeholders.

## Registered Data Sources

| App data-source key | Dataverse logical name | Entity set name | Generated model | Generated service |
|---|---|---|---|---|
| `pmtplants` | `apma_pmtplants` | `apma_pmtplantses` | `Apma_pmtplantses` | `Apma_pmtplantsesService` |
| `pmtkpidefinitions` | `apma_pmtkpidefinitions` | `apma_pmtkpidefinitionses` | `Apma_pmtkpidefinitionses` | `Apma_pmtkpidefinitionsesService` |
| `pmttarget` | `apma_pmttarget` | `apma_pmttargets` | `Apma_pmttargets` | `Apma_pmttargetsService` |
| `pmtmonthlykpiresults` | `apma_pmtmonthlykpiresults` | `apma_pmtmonthlykpiresultses` | `Apma_pmtmonthlykpiresultses` | `Apma_pmtmonthlykpiresultsesService` |
| `pmtreportcategories` | `apma_pmtreportcategories` | `apma_pmtreportcategorieses` | `Apma_pmtreportcategorieses` | `Apma_pmtreportcategoriesesService` |
| `pmtmonthlyreports` | `apma_pmtmonthlyreports` | `apma_pmtmonthlyreportses` | `Apma_pmtmonthlyreportses` | `Apma_pmtmonthlyreportsesService` |
| `pmtreportattachmentrecord` | `apma_pmtreportattachmentrecord` | `apma_pmtreportattachmentrecords` | `Apma_pmtreportattachmentrecords` | `Apma_pmtreportattachmentrecordsService` |
| `users` | `systemuser` | `systemusers` | `Systemusers` | `SystemusersService` |

## 1. PMT Plants

**Logical name:** `apma_pmtplants`  
**Entity set:** `apma_pmtplantses`  
**Primary ID:** `apma_pmtplantsid` (`UniqueidentifierType`)  
**Primary name:** `apma_name` (`StringType`, required)

| Display name | Logical attribute | Generated property | Type | Notes |
|---|---|---|---|---|
| Plant Name | `apma_name` | `apma_name` | String | Required primary name |
| Display Order | `apma_displayorder` | `apma_displayorder` | Integer | Sort ascending |
| Plant Manager | `apma_plantmanager` | `apma_plantmanager` | Lookup | User lookup; bind with `apma_PlantManager@odata.bind`; label `apma_plantmanagername` |
| Production Manager | `apma_productionmanager` | `apma_productionmanager` | Lookup | User lookup; bind with `apma_ProductionManager@odata.bind`; label `apma_productionmanagername` |
| State / Status | `statecode` / `statuscode` | `statecode` / `statuscode` | State / Choice | Generated status values Active/Inactive |

## 2. PMT KPI Definitions

**Logical name:** `apma_pmtkpidefinitions`  
**Entity set:** `apma_pmtkpidefinitionses`  
**Primary ID:** `apma_pmtkpidefinitionsid`  
**Primary name:** `apma_kpiname` (`StringType`, required)

| Display name | Logical attribute | Generated property | Type | Values / notes |
|---|---|---|---|---|
| KPI Name | `apma_kpiname` | `apma_kpiname` | String | Required |
| KPI Category | `apma_kpicategory` | `apma_kpicategory` | Choice | `457470000` EHS; `457470001` Production; `457470002` Quality |
| Unit | `apma_unit` | `apma_unit` | String | Resolve from this table |
| Display Order | `apma_displayorder` | `apma_displayorder` | Integer | Sort ascending |

## 3. PMT Target

**Logical name:** `apma_pmttarget`  
**Entity set:** `apma_pmttargets`  
**Primary ID:** `apma_pmttargetid`  
**Primary name:** `apma_mainname` (`StringType`, required)

| Display name | Logical attribute | Generated property | Type | Binding / notes |
|---|---|---|---|---|
| Main Name | `apma_mainname` | `apma_mainname` | String | Required |
| Target Year | `apma_targetyear` | `apma_targetyear` | Integer | Filter field |
| Plant Name | `apma_plantname` | `apma_plantname` | Lookup | Bind `apma_PlantName@odata.bind`; ID `_apma_plantname_value`; label `apma_plantnamename` |
| KPI Name | `apma_kpiname` | `apma_kpiname` | Lookup | Bind `apma_KPIName@odata.bind`; ID `_apma_kpiname_value`; label `apma_kpinamename` |
| PY Actual | `apma_pyactual` | `apma_pyactual` | Double | Optional |
| CY Target | `apma_cytarget` | `apma_cytarget` | Double | Optional |

Application uniqueness is Plant lookup + KPI lookup + Target Year. The generated model does not expose alternate-key metadata, so adapters must detect duplicates before create/update.

## 4. PMT Monthly KPI Results

**Logical name:** `apma_pmtmonthlykpiresults`  
**Entity set:** `apma_pmtmonthlykpiresultses`  
**Primary ID:** `apma_pmtmonthlykpiresultsid`  
**Primary name:** `apma_mainname` (`StringType`, required)

| Display name | Logical attribute | Generated property | Type | Values / binding |
|---|---|---|---|---|
| Main Name | `apma_mainname` | `apma_mainname` | String | Required |
| Year | `apma_year` | `apma_year` | Integer | Optional |
| Month | `apma_month` | `apma_month` | Choice | `457470000` = 1 through `457470011` = 12 |
| Plant Name | `apma_plantname` | `apma_plantname` | Lookup | Bind `apma_PlantName@odata.bind`; ID `_apma_plantname_value`; label `apma_plantnamename` |
| KPI Name | `apma_kpiname` | `apma_kpiname` | Lookup | Bind `apma_KPIName@odata.bind`; ID `_apma_kpiname_value`; label `apma_kpinamename` |
| PMT Target | `apma_pmttarget` | `apma_pmttarget` | Lookup | Bind `apma_PMTTarget@odata.bind`; ID `_apma_pmttarget_value` |
| Monthly Actual | `apma_monthlyactual` | `apma_monthlyactual` | Double | `0` is valid; missing is undefined/null |
| YTD Actual | `apma_ytdactual` | `apma_ytdactual` | Double | Preserve user/Dataverse value; no universal calculation |
| Status | `apma_status` | `apma_status` | Choice | `457470000` Green; `457470001` Yellow; `457470002` Red |

**Important schema mismatch:** Dataverse currently has no Grey or Missing option in `apma_status`. The UI may display Grey/Missing for an absent result, but the adapter must never write those values. Existing statuses map only to Green, Yellow, and Red.

Application uniqueness is Plant lookup + KPI lookup + Year + Month.

## 5. PMT Report Categories

**Logical name:** `apma_pmtreportcategories`  
**Entity set:** `apma_pmtreportcategorieses`  
**Primary ID:** `apma_pmtreportcategoriesid`  
**Primary name:** `apma_reportcategory` (`StringType`, required)

| Display name | Logical attribute | Generated property | Type | Notes |
|---|---|---|---|---|
| Report Category | `apma_reportcategory` | `apma_reportcategory` | String | Required |
| Display Order | `apma_displayorder` | `apma_displayorder` | Integer | Sort ascending |

## 6. PMT Monthly Reports

**Logical name:** `apma_pmtmonthlyreports`  
**Entity set:** `apma_pmtmonthlyreportses`  
**Primary ID:** `apma_pmtmonthlyreportsid`  
**Primary name:** `apma_mainname` (`StringType`, required)

| Display name | Logical attribute | Generated property | Type | Values / binding |
|---|---|---|---|---|
| Main Name | `apma_mainname` | `apma_mainname` | String | Required |
| Year | `apma_year` | `apma_year` | Integer | Optional |
| Month | `apma_month` | `apma_month` | Choice | `457470000..457470011` = 1..12 |
| Plant Name | `apma_plantname` | `apma_plantname` | Lookup | Bind `apma_PlantName@odata.bind`; ID `_apma_plantname_value` |
| Report Category | `apma_reportcategory` | `apma_reportcategory` | Lookup | Bind `apma_ReportCategory@odata.bind`; ID `_apma_reportcategory_value` |
| Type | `apma_type` | `apma_type` | Choice | `457470000` Highlights; `457470001` Lowlights |
| Content | `apma_content` | `apma_content` | Multiline text | Render plain text and preserve line breaks |
| Display Order | `apma_displayorder` | `apma_displayorder` | Integer | Sort ascending |

Application uniqueness is Plant lookup + Year + Month + Report Category lookup + Type.

## 7. PMT Report Attachment Record

**Logical name:** `apma_pmtreportattachmentrecord`  
**Entity set:** `apma_pmtreportattachmentrecords`  
**Primary ID:** `apma_pmtreportattachmentrecordid`  
**Primary name:** `apma_mainname` (`StringType`, required)

| Display name | Logical attribute | Generated property | Type | Values / binding |
|---|---|---|---|---|
| Main Name | `apma_mainname` | `apma_mainname` | String | Required |
| Month | `apma_month` | `apma_month` | Choice | `457470000..457470011` = 1..12 |
| Plant Name | `apma_plantname` | `apma_plantname` | Lookup | Bind `apma_PlantName@odata.bind`; ID `_apma_plantname_value` |
| PMT Monthly Reports | `apma_pmtmonthlyreports` | `apma_pmtmonthlyreports` | Lookup | Bind `apma_PMTMonthlyReports@odata.bind`; authoritative report relationship; ID `_apma_pmtmonthlyreports_value` |
| Title | `apma_title` | `apma_title` | String | File display title |
| Attachment | `apma_attachment` | `apma_attachment` | File | Generated service exposes upload; standalone adapter uses SDK `downloadFileFromRecord` for download |
| Attachment name | `apma_attachment_name` | `apma_attachment_name` | String | Read-only file metadata |
| Year | `apma_year` | `apma_year` | Integer | Keep consistent with related report |

## Generated Service Capabilities

## 8. PMT Volume_PAC

**Logical name:** `apma_pmtvolume_pac`  
**Entity set:** `apma_pmtvolume_pacs`  
**Primary ID:** `apma_pmtvolume_pacid`

| Display name | Logical attribute | Type | Notes |
|---|---|---|---|
| Year | `apma_year` | Integer | Chart year filter |
| Month | `apma_month` | Choice | `457470000..457470011` = 1..12 |
| Plant Name | `apma_plantname` | Lookup | ID `_apma_plantname_value` |
| Production Line | `apma_productionline` | Lookup | ID `_apma_productionline_value` |
| Volume (kt) | `apma_volumekt` | Double | Clustered bar series |
| Forecast (kt) | `apma_forecastkt` | Double | Clustered bar series |
| PAC (kt) | `apma_packt` | Double | Line series |

## 9. PMT Production Line Categories

**Logical name:** `apma_pmtproductionlinecategories`  
**Entity set:** `apma_pmtproductionlinecategorieses`  
**Primary ID:** `apma_pmtproductionlinecategoriesid`

| Display name | Logical attribute | Type |
|---|---|---|
| Production Line | `apma_productionline` | String |
| Display Order | `apma_displayorder` | Integer |

## 10. PMT AE Categories

**Logical name:** `apma_pmtaecategories`  
**Entity set:** `apma_pmtaecategorieses`  
**Primary ID:** `apma_pmtaecategoriesid`

| Display name | Logical attribute | Type |
|---|---|---|
| AE Categories | `apma_aecategories` | String |
| Display Order | `apma_displayorder` | Integer |

## 11. PMT AE

**Logical name:** `apma_pmtae`  
**Entity set:** `apma_pmtaes`  
**Primary ID:** `apma_pmtaeid`

| Display name | Logical attribute | Type | Notes |
|---|---|---|---|
| Year | `apma_year` | Integer | AE year filter |
| Month | `apma_month` | Choice | `457470000..457470011` = 1..12 |
| Plant Name | `apma_plantname` | Lookup | ID `_apma_plantname_value` |
| Production Line | `apma_productionline` | Lookup | ID `_apma_productionline_value` |
| AE Categories | `apma_aecategories` | Lookup | ID `_apma_aecategories_value` |
| Value (%) | `apma_value` | Double | One stacked segment value |

All generated business services expose `create`, `update`, `delete`, `get`, `getAll`, and `getMetadata`. The attachment service additionally exposes a generated `upload` method for `apma_attachment`. The SDK client also exposes `downloadFileFromRecord`; this is wrapped by `src/data/adapters/dataverseAttachmentDownload.ts` so generated files remain unchanged.

Adapters must call these services and translate generated records into the stable interfaces in `src/domain/models/index.ts`. Generated files must not be changed directly.

## Runtime Verification Still Required

The schema and generated API surface are verified locally. A connected runtime check is still required for:

1. Read/write privileges for each table under the current app identity.
2. Lookup binding behavior in the connected environment.
3. Actual records, active/inactive filtering, and data completeness.
4. File upload/download behavior and browser permission handling.
5. Whether duplicate prevention is already enforced by a Dataverse alternate key.
