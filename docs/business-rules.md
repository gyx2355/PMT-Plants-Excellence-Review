# Business Rules: PMT Plants Excellence Review System

## 1. Multi-Plant Scope
Supported initial plants:
1. Pudong-TPU
2. Zhanjiang-TPU
3. Changhua-TPU
4. Yokkaichi-TPU

The architecture supports dynamic plant addition without page redesign.

## 2. Distinction Between Zero and Missing Data
- `0` is a valid entered numeric result for KPIs (e.g. 0 LTI, 0 PSI, 0 NCM).
- Missing data is represented as `null` or `undefined`.
- Missing results must display as "Missing" or "Grey" status, never as "Green" or 0.

## 3. Unit Resolution
- Unit is stored on the `PMT KPI Definitions` entity.
- Target and Monthly Result entities reference the KPI Definition lookup. Unit is resolved dynamically from the related KPI metadata.

## 4. KPI Status Determination Strategy
- `IKpiStatusStrategy`:
  - 100% target achievement (YTD Actual >= CY Target for higher-is-better, or YTD Actual <= CY Target for lower-is-better): **Green**
  - 50% <= achievement < 100%: **Yellow / Amber**
  - < 50% achievement: **Red**
  - Missing data: **Grey**

## 5. Completion Calculation
```text
expected KPI count = number of active KPI Definitions
entered KPI count = number of Monthly KPI Results for Plant + Year + Month with non-null actuals
completion percentage = (entered KPI count / expected KPI count) * 100%
```

## 6. Monthly Reports & Attachments
- Monthly reports contain Highlights and Lowlights per Report Category for a Plant, Year, and Month.
- Attachment records link strictly to an existing `PMT Monthly Reports` record.

## 7. Generated Main Names

Application create operations generate and persist primary names from authoritative Dataverse lookup display names:

- PMT AE: `Year_Month_Plant Name_Production Line_AE Categories`
- PMT Volume_PAC: `Year_Month_Plant Name_Production Line`
- PMT Target: `Target Year_Plant Name_KPI Name`
- PMT Monthly KPI Results: `Year_Month_Plant Name_KPI Name`
- PMT Monthly Reports: `Year_Month_Plant Name_Type_Report Category`
- PMT Report Attachment Record: `Year_Month_Plant Name_PMT Monthly Reports`

Identity-field updates also refresh Main Name where those fields can be edited through the app. This is client application behavior; direct Dataverse imports require a server-side plug-in, flow, or calculated pattern to enforce the same rule outside this Code App.
