# PMT Plants Excellence Review - Project Source Snapshot

> Snapshot part: 1
> Generated: 2026-10-23 03:36:11
> Project root: C:\Users\GAOX17\OneDrive - BASF\GX\TPU\Digital project\PMT Plants Excellence Review\PMT Plants Excellence Review

---

# Project Overview

- Project name: PMT Plants Excellence Review
- Export date: 2026-10-23 03:36:11
- Included source files: 104
- Generated code included: False
- Package lock included: False

## Important interpretation

This document is a static snapshot of the project source code.
It does not automatically synchronize with later GitHub commits.

Sensitive files, binary files, dependency folders, build outputs,
and other excluded content are intentionally not included.

## Project file index

``text
``

---

## File: CONTRIBUTING.md

- Size: 317 bytes
- Last modified: 2026-09-11 11:51:56

``markdown
# Contributing Guidelines

## Coding Guidelines
1. Use TypeScript strict mode. Avoid `any`.
2. Follow Fluent UI v9 component guidelines.
3. Wrap all workspace file links using proper markdown links (`[path/file.ts](path/file.ts)`).
4. Run `npm run lint`, `npm run test`, and `npm run build` before committing.

``

---

## File: docs/architecture.md

- Size: 16943 bytes
- Last modified: 2026-09-21 00:01:37

``markdown
# System Architecture: PMT Plants Excellence Review System

## Overview

The PMT Plants Excellence Review System is a production-grade Power Apps Code App engineered with React 19, TypeScript, Fluent UI v9, TanStack React Query, and Dataverse integration.

The system is structured into decoupled, modular layers to isolate Dataverse SDK access, business logic, domain entities, custom hooks, and presentation components.

---

## Workspace Directory & File Structure

```text
PMT Plants Excellence Review/
├── docs/                                   # Architectural, mapping & business documentation
│   ├── architecture.md                     # System architecture specification
│   ├── business-rules.md                   # KPI calculation & status strategy rules
│   ├── dataverse-field-map.md              # Dataverse entity schema & field mapping
│   ├── deployment.md                       # PAC CLI build & deployment guide
│   ├── security.md                         # Authorization & security model
│   └── test-plan.md                        # Testing strategy & acceptance criteria
├── public/                                 # Public static assets
│   ├── favicon.svg                         # Browser favicon
│   └── icons.svg                           # SVG sprite definitions
├── src/                                    # Main application source code
│   ├── app/                                # Application initialization & global providers
│   │   ├── providers/                      # React context providers
│   │   │   ├── ToastContext.ts             # Toast notification context definition
│   │   │   └── ToastProvider.tsx           # Fluent UI Toast controller provider
│   │   ├── App.tsx                         # Root app component with FluentProvider & Router
│   │   └── routes.tsx                      # App route configuration & navigation mapping
│   ├── assets/                             # Static image resources
│   │   ├── hero.png                        # Hero banner image
│   │   ├── react.svg                       # React framework logo
│   │   └── vite.svg                        # Vite bundler logo
│   ├── components/                         # UI Components
│   │   ├── common/                         # Shared UI feedback & layout components
│   │   │   ├── EmptyState.tsx              # Generic empty state card
│   │   │   ├── ErrorState.tsx              # Communication/error feedback state
│   │   │   ├── GlobalErrorBoundary.tsx     # Application runtime error boundary
│   │   │   ├── LoadingSkeleton.tsx         # Data loading skeleton placeholder
│   │   │   ├── PageHeader.tsx              # Page title & action bar header
│   │   │   └── StatusBadge.tsx             # Traffic light status indicator badge
│   │   └── filters/                        # Shared filter components
│   │       └── GlobalFilters.tsx           # Multi-dimensional filter bar
│   ├── domain/                             # Core domain entities & business abstractions
│   │   ├── enums/                          # Domain enums & constants
│   │   │   └── index.ts                    # KpiStatus, KpiCategory, ReportType definitions
│   │   └── models/                         # Domain model TypeScript interfaces
│   │       └── index.ts                    # Plant, KpiDefinition, Target, MonthlyKpiResult, etc.
│   ├── data/                               # Dataverse and test data access layers
│   │   ├── adapters/                       # Generated SDK to domain model translation
│   │   │   └── dataverseRepositories.ts    # Runtime Dataverse repository implementations
│   │   ├── mock/                           # Offline seed data and test repositories
│   │   │   ├── mockRepositories.ts         # In-memory repository implementations
│   │   │   └── seedData.ts                  # Test data for four plants and KPI records
│   │   └── repositories/                   # Domain-facing repository contracts
│   │       └── interfaces.ts               # Seven repository interfaces
│   ├── generated/                          # Autogenerated Power Apps SDK files (read-only)
│   │   ├── models/                         # Dataverse entity TypeScript models
│   │   ├── services/                       # Dataverse CRUD and attachment upload services
│   │   └── index.ts                        # Generated model/service exports
│   ├── hooks/                              # Reusable React hooks
│   │   ├── queries.ts                      # TanStack Query hooks using Dataverse repositories
│   │   └── useAppToast.ts                  # Toast notification consumer hook
│   ├── layouts/                            # Shell & structural layout templates
│   │   └── AppShell/                       # Main application shell
│   │       ├── AboutDialog.tsx             # System info & environment modal dialog
│   │       ├── AppHeader.tsx               # Top application header bar
│   │       ├── AppShell.tsx                # Main responsive layout container
│   │       └── SideNavigation.tsx          # Deep Navy responsive navigation rail
│   ├── pages/                              # Primary page routes
│   │   ├── AdministrationPage/             # Dataverse administration page
│   │   │   └── AdministrationPage.tsx      # Seven CRUD tabs with display-name lookup controls
│   │   ├── ComingSoonPage/                 # Placeholder for future analytics
│   │   │   └── ComingSoonPage.tsx          # Neutral coming soon card
│   │   ├── HelpPage/                       # System help & documentation page
│   │   │   └── HelpPage.tsx                # FAQ accordion & usage rules
│   │   ├── KPIComparisonPage/              # Volume & PAC visualization page
│   │   │   ├── KpiComparisonPage.tsx        # Plant cards with AE, Volume, Forecast and PAC charts
│   │   │   ├── chartMetrics.ts              # Chart aggregation and per-line AE grouping
│   │   │   └── comparisonMetrics.ts         # Detail-table joins now consumed by KPI Overview
│   │   ├── KPIEntryPage/                   # Monthly KPI data entry page
│   │   │   ├── KpiDataEntryPage.tsx         # Grouped editable KPI entry grid and save flow
│   │   │   └── entryRows.ts                 # Editable row construction and numeric parsing
│   │   ├── KPIOverviewPage/                # Plant executive summary page
│   │   │   ├── KpiOverviewPage.tsx          # Dataverse-backed completion cards & status matrix
│   │   │   └── overviewMetrics.ts           # Pure KPI completion and status aggregation
│   │   └── MonthlyReportsPage/             # Plant monthly reports page
│   │       ├── MonthlyReportsPage.tsx      # Report browser, editor, upload and download controls
│   │       └── reportGroups.ts             # Category and Highlights/Lowlights grouping
│   ├── styles/                             # Design system tokens & global styling
│   │   └── theme.ts                        # BASF brand color variants & status colors
│   ├── test/                               # Testing suite
│   │   ├── domain.test.ts                  # Domain logic & enum test suite
│   │   ├── repositories.test.ts             # Mock repository behavior tests
│   │   └── strategy.test.ts                 # KPI status strategy tests
│   │   └── overviewMetrics.test.ts           # Overview completion and matrix tests
│   │   └── comparisonMetrics.test.ts          # Comparison joins and calculation tests
│   │   ├── entryRows.test.ts                   # Entry row ordering and zero/missing tests
│   │   └── reportGroups.test.ts                 # Monthly report grouping test
│   │   └── setup.ts                        # Vitest & Jest DOM setup
│   ├── types/                              # UI & filter state types
│   │   └── filters.ts                      # GlobalFilterState & FilterOption definitions
│   ├── App.css                             # Application CSS rules
│   ├── index.css                           # Root Reset CSS & font definitions
│   └── main.tsx                            # Vite entry point
├── CONTRIBUTING.md                         # Contribution & coding guidelines
├── eslint.config.js                        # ESLint rules configuration
├── index.html                              # HTML entry file
├── package.json                            # Project dependencies & npm scripts
├── power.config.json                       # Power Apps Code App environment configuration
├── README.md                               # Project overview & developer guide
├── tsconfig.app.json                       # TypeScript compiler config for app source
├── tsconfig.json                           # Root TypeScript solution configuration
├── tsconfig.node.json                      # TypeScript config for build tooling
└── vite.config.ts                          # Vite build & Vitest test runner configuration
```

---

## Detailed File & Module Breakdown

### 1. Root & Build Configuration
- [package.json](package.json): Defines npm dependencies (Fluent UI v9, TanStack Query, React Router 7, Vitest) and scripts (`dev`, `build`, `lint`, `test`).
- [power.config.json](power.config.json): Power Apps Code App manifest specifying App ID, environment ID (`4d7fa01b-13ee-45c0-a672-10a55cfabde4`), local server port, and build output path (`./dist`).
- [vite.config.ts](vite.config.ts): Configures Vite dev server, React SWC/Babel plugin, and Vitest test runner setup.
- [tsconfig.app.json](tsconfig.app.json) & [tsconfig.json](tsconfig.json): Strict TypeScript configuration targeting ES2023 with `erasableSyntaxOnly` and `verbatimModuleSyntax` compatibility.

### 2. Application Entry & Shell Layer
- [src/main.tsx](src/main.tsx): Mounts the React application tree into the DOM root element.
- [src/app/App.tsx](src/app/App.tsx): Root component configuring `FluentProvider` with [src/styles/theme.ts](src/styles/theme.ts), `QueryClientProvider`, [src/components/common/GlobalErrorBoundary.tsx](src/components/common/GlobalErrorBoundary.tsx), [src/app/providers/ToastProvider.tsx](src/app/providers/ToastProvider.tsx), and `HashRouter`.
- [src/app/routes.tsx](src/app/routes.tsx): Central route definition declaring navigation paths (`/kpi-overview`, `/kpi-comparison`, `/kpi-entry`, `/monthly-reports`, `/administration`, `/trends`, `/help`).
- [src/layouts/AppShell/AppShell.tsx](src/layouts/AppShell/AppShell.tsx): Primary shell layout providing sticky header, responsive left sidebar rail, mobile drawer overlay, and scrollable main content area.
- [src/layouts/AppShell/AppHeader.tsx](src/layouts/AppShell/AppHeader.tsx): Top header bar displaying system title, subtitle, mobile toggle button, system info dialog trigger, and user profile avatar.
- [src/layouts/AppShell/SideNavigation.tsx](src/layouts/AppShell/SideNavigation.tsx): Deep Navy (`#0F172A`) navigation sidebar with expand/collapse states, route active indicators, badges, and tooltips.
- [src/layouts/AppShell/AboutDialog.tsx](src/layouts/AppShell/AboutDialog.tsx): Dialog detailing environment, supported plant list, and version information.

### 3. Core Domain Layer
- [src/domain/enums/index.ts](src/domain/enums/index.ts): Defines business constants for `KpiStatus` (Green, Amber, Red, Grey, Missing), `KpiCategory` (EHS, Production, Quality), and `ReportType` (Highlights, Lowlights).
- [src/domain/models/index.ts](src/domain/models/index.ts): TypeScript interfaces for domain entities: `Plant`, `KpiDefinition`, `Target`, `MonthlyKpiResult`, `ReportCategory`, `MonthlyReport`, and `ReportAttachment`.

### 4. Shared Presentation & Filtering Components
- [src/components/filters/GlobalFilters.tsx](src/components/filters/GlobalFilters.tsx): Universal multi-dimensional selector for Year, Month, Plant, Category, KPI, and Status with Reset/Apply controls and active filter tags.
- [src/components/common/StatusBadge.tsx](src/components/common/StatusBadge.tsx): Accessible traffic light indicator rendering icon + text with contrast background and borders.
- [src/components/common/PageHeader.tsx](src/components/common/PageHeader.tsx): Header component rendering page title, description, and custom action buttons.
- [src/components/common/GlobalErrorBoundary.tsx](src/components/common/GlobalErrorBoundary.tsx): Fallback UI catching runtime rendering errors and offering application reload.
- [src/components/common/LoadingSkeleton.tsx](src/components/common/LoadingSkeleton.tsx), [src/components/common/EmptyState.tsx](src/components/common/EmptyState.tsx), and [src/components/common/ErrorState.tsx](src/components/common/ErrorState.tsx): Common state feedback components.

### 5. Pages
- [src/pages/KPIOverviewPage/KpiOverviewPage.tsx](src/pages/KPIOverviewPage/KpiOverviewPage.tsx): Executive overview displaying plant completion summary cards and four-plant status matrix.
- [src/pages/KPIComparisonPage/KpiComparisonPage.tsx](src/pages/KPIComparisonPage/KpiComparisonPage.tsx): Volume & PAC dashboard with plant cards, per-line AE stacks, and monthly Volume/Forecast/PAC charts.
- [src/pages/KPIEntryPage/KpiDataEntryPage.tsx](src/pages/KPIEntryPage/KpiDataEntryPage.tsx): Category-grouped grid for entering monthly actuals and YTD actuals.
- [src/pages/MonthlyReportsPage/MonthlyReportsPage.tsx](src/pages/MonthlyReportsPage/MonthlyReportsPage.tsx): Category-organized highlights/lowlights cards and attachment management.
- [src/pages/AdministrationPage/AdministrationPage.tsx](src/pages/AdministrationPage/AdministrationPage.tsx): Master data tabbed interface for PMT Plants, KPI Definitions, and Targets.
- [src/pages/ComingSoonPage/ComingSoonPage.tsx](src/pages/ComingSoonPage/ComingSoonPage.tsx): Placeholder page for future Trend & Insights module.
- [src/pages/HelpPage/HelpPage.tsx](src/pages/HelpPage/HelpPage.tsx): FAQ accordion and guidance documentation.

---

## Data & Integration Architecture

1. `src/generated/`: Autogenerated Dataverse SDK models and services produced from the registered data sources in `power.config.json`. These files are read-only and must never be edited manually.
2. `src/data/adapters/dataverseRepositories.ts`: Maps generated `apma_` records into stable domain models and translates Month, Status, Category, Report Type, and lookup bindings.
3. `src/data/repositories/interfaces.ts`: Domain-facing contracts that keep page and hook code independent of the Dataverse SDK.
4. `src/data/mock/`: In-memory repositories retained for unit and offline tests. They are not the runtime default.
5. `src/hooks/queries.ts`: Runtime query hooks and CRUD mutations use the Dataverse repository registry; query keys and page-facing APIs remain stable.
6. `src/domain/strategies/`: KPI status and completion strategies independent of React and Dataverse.
7. `src/domain/services/`: Authorization abstraction. Dataverse privileges remain authoritative; the current implementation is a UI-level placeholder until a permitted role API is confirmed.

The runtime repository selection is explicit in `src/hooks/queries.ts`: the application uses `dataverseRepositories`, while tests import the mock repository singletons directly. This prevents test fixtures from silently replacing production data.

---

## State Management Architecture

1. **Server State**: Managed via TanStack React Query (`QueryClientProvider`), ensuring cached data, optimistic updates, and background refetching.
2. **Filter & Navigation State**: Managed via [src/types/filters.ts](src/types/filters.ts) and synchronized with URL query parameters for shareable views.
3. **Form & Editing State**: Handled locally via React state and React Hook Form for grid edits before persist operations.
4. **UI Feedback State**: Toast notifications handled by [src/app/providers/ToastProvider.tsx](src/app/providers/ToastProvider.tsx) and consumed via [src/hooks/useAppToast.ts](src/hooks/useAppToast.ts).

``

---

## File: docs/business-rules.md

- Size: 2346 bytes
- Last modified: 2026-09-21 00:01:37

``markdown
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

``

---

## File: docs/dataverse-field-map.md

- Size: 12378 bytes
- Last modified: 2026-09-20 22:29:20

``markdown
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

``

---

## File: docs/deployment.md

- Size: 325 bytes
- Last modified: 2026-09-11 11:59:50

``markdown
# Deployment Guide: PMT Plants Excellence Review System

## Prerequisites
- Node.js 18+
- Power Platform CLI (PAC CLI)

## Build Process
```bash
npm run build
```

## Power Apps Code App Deployment
To push the app to the Power Platform environment configured in `power.config.json`:
```bash
pac code push
```

``

---

## File: docs/security.md

- Size: 726 bytes
- Last modified: 2026-09-11 11:51:56

``markdown
# Security & Authorization Model

## Dataverse Security
Dataverse Security Roles (Read, Create, Write, Delete privileges) serve as the authoritative source of truth.

## UI Authorization Abstraction
The application uses the `IAuthorizationService` interface:
```typescript
export interface IAuthorizationService {
  canViewAdministration(): boolean;
  canEditPlants(): boolean;
  canEditKpiDefinitions(): boolean;
  canEditTargets(): boolean;
  canEditMonthlyKpiResults(plantId?: string): boolean;
  canEditMonthlyReports(plantId?: string): boolean;
}
```
Client-side privilege checks enhance user experience by disabling or hiding editing actions, but Dataverse row-level security enforces boundary access.

``

---

## File: docs/test-plan.md

- Size: 610 bytes
- Last modified: 2026-09-11 11:59:50

``markdown
# Test Plan: PMT Plants Excellence Review System

## 1. Unit Testing
- Test domain status calculation strategy (`IKpiStatusStrategy`).
- Test completion rate calculations.
- Test dataverse-to-domain adapters and null vs zero handling.
- Command: `npm run test`

## 2. Type Check & Linting
- TypeScript type check: `npm run build` (`tsc -b && vite build`)
- ESLint linting: `npm run lint`

## 3. Manual Acceptance Scenarios
- Desktop viewport (1920x1080 and 1366x768).
- Tablet drawer layout navigation.
- Empty period state vs entered data state.
- Data entry saving and duplicate prevention.

``

---

## File: eslint.config.js

- Size: 591 bytes
- Last modified: 2026-09-11 10:56:26

``javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])

``

---

## File: Export-ProjectSource.ps1

- Size: 25309 bytes
- Last modified: 2026-10-10 10:27:38

``powershell
<#
.SYNOPSIS
    Export a project source-code snapshot to Markdown files.

.DESCRIPTION
    This script scans the current project, creates a project directory tree,
    and exports supported text/source files into one or more Markdown files.

    Designed for:
    - React
    - TypeScript
    - Vite
    - Power Apps Code Apps
    - Dataverse
    - Fluent UI
    - TanStack Query

    The generated Markdown can be uploaded to Copilot for:
    - Architecture analysis
    - Code review
    - Dependency analysis
    - Dataverse integration analysis
    - Debugging
    - Documentation generation

.NOTES
    Recommended location:
    Place this script in the project root directory.

    Example:
    .\Export-ProjectSource.ps1

    If PowerShell blocks the script:
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    .\Export-ProjectSource.ps1
#>

[CmdletBinding()]
param (
    # Project root. Defaults to the directory containing this script.
    [Parameter(Mandatory = $false)]
    [string]$ProjectRoot = $PSScriptRoot,

    # Base name of the generated Markdown file.
    [Parameter(Mandatory = $false)]
    [string]$OutputFileName = "PMT-Project-Source.md",

    # Maximum size of each generated Markdown file in MB.
    # When the limit is reached, the script creates Part-001, Part-002, etc.
    [Parameter(Mandatory = $false)]
    [ValidateRange(1, 100)]
    [int]$MaxOutputFileSizeMB = 15,

    # Include package-lock.json. This file can be very large and is excluded by default.
    [Parameter(Mandatory = $false)]
    [switch]$IncludePackageLock,

    # Include common generated source directories.
    [Parameter(Mandatory = $false)]
    [switch]$IncludeGeneratedCode,

    # Include JSON files under generated-code directories.
    [Parameter(Mandatory = $false)]
    [switch]$IncludeGeneratedJson,

    # Include log files.
    [Parameter(Mandatory = $false)]
    [switch]$IncludeLogs
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# =============================================================================
# Configuration
# =============================================================================

# Directories that are always excluded.
$ExcludedDirectories = @(
    ".git",
    ".github",
    ".idea",
    ".vs",
    ".vscode",
    ".power",
    "node_modules",
    "dist",
    "build",
    "coverage",
    "out",
    "bin",
    "obj",
    "packages",
    ".next",
    ".nuxt",
    ".cache",
    ".parcel-cache",
    ".turbo",
    ".vite",
    "storybook-static",
    "test-results",
    "playwright-report",
    "__pycache__"
)

# Generated-code directories excluded unless -IncludeGeneratedCode is supplied.
$GeneratedCodeDirectories = @(
    "generated",
    "Generated",
    "generated-src",
    "generatedServices",
    "generated-services"
)

# Exact file names excluded for security or because they add little architectural value.
$ExcludedFileNames = @(
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
    ".npmrc",
    ".yarnrc",
    ".pnpmfile.cjs",
    "secrets.json",
    "secret.json",
    "credentials.json",
    "credential.json",
    "appsettings.Development.json",
    "Thumbs.db",
    ".DS_Store",
    $OutputFileName
)

# Patterns that may contain credentials, certificates, or private keys.
$SensitiveFilePatterns = @(
    "*.pem",
    "*.key",
    "*.pfx",
    "*.p12",
    "*.cer",
    "*.crt",
    "*.der",
    "*.jks",
    "*.keystore",
    "*secret*",
    "*credential*",
    "*private-key*",
    "*private_key*"
)

# Supported source and text file extensions.
$IncludedExtensions = @(
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".json",
    ".jsonc",
    ".md",
    ".txt",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".html",
    ".htm",
    ".xml",
    ".yml",
    ".yaml",
    ".toml",
    ".ini",
    ".config",
    ".conf",
    ".cs",
    ".csproj",
    ".sln",
    ".props",
    ".targets",
    ".xaml",
    ".ps1",
    ".psm1",
    ".psd1",
    ".sh",
    ".bat",
    ".cmd",
    ".sql",
    ".graphql",
    ".gql"
)

# Extension-free files that are useful for understanding a project.
$IncludedExtensionlessFiles = @(
    "Dockerfile",
    "Makefile",
    "Procfile",
    "LICENSE",
    "NOTICE"
)

# Files ignored by default because they are normally very large or generated.
$LargeGeneratedFiles = @(
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "npm-shrinkwrap.json"
)

# Individual source files larger than this are skipped.
$MaxIndividualFileSizeMB = 5

# =============================================================================
# Helper functions
# =============================================================================


function Write-Status {
    param (
        [AllowEmptyString()]
        [string]$Message = "",

        [ConsoleColor]$Color = [ConsoleColor]::Gray
    )

    if ([string]::IsNullOrEmpty($Message)) {
        Write-Host
    }
    else {
        Write-Host $Message -ForegroundColor $Color
    }
}

function Get-NormalizedFullPath {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    return [System.IO.Path]::GetFullPath($Path).TrimEnd(
        [System.IO.Path]::DirectorySeparatorChar,
        [System.IO.Path]::AltDirectorySeparatorChar
    )
}

function Get-RelativeProjectPath {
    param (
        [Parameter(Mandatory = $true)]
        [string]$FullPath,

        [Parameter(Mandatory = $true)]
        [string]$RootPath
    )

    $normalizedRoot = Get-NormalizedFullPath -Path $RootPath
    $normalizedFile = [System.IO.Path]::GetFullPath($FullPath)

    $rootUri = New-Object System.Uri(($normalizedRoot + [System.IO.Path]::DirectorySeparatorChar))
    $fileUri = New-Object System.Uri($normalizedFile)

    $relativeUri = $rootUri.MakeRelativeUri($fileUri)
    $relativePath = [System.Uri]::UnescapeDataString($relativeUri.ToString())

    return $relativePath.Replace("\", "/")
}


function Test-IsChildOfExcludedDirectory {
    param (
        [Parameter(Mandatory = $true)]
        [AllowEmptyString()]
        [string]$RelativePath
    )

    if ([string]::IsNullOrWhiteSpace($RelativePath)) {
        return $false
    }

    $normalizedPath = $RelativePath.Replace('\', '/')

    $pathParts = @(
        $normalizedPath.Split(
            [char[]]@('/'),
            [System.StringSplitOptions]::RemoveEmptyEntries
        )
    )

    foreach ($part in $pathParts) {
        if ($ExcludedDirectories -contains $part) {
            return $true
        }

        if (
            -not $IncludeGeneratedCode -and
            $GeneratedCodeDirectories -contains $part
        ) {
            return $true
        }
    }

    return $false
}

function Test-MatchesSensitivePattern {
    param (
        [Parameter(Mandatory = $true)]
        [string]$FileName
    )

    foreach ($pattern in $SensitiveFilePatterns) {
        if ($FileName -like $pattern) {
            return $true
        }
    }

    return $false
}

function Test-IsOutputFile {
    param (
        [Parameter(Mandatory = $true)]
        [string]$FileName
    )

    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($OutputFileName)

    if ($FileName -eq $OutputFileName) {
        return $true
    }

    if ($FileName -like "$baseName-Part-*.md") {
        return $true
    }

    return $false
}

function Test-ShouldIncludeFile {
    param (
        [Parameter(Mandatory = $true)]
        [System.IO.FileInfo]$File,

        [Parameter(Mandatory = $true)]
        [string]$RelativePath
    )

    if (Test-IsChildOfExcludedDirectory -RelativePath $RelativePath) {
        return $false
    }

    if (Test-IsOutputFile -FileName $File.Name) {
        return $false
    }

    if ($ExcludedFileNames -contains $File.Name) {
        return $false
    }

    if (Test-MatchesSensitivePattern -FileName $File.Name) {
        return $false
    }

    if (-not $IncludeLogs -and $File.Extension.ToLowerInvariant() -eq ".log") {
        return $false
    }

    if (-not $IncludePackageLock -and $LargeGeneratedFiles -contains $File.Name) {
        return $false
    }

    if ($File.Length -gt ($MaxIndividualFileSizeMB * 1MB)) {
        return $false
    }

    $extension = $File.Extension.ToLowerInvariant()

    if ($IncludedExtensions -contains $extension) {
        if (
            -not $IncludeGeneratedJson -and
            $extension -in @(".json", ".jsonc") -and
            ($RelativePath -match "(^|/)(generated|Generated|generated-src|generatedServices|generated-services)(/|$)")
        ) {
            return $false
        }

        return $true
    }

    if ([string]::IsNullOrWhiteSpace($extension)) {
        if ($IncludedExtensionlessFiles -contains $File.Name) {
            return $true
        }
    }

    return $false
}

function Get-MarkdownLanguage {
    param (
        [Parameter(Mandatory = $true)]
        [System.IO.FileInfo]$File
    )

    switch ($File.Extension.ToLowerInvariant()) {
        ".ts"      { return "typescript" }
        ".tsx"     { return "tsx" }
        ".js"      { return "javascript" }
        ".jsx"     { return "jsx" }
        ".mjs"     { return "javascript" }
        ".cjs"     { return "javascript" }
        ".json"    { return "json" }
        ".jsonc"   { return "jsonc" }
        ".md"      { return "markdown" }
        ".css"     { return "css" }
        ".scss"    { return "scss" }
        ".sass"    { return "sass" }
        ".less"    { return "less" }
        ".html"    { return "html" }
        ".htm"     { return "html" }
        ".xml"     { return "xml" }
        ".yml"     { return "yaml" }
        ".yaml"    { return "yaml" }
        ".toml"    { return "toml" }
        ".ini"     { return "ini" }
        ".config"  { return "text" }
        ".conf"    { return "text" }
        ".cs"      { return "csharp" }
        ".csproj"  { return "xml" }
        ".sln"     { return "text" }
        ".props"   { return "xml" }
        ".targets" { return "xml" }
        ".xaml"    { return "xml" }
        ".ps1"     { return "powershell" }
        ".psm1"    { return "powershell" }
        ".psd1"    { return "powershell" }
        ".sh"      { return "bash" }
        ".bat"     { return "batch" }
        ".cmd"     { return "batch" }
        ".sql"     { return "sql" }
        ".graphql" { return "graphql" }
        ".gql"     { return "graphql" }
        default    { return "text" }
    }
}

function Get-SafeFileContent {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    try {
        $content = [System.IO.File]::ReadAllText($Path)

        # Remove UTF-8 BOM if present.
        if ($content.Length -gt 0 -and [int][char]$content[0] -eq 65279) {
            $content = $content.Substring(1)
        }

        # Normalize line endings for consistent Markdown output.
        $content = $content -replace "`r`n", "`n"
        $content = $content -replace "`r", "`n"

        return $content
    }
    catch {
        return $null
    }
}

function Get-ProjectTree {
    param (
        [Parameter(Mandatory = $true)]
        [System.IO.FileInfo[]]$Files
    )

    $paths = @(
        $Files |
            ForEach-Object {
                Get-RelativeProjectPath -FullPath $_.FullName -RootPath $ProjectRoot
            } |
            Sort-Object
    )

    if ($paths.Count -eq 0) {
        return "(No supported source files found.)"
    }

    return ($paths -join "`n")
}

function Get-PartOutputPath {
    param (
        [Parameter(Mandatory = $true)]
        [int]$PartNumber,

        [Parameter(Mandatory = $true)]
        [bool]$UseMultipleParts
    )

    $outputDirectory = $ProjectRoot
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($OutputFileName)
    $extension = [System.IO.Path]::GetExtension($OutputFileName)

    if ([string]::IsNullOrWhiteSpace($extension)) {
        $extension = ".md"
    }

    if ($UseMultipleParts) {
        $fileName = "{0}-Part-{1:D3}{2}" -f $baseName, $PartNumber, $extension
    }
    else {
        $fileName = $baseName + $extension
    }

    return Join-Path -Path $outputDirectory -ChildPath $fileName
}

function Write-Utf8File {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Path,

        [Parameter(Mandatory = $true)]
        [string]$Content
    )

    # UTF-8 without BOM works well with Markdown and source code.
    $utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Content, $utf8WithoutBom)
}

function Add-OutputPartMetadata {
    param (
        [Parameter(Mandatory = $true)]
        [System.Text.StringBuilder]$Builder,

        [Parameter(Mandatory = $true)]
        [int]$PartNumber
    )

    [void]$Builder.AppendLine("# PMT Plants Excellence Review - Project Source Snapshot")
    [void]$Builder.AppendLine("")
    [void]$Builder.AppendLine("> Snapshot part: $PartNumber")
    [void]$Builder.AppendLine("> Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
    [void]$Builder.AppendLine("> Project root: $ProjectRoot")
    [void]$Builder.AppendLine("")
    [void]$Builder.AppendLine("---")
    [void]$Builder.AppendLine("")
}

function Protect-MarkdownCodeFence {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Content
    )

    # Use four backticks for the outer code fence.
    # Existing three-backtick blocks inside Markdown files will not close it.
    return $Content
}

# =============================================================================
# Validation
# =============================================================================

if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
    throw "ProjectRoot could not be determined. Specify it using -ProjectRoot."
}

$ProjectRoot = Get-NormalizedFullPath -Path $ProjectRoot

if (-not (Test-Path -LiteralPath $ProjectRoot -PathType Container)) {
    throw "Project root does not exist: $ProjectRoot"
}

if ([System.IO.Path]::GetExtension($OutputFileName) -ne ".md") {
    $OutputFileName = [System.IO.Path]::GetFileNameWithoutExtension($OutputFileName) + ".md"
}

$maxOutputBytes = $MaxOutputFileSizeMB * 1MB

Write-Status "" Cyan
Write-Status "============================================================" Cyan
Write-Status " Project Source Export" Cyan
Write-Status "============================================================" Cyan
Write-Status "Project root : $ProjectRoot" Gray
Write-Status "Output name  : $OutputFileName" Gray
Write-Status "Part limit   : $MaxOutputFileSizeMB MB" Gray
Write-Status "" Gray

# =============================================================================
# Remove previous exports
# =============================================================================

$outputBaseName = [System.IO.Path]::GetFileNameWithoutExtension($OutputFileName)

$previousOutputs = Get-ChildItem -LiteralPath $ProjectRoot -File -ErrorAction SilentlyContinue |
    Where-Object {
        $_.Name -eq $OutputFileName -or
        $_.Name -like "$outputBaseName-Part-*.md"
    }

foreach ($previousOutput in $previousOutputs) {
    Remove-Item -LiteralPath $previousOutput.FullName -Force
    Write-Status "Removed previous export: $($previousOutput.Name)" DarkGray
}

# =============================================================================
# Discover source files
# =============================================================================

Write-Status "Scanning project files..." Yellow

$allFiles = @(
    Get-ChildItem -LiteralPath $ProjectRoot -File -Recurse -Force -ErrorAction SilentlyContinue
)

$includedFiles = New-Object System.Collections.Generic.List[System.IO.FileInfo]
$skippedLargeFiles = New-Object System.Collections.Generic.List[string]
$skippedUnreadableFiles = New-Object System.Collections.Generic.List[string]

foreach ($file in $allFiles) {
    $relativePath = Get-RelativeProjectPath -FullPath $file.FullName -RootPath $ProjectRoot

    if ($file.Length -gt ($MaxIndividualFileSizeMB * 1MB)) {
        if (-not (Test-IsChildOfExcludedDirectory -RelativePath $relativePath)) {
            $skippedLargeFiles.Add($relativePath)
        }

        continue
    }

    if (Test-ShouldIncludeFile -File $file -RelativePath $relativePath) {
        $includedFiles.Add($file)
    }
}

$includedFiles = @(
    $includedFiles |
        Sort-Object {
            Get-RelativeProjectPath -FullPath $_.FullName -RootPath $ProjectRoot
        }
)

Write-Status "Supported source files found: $($includedFiles.Count)" Green

if ($includedFiles.Count -eq 0) {
    throw "No supported source files were found in the project."
}

# =============================================================================
# Prepare project overview and file tree
# =============================================================================

$projectName = Split-Path -Leaf $ProjectRoot
$projectTree = Get-ProjectTree -Files $includedFiles

$overviewBuilder = New-Object System.Text.StringBuilder

[void]$overviewBuilder.AppendLine("# Project Overview")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("- Project name: $projectName")
[void]$overviewBuilder.AppendLine("- Export date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
[void]$overviewBuilder.AppendLine("- Included source files: $($includedFiles.Count)")
[void]$overviewBuilder.AppendLine("- Generated code included: $([bool]$IncludeGeneratedCode)")
[void]$overviewBuilder.AppendLine("- Package lock included: $([bool]$IncludePackageLock)")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("## Important interpretation")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("This document is a static snapshot of the project source code.")
[void]$overviewBuilder.AppendLine("It does not automatically synchronize with later GitHub commits.")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("Sensitive files, binary files, dependency folders, build outputs,")
[void]$overviewBuilder.AppendLine("and other excluded content are intentionally not included.")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("## Project file index")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("````text")
[void]$overviewBuilder.AppendLine("````")
[void]$overviewBuilder.AppendLine("")
[void]$overviewBuilder.AppendLine("---")
[void]$overviewBuilder.AppendLine("")

# =============================================================================
# Export files
# =============================================================================

Write-Status "Exporting source code..." Yellow

$createdFiles = New-Object System.Collections.Generic.List[string]
$currentPart = 1
$currentBuilder = New-Object System.Text.StringBuilder

Add-OutputPartMetadata -Builder $currentBuilder -PartNumber $currentPart
[void]$currentBuilder.Append($overviewBuilder.ToString())

$filesExported = 0

foreach ($file in $includedFiles) {
    $relativePath = Get-RelativeProjectPath -FullPath $file.FullName -RootPath $ProjectRoot
    $language = Get-MarkdownLanguage -File $file
    $content = Get-SafeFileContent -Path $file.FullName

    if ($null -eq $content) {
        $skippedUnreadableFiles.Add($relativePath)
        Write-Status "Skipped unreadable file: $relativePath" DarkYellow
        continue
    }

    $content = Protect-MarkdownCodeFence -Content $content

    $fileSectionBuilder = New-Object System.Text.StringBuilder

    [void]$fileSectionBuilder.AppendLine("## File: $relativePath")
    [void]$fileSectionBuilder.AppendLine("")
    [void]$fileSectionBuilder.AppendLine("- Size: $($file.Length) bytes")
    [void]$fileSectionBuilder.AppendLine("- Last modified: $($file.LastWriteTime.ToString('yyyy-MM-dd HH:mm:ss'))")
    [void]$fileSectionBuilder.AppendLine("")
    [void]$fileSectionBuilder.AppendLine("````$language")
    [void]$fileSectionBuilder.AppendLine($content)

    if (-not $content.EndsWith("`n")) {
        [void]$fileSectionBuilder.AppendLine("")
    }

    [void]$fileSectionBuilder.AppendLine("````")
    [void]$fileSectionBuilder.AppendLine("")
    [void]$fileSectionBuilder.AppendLine("---")
    [void]$fileSectionBuilder.AppendLine("")

    $fileSection = $fileSectionBuilder.ToString()
    $estimatedCurrentBytes = [System.Text.Encoding]::UTF8.GetByteCount($currentBuilder.ToString())
    $estimatedSectionBytes = [System.Text.Encoding]::UTF8.GetByteCount($fileSection)

    # Save the current part before adding a section that would exceed the limit.
    if (
        $estimatedCurrentBytes -gt 0 -and
        ($estimatedCurrentBytes + $estimatedSectionBytes) -gt $maxOutputBytes
    ) {
        $partOutputPath = Get-PartOutputPath -PartNumber $currentPart -UseMultipleParts $true
        Write-Utf8File -Path $partOutputPath -Content $currentBuilder.ToString()
        $createdFiles.Add($partOutputPath)

        Write-Status "Created: $([System.IO.Path]::GetFileName($partOutputPath))" Green

        $currentPart++
        $currentBuilder = New-Object System.Text.StringBuilder
        Add-OutputPartMetadata -Builder $currentBuilder -PartNumber $currentPart
    }

    [void]$currentBuilder.Append($fileSection)
    $filesExported++

    Write-Progress `
        -Activity "Exporting project source" `
        -Status "$filesExported of $($includedFiles.Count): $relativePath" `
        -PercentComplete (($filesExported / $includedFiles.Count) * 100)
}

Write-Progress -Activity "Exporting project source" -Completed

# Write the final part.
if ($currentBuilder.Length -gt 0) {
    # If no earlier parts were created, keep the requested simple output filename.
    $useMultipleParts = $createdFiles.Count -gt 0

    $partOutputPath = Get-PartOutputPath `
        -PartNumber $currentPart `
        -UseMultipleParts $useMultipleParts

    Write-Utf8File -Path $partOutputPath -Content $currentBuilder.ToString()
    $createdFiles.Add($partOutputPath)

    Write-Status "Created: $([System.IO.Path]::GetFileName($partOutputPath))" Green
}

# If splitting occurred only after the first builder was written, all files already
# use numbered names. If only one file exists, it uses OutputFileName.
# This block keeps naming consistent in rare boundary cases.
if ($createdFiles.Count -gt 1) {
    $firstCreatedFile = $createdFiles[0]

    if ([System.IO.Path]::GetFileName($firstCreatedFile) -eq $OutputFileName) {
        $renamedFirstFile = Get-PartOutputPath -PartNumber 1 -UseMultipleParts $true
        Move-Item -LiteralPath $firstCreatedFile -Destination $renamedFirstFile -Force
        $createdFiles[0] = $renamedFirstFile
    }
}

# =============================================================================
# Summary
# =============================================================================

Write-Status "" Gray
Write-Status "============================================================" Cyan
Write-Status " Export completed successfully" Green
Write-Status "============================================================" Cyan
Write-Status "Files exported       : $filesExported" Gray
Write-Status "Output files created : $($createdFiles.Count)" Gray
Write-Status "" Gray


foreach ($createdFile in $createdFiles) {
    $createdFilePath = [string]$createdFile

    $createdFileInfo = Get-Item -LiteralPath $createdFilePath |
        Select-Object -First 1

    $fileLengthBytes = [double]$createdFileInfo.Length
    $sizeMB = [Math]::Round($fileLengthBytes / 1MB, 2)

    Write-Status "  $($createdFileInfo.FullName)" White
    Write-Status "  Size: $sizeMB MB" DarkGray
    Write-Host
}

if ($skippedLargeFiles.Count -gt 0) {
    Write-Status "Large files skipped: $($skippedLargeFiles.Count)" DarkYellow

    foreach ($largeFile in $skippedLargeFiles) {
        Write-Status "  - $largeFile" DarkYellow
    }

    Write-Status "" Gray
}

if ($skippedUnreadableFiles.Count -gt 0) {
    Write-Status "Unreadable files skipped: $($skippedUnreadableFiles.Count)" DarkYellow

    foreach ($unreadableFile in $skippedUnreadableFiles) {
        Write-Status "  - $unreadableFile" DarkYellow
    }

    Write-Status "" Gray
}

Write-Status "Security reminder:" Yellow
Write-Status "Before uploading, briefly inspect the generated Markdown file and" Yellow
Write-Status "make sure it does not contain passwords, tokens, connection strings," Yellow
Write-Status "tenant-specific secrets, personal information, or confidential data." Yellow
Write-Status "" Gray

``

---

## File: index.html

- Size: 380 bytes
- Last modified: 2026-09-11 10:56:26

``html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>pmt-plants-excellence-review</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

``

---

## File: package.json

- Size: 1248 bytes
- Last modified: 2026-10-08 22:05:36

``json
{
  "name": "pmt-plants-excellence-review",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "test": "vitest run --maxWorkers=1",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fluentui/react-components": "^9.74.7",
    "@fluentui/react-icons": "^2.0.340",
    "@microsoft/power-apps": "^1.3.1",
    "@tanstack/react-query": "^5.102.8",
    "dayjs": "^1.11.23",
    "html-to-image": "^1.11.13",
    "jszip": "^3.10.2",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-hook-form": "^7.87.0",
    "react-router-dom": "^7.18.3",
    "recharts": "^3.10.1"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.3",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "jsdom": "^30.0.1",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.69.0",
    "vite": "^8.3.0",
    "vitest": "^5.0.0"
  }
}

``

---

## File: power.config.json

- Size: 2668 bytes
- Last modified: 2026-10-23 03:13:07

``json
{
  "version": "1.0",
  "appId": "0035e0c3-5c24-4fbf-9b47-7d8cc0e9ac86",
  "appDisplayName": "PMT Plants Excellence Review",
  "region": "prod",
  "environmentId": "4d7fa01b-13ee-45c0-a672-10a55cfabde4",
  "description": " ",
  "buildPath": "./dist",
  "buildEntryPoint": "index.html",
  "localAppUrl": "http://localhost:3000",
  "logoPath": "Default",
  "connectionReferences": {},
  "databaseReferences": {
    "default.cds": {
      "dataSources": {
        "pmtplants": {
          "entitySetName": "apma_pmtplantses",
          "logicalName": "apma_pmtplants"
        },
        "pmtkpidefinitions": {
          "entitySetName": "apma_pmtkpidefinitionses",
          "logicalName": "apma_pmtkpidefinitions"
        },
        "pmtmonthlykpiresults": {
          "entitySetName": "apma_pmtmonthlykpiresultses",
          "logicalName": "apma_pmtmonthlykpiresults"
        },
        "pmttarget": {
          "entitySetName": "apma_pmttargets",
          "logicalName": "apma_pmttarget"
        },
        "pmtreportcategories": {
          "entitySetName": "apma_pmtreportcategorieses",
          "logicalName": "apma_pmtreportcategories"
        },
        "pmtmonthlyreports": {
          "entitySetName": "apma_pmtmonthlyreportses",
          "logicalName": "apma_pmtmonthlyreports"
        },
        "pmtreportattachmentrecord": {
          "entitySetName": "apma_pmtreportattachmentrecords",
          "logicalName": "apma_pmtreportattachmentrecord"
        },
        "users": {
          "entitySetName": "systemusers",
          "logicalName": "systemuser"
        },
        "pmtae": {
          "entitySetName": "apma_pmtaes",
          "logicalName": "apma_pmtae"
        },
        "pmtaecategories": {
          "entitySetName": "apma_pmtaecategorieses",
          "logicalName": "apma_pmtaecategories"
        },
        "pmtproductionlinecategories": {
          "entitySetName": "apma_pmtproductionlinecategorieses",
          "logicalName": "apma_pmtproductionlinecategories"
        },
        "pmtvolume_pac": {
          "entitySetName": "apma_pmtvolume_pacs",
          "logicalName": "apma_pmtvolume_pac"
        },
        "pmtproductionlinematrix": {
          "entitySetName": "apma_pmtproductionlinematrixes",
          "logicalName": "apma_pmtproductionlinematrix"
        },
        "pmtproductionkpimatrix": {
          "entitySetName": "apma_pmtproductionkpimatrixes",
          "logicalName": "apma_pmtproductionkpimatrix"
        },
        "pmtproductionkpi": {
          "entitySetName": "apma_pmtproductionkpis",
          "logicalName": "apma_pmtproductionkpi"
        }
      },
      "environmentVariableName": ""
    }
  }
}

``

---

## File: README.md

- Size: 3346 bytes
- Last modified: 2026-10-22 04:53:55

``markdown
# PMT Plants Excellence Review System

A Power Apps Code App built with React, TypeScript, Fluent UI v9, and Dataverse integration for managing monthly KPI targets, actual KPI results, plant comparisons, monthly reports, and attachments for TPU plants (Pudong-TPU, Zhanjiang-TPU, Changhua-TPU, Yokkaichi-TPU).

## Project Objective
- **KPI Overview**: Instant status & completion overview across four plants.
- **KPI Comparison**: Matrix and detailed target vs. actual comparison table across all plants.
- **KPI Data Entry**: Grouped grid entry for monthly actual and YTD KPI results.
- **Monthly Reports**: Category-grouped highlights & lowlights browser with attachment uploading/downloading.
- **Administration**: Master data management for Plants, KPI Definitions, and Targets.
- **Trend & Insights**: Reserved space for future analytics modules.

## Documentation
- [Architecture](docs/architecture.md)
- [Dataverse Field Map](docs/dataverse-field-map.md)
- [Business Rules](docs/business-rules.md)
- [Security & Authorization](docs/security.md)
- [Test Plan](docs/test-plan.md)
- [Deployment](docs/deployment.md)

## Monthly PowerPoint Export

On Monthly Reports, select Year and Month, then click **Export Report** at the right of the Type filter row. Export includes every Dataverse plant in display order, regardless of Plant, Report Category or Type filters.

Supported browsers open a save-location picker immediately on the Export Report click, then write the generated presentation to that file. Cancelling the picker cancels the export. Browsers or embedded hosts without file-picker access show a **Report ready** dialog after generation with a **Download PPT** link. That link remains valid until the dialog closes; the browser's download settings determine whether to ask for a location or use the default Downloads folder.

The bundled `public/monthly-report-template.pptx` supplies the original slide design. The cover and final slide are retained, with four consecutive slides per plant: Operations, Production Update, Quality Update and KPI Monthly Matrix. Red annotation frames and numbered markers are removed. AE uses the selected month; other charts and the KPI matrix show Jan-Dec. KPI YTD uses the selected month's stored YTD Actual, and KPIs with a blank CY Target are omitted. Empty Highlights/Lowlights labels are omitted, and long report text is reduced to fit its fixed region.

Charts are embedded as proportionally fitted PNGs. Report text and KPI tables remain editable in PowerPoint. The export reads data without updating Dataverse.

## Development Setup

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run unit tests
npm run test

# Run ESLint
npm run lint

# Build project
npm run build
```
## Code running in Local PC
```bash
# Frontend run
npm run dev

# Backend run
pac code run
```

## Before start
- Service for you apply ".NET", "Node.js"
```bash
# Check .NET
dotnet --version
# Install power platform CLI
dotnet tool install --global Microsoft.PowerApps.CLI.Tool
# After installation shutdown current Terminal and open new one
pac --version
# Enter your project path, like:
cd PMT-Plants-Excellence-Review
# Install npm dependencies
npm install
# Power Platform Login
pac auth create
# 更新 PAC CLI
dotnet tool update --global Microsoft.PowerApps.CLI.Tool

```

``

---

## File: src/App.css

- Size: 2430 bytes
- Last modified: 2026-09-11 13:56:57

``css
/* App CSS overrides */
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}

``

---

## File: src/app/App.tsx

- Size: 3841 bytes
- Last modified: 2026-09-22 22:35:19

``tsx
import { FluentProvider } from '@fluentui/react-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter } from 'react-router-dom';
import { appTheme } from '../styles/theme';
import { ToastProvider } from './providers/ToastProvider';
import { GlobalErrorBoundary } from '../components/common/GlobalErrorBoundary';
import { AppRoutes } from './routes';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});


export function App() {
  return (
    <FluentProvider theme={appTheme} style={{ width: '100%', height: '100%' }}>
      <QueryClientProvider client={queryClient}>
        <GlobalErrorBoundary>
          <ToastProvider>
            <HashRouter>
              <AppRoutes />
            </HashRouter>
          </ToastProvider>
        </GlobalErrorBoundary>
      </QueryClientProvider>
    </FluentProvider>
  );
}

export default App;


// import { FluentProvider } from '@fluentui/react-components';
// import {
//   MutationCache,
//   QueryCache,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query';
// import { HashRouter } from 'react-router-dom';
// import { appTheme } from '../styles/theme';
// import { ToastProvider } from './providers/ToastProvider';
// import { GlobalErrorBoundary } from '../components/common/GlobalErrorBoundary';
// import { AppRoutes } from './routes';

// const queryClient = new QueryClient({
//   queryCache: new QueryCache({
//     onError: (error, query) => {
//       const sdkError = error as {
//         message?: string;
//         status?: number;
//         requestId?: string;
//       };

//       console.error(
//         '[Global Query Error] Query Key:',
//         JSON.stringify(query.queryKey),
//       );

//       console.error(
//         '[Global Query Error] Status:',
//         sdkError.status,
//       );

//       console.error(
//         '[Global Query Error] Request ID:',
//         sdkError.requestId,
//       );

//       console.error(
//         '[Global Query Error] Raw Message:',
//         sdkError.message ?? String(error),
//       );

//       if (sdkError.message) {
//         try {
//           const parsed = JSON.parse(sdkError.message) as {
//             error?: {
//               code?: string;
//               message?: string;
//             };
//           };

//           console.error(
//             '[Global Query Error] Dataverse Code:',
//             parsed.error?.code,
//           );

//           console.error(
//             '[Global Query Error] Dataverse Message:',
//             parsed.error?.message,
//           );
//         } catch {
//           console.error(
//             '[Global Query Error] Message is not JSON:',
//             sdkError.message,
//           );
//         }
//       }
//     },
//   }),

//   mutationCache: new MutationCache({
//     onError: (error, variables, context, mutation) => {
//       console.error('[Global Mutation Error]', {
//         mutationKey: mutation.options.mutationKey,
//         variables,
//         context,
//         error,
//       });
//     },
//   }),

//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: false,
//     },
//   },
// });

// export function App() {
//   return (
//     <FluentProvider
//       theme={appTheme}
//       style={{ width: '100%', height: '100%' }}
//     >
//       <QueryClientProvider client={queryClient}>
//         <GlobalErrorBoundary>
//           <ToastProvider>
//             <HashRouter>
//               <AppRoutes />
//             </HashRouter>
//           </ToastProvider>
//         </GlobalErrorBoundary>
//       </QueryClientProvider>
//     </FluentProvider>
//   );
// }

// export default App;

``

---

## File: src/app/providers/ToastContext.ts

- Size: 420 bytes
- Last modified: 2026-09-11 12:18:19

``typescript
import { createContext } from 'react';
import type { ToastIntent } from '@fluentui/react-components';

export interface ToastContextType {
  notify: (title: string, body?: string, intent?: ToastIntent) => void;
  notifySuccess: (title: string, body?: string) => void;
  notifyError: (title: string, body?: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

``

---

## File: src/app/providers/ToastProvider.tsx

- Size: 1104 bytes
- Last modified: 2026-09-11 12:18:33

``tsx
import React, { type ReactNode } from 'react';
import {
  Toaster,
  useToastController,
  useId,
  Toast,
  ToastTitle,
  ToastBody,
  type ToastIntent,
} from '@fluentui/react-components';
import { ToastContext } from './ToastContext';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const toasterId = useId('app-toaster');
  const { dispatchToast } = useToastController(toasterId);

  const notify = (title: string, body?: string, intent: ToastIntent = 'info') => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        {body && <ToastBody>{body}</ToastBody>}
      </Toast>,
      { intent }
    );
  };

  const notifySuccess = (title: string, body?: string) => notify(title, body, 'success');
  const notifyError = (title: string, body?: string) => notify(title, body, 'error');

  return (
    <ToastContext.Provider value={{ notify, notifySuccess, notifyError }}>
      {children}
      <Toaster toasterId={toasterId} position="bottom-end" pauseOnHover />
    </ToastContext.Provider>
  );
};

``

---

## File: src/app/routes.tsx

- Size: 2082 bytes
- Last modified: 2026-10-06 23:13:16

``tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '../layouts/AppShell/AppShell';
import { KpiOverviewPage } from '../pages/KPIOverviewPage/KpiOverviewPage';
import { KpiComparisonPage } from '../pages/KPIComparisonPage/KpiComparisonPage';
import { ProductionQualityPage } from '../pages/ProductionQualityPage/ProductionQualityPage';
import { KpiDataEntryPage } from '../pages/KPIEntryPage/KpiDataEntryPage';
import { ProductionDataEntryPage } from '../pages/ProductionDataEntryPage/ProductionDataEntryPage';
import { MonthlyReportsPage } from '../pages/MonthlyReportsPage/MonthlyReportsPage';
import { AdministrationPage } from '../pages/AdministrationPage/AdministrationPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/kpi-overview" replace />} />
        <Route path="kpi-overview" element={<KpiOverviewPage />} />
        <Route path="chart">
          <Route index element={<Navigate to="/chart/volume-pac" replace />} />
          <Route path="volume-pac" element={<KpiComparisonPage />} />
          <Route path="production-quality" element={<ProductionQualityPage />} />
        </Route>
        <Route path="volume-pac" element={<Navigate to="/chart/volume-pac" replace />} />
        <Route path="kpi-comparison" element={<Navigate to="/chart/volume-pac" replace />} />
        <Route path="kpi-entry" element={<KpiDataEntryPage />} />
        <Route path="production-entry" element={<ProductionDataEntryPage />} />
        <Route path="monthly-reports" element={<MonthlyReportsPage />} />
        <Route path="administration" element={null} />
        <Route path="administration/configuration" element={<AdministrationPage key="configuration" mode="configuration" />} />
        <Route path="administration/basic-data" element={<AdministrationPage key="basic" mode="basic" />} />
        <Route path="*" element={<Navigate to="/kpi-overview" replace />} />
      </Route>
    </Routes>
  );
};

``

---

## File: src/components/common/EmptyState.tsx

- Size: 1735 bytes
- Last modified: 2026-09-11 12:18:41

``tsx
import React, { type ReactNode } from 'react';
import { makeStyles, tokens, Subtitle2, Body1, Button } from '@fluentui/react-components';
import { Folder24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacingVerticalXXL,
    gap: tokens.spacingVerticalS,
    backgroundColor: '#FFFFFF',
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: 'center',
  },
  icon: {
    color: tokens.colorNeutralForeground3,
    fontSize: '48px',
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  message: {
    color: tokens.colorNeutralForeground3,
    maxWidth: '400px',
  },
});

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Found',
  message = 'There are no records matching your current filter criteria.',
  icon = <Folder24Regular style={{ fontSize: '48px' }} />,
  action,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <Subtitle2 className={styles.title}>{title}</Subtitle2>
      <Body1 className={styles.message}>{message}</Body1>
      {action && (
        <Button appearance="primary" onClick={action.onClick} style={{ marginTop: '12px' }}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

``

---

## File: src/components/common/ErrorState.tsx

- Size: 1996 bytes
- Last modified: 2026-09-22 16:12:35

``tsx
import React from 'react';
import { makeStyles, tokens, Subtitle2, Body1, Button } from '@fluentui/react-components';
import { ErrorCircle24Regular, ArrowSync24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacingVerticalXXL,
    gap: tokens.spacingVerticalS,
    backgroundColor: '#FFF4F4',
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorPaletteRedBorderActive}`,
    textAlign: 'center',
  },
  icon: {
    color: tokens.colorPaletteRedForeground1,
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  message: {
    color: tokens.colorNeutralForeground2,
    maxWidth: '500px',
  },
});

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

function errorMessage(message: string): string {
  try {
    const parsed = JSON.parse(message) as { error?: { message?: string } };
    return parsed.error?.message ?? message;
  } catch {
    return message;
  }
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to Load Data',
  message = 'An error occurred while communicating with Dataverse. Please check your network or try again.',
  onRetry,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <ErrorCircle24Regular className={styles.icon} style={{ fontSize: '48px' }} />
      <Subtitle2 className={styles.title}>{title}</Subtitle2>
      <Body1 className={styles.message}>{errorMessage(message)}</Body1>
      {onRetry && (
        <Button
          appearance="primary"
          icon={<ArrowSync24Regular />}
          onClick={onRetry}
          style={{ marginTop: '12px' }}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

``

---

## File: src/components/common/GlobalErrorBoundary.tsx

- Size: 1698 bytes
- Last modified: 2026-09-11 12:18:47

``tsx
import { Component, type ReactNode, type ErrorInfo } from 'react';
import {
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  Button,
} from '@fluentui/react-components';
import { DismissCircle24Regular } from '@fluentui/react-icons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Global Error Boundary caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
          <MessageBar intent="error" icon={<DismissCircle24Regular />}>
            <MessageBarTitle>An unexpected application error occurred</MessageBarTitle>
            <MessageBarBody>
              {this.state.error?.message || 'Something went wrong while rendering this section.'}
            </MessageBarBody>
            <div style={{ marginTop: '12px' }}>
              <Button
                appearance="primary"
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  window.location.reload();
                }}
              >
                Reload Application
              </Button>
            </div>
          </MessageBar>
        </div>
      );
    }

    return this.props.children;
  }
}

``

---

## File: src/components/common/LoadingSkeleton.tsx

- Size: 973 bytes
- Last modified: 2026-09-11 11:55:15

``tsx
import React from 'react';
import { Skeleton, SkeletonItem, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalM,
  },
  row: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
  },
});

interface LoadingSkeletonProps {
  rows?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ rows = 4 }) => {
  const styles = useStyles();

  return (
    <Skeleton className={styles.container}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={styles.row}>
          <SkeletonItem style={{ height: '36px', width: '30%' }} />
          <SkeletonItem style={{ height: '36px', width: '40%' }} />
          <SkeletonItem style={{ height: '36px', width: '30%' }} />
        </div>
      ))}
    </Skeleton>
  );
};

``

---

## File: src/components/common/PageHeader.tsx

- Size: 1448 bytes
- Last modified: 2026-09-11 12:19:25

``tsx
import React, { type ReactNode } from 'react';
import { makeStyles, tokens, Title2, Subtitle2 } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalL,
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalM,
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: tokens.fontWeightBold,
    color: '#0F172A',
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
});

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <div className={styles.titleGroup}>
          <Title2 className={styles.title}>{title}</Title2>
          {subtitle && <Subtitle2 className={styles.subtitle}>{subtitle}</Subtitle2>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
};

``

---

## File: src/components/common/StatusBadge.tsx

- Size: 2686 bytes
- Last modified: 2026-09-11 12:19:25

``tsx
import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import {
  CheckmarkCircle16Filled,
  Warning16Filled,
  DismissCircle16Filled,
  QuestionCircle16Filled,
} from '@fluentui/react-icons';
import { KpiStatus } from '../../domain/enums';
import { statusColors } from '../../styles/theme';

const useStyles = makeStyles({
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
    border: '1px solid transparent',
    whiteSpace: 'nowrap',
  },
  green: {
    backgroundColor: statusColors.greenBg,
    color: statusColors.greenFg,
    border: `1px solid ${statusColors.greenBorder}`,
  },
  amber: {
    backgroundColor: statusColors.amberBg,
    color: statusColors.amberFg,
    border: `1px solid ${statusColors.amberBorder}`,
  },
  red: {
    backgroundColor: statusColors.redBg,
    color: statusColors.redFg,
    border: `1px solid ${statusColors.redBorder}`,
  },
  grey: {
    backgroundColor: statusColors.greyBg,
    color: statusColors.greyFg,
    border: `1px solid ${statusColors.greyBorder}`,
  },
});

interface StatusBadgeProps {
  status: KpiStatus | string;
  showText?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showText = true }) => {
  const styles = useStyles();

  let badgeClass: string;
  let icon: React.ReactNode;
  let label: string;

  switch (status) {
    case KpiStatus.Green:
    case 'Green':
      badgeClass = styles.green;
      icon = <CheckmarkCircle16Filled />;
      label = 'Green / On Target';
      break;
    case KpiStatus.Amber:
    case 'Amber':
    case 'Yellow':
      badgeClass = styles.amber;
      icon = <Warning16Filled />;
      label = 'Amber / Attention';
      break;
    case KpiStatus.Red:
    case 'Red':
      badgeClass = styles.red;
      icon = <DismissCircle16Filled />;
      label = 'Red / Action Req.';
      break;
    case KpiStatus.Grey:
    case 'Grey':
      badgeClass = styles.grey;
      icon = <QuestionCircle16Filled />;
      label = 'Not Applicable';
      break;
    case KpiStatus.Missing:
    case 'Missing':
    default:
      badgeClass = styles.grey;
      icon = <QuestionCircle16Filled />;
      label = 'Missing / Not Entered';
      break;
  }

  return (
    <span className={`${styles.badge} ${badgeClass}`} title={label} aria-label={label}>
      {icon}
      {showText && <span>{label}</span>}
    </span>
  );
};

``

---

## File: src/components/filters/GlobalFilters.tsx

- Size: 12039 bytes
- Last modified: 2026-10-07 21:58:12

``tsx
import React, { useState } from 'react';
import {
  makeStyles,
  tokens,
  Dropdown,
  Option,
  Button,
  Tag,
  TagGroup,
  Label,
} from '@fluentui/react-components';
import {
  ArrowReset24Regular,
  Filter24Regular,
} from '@fluentui/react-icons';
import type { GlobalFilterState } from '../../types/filters';
import { useAllTargets } from '../../hooks/queries';
import { getPreviousPeriod } from '../../domain/services/period';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#FFFFFF',
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: tokens.spacingVerticalL,
    boxShadow: tokens.shadow2,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalM,
    alignItems: 'flex-end',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    minWidth: '140px',
  },
  actionsGroup: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  tagsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalXXS,
  },
});

interface GlobalFiltersProps {
  value: GlobalFilterState;
  onChange: (newValue: GlobalFilterState) => void;
  showPlant?: boolean;
  showPlantMultiSelect?: boolean;
  selectedPlantIds?: string[];
  onPlantIdsChange?: (plantIds: string[]) => void;
  showCategory?: boolean;
  showKpi?: boolean;
  showStatus?: boolean;
  showApplyButton?: boolean;
  plantsList?: Array<{ id: string; name: string }>;
  kpiList?: Array<{ id: string; name: string }>;
  categoryList?: string[];
}

const MONTHS = [
  { value: 1, label: 'Jan' },
  { value: 2, label: 'Feb' },
  { value: 3, label: 'Mar' },
  { value: 4, label: 'Apr' },
  { value: 5, label: 'May' },
  { value: 6, label: 'Jun' },
  { value: 7, label: 'Jul' },
  { value: 8, label: 'Aug' },
  { value: 9, label: 'Sep' },
  { value: 10, label: 'Oct' },
  { value: 11, label: 'Nov' },
  { value: 12, label: 'Dec' },
];

const CATEGORIES = ['all', 'EHS', 'Production', 'Quality'];
const STATUSES = ['all', 'Green', 'Amber', 'Red', 'Grey', 'Missing'];

export const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  value,
  onChange,
  showPlant = true,
  showPlantMultiSelect = false,
  selectedPlantIds = [],
  onPlantIdsChange,
  showCategory = true,
  showKpi = false,
  showStatus = false,
  showApplyButton = false,
  plantsList = [
    { id: 'all', name: 'All Plants' },
    { id: 'pudong', name: 'Pudong-TPU' },
    { id: 'zhanjiang', name: 'Zhanjiang-TPU' },
    { id: 'changhua', name: 'Changhua-TPU' },
    { id: 'yokkaichi', name: 'Yokkaichi-TPU' },
  ],
  kpiList = [],
  categoryList,
}) => {
  const styles = useStyles();
  const targetsQuery = useAllTargets();
  const previousPeriod = getPreviousPeriod();
  const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear).concat(previousPeriod.year, new Date().getFullYear()))].sort((left, right) => left - right);
  const [tempState, setTempState] = useState<GlobalFilterState>(value);

  const updateField = (field: keyof GlobalFilterState, val: string | number) => {
    const updated = { ...tempState, [field]: val };
    setTempState(updated);
    if (!showApplyButton) {
      onChange(updated);
    }
  };

  const handleApply = () => {
    onChange(tempState);
  };

  const handleReset = () => {
    const previousPeriod = getPreviousPeriod();
    const defaultState: GlobalFilterState = {
      year: previousPeriod.year,
      month: previousPeriod.month,
      plantId: 'all',
      kpiCategory: 'all',
      kpiId: 'all',
      status: 'all',
    };
    setTempState(defaultState);
    onChange(defaultState);
    onPlantIdsChange?.([]);
  };

  const activePlantLabel =
    plantsList.find((p) => p.id === value.plantId)?.name || 'All Plants';
  const selectedPlantLabels = plantsList.filter((plant) => selectedPlantIds.includes(plant.id)).map((plant) => plant.name);
  const activeMonthLabel = MONTHS.find((m) => m.value === value.month)?.label || '';
  const availableCategories = categoryList ? ['all', ...categoryList] : CATEGORIES;
  const selectedCategory = availableCategories.includes(tempState.kpiCategory)
    ? tempState.kpiCategory
    : 'all';
  const activeCategory = availableCategories.includes(value.kpiCategory)
    ? value.kpiCategory
    : 'all';

  return (
    <div className={styles.container}>
      <div className={styles.filterRow}>
        {/* Year Filter */}
        <div className={styles.fieldGroup}>
          <Label htmlFor="year-select" size="small">
            Year
          </Label>
          <Dropdown
            id="year-select"
            size="medium"
            value={tempState.year.toString()}
            selectedOptions={[tempState.year.toString()]}
            onOptionSelect={(_e, data) =>
              data.optionValue && updateField('year', parseInt(data.optionValue, 10))
            }
          >
            {years.map((y) => (
              <Option key={y} value={y.toString()}>
                {y.toString()}
              </Option>
            ))}
          </Dropdown>
        </div>

        {/* Month Filter */}
        <div className={styles.fieldGroup}>
          <Label htmlFor="month-select" size="small">
            Month
          </Label>
          <Dropdown
            id="month-select"
            size="medium"
            value={MONTHS.find((m) => m.value === tempState.month)?.label || ''}
            selectedOptions={[tempState.month.toString()]}
            onOptionSelect={(_e, data) =>
              data.optionValue && updateField('month', parseInt(data.optionValue, 10))
            }
          >
            {MONTHS.map((m) => (
              <Option key={m.value} value={m.value.toString()}>
                {m.label}
              </Option>
            ))}
          </Dropdown>
        </div>

        {/* Plant Filter */}
        {showPlant && (
          <div className={styles.fieldGroup}>
            <Label htmlFor="plant-select" size="small">
              Plant
            </Label>
            <Dropdown
              id="plant-select"
              size="medium"
              value={plantsList.find((p) => p.id === tempState.plantId)?.name || 'All Plants'}
              selectedOptions={[tempState.plantId]}
              onOptionSelect={(_e, data) =>
                data.optionValue && updateField('plantId', data.optionValue)
              }
            >
              {plantsList.map((p) => (
                <Option key={p.id} value={p.id}>
                  {p.name}
                </Option>
              ))}
            </Dropdown>
          </div>
        )}

        {showPlantMultiSelect && (
          <div className={styles.fieldGroup}>
            <Label htmlFor="plant-multi-select" size="small">Plant</Label>
            <Dropdown
              id="plant-multi-select"
              size="medium"
              multiselect
              value={selectedPlantLabels.length > 0 ? selectedPlantLabels.join(', ') : 'All Plants'}
              selectedOptions={selectedPlantIds}
              onOptionSelect={(_e, data) => onPlantIdsChange?.(data.selectedOptions)}
            >
              {plantsList.map((plant) => <Option key={plant.id} value={plant.id}>{plant.name}</Option>)}
            </Dropdown>
          </div>
        )}

        {/* Category Filter */}
        {showCategory && (
          <div className={styles.fieldGroup}>
            <Label htmlFor="category-select" size="small">
              Category
            </Label>
            <Dropdown
              id="category-select"
              size="medium"
              value={selectedCategory === 'all' ? 'All Categories' : selectedCategory}
              selectedOptions={[selectedCategory]}
              onOptionSelect={(_e, data) =>
                data.optionValue && updateField('kpiCategory', data.optionValue)
              }
            >
              {availableCategories.map((c) => (
                <Option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </Option>
              ))}
            </Dropdown>
          </div>
        )}

        {/* KPI Filter */}
        {showKpi && kpiList.length > 0 && (
          <div className={styles.fieldGroup}>
            <Label htmlFor="kpi-select" size="small">
              KPI
            </Label>
            <Dropdown
              id="kpi-select"
              size="medium"
              value={kpiList.find((k) => k.id === tempState.kpiId)?.name || 'All KPIs'}
              selectedOptions={[tempState.kpiId]}
              onOptionSelect={(_e, data) =>
                data.optionValue && updateField('kpiId', data.optionValue)
              }
            >
              <Option key="all" value="all">
                All KPIs
              </Option>
              {kpiList.map((k) => (
                <Option key={k.id} value={k.id}>
                  {k.name}
                </Option>
              ))}
            </Dropdown>
          </div>
        )}

        {/* Status Filter */}
        {showStatus && (
          <div className={styles.fieldGroup}>
            <Label htmlFor="status-select" size="small">
              Status
            </Label>
            <Dropdown
              id="status-select"
              size="medium"
              value={tempState.status === 'all' ? 'All Statuses' : tempState.status}
              selectedOptions={[tempState.status]}
              onOptionSelect={(_e, data) =>
                data.optionValue && updateField('status', data.optionValue)
              }
            >
              {STATUSES.map((s) => (
                <Option key={s} value={s}>
                  {s === 'all' ? 'All Statuses' : s}
                </Option>
              ))}
            </Dropdown>
          </div>
        )}

        {/* Filter Actions */}
        <div className={styles.actionsGroup}>
          {showApplyButton && (
            <Button appearance="primary" icon={<Filter24Regular />} onClick={handleApply}>
              Apply Filters
            </Button>
          )}
          <Button appearance="subtle" icon={<ArrowReset24Regular />} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Active Filter Tags */}
      <div className={styles.tagsRow}>
        <Label size="small" style={{ color: tokens.colorNeutralForeground3 }}>
          Active:
        </Label>
        <TagGroup aria-label="Active filters">
          <Tag size="small" appearance="outline">
            Year: {value.year}
          </Tag>
          <Tag size="small" appearance="outline">
            Month: {activeMonthLabel}
          </Tag>
          {showPlant && value.plantId !== 'all' && (
            <Tag size="small" appearance="outline">
              Plant: {activePlantLabel}
            </Tag>
          )}
          {showPlantMultiSelect && selectedPlantLabels.map((plant) => (
            <Tag key={plant} size="small" appearance="outline">Plant: {plant}</Tag>
          ))}
          {showCategory && activeCategory !== 'all' && (
            <Tag size="small" appearance="outline">
              Category: {activeCategory}
            </Tag>
          )}
          {showStatus && value.status !== 'all' && (
            <Tag size="small" appearance="outline">
              Status: {value.status}
            </Tag>
          )}
        </TagGroup>
      </div>
    </div>
  );
};

``

---

## File: src/components/filters/ReportFilters.tsx

- Size: 3281 bytes
- Last modified: 2026-10-08 22:27:18

``tsx
import React from 'react';
import { Dropdown, Label, makeStyles, Option, tokens } from '@fluentui/react-components';
import type { Plant, ReportCategory } from '../../domain/models';
import { ReportType } from '../../domain/enums';

export interface ReportFilterState {
  plantIds: string[];
  categoryIds: string[];
  types: string[];
}

interface ReportFiltersProps {
  value: ReportFilterState;
  plants: Plant[];
  categories: ReportCategory[];
  onChange: (value: ReportFilterState) => void;
  actions?: React.ReactNode;
}

const useStyles = makeStyles({
  root: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalM, alignItems: 'flex-end' },
  field: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, minWidth: '210px' },
  actions: { marginLeft: 'auto', flexShrink: 0 },
});

const selectionLabel = (count: number, allLabel: string, singular: string) => {
  if (count === 0) return allLabel;
  return count === 1 ? singular : `${count} selected`;
};

const normalizeSelection = (values: string[]) => [...new Set(values.filter((value) => value.trim().length > 0))];

export const ReportFilters: React.FC<ReportFiltersProps> = ({ value, plants, categories, onChange, actions }) => {
  const styles = useStyles();
  const orderedPlants = [...plants].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  const orderedCategories = [...categories].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  return <div className={styles.root}>
    <div className={styles.field}>
      <Label>Plant</Label>
      <Dropdown multiselect value={selectionLabel(value.plantIds.length, 'All Plants', '1 plant selected')} selectedOptions={normalizeSelection(value.plantIds)} onOptionSelect={(_event, data) => onChange({ ...value, plantIds: normalizeSelection(data.selectedOptions) })}>
        {orderedPlants.map((plant) => <Option key={plant.id} value={plant.id} text={plant.name}>{plant.name}</Option>)}
      </Dropdown>
    </div>
    <div className={styles.field}>
      <Label>Report Category</Label>
      <Dropdown multiselect value={selectionLabel(value.categoryIds.length, 'All Report Categories', '1 category selected')} selectedOptions={normalizeSelection(value.categoryIds)} onOptionSelect={(_event, data) => onChange({ ...value, categoryIds: normalizeSelection(data.selectedOptions) })}>
        {orderedCategories.map((category) => <Option key={category.id} value={category.id} text={category.name}>{category.name}</Option>)}
      </Dropdown>
    </div>
    <div className={styles.field}>
      <Label>Type</Label>
      <Dropdown multiselect value={selectionLabel(value.types.length, 'All Types', '1 type selected')} selectedOptions={normalizeSelection(value.types)} onOptionSelect={(_event, data) => onChange({ ...value, types: normalizeSelection(data.selectedOptions) })}>
        <Option value={ReportType.Highlights} text={ReportType.Highlights}>Highlights</Option>
        <Option value={ReportType.Lowlights} text={ReportType.Lowlights}>Lowlights</Option>
      </Dropdown>
    </div>
    {actions ? <div className={styles.actions}>{actions}</div> : null}
  </div>;
};

``

---

## File: src/components/filters/VolumePacFilters.tsx

- Size: 3914 bytes
- Last modified: 2026-10-05 13:22:04

``tsx
import React from 'react';
import { Dropdown, Label, makeStyles, Option, tokens } from '@fluentui/react-components';
import { useAllTargets } from '../../hooks/queries';
import { getPreviousPeriod } from '../../domain/services/period';

export interface VolumePacFilterState {
  year: number;
  month: number;
  plantIds: string[];
  productionLineIds: string[];
}

interface OptionItem {
  id: string;
  name: string;
  displayOrder: number;
}

interface VolumePacFiltersProps {
  value: VolumePacFilterState;
  plants: OptionItem[];
  productionLines: OptionItem[];
  onChange: (value: VolumePacFilterState) => void;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  field: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, minWidth: '150px' },
  multi: { minWidth: '230px' },
});

const selectedLabel = (ids: string[], options: OptionItem[], allLabel: string) => {
  if (ids.length === 0) return allLabel;
  if (ids.length === 1) return options.find((option) => option.id === ids[0])?.name ?? '1 selected';
  return `${ids.length} selected`;
};

export const VolumePacFilters: React.FC<VolumePacFiltersProps> = ({ value, plants, productionLines, onChange }) => {
  const styles = useStyles();
  const targetsQuery = useAllTargets();
  const previousPeriod = getPreviousPeriod();
  const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear).concat(previousPeriod.year, new Date().getFullYear()))].sort((left, right) => left - right);
  const orderedPlants = [...plants].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  const orderedProductionLines = [...productionLines].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  return <div className={styles.root}>
    <div className={styles.field}><Label>Year</Label><Dropdown value={String(value.year)} selectedOptions={[String(value.year)]} onOptionSelect={(_event, data) => data.optionValue && onChange({ ...value, year: Number(data.optionValue) })}>{years.map((year) => <Option key={year} value={String(year)} text={String(year)}>{year}</Option>)}</Dropdown></div>
    <div className={styles.field}><Label>Month <span aria-hidden="true">(AE only)</span></Label><Dropdown value={MONTHS[value.month - 1]} selectedOptions={[String(value.month)]} onOptionSelect={(_event, data) => data.optionValue && onChange({ ...value, month: Number(data.optionValue) })}>{MONTHS.map((month, index) => <Option key={month} value={String(index + 1)}>{month}</Option>)}</Dropdown></div>
    <div className={`${styles.field} ${styles.multi}`}><Label>Plant</Label><Dropdown multiselect value={selectedLabel(value.plantIds, orderedPlants, 'All Plants')} selectedOptions={value.plantIds} onOptionSelect={(_event, data) => onChange({ ...value, plantIds: data.selectedOptions })}>{orderedPlants.map((plant) => <Option key={plant.id} value={plant.id}>{plant.name}</Option>)}</Dropdown></div>
    <div className={`${styles.field} ${styles.multi}`}><Label>Production Line</Label><Dropdown multiselect value={selectedLabel(value.productionLineIds, orderedProductionLines, 'All Production Lines')} selectedOptions={value.productionLineIds} onOptionSelect={(_event, data) => onChange({ ...value, productionLineIds: data.selectedOptions })}>{orderedProductionLines.map((line) => <Option key={line.id} value={line.id}>{line.name}</Option>)}</Dropdown></div>
  </div>;
};

``

---

## File: src/components/kpi/KpiDetailTable.tsx

- Size: 2477 bytes
- Last modified: 2026-09-20 22:25:10

``tsx
import React from 'react';
import { Caption1, Card, Divider, makeStyles, tokens } from '@fluentui/react-components';
import { StatusBadge } from '../common/StatusBadge';
import type { ComparisonRow } from '../../pages/KPIComparisonPage/comparisonMetrics';

const useStyles = makeStyles({
  scroll: { overflowX: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium },
  table: { width: '100%', minWidth: '1050px', borderCollapse: 'collapse' },
  cell: { padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`, borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, textAlign: 'left', whiteSpace: 'nowrap' },
  header: { backgroundColor: tokens.colorNeutralBackground3, color: tokens.colorNeutralForeground2, fontWeight: tokens.fontWeightSemibold, fontSize: tokens.fontSizeBase200 },
  numeric: { textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
});

const format = (value: number | null | undefined, suffix = '') => value === null || value === undefined ? 'N/A' : `${value.toFixed(2)}${suffix}`;

export const KpiDetailTable: React.FC<{ rows: ComparisonRow[] }> = ({ rows }) => {
  const styles = useStyles();
  return <Card className={styles.scroll}><table className={styles.table}><thead><tr>{['Plant', 'KPI', 'Unit', 'PY Actual', 'CY Target', 'Monthly Actual', 'YTD Actual', 'Variance', 'Achievement', 'Status'].map((heading) => <th className={`${styles.cell} ${styles.header}`} key={heading}>{heading}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={`${row.plant.id}:${row.kpi.id}`}><td className={styles.cell}>{row.plant.name}</td><td className={styles.cell}>{row.kpi.name}</td><td className={styles.cell}>{row.kpi.unit}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.target?.pyActual)}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.target?.cyTarget)}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.result?.monthlyActual)}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.result?.ytdActual)}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.variance)}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.achievement, '%')}</td><td className={styles.cell}><StatusBadge status={row.status} /></td></tr>)}</tbody></table><Divider /><Caption1 style={{ display: 'block', padding: '12px 16px' }}>Achievement is N/A when the target is zero or missing.</Caption1></Card>;
};

``

---

## File: src/components/kpi/KpiMonthlyMatrixTable.tsx

- Size: 2602 bytes
- Last modified: 2026-10-07 22:02:09

``tsx
import React from 'react';
import { Card, makeStyles, tokens } from '@fluentui/react-components';
import type { KpiMonthlyMatrixRow } from '../../pages/KPIOverviewPage/overviewMetrics';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const useStyles = makeStyles({
  scroll: { overflowX: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium },
  table: { width: '100%', minWidth: '1900px', tableLayout: 'fixed', borderCollapse: 'collapse' },
  cell: { padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`, borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, textAlign: 'left', whiteSpace: 'nowrap' },
  header: { backgroundColor: tokens.colorNeutralBackground3, color: tokens.colorNeutralForeground2, fontWeight: tokens.fontWeightSemibold, fontSize: tokens.fontSizeBase200 },
  numeric: { textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
});

const format = (value: number | null | undefined) => value === null || value === undefined ? '' : value.toFixed(2);

export const KpiMonthlyMatrixTable: React.FC<{ rows: KpiMonthlyMatrixRow[] }> = ({ rows }) => {
  const styles = useStyles();
  return <Card className={styles.scroll}><table className={styles.table}>
    <colgroup>
      <col style={{ width: '180px' }} /><col style={{ width: '250px' }} /><col style={{ width: '90px' }} />
      <col style={{ width: '115px' }} /><col style={{ width: '115px' }} />
      {MONTHS.map((month) => <col key={month} style={{ width: '85px' }} />)}
      <col style={{ width: '130px' }} />
    </colgroup>
    <thead><tr>{['Plant Name', 'KPI', 'Unit', 'PY Actual', 'CY Target', ...MONTHS, 'YTD Actual'].map((heading, index) => <th className={`${styles.cell} ${styles.header} ${index >= 3 ? styles.numeric : ''}`} key={heading}>{heading}</th>)}</tr></thead>
    <tbody>{rows.map((row) => <tr key={`${row.plant.id}:${row.kpi.id}`}>
      <td className={styles.cell}>{row.plant.name}</td>
      <td className={styles.cell}>{row.kpi.name}</td>
      <td className={styles.cell}>{row.kpi.unit}</td>
      <td className={`${styles.cell} ${styles.numeric}`}>{format(row.target?.pyActual)}</td>
      <td className={`${styles.cell} ${styles.numeric}`}>{format(row.target?.cyTarget)}</td>
      {row.monthlyActuals.map((value, index) => <td className={`${styles.cell} ${styles.numeric}`} key={MONTHS[index]}>{format(value)}</td>)}
      <td className={`${styles.cell} ${styles.numeric}`}>{format(row.ytdActual)}</td>
    </tr>)}</tbody>
  </table></Card>;
};

``

---

## File: src/data/adapters/currentUser.ts

- Size: 2451 bytes
- Last modified: 2026-09-22 16:24:45

``typescript
import { getContext } from '@microsoft/power-apps/app';
import { SystemusersService } from '../../generated/services/SystemusersService';
import type { Systemusers } from '../../generated/models/SystemusersModel';
import type { UserProfile } from '../../domain/models';

function escapeODataString(value: string): string {
  return value.replace(/'/g, "''");
}

function mapUser(record: Systemusers): UserProfile {
  const displayName = record.fullname
    || [record.firstname, record.lastname].filter(Boolean).join(' ')
    || record.domainname
    || record.internalemailaddress
    || 'BASF User';

  return {
    id: record.systemuserid,
    displayName,
    userPrincipalName: record.domainname || record.internalemailaddress,
  };
}

export async function getCurrentUserProfile(): Promise<UserProfile> {
  const context = await getContext();
  const identity = context.user;
  const filters: string[] = [];

  if (identity.objectId) {
    filters.push(`azureactivedirectoryobjectid eq '${escapeODataString(identity.objectId)}'`);
  }
  if (identity.userPrincipalName) {
    const principalName = escapeODataString(identity.userPrincipalName);
    filters.push(`domainname eq '${principalName}'`);
    filters.push(`internalemailaddress eq '${principalName}'`);
  }

  if (filters.length > 0) {
    const result = await SystemusersService.getAll({
      filter: filters.length === 1 ? filters[0] : filters.map((filter) => `(${filter})`).join(' or '),
      select: [
        'systemuserid',
        'fullname',
        'firstname',
        'lastname',
        'domainname',
        'internalemailaddress',
        'azureactivedirectoryobjectid',
      ],
      top: 1,
    });

    if (result.success && result.data.length > 0) {
      return mapUser(result.data[0]);
    }
  }

  return {
    displayName: identity.fullName || identity.userPrincipalName || 'BASF User',
    userPrincipalName: identity.userPrincipalName,
  };
}

export async function getActiveUserProfiles(): Promise<UserProfile[]> {
  const result = await SystemusersService.getAll({
    filter: 'isdisabled eq false',
    select: ['systemuserid', 'fullname', 'firstname', 'lastname', 'domainname', 'internalemailaddress'],
    orderBy: ['fullname asc'],
    top: 500,
  });
  if (!result.success) throw result.error ?? new Error('Could not load Dataverse users.');
  return result.data.map(mapUser);
}

``

---

## File: src/data/adapters/dataverseAttachmentDownload.ts

- Size: 1589 bytes
- Last modified: 2026-09-13 17:10:11

``typescript
import { getClient } from '@microsoft/power-apps/data';
import { dataSourcesInfo } from '../../../.power/schemas/appschemas/dataSourcesInfo';

const ATTACHMENT_DATA_SOURCE = 'apma_pmtreportattachmentrecords';
const ATTACHMENT_COLUMN = 'apma_attachment';

export interface DataverseFileDownload {
  fileName: string;
  content: Uint8Array;
}

export async function downloadDataverseAttachment(
  attachmentId: string,
  fileName: string,
): Promise<DataverseFileDownload> {
  if (!attachmentId) {
    throw new Error('An attachment record ID is required for download.');
  }

  const result = await getClient(dataSourcesInfo).downloadFileFromRecord(
    ATTACHMENT_DATA_SOURCE,
    attachmentId,
    ATTACHMENT_COLUMN,
  );

  if (!result.success) {
    throw result.error ?? new Error('Dataverse attachment download failed.');
  }

  return {
    fileName: fileName || result.fileName || 'attachment',
    content: result.data,
  };
}

export async function saveDataverseAttachmentToBrowser(
  attachmentId: string,
  fileName: string,
): Promise<void> {
  const downloadedFile = await downloadDataverseAttachment(attachmentId, fileName);
  const contentBuffer = new ArrayBuffer(downloadedFile.content.byteLength);
  new Uint8Array(contentBuffer).set(downloadedFile.content);
  const blob = new Blob([contentBuffer]);
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = objectUrl;
  anchor.download = downloadedFile.fileName;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}

``

---

## File: src/data/adapters/dataverseRepositories.ts

- Size: 30591 bytes
- Last modified: 2026-10-11 22:53:13

``typescript
import { KpiCategory, KpiStatus, ReportType } from '../../domain/enums';
import type {
  Plant,
  KpiDefinition,
  Target,
  MonthlyKpiResult,
  ReportCategory,
  MonthlyReport,
  ReportAttachment,
} from '../../domain/models';
import type {
  PlantRepository,
  KpiDefinitionRepository,
  TargetRepository,
  MonthlyKpiResultRepository,
  ReportCategoryRepository,
  MonthlyReportRepository,
  AttachmentRepository,
} from '../repositories/interfaces';
import { Apma_pmtplantsesService } from '../../generated/services/Apma_pmtplantsesService';
import { Apma_pmtkpidefinitionsesService } from '../../generated/services/Apma_pmtkpidefinitionsesService';
import { Apma_pmttargetsService } from '../../generated/services/Apma_pmttargetsService';
import { Apma_pmtmonthlykpiresultsesService } from '../../generated/services/Apma_pmtmonthlykpiresultsesService';
import { Apma_pmtreportcategoriesesService } from '../../generated/services/Apma_pmtreportcategoriesesService';
import { Apma_pmtmonthlyreportsesService } from '../../generated/services/Apma_pmtmonthlyreportsesService';
import { Apma_pmtreportattachmentrecordsService } from '../../generated/services/Apma_pmtreportattachmentrecordsService';
import type { Apma_pmtplantses } from '../../generated/models/Apma_pmtplantsesModel';
import type { Apma_pmtkpidefinitionses } from '../../generated/models/Apma_pmtkpidefinitionsesModel';
import type { Apma_pmttargets } from '../../generated/models/Apma_pmttargetsModel';
import type { Apma_pmtmonthlykpiresultses } from '../../generated/models/Apma_pmtmonthlykpiresultsesModel';
import type { Apma_pmtmonthlyreportses } from '../../generated/models/Apma_pmtmonthlyreportsesModel';
import type { Apma_pmtreportcategorieses } from '../../generated/models/Apma_pmtreportcategoriesesModel';
import type { Apma_pmtreportattachmentrecords } from '../../generated/models/Apma_pmtreportattachmentrecordsModel';
import {
  Apma_pmtmonthlykpiresultsesapma_status,
} from '../../generated/models/Apma_pmtmonthlykpiresultsesModel';
import {
  Apma_pmtmonthlyreportsesapma_type,
} from '../../generated/models/Apma_pmtmonthlyreportsesModel';
import { Apma_pmtreportattachmentrecordsapma_month } from '../../generated/models/Apma_pmtreportattachmentrecordsModel';
import { saveDataverseAttachmentToBrowser } from './dataverseAttachmentDownload';
import { Apma_pmtkpidefinitionsesapma_kpicategory, Apma_pmtkpidefinitionsesapma_kpilogic } from '../../generated/models/Apma_pmtkpidefinitionsesModel';
import type { IOperationResult } from '@microsoft/power-apps/data';
import { buildMonthlyReportMainName, buildTargetMainName } from '../../domain/services/mainName';

const MONTH_OPTION_BASE = 457470000;
const STATUS_GREEN = 457470000;
const STATUS_YELLOW = 457470001;
const STATUS_RED = 457470002;
const REPORT_HIGHLIGHTS = 457470000;
const REPORT_LOWLIGHTS = 457470001;

function resultData<T>(result: IOperationResult<T>, operation: string): T {
  if (!result.success) {
    throw result.error ?? new Error(`Dataverse operation failed: ${operation}`);
  }
  return result.data;
}

function monthFromChoice(
  value: number | string | undefined,
  operation: string
): number {
  if (value === undefined) {
    throw new Error(`Dataverse record is missing Month: ${operation}`);
  }
  const numericValue = Number(value);
  const month = numericValue >= MONTH_OPTION_BASE
    ? numericValue - MONTH_OPTION_BASE + 1
    : numericValue;
  if (month < 1 || month > 12) {
    throw new Error(`Unsupported Dataverse Month value: ${String(value)}`);
  }
  return month;
}

function monthToChoice(month: number): number {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Month must be an integer between 1 and 12: ${month}`);
  }
  return MONTH_OPTION_BASE + month - 1;
}

function categoryFromChoice(value: number | string | undefined): string {
  const numericValue = Number(value);
  return Apma_pmtkpidefinitionsesapma_kpicategory[numericValue as keyof typeof Apma_pmtkpidefinitionsesapma_kpicategory] ?? String(value ?? '');
}

function kpiLogicFromChoice(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const numericValue = Number(value);
  return Apma_pmtkpidefinitionsesapma_kpilogic[numericValue as keyof typeof Apma_pmtkpidefinitionsesapma_kpilogic] ?? String(value);
}

function statusFromChoice(value: number | string | undefined): KpiStatus {
  const numericValue = Number(value);
  const label = Apma_pmtmonthlykpiresultsesapma_status[numericValue as keyof typeof Apma_pmtmonthlykpiresultsesapma_status];
  if (label === 'Green') return KpiStatus.Green;
  if (label === 'Yellow') return KpiStatus.Amber;
  if (label === 'Red') return KpiStatus.Red;
  return KpiStatus.Missing;
}

function statusToChoice(status: KpiStatus): number | undefined {
  if (status === KpiStatus.Green) return STATUS_GREEN;
  if (status === KpiStatus.Amber) return STATUS_YELLOW;
  if (status === KpiStatus.Red) return STATUS_RED;
  return undefined;
}

function reportTypeFromChoice(value: number | string | undefined): ReportType {
  const numericValue = Number(value);
  const label = Apma_pmtmonthlyreportsesapma_type[numericValue as keyof typeof Apma_pmtmonthlyreportsesapma_type];
  return label === 'Lowlights' ? ReportType.Lowlights : ReportType.Highlights;
}

function reportTypeToChoice(type: ReportType): number {
  return type === ReportType.Lowlights ? REPORT_LOWLIGHTS : REPORT_HIGHLIGHTS;
}

function bindLookup(entitySet: string, id: string): string {
  return `/${entitySet}(${id})`;
}

function isDataverseGuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value.replace(/[{}]/g, '').trim());
}

function mapPlant(record: Apma_pmtplantses): Plant {
  return {
    id: record.apma_pmtplantsid,
    name: record.apma_name,
    plantManagerId: record._apma_plantmanager_value,
    plantManager: record.apma_plantmanagername,
    productionManagerId: record._apma_productionmanager_value,
    productionManager: record.apma_productionmanagername,
    displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
  };
}

function mapKpiDefinition(record: Apma_pmtkpidefinitionses): KpiDefinition {
  return {
    id: record.apma_pmtkpidefinitionsid,
    name: record.apma_kpiname,
    category: categoryFromChoice(record.apma_kpicategory) as KpiCategory | string,
    unit: record.apma_unit ?? '',
    kpiLogic: kpiLogicFromChoice(record.apma_kpilogic),
    displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
  };
}

function mapTarget(record: Apma_pmttargets): Target {
  return {
    id: record.apma_pmttargetid,
    targetYear: record.apma_targetyear ?? 0,
    plantId: record._apma_plantname_value ?? '',
    kpiId: record._apma_kpiname_value ?? '',
    pyActual: record.apma_pyactual,
    cyTarget: record.apma_cytarget ?? null,
    kpiUnit: undefined,
  };
}

function mapMonthlyResult(record: Apma_pmtmonthlykpiresultses): MonthlyKpiResult {
  return {
    id: record.apma_pmtmonthlykpiresultsid,
    year: record.apma_year ?? 0,
    month: monthFromChoice(record.apma_month, record.apma_pmtmonthlykpiresultsid),
    plantId: record._apma_plantname_value ?? '',
    kpiId: record._apma_kpiname_value ?? '',
    targetId: record._apma_pmttarget_value,
    monthlyActual: record.apma_monthlyactual,
    ytdActual: record.apma_ytdactual,
    status: statusFromChoice(record.apma_status),
    updatedAt: record.modifiedon,
  };
}

function mapReportCategory(record: Apma_pmtreportcategorieses): ReportCategory {
  return {
    id: record.apma_pmtreportcategoriesid,
    name: record.apma_reportcategory,
    displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
  };
}

function mapMonthlyReport(record: Apma_pmtmonthlyreportses): MonthlyReport {
  return {
    id: record.apma_pmtmonthlyreportsid,
    mainName: record.apma_mainname,
    year: record.apma_year ?? 0,
    month: monthFromChoice(record.apma_month, record.apma_pmtmonthlyreportsid),
    plantId: record._apma_plantname_value ?? '',
    categoryId: record._apma_reportcategory_value ?? '',
    type: reportTypeFromChoice(record.apma_type),
    content: record.apma_content ?? '',
    displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
  };
}

function mapAttachment(record: Apma_pmtreportattachmentrecords): ReportAttachment {
  return {
    id: record.apma_pmtreportattachmentrecordid,
    monthlyReportId: record._apma_pmtmonthlyreports_value ?? '',
    title: record.apma_title ?? record.apma_mainname,
    fileName: record.apma_attachment_name,
    year: record.apma_year,
    month: record.apma_month === undefined ? undefined : monthFromChoice(record.apma_month, record.apma_pmtreportattachmentrecordid),
    plantId: record._apma_plantname_value,
  };
}

function createRecord<T>(record: Record<string, unknown>): T {
  return record as T;
}


export class DataversePlantRepository implements PlantRepository {
  async getAll(): Promise<Plant[]> {
    const result = await Apma_pmtplantsesService.getAll({
      select: ['apma_pmtplantsid', 'apma_name', 'apma_displayorder', '_apma_plantmanager_value', '_apma_productionmanager_value'],
      orderBy: ['apma_displayorder asc', 'apma_name asc'],
    });
    return resultData(result, 'load plants').map(mapPlant);
  }

  async getById(id: string): Promise<Plant | null> {
    const result = await Apma_pmtplantsesService.get(id);
    return result.success ? mapPlant(result.data) : null;
  }

  async create(plant: Omit<Plant, 'id'>): Promise<Plant> {
    const payload: Record<string, unknown> = {
      apma_name: plant.name,
      apma_displayorder: plant.displayOrder,
    };
    if (plant.plantManagerId) payload['apma_PlantManager@odata.bind'] = bindLookup('systemusers', plant.plantManagerId);
    if (plant.productionManagerId) payload['apma_ProductionManager@odata.bind'] = bindLookup('systemusers', plant.productionManagerId);
    const result = await Apma_pmtplantsesService.create(createRecord(payload));
    return mapPlant(resultData(result, 'create plant'));
  }

  async update(id: string, plant: Partial<Plant>): Promise<Plant> {
    const changes: Record<string, unknown> = {};
    if (plant.name !== undefined) changes.apma_name = plant.name;
    if (plant.displayOrder !== undefined) changes.apma_displayorder = plant.displayOrder;
    if (plant.plantManagerId) changes['apma_PlantManager@odata.bind'] = bindLookup('systemusers', plant.plantManagerId);
    if (plant.productionManagerId) changes['apma_ProductionManager@odata.bind'] = bindLookup('systemusers', plant.productionManagerId);
    const result = await Apma_pmtplantsesService.update(id, createRecord(changes));
    return mapPlant(resultData(result, 'update plant'));
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtplantsesService.delete(id);
  }
}

export class DataverseKpiDefinitionRepository implements KpiDefinitionRepository {
  async getAll(): Promise<KpiDefinition[]> {
    const result = await Apma_pmtkpidefinitionsesService.getAll({
      select: ['apma_pmtkpidefinitionsid', 'apma_kpiname', 'apma_kpicategory', 'apma_unit', 'apma_kpilogic', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_kpiname asc'],
    });
    return resultData(result, 'load KPI definitions').map(mapKpiDefinition);
  }

  async getById(id: string): Promise<KpiDefinition | null> {
    const result = await Apma_pmtkpidefinitionsesService.get(id);
    return result.success ? mapKpiDefinition(result.data) : null;
  }

  async create(kpi: Omit<KpiDefinition, 'id'>): Promise<KpiDefinition> {
    const category = Object.entries(Apma_pmtkpidefinitionsesapma_kpicategory).find(([, label]) => label === kpi.category)?.[0];
    const logic = Object.entries(Apma_pmtkpidefinitionsesapma_kpilogic).find(([, label]) => label === kpi.kpiLogic)?.[0];
    const result = await Apma_pmtkpidefinitionsesService.create(createRecord({
      apma_kpiname: kpi.name,
      apma_kpicategory: category === undefined ? undefined : Number(category),
      apma_unit: kpi.unit,
      apma_kpilogic: logic === undefined ? undefined : Number(logic),
      apma_displayorder: kpi.displayOrder,
    }));
    return mapKpiDefinition(resultData(result, 'create KPI definition'));
  }

  async update(id: string, kpi: Partial<KpiDefinition>): Promise<KpiDefinition> {
    const changes: Record<string, unknown> = {};
    if (kpi.name !== undefined) changes.apma_kpiname = kpi.name;
    if (kpi.unit !== undefined) changes.apma_unit = kpi.unit;
    if (kpi.displayOrder !== undefined) changes.apma_displayorder = kpi.displayOrder;
    if (kpi.kpiLogic !== undefined) {
      const logic = Object.entries(Apma_pmtkpidefinitionsesapma_kpilogic).find(([, label]) => label === kpi.kpiLogic)?.[0];
      if (logic !== undefined) changes.apma_kpilogic = Number(logic);
    }
    if (kpi.category !== undefined) {
      const category = Object.entries(Apma_pmtkpidefinitionsesapma_kpicategory).find(([, label]) => label === kpi.category)?.[0];
      if (category !== undefined) changes.apma_kpicategory = Number(category);
    }
    const result = await Apma_pmtkpidefinitionsesService.update(id, createRecord(changes));
    return mapKpiDefinition(resultData(result, 'update KPI definition'));
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtkpidefinitionsesService.delete(id);
  }
}

export class DataverseTargetRepository implements TargetRepository {
  async getAll(): Promise<Target[]> {
    const result = await Apma_pmttargetsService.getAll({
      select: ['apma_pmttargetid', 'apma_mainname', 'apma_targetyear', '_apma_plantname_value', '_apma_kpiname_value', 'apma_pyactual', 'apma_cytarget'],
    });
    return resultData(result, 'load targets').map(mapTarget);
  }

  async getByYear(year: number): Promise<Target[]> {
    const result = await Apma_pmttargetsService.getAll({
      filter: `apma_targetyear eq ${year}`,
      select: ['apma_pmttargetid', 'apma_mainname', 'apma_targetyear', '_apma_plantname_value', '_apma_kpiname_value', 'apma_pyactual', 'apma_cytarget'],
    });
    return resultData(result, 'load targets by year').map(mapTarget);
  }

  async getByPlantAndYear(plantId: string, year: number): Promise<Target[]> {
    const filters = [`apma_targetyear eq ${year}`];
    const normalizedPlantId = plantId.replace(/[{}]/g, '').trim();
    if (isDataverseGuid(normalizedPlantId)) filters.push(`_apma_plantname_value eq ${normalizedPlantId}`);
    const result = await Apma_pmttargetsService.getAll({
      filter: filters.join(' and '),
      select: ['apma_pmttargetid', 'apma_mainname', 'apma_targetyear', '_apma_plantname_value', '_apma_kpiname_value', 'apma_pyactual', 'apma_cytarget'],
    });
    return resultData(result, 'load targets by plant and year').map(mapTarget);
  }

  async create(target: Omit<Target, 'id'>): Promise<Target> {
    const [plant, kpi] = await Promise.all([
      Apma_pmtplantsesService.get(target.plantId).then((result) => mapPlant(resultData(result, 'load target plant'))),
      Apma_pmtkpidefinitionsesService.get(target.kpiId).then((result) => mapKpiDefinition(resultData(result, 'load target KPI'))),
    ]);
    const result = await Apma_pmttargetsService.create(createRecord({
      apma_mainname: buildTargetMainName(target.targetYear, plant, kpi),
      apma_targetyear: target.targetYear,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', target.plantId),
      'apma_KPIName@odata.bind': bindLookup('apma_pmtkpidefinitionses', target.kpiId),
      apma_pyactual: target.pyActual,
      apma_cytarget: target.cyTarget,
    }));
    return mapTarget(resultData(result, 'create target'));
  }

  async update(id: string, target: Partial<Target>): Promise<Target> {
    const changes: Record<string, unknown> = {};
    if (target.targetYear !== undefined && target.plantId !== undefined && target.kpiId !== undefined) {
      const [plant, kpi] = await Promise.all([
        Apma_pmtplantsesService.get(target.plantId).then((result) => mapPlant(resultData(result, 'load target plant'))),
        Apma_pmtkpidefinitionsesService.get(target.kpiId).then((result) => mapKpiDefinition(resultData(result, 'load target KPI'))),
      ]);
      changes.apma_mainname = buildTargetMainName(target.targetYear, plant, kpi);
    }
    if (target.targetYear !== undefined) changes.apma_targetyear = target.targetYear;
    if (target.plantId !== undefined) changes['apma_PlantName@odata.bind'] = bindLookup('apma_pmtplantses', target.plantId);
    if (target.kpiId !== undefined) changes['apma_KPIName@odata.bind'] = bindLookup('apma_pmtkpidefinitionses', target.kpiId);
    if (target.pyActual !== undefined) changes.apma_pyactual = target.pyActual;
    if (target.cyTarget !== undefined) changes.apma_cytarget = target.cyTarget;
    const result = await Apma_pmttargetsService.update(id, createRecord(changes));
    return mapTarget(resultData(result, 'update target'));
  }

  async delete(id: string): Promise<void> {
    await Apma_pmttargetsService.delete(id);
  }
}

export class DataverseMonthlyKpiResultRepository implements MonthlyKpiResultRepository {
  async getAll(): Promise<MonthlyKpiResult[]> {
    const result = await Apma_pmtmonthlykpiresultsesService.getAll({
      select: ['apma_pmtmonthlykpiresultsid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_kpiname_value', '_apma_pmttarget_value', 'apma_monthlyactual', 'apma_ytdactual', 'apma_status', 'modifiedon'],
    });
    return resultData(result, 'load monthly KPI results').map(mapMonthlyResult);
  }

  async getByYear(year: number): Promise<MonthlyKpiResult[]> {
    const result = await Apma_pmtmonthlykpiresultsesService.getAll({
      filter: `apma_year eq ${year}`,
      select: ['apma_pmtmonthlykpiresultsid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_kpiname_value', '_apma_pmttarget_value', 'apma_monthlyactual', 'apma_ytdactual', 'apma_status', 'modifiedon'],
    });
    return resultData(result, 'load monthly KPI results by year').map(mapMonthlyResult);
  }

  async getByPeriod(year: number, month: number): Promise<MonthlyKpiResult[]> {
    const result = await Apma_pmtmonthlykpiresultsesService.getAll({
      filter: `apma_year eq ${year} and apma_month eq ${monthToChoice(month)}`,
      select: ['apma_pmtmonthlykpiresultsid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_kpiname_value', '_apma_pmttarget_value', 'apma_monthlyactual', 'apma_ytdactual', 'apma_status', 'modifiedon'],
    });
    return resultData(result, 'load monthly KPI results by period').map(mapMonthlyResult);
  }

  async getByPlantAndPeriod(plantId: string, year: number, month: number): Promise<MonthlyKpiResult[]> {
    const filters = [`apma_year eq ${year}`, `apma_month eq ${monthToChoice(month)}`];
    if (isDataverseGuid(plantId)) filters.push(`_apma_plantname_value eq ${plantId}`);
    const result = await Apma_pmtmonthlykpiresultsesService.getAll({
      filter: filters.join(' and '),
      select: ['apma_pmtmonthlykpiresultsid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_kpiname_value', '_apma_pmttarget_value', 'apma_monthlyactual', 'apma_ytdactual', 'apma_status', 'modifiedon'],
    });
    return resultData(result, 'load monthly KPI results by plant and period').map(mapMonthlyResult);
  }

  async saveBatch(results: Array<Omit<MonthlyKpiResult, 'id'> & { id?: string }>): Promise<MonthlyKpiResult[]> {
    const saved: MonthlyKpiResult[] = [];
    const plantNames = new Map<string, Promise<Plant>>();
    const kpiNames = new Map<string, Promise<KpiDefinition>>();
    const getPlant = (id: string) => {
      let plant = plantNames.get(id);
      if (!plant) {
        plant = Apma_pmtplantsesService.get(id).then((response) => mapPlant(resultData(response, 'load monthly KPI result plant')));
        plantNames.set(id, plant);
      }
      return plant;
    };
    const getKpi = (id: string) => {
      let kpi = kpiNames.get(id);
      if (!kpi) {
        kpi = Apma_pmtkpidefinitionsesService.get(id).then((response) => mapKpiDefinition(resultData(response, 'load monthly KPI result KPI')));
        kpiNames.set(id, kpi);
      }
      return kpi;
    };
    for (const result of results) {
      const [plant, kpi] = await Promise.all([
        getPlant(result.plantId),
        getKpi(result.kpiId),
      ]);
      const payload: Record<string, unknown> = {
        apma_mainname: [result.year, result.month, plant.name, kpi.name].join('_'),
        apma_year: result.year,
        apma_month: monthToChoice(result.month),
        'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', result.plantId),
        'apma_KPIName@odata.bind': bindLookup('apma_pmtkpidefinitionses', result.kpiId),
        apma_monthlyactual: result.monthlyActual,
        apma_ytdactual: result.ytdActual,
      };
      if (result.targetId) payload['apma_PMTTarget@odata.bind'] = bindLookup('apma_pmttargets', result.targetId);
      const status = statusToChoice(result.status);
      if (status !== undefined) payload.apma_status = status;
      const operation = result.id
        ? Apma_pmtmonthlykpiresultsesService.update(result.id, createRecord(payload))
        : Apma_pmtmonthlykpiresultsesService.create(createRecord(payload));
      saved.push(mapMonthlyResult(resultData(await operation, 'save monthly KPI result')));
    }
    return saved;
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtmonthlykpiresultsesService.delete(id);
  }
}

export class DataverseReportCategoryRepository implements ReportCategoryRepository {
  async getAll(): Promise<ReportCategory[]> {
    const result = await Apma_pmtreportcategoriesesService.getAll({
      select: ['apma_pmtreportcategoriesid', 'apma_reportcategory', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_reportcategory asc'],
    });
    return resultData(result, 'load report categories').map(mapReportCategory);
  }

  async getById(id: string): Promise<ReportCategory | null> {
    const result = await Apma_pmtreportcategoriesesService.get(id);
    return result.success ? mapReportCategory(result.data) : null;
  }

  async create(category: Omit<ReportCategory, 'id'>): Promise<ReportCategory> {
    const result = await Apma_pmtreportcategoriesesService.create(createRecord({
      apma_reportcategory: category.name,
      apma_displayorder: category.displayOrder,
    }));
    return mapReportCategory(resultData(result, 'create report category'));
  }

  async update(id: string, category: Partial<ReportCategory>): Promise<ReportCategory> {
    const changes: Record<string, unknown> = {};
    if (category.name !== undefined) changes.apma_reportcategory = category.name;
    if (category.displayOrder !== undefined) changes.apma_displayorder = category.displayOrder;
    const result = await Apma_pmtreportcategoriesesService.update(id, createRecord(changes));
    return mapReportCategory(resultData(result, 'update report category'));
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtreportcategoriesesService.delete(id);
  }
}

export class DataverseMonthlyReportRepository implements MonthlyReportRepository {
  async getAll(): Promise<MonthlyReport[]> {
    const result = await Apma_pmtmonthlyreportsesService.getAll({
    });
    return resultData(result, 'load monthly reports').map(mapMonthlyReport);
  }

  async getByPeriod(year: number, month: number): Promise<MonthlyReport[]> {
    const result = await Apma_pmtmonthlyreportsesService.getAll({
      filter: `apma_year eq ${year} and apma_month eq ${monthToChoice(month)}`,
    });
    return resultData(result, 'load monthly reports by period').map(mapMonthlyReport);
  }

  async getByPlantAndPeriod(plantId: string, year: number, month: number): Promise<MonthlyReport[]> {
    const filters = [`apma_year eq ${year}`, `apma_month eq ${monthToChoice(month)}`];
    if (isDataverseGuid(plantId)) filters.push(`_apma_plantname_value eq ${plantId}`);
    const result = await Apma_pmtmonthlyreportsesService.getAll({
      filter: filters.join(' and '),
    });
    return resultData(result, 'load monthly reports by plant and period').map(mapMonthlyReport);
  }

  async getById(id: string): Promise<MonthlyReport | null> {
    const result = await Apma_pmtmonthlyreportsesService.get(id);
    return result.success ? mapMonthlyReport(result.data) : null;
  }

  async create(report: Omit<MonthlyReport, 'id'>): Promise<MonthlyReport> {
    const [plant, category] = await Promise.all([
      Apma_pmtplantsesService.get(report.plantId).then((result) => mapPlant(resultData(result, 'load monthly report plant'))),
      Apma_pmtreportcategoriesesService.get(report.categoryId).then((result) => mapReportCategory(resultData(result, 'load monthly report category'))),
    ]);
    const result = await Apma_pmtmonthlyreportsesService.create(createRecord({
      apma_mainname: buildMonthlyReportMainName(report.year, report.month, plant, report.type, category),
      apma_year: report.year,
      apma_month: monthToChoice(report.month),
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', report.plantId),
      'apma_ReportCategory@odata.bind': bindLookup('apma_pmtreportcategorieses', report.categoryId),
      apma_type: reportTypeToChoice(report.type),
      apma_content: report.content,
      apma_displayorder: report.displayOrder,
    }));
    return mapMonthlyReport(resultData(result, 'create monthly report'));
  }

  async update(id: string, report: Partial<MonthlyReport>): Promise<MonthlyReport> {
    const changes: Record<string, unknown> = {};
    if (report.plantId !== undefined && report.categoryId !== undefined && report.type !== undefined && report.year !== undefined && report.month !== undefined) {
      const [plant, category] = await Promise.all([
        Apma_pmtplantsesService.get(report.plantId).then((result) => mapPlant(resultData(result, 'load monthly report plant'))),
        Apma_pmtreportcategoriesesService.get(report.categoryId).then((result) => mapReportCategory(resultData(result, 'load monthly report category'))),
      ]);
      changes.apma_mainname = buildMonthlyReportMainName(report.year, report.month, plant, report.type, category);
    }
    if (report.content !== undefined) changes.apma_content = report.content;
    if (report.displayOrder !== undefined) changes.apma_displayorder = report.displayOrder;
    if (report.type !== undefined) changes.apma_type = reportTypeToChoice(report.type);
    if (report.month !== undefined) changes.apma_month = monthToChoice(report.month);
    if (report.year !== undefined) changes.apma_year = report.year;
    if (report.plantId !== undefined) changes['apma_PlantName@odata.bind'] = bindLookup('apma_pmtplantses', report.plantId);
    if (report.categoryId !== undefined) changes['apma_ReportCategory@odata.bind'] = bindLookup('apma_pmtreportcategorieses', report.categoryId);
    const result = await Apma_pmtmonthlyreportsesService.update(id, createRecord(changes));
    return mapMonthlyReport(resultData(result, 'update monthly report'));
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtmonthlyreportsesService.delete(id);
  }

}

export class DataverseAttachmentRepository implements AttachmentRepository {
  async getByReportId(monthlyReportId: string): Promise<ReportAttachment[]> {
    const result = await Apma_pmtreportattachmentrecordsService.getAll({
      filter: `_apma_pmtmonthlyreports_value eq ${monthlyReportId}`,
      select: ['apma_pmtreportattachmentrecordid', 'apma_mainname', 'apma_title', 'apma_attachment_name', '_apma_pmtmonthlyreports_value', '_apma_plantname_value', 'apma_month', 'apma_year'],
    });
    return resultData(result, 'load report attachments').map(mapAttachment);
  }

  async upload(monthlyReportId: string, title: string, file: File): Promise<ReportAttachment> {
    const reportResult = await Apma_pmtmonthlyreportsesService.get(monthlyReportId, {
      select: ['apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value'],
    });
    const report = resultData(reportResult, 'load monthly report for attachment');
    const plantId = report._apma_plantname_value ?? '';
    const year = report.apma_year ?? 0;
    const month = monthFromChoice(report.apma_month, monthlyReportId);
    const metadata = await Apma_pmtreportattachmentrecordsService.create(createRecord({
      apma_mainname: title,
      apma_title: title,
      apma_year: year,
      apma_month: monthToChoice(month),
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', plantId),
      'apma_PMTMonthlyReports@odata.bind': bindLookup('apma_pmtmonthlyreportses', monthlyReportId),
    }));
    const record = resultData(metadata, 'create attachment metadata');
    resultData(await Apma_pmtreportattachmentrecordsService.upload(record.apma_pmtreportattachmentrecordid, 'apma_attachment', file, file.name), 'upload attachment file');
    return mapAttachment(record);
  }

  async download(attachmentId: string, fileName = 'attachment'): Promise<void> {
    await saveDataverseAttachmentToBrowser(attachmentId, fileName);
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtreportattachmentrecordsService.delete(id);
  }
}

export const dataverseRepositories = {
  plantRepository: new DataversePlantRepository(),
  kpiDefinitionRepository: new DataverseKpiDefinitionRepository(),
  targetRepository: new DataverseTargetRepository(),
  monthlyKpiResultRepository: new DataverseMonthlyKpiResultRepository(),
  reportCategoryRepository: new DataverseReportCategoryRepository(),
  monthlyReportRepository: new DataverseMonthlyReportRepository(),
  attachmentRepository: new DataverseAttachmentRepository(),
};

export function getAttachmentMonthChoiceLabel(value: number): string {
  return Apma_pmtreportattachmentrecordsapma_month[value as keyof typeof Apma_pmtreportattachmentrecordsapma_month] ?? String(value);
}

``

---

## File: src/data/adapters/productionKpiRepository.ts

- Size: 2942 bytes
- Last modified: 2026-10-06 17:50:11

``typescript
import type { IOperationResult } from '@microsoft/power-apps/data';
import { Apma_pmtproductionkpisService } from '../../generated/services/Apma_pmtproductionkpisService';
import { Apma_pmtproductionkpisapma_type } from '../../generated/models/Apma_pmtproductionkpisModel';
import type { Apma_pmtproductionkpis } from '../../generated/models/Apma_pmtproductionkpisModel';
import type { ProductionKpiRecord } from '../../domain/models/charts';

function data<Result>(result: IOperationResult<Result>, operation: string): Result {
  if (!result.success) throw result.error ?? new Error(`Dataverse operation failed: ${operation}`);
  return result.data;
}

export const productionKpiRepository = {
  async getAll(): Promise<ProductionKpiRecord[]> {
    const records = data(await Apma_pmtproductionkpisService.getAll({
      select: ['apma_pmtproductionkpiid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', 'apma_type', 'apma_categories', 'apma_quantityt', 'apma_ratio'],
    }), 'load production KPI records');
    return records.flatMap((record: Apma_pmtproductionkpis) => {
      const type = record.apma_type === undefined ? undefined : Apma_pmtproductionkpisapma_type[record.apma_type];
      if (!type) return [];
      return [{
        id: record.apma_pmtproductionkpiid,
        mainName: record.apma_mainname,
        year: record.apma_year ?? 0,
        month: record.apma_month === undefined ? 0 : record.apma_month - 457470000 + 1,
        plantId: record._apma_plantname_value ?? '',
        type,
        categories: record.apma_categories ?? '',
        quantity: record.apma_quantityt ?? null,
        ratio: record.apma_ratio ?? null,
      }];
    });
  },

  async saveBatch(records: Array<Omit<ProductionKpiRecord, 'id'> & { id?: string }>): Promise<void> {
    for (const record of records) {
      const type = Object.entries(Apma_pmtproductionkpisapma_type).find(([, label]) => label === record.type)?.[0];
      if (!type) throw new Error(`Invalid production KPI Type: ${record.type}`);
      if (!Number.isInteger(record.month) || record.month < 1 || record.month > 12) throw new Error('Invalid production KPI month.');
      const payload = {
        apma_mainname: [record.year, record.month, record.type, record.categories].join('_'),
        apma_year: record.year,
        apma_month: 457470000 + record.month - 1,
        'apma_PlantName@odata.bind': `/apma_pmtplantses(${record.plantId.replace(/[{}]/g, '').trim()})`,
        apma_type: Number(type),
        apma_categories: record.categories,
        apma_quantityt: record.quantity,
        apma_ratio: record.ratio ?? null,
      };
      const operation = record.id
        ? Apma_pmtproductionkpisService.update(record.id, payload as never)
        : Apma_pmtproductionkpisService.create(payload as never);
      data(await operation, 'save production KPI record');
    }
  },
};

``

---

## File: src/data/adapters/volumePacRepository.ts

- Size: 21570 bytes
- Last modified: 2026-10-06 22:09:33

``typescript
import type { IOperationResult } from '@microsoft/power-apps/data';
import { Apma_pmtaecategoriesesService } from '../../generated/services/Apma_pmtaecategoriesesService';
import { Apma_pmtaesService } from '../../generated/services/Apma_pmtaesService';
import { Apma_pmtproductionlinecategoriesesService } from '../../generated/services/Apma_pmtproductionlinecategoriesesService';
import { Apma_pmtproductionlinematrixesService } from '../../generated/services/Apma_pmtproductionlinematrixesService';
import { Apma_pmtproductionkpimatrixesService } from '../../generated/services/Apma_pmtproductionkpimatrixesService';
import { Apma_pmtproductionkpimatrixesapma_type, Apma_pmtproductionkpimatrixesapma_productionclass } from '../../generated/models/Apma_pmtproductionkpimatrixesModel';
import type { Apma_pmtproductionkpimatrixes } from '../../generated/models/Apma_pmtproductionkpimatrixesModel';
import { Apma_pmtvolume_pacsService } from '../../generated/services/Apma_pmtvolume_pacsService';
import { Apma_pmtplantsesService } from '../../generated/services/Apma_pmtplantsesService';
import type { Apma_pmtaecategorieses } from '../../generated/models/Apma_pmtaecategoriesesModel';
import type { Apma_pmtaes } from '../../generated/models/Apma_pmtaesModel';
import type { Apma_pmtaesapma_month } from '../../generated/models/Apma_pmtaesModel';
import type { Apma_pmtproductionlinecategorieses } from '../../generated/models/Apma_pmtproductionlinecategoriesesModel';
import type { Apma_pmtproductionlinematrixes } from '../../generated/models/Apma_pmtproductionlinematrixesModel';
import type { Apma_pmtvolume_pacs } from '../../generated/models/Apma_pmtvolume_pacsModel';
import type { Apma_pmtvolume_pacsapma_month } from '../../generated/models/Apma_pmtvolume_pacsModel';
import type { AeCategory, AeRecord, ProductionLine, ProductionLineMatrix, ProductionKpiMatrix, VolumePacRecord } from '../../domain/models/charts';
import { buildAeMainName, buildProductionLineMatrixMainName, buildProductionKpiMatrixMainName, buildVolumePacMainName } from '../../domain/services/mainName';

const MONTH_OPTION_BASE = 457470000;

function data<T>(result: IOperationResult<T>, operation: string): T {
  if (!result.success) throw result.error ?? new Error(`Dataverse operation failed: ${operation}`);
  return result.data;
}

function monthFromChoice(value: number | undefined): number {
  if (value === undefined) return 0;
  return value - MONTH_OPTION_BASE + 1;
}

function monthToChoice(month: number): number {
  return MONTH_OPTION_BASE + month - 1;
}

function bindLookup(entitySet: string, id: string): string {
  return `/${entitySet}(${id})`;
}

function productionClassToChoice(value: string | null | undefined): number | null | undefined {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  const choice = Object.entries(Apma_pmtproductionkpimatrixesapma_productionclass).find(([, label]) => label === value)?.[0];
  if (choice === undefined) throw new Error(`Invalid Production Class: ${value}`);
  return Number(choice);
}


export const volumePacRepository = {
  async getProductionLines(): Promise<ProductionLine[]> {
    const result = await Apma_pmtproductionlinecategoriesesService.getAll({
      select: ['apma_pmtproductionlinecategoriesid', 'apma_productionline', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_productionline asc'],
    });
    return data(result, 'load production lines').map((record: Apma_pmtproductionlinecategorieses) => ({
      id: record.apma_pmtproductionlinecategoriesid,
      name: record.apma_productionline,
      displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
    }));
  },

  async createProductionLine(value: Omit<ProductionLine, 'id'>): Promise<ProductionLine> {
    const record = data(await Apma_pmtproductionlinecategoriesesService.create({
      apma_productionline: value.name,
      apma_displayorder: value.displayOrder,
    } as never), 'create production line');
    return { id: record.apma_pmtproductionlinecategoriesid, name: record.apma_productionline, displayOrder: record.apma_displayorder ?? value.displayOrder };
  },

  async updateProductionLine(id: string, value: Partial<ProductionLine>): Promise<ProductionLine> {
    const record = data(await Apma_pmtproductionlinecategoriesesService.update(id, {
      apma_productionline: value.name,
      apma_displayorder: value.displayOrder,
    }), 'update production line');
    return { id: record.apma_pmtproductionlinecategoriesid, name: record.apma_productionline, displayOrder: record.apma_displayorder ?? 1 };
  },

  async deleteProductionLine(id: string): Promise<void> {
    await Apma_pmtproductionlinecategoriesesService.delete(id);
  },

  async getProductionLineMatrices(): Promise<ProductionLineMatrix[]> {
    const result = await Apma_pmtproductionlinematrixesService.getAll({
      select: ['apma_pmtproductionlinematrixid', 'apma_mainname', '_apma_plantname_value', '_apma_productionline_value', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_mainname asc'],
    });
    return data(result, 'load production line matrix').map((record: Apma_pmtproductionlinematrixes) => ({
      id: record.apma_pmtproductionlinematrixid,
      mainName: record.apma_mainname,
      plantId: record._apma_plantname_value ?? '',
      productionLineId: record._apma_productionline_value ?? '',
      displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
    }));
  },

  async createProductionLineMatrix(value: Omit<ProductionLineMatrix, 'id' | 'mainName'>): Promise<ProductionLineMatrix> {
    const [plantRecord, lineRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load matrix plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load matrix production line')),
    ]);
    const mainName = buildProductionLineMatrixMainName({ name: plantRecord.apma_name }, { name: lineRecord.apma_productionline });
    const record = data(await Apma_pmtproductionlinematrixesService.create({
      apma_mainname: mainName,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
      apma_displayorder: value.displayOrder,
    } as never), 'create production line matrix');
    return { ...value, id: record.apma_pmtproductionlinematrixid, mainName };
  },

  async updateProductionLineMatrix(id: string, value: Omit<ProductionLineMatrix, 'id' | 'mainName'>): Promise<ProductionLineMatrix> {
    const [plantRecord, lineRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load matrix plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load matrix production line')),
    ]);
    const mainName = buildProductionLineMatrixMainName({ name: plantRecord.apma_name }, { name: lineRecord.apma_productionline });
    await Apma_pmtproductionlinematrixesService.update(id, {
      apma_mainname: mainName,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
      apma_displayorder: value.displayOrder,
    });
    return { ...value, id, mainName };
  },

  async deleteProductionLineMatrix(id: string): Promise<void> {
    await Apma_pmtproductionlinematrixesService.delete(id);
  },

  async getProductionKpiMatrices(): Promise<ProductionKpiMatrix[]> {
    const result = await Apma_pmtproductionkpimatrixesService.getAll({
      select: ['apma_pmtproductionkpimatrixid', 'apma_mainname', '_apma_plantname_value', 'apma_type', 'apma_categories', 'apma_productionclass', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_mainname asc'],
    });
    return data(result, 'load production KPI matrix').map((record: Apma_pmtproductionkpimatrixes) => ({
      id: record.apma_pmtproductionkpimatrixid,
      mainName: record.apma_mainname,
      plantId: record._apma_plantname_value ?? '',
      type: record.apma_type === undefined ? undefined : Apma_pmtproductionkpimatrixesapma_type[record.apma_type],
      categories: record.apma_categories ?? '',
      productionClass: record.apma_productionclass == null ? null : Apma_pmtproductionkpimatrixesapma_productionclass[record.apma_productionclass],
      displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
    }));
  },

  async createProductionKpiMatrix(value: Omit<ProductionKpiMatrix, 'id' | 'mainName'>): Promise<ProductionKpiMatrix> {
    const typeChoice = Object.entries(Apma_pmtproductionkpimatrixesapma_type).find(([, label]) => label === value.type)?.[0];
    if (!value.type || !typeChoice) throw new Error('Select a Production KPI Matrix Type.');
    const productionClass = productionClassToChoice(value.productionClass);
    const plant = data(await Apma_pmtplantsesService.get(value.plantId), 'load production KPI matrix plant');
    const mainName = buildProductionKpiMatrixMainName({ name: plant.apma_name }, value.type, value.categories);
    const record = data(await Apma_pmtproductionkpimatrixesService.create({
      apma_mainname: mainName,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      apma_type: Number(typeChoice),
      apma_categories: value.categories,
      ...(productionClass === undefined ? {} : { apma_productionclass: productionClass }),
      apma_displayorder: value.displayOrder,
    } as never), 'create production KPI matrix');
    return { ...value, id: record.apma_pmtproductionkpimatrixid, mainName };
  },

  async updateProductionKpiMatrix(id: string, value: Omit<ProductionKpiMatrix, 'id' | 'mainName'>): Promise<ProductionKpiMatrix> {
    const typeChoice = Object.entries(Apma_pmtproductionkpimatrixesapma_type).find(([, label]) => label === value.type)?.[0];
    if (!value.type || !typeChoice) throw new Error('Select a Production KPI Matrix Type.');
    const productionClass = productionClassToChoice(value.productionClass);
    const plant = data(await Apma_pmtplantsesService.get(value.plantId), 'load production KPI matrix plant');
    const mainName = buildProductionKpiMatrixMainName({ name: plant.apma_name }, value.type, value.categories);
    data(await Apma_pmtproductionkpimatrixesService.update(id, {
      apma_mainname: mainName,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      apma_type: Number(typeChoice) as Apma_pmtproductionkpimatrixesapma_type,
      apma_categories: value.categories,
      ...(productionClass === undefined ? {} : { apma_productionclass: productionClass }),
      apma_displayorder: value.displayOrder,
    } as never), 'update production KPI matrix');
    return { ...value, id, mainName };
  },

  async deleteProductionKpiMatrix(id: string): Promise<void> {
    await Apma_pmtproductionkpimatrixesService.delete(id);
  },

  async getAeCategories(): Promise<AeCategory[]> {
    const result = await Apma_pmtaecategoriesesService.getAll({
      select: ['apma_pmtaecategoriesid', 'apma_aecategories', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_aecategories asc'],
    });
    return data(result, 'load AE categories').map((record: Apma_pmtaecategorieses) => ({
      id: record.apma_pmtaecategoriesid,
      name: record.apma_aecategories,
      displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
    }));
  },

  async createAeCategory(value: Omit<AeCategory, 'id'>): Promise<AeCategory> {
    const record = data(await Apma_pmtaecategoriesesService.create({ apma_aecategories: value.name, apma_displayorder: value.displayOrder } as never), 'create AE category');
    return { id: record.apma_pmtaecategoriesid, name: record.apma_aecategories, displayOrder: record.apma_displayorder ?? value.displayOrder };
  },

  async updateAeCategory(id: string, value: Partial<AeCategory>): Promise<AeCategory> {
    const record = data(await Apma_pmtaecategoriesesService.update(id, { apma_aecategories: value.name, apma_displayorder: value.displayOrder }), 'update AE category');
    return { id: record.apma_pmtaecategoriesid, name: record.apma_aecategories, displayOrder: record.apma_displayorder ?? 1 };
  },

  async deleteAeCategory(id: string): Promise<void> {
    await Apma_pmtaecategoriesesService.delete(id);
  },

  async getVolumePac(year: number): Promise<VolumePacRecord[]> {
    const result = await Apma_pmtvolume_pacsService.getAll({
      filter: `apma_year eq ${year}`,
      select: ['apma_pmtvolume_pacid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_productionline_value', 'apma_volumekt', 'apma_forecastkt', 'apma_packt'],
    });
    return data(result, 'load Volume and PAC').map((record: Apma_pmtvolume_pacs) => ({
      id: record.apma_pmtvolume_pacid,
      mainName: record.apma_mainname,
      year: record.apma_year ?? year,
      month: monthFromChoice(record.apma_month),
      plantId: record._apma_plantname_value ?? '',
      productionLineId: record._apma_productionline_value ?? '',
      volume: record.apma_volumekt ?? null,
      forecast: record.apma_forecastkt ?? null,
      pac: record.apma_packt ?? null,
    }));
  },

  async getAllVolumePac(): Promise<VolumePacRecord[]> {
    const result = await Apma_pmtvolume_pacsService.getAll({
      select: ['apma_pmtvolume_pacid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_productionline_value', 'apma_volumekt', 'apma_forecastkt', 'apma_packt'],
    });
    return data(result, 'load all Volume and PAC').map((record: Apma_pmtvolume_pacs) => ({
      id: record.apma_pmtvolume_pacid,
      mainName: record.apma_mainname,
      year: record.apma_year ?? 0,
      month: monthFromChoice(record.apma_month),
      plantId: record._apma_plantname_value ?? '',
      productionLineId: record._apma_productionline_value ?? '',
      volume: record.apma_volumekt ?? null,
      forecast: record.apma_forecastkt ?? null,
      pac: record.apma_packt ?? null,
    }));
  },

  async createVolumePac(value: Omit<VolumePacRecord, 'id' | 'mainName'>): Promise<VolumePacRecord> {
    const [plantRecord, lineRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load Volume/PAC plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load Volume/PAC production line')),
    ]);
    const mainName = buildVolumePacMainName(value.year, value.month, { name: plantRecord.apma_name }, { name: lineRecord.apma_productionline });
    const payload: Record<string, unknown> = {
      apma_mainname: mainName,
      apma_year: value.year,
      apma_month: monthToChoice(value.month) as Apma_pmtvolume_pacsapma_month,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
    };
    if (value.volume !== null) payload.apma_volumekt = value.volume;
    if (value.forecast !== null) payload.apma_forecastkt = value.forecast;
    if (value.pac !== null) payload.apma_packt = value.pac;
    const record = data(await Apma_pmtvolume_pacsService.create(payload as never), 'create Volume/PAC');
    return { ...value, id: record.apma_pmtvolume_pacid, mainName: record.apma_mainname };
  },

  async updateVolumePac(id: string, value: Omit<VolumePacRecord, 'id' | 'mainName'>): Promise<VolumePacRecord> {
    const [plantRecord, lineRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load Volume/PAC plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load Volume/PAC production line')),
    ]);
    const mainName = buildVolumePacMainName(value.year, value.month, { name: plantRecord.apma_name }, { name: lineRecord.apma_productionline });
    await Apma_pmtvolume_pacsService.update(id, {
      apma_mainname: mainName,
      apma_year: value.year,
      apma_month: monthToChoice(value.month) as Apma_pmtvolume_pacsapma_month,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
      apma_volumekt: value.volume,
      apma_forecastkt: value.forecast,
      apma_packt: value.pac,
    } as never);
    return { ...value, id, mainName };
  },

  async deleteVolumePac(id: string): Promise<void> {
    await Apma_pmtvolume_pacsService.delete(id);
  },

  async getAe(year: number, month: number): Promise<AeRecord[]> {
    const option = MONTH_OPTION_BASE + month - 1;
    const result = await Apma_pmtaesService.getAll({
      filter: `apma_year eq ${year} and apma_month eq ${option}`,
      select: ['apma_pmtaeid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_productionline_value', '_apma_aecategories_value', 'apma_value'],
    });
    return data(result, 'load AE').map((record: Apma_pmtaes) => ({
      id: record.apma_pmtaeid,
      mainName: record.apma_mainname,
      year: record.apma_year ?? year,
      month: monthFromChoice(record.apma_month),
      plantId: record._apma_plantname_value ?? '',
      productionLineId: record._apma_productionline_value ?? '',
      categoryId: record._apma_aecategories_value ?? '',
      value: record.apma_value ?? null,
    }));
  },

  async getAllAe(): Promise<AeRecord[]> {
    const result = await Apma_pmtaesService.getAll({
      select: ['apma_pmtaeid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_productionline_value', '_apma_aecategories_value', 'apma_value'],
    });
    return data(result, 'load all AE').map((record: Apma_pmtaes) => ({
      id: record.apma_pmtaeid,
      mainName: record.apma_mainname,
      year: record.apma_year ?? 0,
      month: monthFromChoice(record.apma_month),
      plantId: record._apma_plantname_value ?? '',
      productionLineId: record._apma_productionline_value ?? '',
      categoryId: record._apma_aecategories_value ?? '',
      value: record.apma_value ?? null,
    }));
  },

  async createAe(value: Omit<AeRecord, 'id' | 'mainName'>): Promise<AeRecord> {
    const [plantRecord, lineRecord, categoryRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load AE plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load AE production line')),
      Apma_pmtaecategoriesesService.get(value.categoryId).then((result) => data(result, 'load AE category')),
    ]);
    const mainName = buildAeMainName(value.year, value.month, { name: plantRecord.apma_name }, { name: lineRecord.apma_productionline }, { name: categoryRecord.apma_aecategories });
    const payload: Record<string, unknown> = {
      apma_mainname: mainName,
      apma_year: value.year,
      apma_month: monthToChoice(value.month) as Apma_pmtaesapma_month,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
      'apma_AECategories@odata.bind': bindLookup('apma_pmtaecategorieses', value.categoryId),
    };
    if (value.value !== null) payload.apma_value = value.value;
    const record = data(await Apma_pmtaesService.create(payload as never), 'create AE');
    return { ...value, id: record.apma_pmtaeid, mainName: record.apma_mainname };
  },

  async updateAe(id: string, value: Omit<AeRecord, 'id' | 'mainName'>): Promise<AeRecord> {
    const [plantRecord, lineRecord, categoryRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load AE plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load AE production line')),
      Apma_pmtaecategoriesesService.get(value.categoryId).then((result) => data(result, 'load AE category')),
    ]);
    const mainName = buildAeMainName(value.year, value.month, { name: plantRecord.apma_name }, { name: lineRecord.apma_productionline }, { name: categoryRecord.apma_aecategories });
    await Apma_pmtaesService.update(id, {
      apma_mainname: mainName,
      apma_year: value.year,
      apma_month: monthToChoice(value.month) as Apma_pmtaesapma_month,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
      'apma_AECategories@odata.bind': bindLookup('apma_pmtaecategorieses', value.categoryId),
      apma_value: value.value,
    } as never);
    return { ...value, id, mainName };
  },

  async deleteAe(id: string): Promise<void> {
    await Apma_pmtaesService.delete(id);
  },
};

``

---

## File: src/data/mock/mockRepositories.ts

- Size: 11301 bytes
- Last modified: 2026-10-07 21:46:41

``typescript
import type {
  PlantRepository,
  KpiDefinitionRepository,
  TargetRepository,
  MonthlyKpiResultRepository,
  ReportCategoryRepository,
  MonthlyReportRepository,
  AttachmentRepository,
} from '../repositories/interfaces';
import type {
  Plant,
  KpiDefinition,
  Target,
  MonthlyKpiResult,
  ReportCategory,
  MonthlyReport,
  ReportAttachment,
} from '../../domain/models';
import {
  INITIAL_PLANTS,
  INITIAL_KPI_DEFINITIONS,
  INITIAL_REPORT_CATEGORIES,
  INITIAL_TARGETS,
  INITIAL_MONTHLY_RESULTS,
  INITIAL_MONTHLY_REPORTS,
  INITIAL_REPORT_ATTACHMENTS,
} from './seedData';
import { kpiStatusStrategy } from '../../domain/strategies/kpiStatusStrategy';

// In-Memory Storage
let plants = [...INITIAL_PLANTS];
let kpiDefinitions = [...INITIAL_KPI_DEFINITIONS];
let reportCategories = [...INITIAL_REPORT_CATEGORIES];
let targets = [...INITIAL_TARGETS];
let monthlyResults = [...INITIAL_MONTHLY_RESULTS];
let monthlyReports = [...INITIAL_MONTHLY_REPORTS];
let reportAttachments = [...INITIAL_REPORT_ATTACHMENTS];

export class MockPlantRepository implements PlantRepository {
  async getAll(): Promise<Plant[]> {
    return [...plants].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getById(id: string): Promise<Plant | null> {
    return plants.find((p) => p.id === id) || null;
  }

  async create(plant: Omit<Plant, 'id'>): Promise<Plant> {
    const newPlant: Plant = { ...plant, id: `plant-${Date.now()}` };
    plants.push(newPlant);
    return newPlant;
  }

  async update(id: string, updated: Partial<Plant>): Promise<Plant> {
    const index = plants.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Plant with ID ${id} not found.`);
    plants[index] = { ...plants[index], ...updated };
    return plants[index];
  }

  async delete(id: string): Promise<void> {
    plants = plants.filter((p) => p.id !== id);
  }
}

export class MockKpiDefinitionRepository implements KpiDefinitionRepository {
  async getAll(): Promise<KpiDefinition[]> {
    return [...kpiDefinitions].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getById(id: string): Promise<KpiDefinition | null> {
    return kpiDefinitions.find((k) => k.id === id) || null;
  }

  async create(kpi: Omit<KpiDefinition, 'id'>): Promise<KpiDefinition> {
    const newKpi: KpiDefinition = { ...kpi, id: `kpi-${Date.now()}` };
    kpiDefinitions.push(newKpi);
    return newKpi;
  }

  async update(id: string, updated: Partial<KpiDefinition>): Promise<KpiDefinition> {
    const index = kpiDefinitions.findIndex((k) => k.id === id);
    if (index === -1) throw new Error(`KPI Definition with ID ${id} not found.`);
    kpiDefinitions[index] = { ...kpiDefinitions[index], ...updated };
    return kpiDefinitions[index];
  }

  async delete(id: string): Promise<void> {
    kpiDefinitions = kpiDefinitions.filter((k) => k.id !== id);
  }
}

export class MockTargetRepository implements TargetRepository {
  async getAll(): Promise<Target[]> {
    return [...targets];
  }

  async getByYear(year: number): Promise<Target[]> {
    return targets.filter((t) => t.targetYear === year);
  }

  async getByPlantAndYear(plantId: string, year: number): Promise<Target[]> {
    return targets.filter(
      (t) => (plantId === 'all' || t.plantId === plantId) && t.targetYear === year
    );
  }

  async create(target: Omit<Target, 'id'>): Promise<Target> {
    const exists = targets.some(
      (t) =>
        t.plantId === target.plantId &&
        t.kpiId === target.kpiId &&
        t.targetYear === target.targetYear
    );
    if (exists) {
      throw new Error('A target already exists for this Plant, KPI, and Target Year.');
    }
    const newTarget: Target = { ...target, id: `target-${Date.now()}` };
    targets.push(newTarget);
    return newTarget;
  }

  async update(id: string, updated: Partial<Target>): Promise<Target> {
    const index = targets.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`Target with ID ${id} not found.`);
    targets[index] = { ...targets[index], ...updated };
    return targets[index];
  }

  async delete(id: string): Promise<void> {
    targets = targets.filter((t) => t.id !== id);
  }
}

export class MockMonthlyKpiResultRepository implements MonthlyKpiResultRepository {
  async getAll(): Promise<MonthlyKpiResult[]> {
    return [...monthlyResults];
  }

  async getByYear(year: number): Promise<MonthlyKpiResult[]> {
    return monthlyResults.filter((result) => result.year === year);
  }

  async getByPeriod(year: number, month: number): Promise<MonthlyKpiResult[]> {
    return monthlyResults.filter((r) => r.year === year && r.month === month);
  }

  async getByPlantAndPeriod(
    plantId: string,
    year: number,
    month: number
  ): Promise<MonthlyKpiResult[]> {
    return monthlyResults.filter(
      (r) =>
        (plantId === 'all' || r.plantId === plantId) &&
        r.year === year &&
        r.month === month
    );
  }

  async saveBatch(
    items: Array<Omit<MonthlyKpiResult, 'id'> & { id?: string }>
  ): Promise<MonthlyKpiResult[]> {
    const savedResults: MonthlyKpiResult[] = [];

    for (const item of items) {
      const target = targets.find(
        (t) => t.plantId === item.plantId && t.kpiId === item.kpiId && t.targetYear === item.year
      );
      const kpiDef = kpiDefinitions.find((k) => k.id === item.kpiId);
      const calculatedStatus = kpiStatusStrategy.calculateStatus(
        item.ytdActual,
        target?.cyTarget,
        kpiDef?.kpiLogic,
      );

      const existingIndex = monthlyResults.findIndex(
        (r) =>
          r.plantId === item.plantId &&
          r.kpiId === item.kpiId &&
          r.year === item.year &&
          r.month === item.month
      );

      if (existingIndex >= 0) {
        monthlyResults[existingIndex] = {
          ...monthlyResults[existingIndex],
          ...item,
          status: calculatedStatus,
          updatedAt: new Date().toISOString(),
        };
        savedResults.push(monthlyResults[existingIndex]);
      } else {
        const newResult: MonthlyKpiResult = {
          ...item,
          id: item.id || `res-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          status: calculatedStatus,
          updatedAt: new Date().toISOString(),
        };
        monthlyResults.push(newResult);
        savedResults.push(newResult);
      }
    }

    return savedResults;
  }

  async delete(id: string): Promise<void> {
    monthlyResults = monthlyResults.filter((r) => r.id !== id);
  }
}

export class MockReportCategoryRepository implements ReportCategoryRepository {
  async getAll(): Promise<ReportCategory[]> {
    return [...reportCategories].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getById(id: string): Promise<ReportCategory | null> {
    return reportCategories.find((c) => c.id === id) || null;
  }

  async create(cat: Omit<ReportCategory, 'id'>): Promise<ReportCategory> {
    const newCat: ReportCategory = { ...cat, id: `cat-${Date.now()}` };
    reportCategories.push(newCat);
    return newCat;
  }

  async update(id: string, updated: Partial<ReportCategory>): Promise<ReportCategory> {
    const index = reportCategories.findIndex((c) => c.id === id);
    if (index === -1) throw new Error(`Report Category ${id} not found.`);
    reportCategories[index] = { ...reportCategories[index], ...updated };
    return reportCategories[index];
  }

  async delete(id: string): Promise<void> {
    reportCategories = reportCategories.filter((c) => c.id !== id);
  }
}

export class MockMonthlyReportRepository implements MonthlyReportRepository {
  async getAll(): Promise<MonthlyReport[]> {
    return [...monthlyReports];
  }

  async getByPeriod(year: number, month: number): Promise<MonthlyReport[]> {
    return monthlyReports.filter((r) => r.year === year && r.month === month);
  }

  async getByPlantAndPeriod(
    plantId: string,
    year: number,
    month: number
  ): Promise<MonthlyReport[]> {
    return monthlyReports.filter(
      (r) =>
        (plantId === 'all' || r.plantId === plantId) &&
        r.year === year &&
        r.month === month
    );
  }

  async getById(id: string): Promise<MonthlyReport | null> {
    return monthlyReports.find((r) => r.id === id) || null;
  }

  async create(report: Omit<MonthlyReport, 'id'>): Promise<MonthlyReport> {
    const newReport: MonthlyReport = {
      ...report,
      id: `rep-${Date.now()}`,
      attachmentsCount: 0,
    };
    monthlyReports.push(newReport);
    return newReport;
  }

  async update(id: string, updated: Partial<MonthlyReport>): Promise<MonthlyReport> {
    const index = monthlyReports.findIndex((r) => r.id === id);
    if (index === -1) throw new Error(`Monthly Report ${id} not found.`);
    monthlyReports[index] = { ...monthlyReports[index], ...updated };
    return monthlyReports[index];
  }

  async delete(id: string): Promise<void> {
    monthlyReports = monthlyReports.filter((r) => r.id !== id);
  }

}

export class MockAttachmentRepository implements AttachmentRepository {
  async getByReportId(monthlyReportId: string): Promise<ReportAttachment[]> {
    return reportAttachments.filter((a) => a.monthlyReportId === monthlyReportId);
  }

  async upload(
    monthlyReportId: string,
    title: string,
    file: File
  ): Promise<ReportAttachment> {
    const newAtt: ReportAttachment = {
      id: `att-${Date.now()}`,
      monthlyReportId,
      title,
      fileName: file.name,
      fileSize: file.size,
    };
    reportAttachments.push(newAtt);

    // Update parent report attachmentsCount
    const rep = monthlyReports.find((r) => r.id === monthlyReportId);
    if (rep) {
      rep.attachmentsCount = (rep.attachmentsCount || 0) + 1;
    }

    return newAtt;
  }

  async download(attachmentId: string): Promise<void> {
    const att = reportAttachments.find((a) => a.id === attachmentId);
    if (!att) throw new Error(`Attachment ${attachmentId} not found.`);
    throw new Error(`Mock attachment download is not available for ${att.title}.`);
  }

  async delete(id: string): Promise<void> {
    const att = reportAttachments.find((a) => a.id === id);
    if (att) {
      const rep = monthlyReports.find((r) => r.id === att.monthlyReportId);
      if (rep && rep.attachmentsCount) {
        rep.attachmentsCount = Math.max(0, rep.attachmentsCount - 1);
      }
    }
    reportAttachments = reportAttachments.filter((a) => a.id !== id);
  }
}

// Singletons for application injection
export const plantRepository = new MockPlantRepository();
export const kpiDefinitionRepository = new MockKpiDefinitionRepository();
export const targetRepository = new MockTargetRepository();
export const monthlyKpiResultRepository = new MockMonthlyKpiResultRepository();
export const reportCategoryRepository = new MockReportCategoryRepository();
export const monthlyReportRepository = new MockMonthlyReportRepository();
export const attachmentRepository = new MockAttachmentRepository();

``

---

## File: src/data/mock/seedData.ts

- Size: 8759 bytes
- Last modified: 2026-09-11 14:15:10

``typescript
import { KpiCategory, KpiStatus, ReportType } from '../../domain/enums';
import type {
  Plant,
  KpiDefinition,
  Target,
  MonthlyKpiResult,
  ReportCategory,
  MonthlyReport,
  ReportAttachment,
} from '../../domain/models';

export const INITIAL_PLANTS: Plant[] = [
  {
    id: 'pudong',
    name: 'Pudong-TPU',
    plantManager: 'Zhang Wei',
    productionManager: 'Li Ming',
    displayOrder: 1,
  },
  {
    id: 'zhanjiang',
    name: 'Zhanjiang-TPU',
    plantManager: 'Chen Jun',
    productionManager: 'Wang Fang',
    displayOrder: 2,
  },
  {
    id: 'changhua',
    name: 'Changhua-TPU',
    plantManager: 'Lin Chien',
    productionManager: 'Huang Po',
    displayOrder: 3,
  },
  {
    id: 'yokkaichi',
    name: 'Yokkaichi-TPU',
    plantManager: 'Sato Kenji',
    productionManager: 'Tanaka Hiroshi',
    displayOrder: 4,
  },
];

export const INITIAL_KPI_DEFINITIONS: KpiDefinition[] = [
  { id: 'kpi-1', name: 'LTI', category: KpiCategory.EHS, unit: '#', displayOrder: 1 },
  { id: 'kpi-2', name: 'PSI', category: KpiCategory.EHS, unit: '#', displayOrder: 2 },
  { id: 'kpi-3', name: 'Yellow Card', category: KpiCategory.EHS, unit: '#/HC/m', displayOrder: 3 },
  { id: 'kpi-4', name: 'Closed Rate of Yellow Card', category: KpiCategory.EHS, unit: '%', displayOrder: 4 },
  { id: 'kpi-5', name: 'BBS Observation', category: KpiCategory.EHS, unit: '#/HC/a', displayOrder: 5 },
  { id: 'kpi-6', name: 'Permit Inspection in the Field', category: KpiCategory.EHS, unit: '%', displayOrder: 6 },
  { id: 'kpi-7', name: 'Production Volume', category: KpiCategory.Production, unit: 'kt', displayOrder: 7 },
  { id: 'kpi-8', name: 'Schedule Loss (iac)', category: KpiCategory.Production, unit: '%', displayOrder: 8 },
  { id: 'kpi-9', name: 'Unexpected Loss (iac)', category: KpiCategory.Production, unit: '%', displayOrder: 9 },
  { id: 'kpi-10', name: 'Waste Ratio', category: KpiCategory.Production, unit: '%', displayOrder: 10 },
  { id: 'kpi-11', name: 'Recycle Granule Ratio', category: KpiCategory.Production, unit: '%', displayOrder: 11 },
  { id: 'kpi-12', name: 'First Pass Ratio', category: KpiCategory.Quality, unit: '%', displayOrder: 12 },
  { id: 'kpi-13', name: 'FG In-spec Ratio', category: KpiCategory.Quality, unit: '%', displayOrder: 13 },
  { id: 'kpi-14', name: 'Justified NCM', category: KpiCategory.Quality, unit: '#/kt', displayOrder: 14 },
];

export const INITIAL_REPORT_CATEGORIES: ReportCategory[] = [
  { id: 'cat-qehs', name: 'QEHS', displayOrder: 1 },
  { id: 'cat-supply', name: 'Supply and Capacity', displayOrder: 2 },
  { id: 'cat-projects', name: 'Projects', displayOrder: 3 },
  { id: 'cat-personnel', name: 'Personnel', displayOrder: 4 },
  { id: 'cat-prod', name: 'Production Update', displayOrder: 5 },
  { id: 'cat-quality', name: 'Quality Update', displayOrder: 6 },
];

// Seed Targets for 2026
export const INITIAL_TARGETS: Target[] = INITIAL_PLANTS.flatMap((plant) =>
  INITIAL_KPI_DEFINITIONS.map((kpi) => {
    let cyTarget = 100;
    if (kpi.unit === 'kt') cyTarget = 12.5;
    else if (kpi.name === 'LTI' || kpi.name === 'PSI') cyTarget = 0;
    else if (kpi.unit === '%') cyTarget = 98;
    else if (kpi.name === 'Justified NCM') cyTarget = 0.2;

    return {
      id: `target-${plant.id}-${kpi.id}-2026`,
      targetYear: 2026,
      plantId: plant.id,
      kpiId: kpi.id,
      pyActual: cyTarget * 0.95,
      cyTarget,
      kpiUnit: kpi.unit,
    };
  })
);

// Seed Monthly Results for 2026, Month 7
export const INITIAL_MONTHLY_RESULTS: MonthlyKpiResult[] = [
  // Pudong (All entered - Green / Amber)
  { id: 'res-pudong-kpi-1', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-1', targetId: 'target-pudong-kpi-1-2026', monthlyActual: 0, ytdActual: 0, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-2', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-2', targetId: 'target-pudong-kpi-2-2026', monthlyActual: 0, ytdActual: 0, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-3', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-3', targetId: 'target-pudong-kpi-3-2026', monthlyActual: 2.1, ytdActual: 2.3, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-4', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-4', targetId: 'target-pudong-kpi-4-2026', monthlyActual: 99.2, ytdActual: 98.8, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-5', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-5', targetId: 'target-pudong-kpi-5-2026', monthlyActual: 1.8, ytdActual: 1.9, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-6', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-6', targetId: 'target-pudong-kpi-6-2026', monthlyActual: 97.5, ytdActual: 98.1, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-7', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-7', targetId: 'target-pudong-kpi-7-2026', monthlyActual: 13.1, ytdActual: 12.8, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-8', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-8', targetId: 'target-pudong-kpi-8-2026', monthlyActual: 1.2, ytdActual: 1.5, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-9', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-9', targetId: 'target-pudong-kpi-9-2026', monthlyActual: 0.8, ytdActual: 0.9, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-10', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-10', targetId: 'target-pudong-kpi-10-2026', monthlyActual: 0.5, ytdActual: 0.6, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-11', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-11', targetId: 'target-pudong-kpi-11-2026', monthlyActual: 4.2, ytdActual: 4.0, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-12', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-12', targetId: 'target-pudong-kpi-12-2026', monthlyActual: 98.6, ytdActual: 98.4, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-13', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-13', targetId: 'target-pudong-kpi-13-2026', monthlyActual: 99.8, ytdActual: 99.6, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-14', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-14', targetId: 'target-pudong-kpi-14-2026', monthlyActual: 0.1, ytdActual: 0.15, status: KpiStatus.Green },

  // Zhanjiang (Partial - Amber / Red)
  { id: 'res-zhanjiang-kpi-1', year: 2026, month: 7, plantId: 'zhanjiang', kpiId: 'kpi-1', targetId: 'target-zhanjiang-kpi-1-2026', monthlyActual: 0, ytdActual: 0, status: KpiStatus.Green },
  { id: 'res-zhanjiang-kpi-7', year: 2026, month: 7, plantId: 'zhanjiang', kpiId: 'kpi-7', targetId: 'target-zhanjiang-kpi-7-2026', monthlyActual: 10.2, ytdActual: 9.8, status: KpiStatus.Amber },
  { id: 'res-zhanjiang-kpi-12', year: 2026, month: 7, plantId: 'zhanjiang', kpiId: 'kpi-12', targetId: 'target-zhanjiang-kpi-12-2026', monthlyActual: 92.1, ytdActual: 91.5, status: KpiStatus.Red },

  // Changhua (Complete)
  { id: 'res-changhua-kpi-1', year: 2026, month: 7, plantId: 'changhua', kpiId: 'kpi-1', targetId: 'target-changhua-kpi-1-2026', monthlyActual: 0, ytdActual: 0, status: KpiStatus.Green },
  { id: 'res-changhua-kpi-7', year: 2026, month: 7, plantId: 'changhua', kpiId: 'kpi-7', targetId: 'target-changhua-kpi-7-2026', monthlyActual: 12.0, ytdActual: 12.1, status: KpiStatus.Green },
];

export const INITIAL_MONTHLY_REPORTS: MonthlyReport[] = [
  {
    id: 'rep-pudong-qehs-7',
    year: 2026,
    month: 7,
    plantId: 'pudong',
    categoryId: 'cat-qehs',
    type: ReportType.Highlights,
    content: 'Achieved 1,000 consecutive LTI-free safe work days. Field BBS observations exceeded monthly target by 15%.',
    displayOrder: 1,
    attachmentsCount: 1,
  },
  {
    id: 'rep-pudong-prod-7',
    year: 2026,
    month: 7,
    plantId: 'pudong',
    categoryId: 'cat-prod',
    type: ReportType.Highlights,
    content: 'Line 2 debottlenecking completed ahead of schedule, increasing TPU compounding capacity by 8%.',
    displayOrder: 2,
    attachmentsCount: 0,
  },
  {
    id: 'rep-pudong-qehs-low-7',
    year: 2026,
    month: 7,
    plantId: 'pudong',
    categoryId: 'cat-qehs',
    type: ReportType.Lowlights,
    content: 'Minor hydraulic oil leak identified in Extruder #3 during routine maintenance; contained immediately with zero environmental impact.',
    displayOrder: 1,
    attachmentsCount: 0,
  },
];

export const INITIAL_REPORT_ATTACHMENTS: ReportAttachment[] = [
  {
    id: 'att-1',
    monthlyReportId: 'rep-pudong-qehs-7',
    title: 'Pudong July 2026 Safety Audit Summary.pdf',
    fileName: 'Pudong_July_2026_Safety_Audit.pdf',
    fileSize: 1024 * 350,
    plantId: 'pudong',
    year: 2026,
    month: 7,
  },
];

``

---

## File: src/data/repositories/interfaces.ts

- Size: 2794 bytes
- Last modified: 2026-10-07 21:46:41

``typescript
import type {
  Plant,
  KpiDefinition,
  Target,
  MonthlyKpiResult,
  ReportCategory,
  MonthlyReport,
  ReportAttachment,
} from '../../domain/models';

export interface PlantRepository {
  getAll(): Promise<Plant[]>;
  getById(id: string): Promise<Plant | null>;
  create(plant: Omit<Plant, 'id'>): Promise<Plant>;
  update(id: string, plant: Partial<Plant>): Promise<Plant>;
  delete(id: string): Promise<void>;
}

export interface KpiDefinitionRepository {
  getAll(): Promise<KpiDefinition[]>;
  getById(id: string): Promise<KpiDefinition | null>;
  create(kpi: Omit<KpiDefinition, 'id'>): Promise<KpiDefinition>;
  update(id: string, kpi: Partial<KpiDefinition>): Promise<KpiDefinition>;
  delete(id: string): Promise<void>;
}

export interface TargetRepository {
  getAll(): Promise<Target[]>;
  getByYear(year: number): Promise<Target[]>;
  getByPlantAndYear(plantId: string, year: number): Promise<Target[]>;
  create(target: Omit<Target, 'id'>): Promise<Target>;
  update(id: string, target: Partial<Target>): Promise<Target>;
  delete(id: string): Promise<void>;
}

export interface MonthlyKpiResultRepository {
  getAll(): Promise<MonthlyKpiResult[]>;
  getByYear(year: number): Promise<MonthlyKpiResult[]>;
  getByPeriod(year: number, month: number): Promise<MonthlyKpiResult[]>;
  getByPlantAndPeriod(
    plantId: string,
    year: number,
    month: number
  ): Promise<MonthlyKpiResult[]>;
  saveBatch(results: Array<Omit<MonthlyKpiResult, 'id'> & { id?: string }>): Promise<MonthlyKpiResult[]>;
  delete(id: string): Promise<void>;
}

export interface ReportCategoryRepository {
  getAll(): Promise<ReportCategory[]>;
  getById(id: string): Promise<ReportCategory | null>;
  create(category: Omit<ReportCategory, 'id'>): Promise<ReportCategory>;
  update(id: string, category: Partial<ReportCategory>): Promise<ReportCategory>;
  delete(id: string): Promise<void>;
}

export interface MonthlyReportRepository {
  getAll(): Promise<MonthlyReport[]>;
  getByPeriod(year: number, month: number): Promise<MonthlyReport[]>;
  getByPlantAndPeriod(
    plantId: string,
    year: number,
    month: number
  ): Promise<MonthlyReport[]>;
  getById(id: string): Promise<MonthlyReport | null>;
  create(report: Omit<MonthlyReport, 'id'>): Promise<MonthlyReport>;
  update(id: string, report: Partial<MonthlyReport>): Promise<MonthlyReport>;
  delete(id: string): Promise<void>;
}

export interface AttachmentRepository {
  getByReportId(monthlyReportId: string): Promise<ReportAttachment[]>;
  upload(
    monthlyReportId: string,
    title: string,
    file: File
  ): Promise<ReportAttachment>;
  download(attachmentId: string, fileName?: string): Promise<void>;
  delete(id: string): Promise<void>;
}

``

---

## File: src/domain/enums/index.ts

- Size: 562 bytes
- Last modified: 2026-09-11 12:18:07

``typescript
export const KpiStatus = {
  Green: 'Green',
  Amber: 'Amber',
  Red: 'Red',
  Grey: 'Grey',
  Missing: 'Missing',
} as const;
export type KpiStatus = (typeof KpiStatus)[keyof typeof KpiStatus];

export const KpiCategory = {
  EHS: 'EHS',
  Production: 'Production',
  Quality: 'Quality',
} as const;
export type KpiCategory = (typeof KpiCategory)[keyof typeof KpiCategory];

export const ReportType = {
  Highlights: 'Highlights',
  Lowlights: 'Lowlights',
} as const;
export type ReportType = (typeof ReportType)[keyof typeof ReportType];

``

---

## File: src/domain/models/charts.ts

- Size: 1260 bytes
- Last modified: 2026-10-14 22:15:25

``typescript
export interface ProductionLine {
  id: string;
  name: string;
  displayOrder: number;
}

export interface ProductionLineMatrix {
  id: string;
  mainName: string;
  plantId: string;
  productionLineId: string;
  displayOrder: number;
}

export interface ProductionKpiMatrix {
  id: string;
  mainName: string;
  plantId: string;
  type?: string;
  categories: string;
  productionClass?: 'Waste' | 'FG' | 'RM' | 'Defect' | 'FPYFG' | 'NT' | null;
  displayOrder: number;
}

export interface ProductionKpiRecord {
  id: string;
  mainName: string;
  year: number;
  month: number;
  plantId: string;
  type: string;
  categories: string;
  quantity: number | null;
  ratio?: number | null;
}

export interface AeCategory {
  id: string;
  name: string;
  displayOrder: number;
}

export interface VolumePacRecord {
  id: string;
  mainName: string;
  year: number;
  month: number;
  plantId: string;
  productionLineId: string;
  volume: number | null;
  forecast: number | null;
  pac: number | null;
}

export interface AeRecord {
  id: string;
  mainName: string;
  year: number;
  month: number;
  plantId: string;
  productionLineId: string;
  categoryId: string;
  value: number | null;
}

``

---

## File: src/domain/models/index.ts

- Size: 1574 bytes
- Last modified: 2026-10-04 00:04:21

``typescript
import type { KpiCategory, KpiStatus, ReportType } from '../enums';

export interface Plant {
  id: string;
  name: string;
  plantManagerId?: string;
  plantManager?: string;
  productionManagerId?: string;
  productionManager?: string;
  displayOrder: number;
}

export interface UserProfile {
  id?: string;
  displayName: string;
  userPrincipalName?: string;
}

export interface KpiDefinition {
  id: string;
  name: string;
  category: KpiCategory | string;
  unit: string;
  kpiLogic?: string;
  displayOrder: number;
}

export interface Target {
  id: string;
  targetYear: number;
  plantId: string;
  kpiId: string;
  pyActual?: number | null;
  cyTarget?: number | null;
  kpiUnit?: string;
}

export interface MonthlyKpiResult {
  id: string;
  year: number;
  month: number;
  plantId: string;
  kpiId: string;
  targetId?: string;
  monthlyActual?: number | null;
  ytdActual?: number | null;
  status: KpiStatus;
  updatedAt?: string;
}

export interface ReportCategory {
  id: string;
  name: string;
  displayOrder: number;
}

export interface MonthlyReport {
  id: string;
  mainName?: string;
  year: number;
  month: number;
  plantId: string;
  categoryId: string;
  type: ReportType;
  content: string;
  displayOrder: number;
  attachmentsCount?: number;
}

export interface ReportAttachment {
  id: string;
  monthlyReportId: string;
  title: string;
  fileName?: string;
  fileSize?: number;
  fileUrl?: string;
  year?: number;
  month?: number;
  plantId?: string;
}

``

---

## File: src/domain/services/aeBatch.ts

- Size: 1269 bytes
- Last modified: 2026-10-03 16:45:04

``typescript
import type { Plant } from '../models';
import type { AeCategory, AeRecord, ProductionLineMatrix } from '../models/charts';

const normalizeId = (id: string) => id.replace(/[{}]/g, '').trim().toLowerCase();

export function buildMissingAeRecords(
  year: number,
  month: number,
  plants: Plant[],
  matrices: ProductionLineMatrix[],
  categories: AeCategory[],
  existing: AeRecord[],
): Array<Omit<AeRecord, 'id' | 'mainName'>> {
  const existingKeys = new Set(existing
    .filter((record) => record.year === year && record.month === month)
    .map((record) => `${normalizeId(record.plantId)}:${normalizeId(record.productionLineId)}:${normalizeId(record.categoryId)}`));

  return plants.flatMap((plant) => {
    const plantId = normalizeId(plant.id);
    const lineIds = new Set(matrices
      .filter((matrix) => normalizeId(matrix.plantId) === plantId)
      .map((matrix) => normalizeId(matrix.productionLineId)));

    return [...lineIds].flatMap((productionLineId) => categories
      .filter((category) => !existingKeys.has(`${plantId}:${normalizeId(productionLineId)}:${normalizeId(category.id)}`))
      .map((category) => ({ year, month, plantId: plant.id, productionLineId, categoryId: category.id, value: null })));
  });
}

``

---

## File: src/domain/services/authorizationService.ts

- Size: 1115 bytes
- Last modified: 2026-09-11 14:22:49

``typescript
export interface IAuthorizationService {
  canViewAdministration(): boolean;
  canEditPlants(): boolean;
  canEditKpiDefinitions(): boolean;
  canEditTargets(): boolean;
  canEditMonthlyKpiResults(plantId?: string): boolean;
  canEditMonthlyReports(plantId?: string): boolean;
}

export class DefaultAuthorizationService implements IAuthorizationService {
  private isAdminUser: boolean;

  constructor(isAdmin = true) {
    this.isAdminUser = isAdmin;
  }

  canViewAdministration(): boolean {
    return this.isAdminUser;
  }

  canEditPlants(): boolean {
    return this.isAdminUser;
  }

  canEditKpiDefinitions(): boolean {
    return this.isAdminUser;
  }

  canEditTargets(): boolean {
    return this.isAdminUser;
  }

  canEditMonthlyKpiResults(plantId?: string): boolean {
    return Boolean(plantId) || true; // Plant users can edit KPI results
  }

  canEditMonthlyReports(plantId?: string): boolean {
    return Boolean(plantId) || true; // Plant users can edit monthly reports
  }
}

export const authorizationService = new DefaultAuthorizationService(true);

``

---

## File: src/domain/services/mainName.ts

- Size: 1120 bytes
- Last modified: 2026-10-05 13:39:39

``typescript
interface NamePart {
  name: string;
}

const joinName = (...parts: Array<string | number>) => parts.map(String).join('_');

export const buildTargetMainName = (year: number, plant: NamePart, kpi: NamePart) =>
  joinName(year, plant.name, kpi.name);

export const buildAeMainName = (year: number, month: number, plant: NamePart, productionLine: NamePart, category: NamePart) =>
  joinName(year, month, plant.name, productionLine.name, category.name);

export const buildVolumePacMainName = (year: number, month: number, plant: NamePart, productionLine: NamePart) =>
  joinName(year, month, plant.name, productionLine.name);

export const buildProductionLineMatrixMainName = (plant: NamePart, productionLine: NamePart) =>
  joinName(plant.name, productionLine.name);

export const buildProductionKpiMatrixMainName = (plant: NamePart, type: string, categories: string) =>
  joinName(plant.name, type, categories);

export const buildMonthlyReportMainName = (year: number, month: number, plant: NamePart, type: string, category: NamePart) =>
  joinName(year, month, plant.name, type, category.name);

``

---

## File: src/domain/services/period.ts

- Size: 305 bytes
- Last modified: 2026-10-03 17:18:13

``typescript
export interface YearMonth {
  year: number;
  month: number;
}

export function getPreviousPeriod(date = new Date()): YearMonth {
  const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  return { year: previousMonth.getFullYear(), month: previousMonth.getMonth() + 1 };
}

``

---

## File: src/domain/services/productionFormulas.ts

- Size: 997 bytes
- Last modified: 2026-10-23 02:51:59

``typescript
export function sumFinite(values: Array<number | null | undefined>): number | null {
  const present = values.filter((value): value is number => value !== null && value !== undefined && Number.isFinite(value));
  return present.length === 0 ? null : present.reduce((total, value) => total + value, 0);
}

export function calculateRatioPercent(numerator: number | null, denominator: number | null): number | null {
  if (numerator === null || denominator === null || denominator === 0) return null;
  const ratio = numerator / denominator * 100;
  return Number.isFinite(ratio) ? ratio : null;
}

export function calculateWasteQuantity(rm: number | null, fg: number | null, nt: number | null): number | null {
  return rm === null && fg === null && nt === null ? null : (rm ?? 0) - (fg ?? 0) - (nt ?? 0);
}

export function calculateFpyQuantity(fg: number | null, defect: number | null): number | null {
  return fg === null && defect === null ? null : (fg ?? 0) - (defect ?? 0);
}

``

---

## File: src/domain/services/volumePacBatch.ts

- Size: 1158 bytes
- Last modified: 2026-10-03 17:09:03

``typescript
import type { Plant } from '../models';
import type { ProductionLineMatrix, VolumePacRecord } from '../models/charts';

const normalizeId = (id: string) => id.replace(/[{}]/g, '').trim().toLowerCase();

export function buildMissingVolumePacRecords(
  year: number,
  month: number,
  plants: Plant[],
  matrices: ProductionLineMatrix[],
  existing: VolumePacRecord[],
): Array<Omit<VolumePacRecord, 'id' | 'mainName'>> {
  const existingKeys = new Set(existing
    .filter((record) => record.year === year && record.month === month)
    .map((record) => `${normalizeId(record.plantId)}:${normalizeId(record.productionLineId)}`));

  return plants.flatMap((plant) => {
    const plantId = normalizeId(plant.id);
    const lineIds = new Set(matrices
      .filter((matrix) => normalizeId(matrix.plantId) === plantId)
      .map((matrix) => normalizeId(matrix.productionLineId)));

    return [...lineIds]
      .filter((productionLineId) => !existingKeys.has(`${plantId}:${productionLineId}`))
      .map((productionLineId) => ({ year, month, plantId: plant.id, productionLineId, volume: null, forecast: null, pac: null }));
  });
}

``

---

## File: src/domain/strategies/kpiStatusStrategy.ts

- Size: 1842 bytes
- Last modified: 2026-10-04 17:52:24

``typescript
import { KpiStatus } from '../enums';

export interface IKpiStatusStrategy {
  calculateStatus(
    ytdActual: number | null | undefined,
    cyTarget: number | null | undefined,
    kpiLogic?: string | null
  ): KpiStatus;
  
  calculateCompletionRate(enteredCount: number, expectedCount: number): number;
}

export class DefaultKpiStatusStrategy implements IKpiStatusStrategy {
  calculateStatus(
    ytdActual: number | null | undefined,
    cyTarget: number | null | undefined,
    kpiLogic?: string | null
  ): KpiStatus {
    if (kpiLogic == null || kpiLogic === '' || kpiLogic === 'None') {
      return KpiStatus.Missing;
    }

    if (ytdActual === null || ytdActual === undefined) {
      return KpiStatus.Missing;
    }

    if (cyTarget === null || cyTarget === undefined) {
      return KpiStatus.Grey;
    }

    if (kpiLogic === 'Over') {
      if (ytdActual >= cyTarget) return KpiStatus.Green;
      if (ytdActual >= cyTarget * 0.5) return KpiStatus.Amber;
      return KpiStatus.Red;
    }

    if (kpiLogic === 'Less') {
      if (ytdActual <= cyTarget) return KpiStatus.Green;
      if (ytdActual <= cyTarget * 1.5) return KpiStatus.Amber;
      return KpiStatus.Red;
    }

    return KpiStatus.Missing;
  }

  calculateCompletionRate(enteredCount: number, expectedCount: number): number {
    if (expectedCount <= 0) return 0;
    const rate = Math.round((enteredCount / expectedCount) * 100);
    return Math.min(100, Math.max(0, rate));
  }
}

export const kpiStatusStrategy = new DefaultKpiStatusStrategy();

export function calculateKpiStatus(
  kpiLogic: string | null | undefined,
  ytdActual: number | null | undefined,
  cyTarget: number | null | undefined,
): KpiStatus {
  return kpiStatusStrategy.calculateStatus(ytdActual, cyTarget, kpiLogic);
}

``

---

## File: src/hooks/queries.ts

- Size: 20224 bytes
- Last modified: 2026-10-07 21:46:41

``typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataverseRepositories } from '../data/adapters/dataverseRepositories';
import { getActiveUserProfiles, getCurrentUserProfile } from '../data/adapters/currentUser';
import type { AeCategory, AeRecord, ProductionLine, ProductionLineMatrix, ProductionKpiMatrix, ProductionKpiRecord, VolumePacRecord } from '../domain/models/charts';
import type {
  Plant,
  KpiDefinition,
  Target,
  MonthlyKpiResult,
  ReportCategory,
  MonthlyReport,
  UserProfile,
} from '../domain/models';
import { ReportType } from '../domain/enums';
import { buildMissingAeRecords } from '../domain/services/aeBatch';
import { buildMissingVolumePacRecords } from '../domain/services/volumePacBatch';

const {
  plantRepository,
  kpiDefinitionRepository,
  targetRepository,
  monthlyKpiResultRepository,
  reportCategoryRepository,
  monthlyReportRepository,
  attachmentRepository,
} = dataverseRepositories;

const getVolumePacRepository = async () => (await import('../data/adapters/volumePacRepository')).volumePacRepository;
const getProductionKpiRepository = async () => (await import('../data/adapters/productionKpiRepository')).productionKpiRepository;

export const useProductionKpiRecords = (enabled = true) => useQuery<ProductionKpiRecord[]>({
  queryKey: ['productionKpiRecords'],
  queryFn: async () => (await getProductionKpiRepository()).getAll(),
  enabled,
});

export const useSaveProductionKpis = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (records: Array<Omit<ProductionKpiRecord, 'id'> & { id?: string }>) => (await getProductionKpiRepository()).saveBatch(records),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['productionKpiRecords'] }),
  });
};

export const useCurrentUser = () => {
  return useQuery<UserProfile>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserProfile,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
};

export const useActiveUsers = (enabled = true) => useQuery<UserProfile[]>({
  queryKey: ['activeUsers'],
  queryFn: getActiveUserProfiles,
  staleTime: 1000 * 60 * 30,
  enabled,
});

export const useProductionLines = (enabled = true) => useQuery<ProductionLine[]>({
  queryKey: ['productionLines'],
  queryFn: async () => (await getVolumePacRepository()).getProductionLines(),
  enabled,
});

export const useProductionLineMatrices = (enabled = true) => useQuery<ProductionLineMatrix[]>({
  queryKey: ['productionLineMatrices'],
  queryFn: async () => (await getVolumePacRepository()).getProductionLineMatrices(),
  enabled,
});

export const useProductionKpiMatrices = (enabled = true) => useQuery<ProductionKpiMatrix[]>({
  queryKey: ['productionKpiMatrices'],
  queryFn: async () => (await getVolumePacRepository()).getProductionKpiMatrices(),
  enabled,
});

export const useAeCategories = (enabled = true) => useQuery<AeCategory[]>({
  queryKey: ['aeCategories'],
  queryFn: async () => (await getVolumePacRepository()).getAeCategories(),
  enabled,
});

export const useVolumePac = (year: number, enabled = true) => useQuery<VolumePacRecord[]>({
  queryKey: ['volumePac', year],
  queryFn: async () => (await getVolumePacRepository()).getVolumePac(year),
  enabled,
});

export const useAe = (year: number, month: number, enabled = true) => useQuery<AeRecord[]>({
  queryKey: ['ae', year, month],
  queryFn: async () => (await getVolumePacRepository()).getAe(year, month),
  enabled,
});

export const useAllVolumePac = () => useQuery<VolumePacRecord[]>({
  queryKey: ['volumePac', 'all'],
  queryFn: async () => (await getVolumePacRepository()).getAllVolumePac(),
});

export const useAllAe = () => useQuery<AeRecord[]>({
  queryKey: ['ae', 'all'],
  queryFn: async () => (await getVolumePacRepository()).getAllAe(),
});

export const useChartAdminMutations = () => {
  const queryClient = useQueryClient();
  return {
    createLine: useMutation({ mutationFn: async (value: Omit<ProductionLine, 'id'>) => (await getVolumePacRepository()).createProductionLine(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLines'] }) }),
    updateLine: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Partial<ProductionLine> }) => (await getVolumePacRepository()).updateProductionLine(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLines'] }) }),
    deleteLine: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteProductionLine(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLines'] }) }),
    createMatrix: useMutation({ mutationFn: async (value: Omit<ProductionLineMatrix, 'id' | 'mainName'>) => (await getVolumePacRepository()).createProductionLineMatrix(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLineMatrices'] }) }),
    updateMatrix: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Omit<ProductionLineMatrix, 'id' | 'mainName'> }) => (await getVolumePacRepository()).updateProductionLineMatrix(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLineMatrices'] }) }),
    deleteMatrix: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteProductionLineMatrix(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLineMatrices'] }) }),
    createKpiMatrix: useMutation({ mutationFn: async (value: Omit<ProductionKpiMatrix, 'id' | 'mainName'>) => (await getVolumePacRepository()).createProductionKpiMatrix(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionKpiMatrices'] }) }),
    updateKpiMatrix: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Omit<ProductionKpiMatrix, 'id' | 'mainName'> }) => (await getVolumePacRepository()).updateProductionKpiMatrix(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionKpiMatrices'] }) }),
    deleteKpiMatrix: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteProductionKpiMatrix(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionKpiMatrices'] }) }),
    createCategory: useMutation({ mutationFn: async (value: Omit<AeCategory, 'id'>) => (await getVolumePacRepository()).createAeCategory(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['aeCategories'] }) }),
    updateCategory: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Partial<AeCategory> }) => (await getVolumePacRepository()).updateAeCategory(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['aeCategories'] }) }),
    deleteCategory: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteAeCategory(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['aeCategories'] }) }),
    createAe: useMutation({ mutationFn: async (value: Omit<AeRecord, 'id' | 'mainName'>) => (await getVolumePacRepository()).createAe(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ae'] }) }),
    updateAe: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Omit<AeRecord, 'id' | 'mainName'> }) => (await getVolumePacRepository()).updateAe(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ae'] }) }),
    deleteAe: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteAe(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ae'] }) }),
    createMissingAe: useMutation({
      mutationFn: async ({ year, month, plants, matrices, categories, existing }: { year: number; month: number; plants: Plant[]; matrices: ProductionLineMatrix[]; categories: AeCategory[]; existing: AeRecord[] }) => {
        const repository = await getVolumePacRepository();
        const missing = buildMissingAeRecords(year, month, plants, matrices, categories, existing);
        for (const record of missing) await repository.createAe(record);
        return missing.length;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ae'] }),
    }),
    updateAeValues: useMutation({
      mutationFn: async (records: Array<{ record: AeRecord; value: number | null }>) => {
        const repository = await getVolumePacRepository();
        for (const { record, value } of records) await repository.updateAe(record.id, { ...record, value });
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ae'] }),
    }),
    createVolumePac: useMutation({ mutationFn: async (value: Omit<VolumePacRecord, 'id' | 'mainName'>) => (await getVolumePacRepository()).createVolumePac(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['volumePac'] }) }),
    updateVolumePac: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Omit<VolumePacRecord, 'id' | 'mainName'> }) => (await getVolumePacRepository()).updateVolumePac(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['volumePac'] }) }),
    deleteVolumePac: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteVolumePac(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['volumePac'] }) }),
    createMissingVolumePac: useMutation({
      mutationFn: async ({ year, month, plants, matrices, existing }: { year: number; month: number; plants: Plant[]; matrices: ProductionLineMatrix[]; existing: VolumePacRecord[] }) => {
        const repository = await getVolumePacRepository();
        const missing = buildMissingVolumePacRecords(year, month, plants, matrices, existing);
        for (const record of missing) await repository.createVolumePac(record);
        return missing.length;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['volumePac'] }),
    }),
    updateVolumePacValues: useMutation({
      mutationFn: async (records: Array<{ record: VolumePacRecord; volume: number | null; forecast: number | null; pac: number | null }>) => {
        const repository = await getVolumePacRepository();
        for (const { record, volume, forecast, pac } of records) await repository.updateVolumePac(record.id, { ...record, volume, forecast, pac });
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['volumePac'] }),
    }),
  };
};

// Plants Query
export const usePlants = () => {
  return useQuery<Plant[]>({
    queryKey: ['plants'],
    queryFn: () => plantRepository.getAll(),
  });
};

// KPI Definitions Query
export const useKpiDefinitions = () => {
  return useQuery<KpiDefinition[]>({
    queryKey: ['kpiDefinitions'],
    queryFn: () => kpiDefinitionRepository.getAll(),
  });
};

// Targets Query
export const useAllTargets = () => {
  return useQuery<Target[]>({
    queryKey: ['targets', 'all'],
    queryFn: () => targetRepository.getAll(),
  });
};

export const useTargets = (year: number, plantId = 'all', enabled = true) => {
  return useQuery<Target[]>({
    queryKey: ['targets', year, plantId],
    queryFn: () => targetRepository.getByPlantAndYear(plantId, year),
    enabled,
  });
};


export const usePlantMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['plants'] });
  return {
    create: useMutation({ mutationFn: (plant: Omit<Plant, 'id'>) => plantRepository.create(plant), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, changes }: { id: string; changes: Partial<Plant> }) => plantRepository.update(id, changes), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: (id: string) => plantRepository.delete(id), onSuccess: invalidate }),
  };
};

export const useKpiDefinitionMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['kpiDefinitions'] });
  return {
    create: useMutation({ mutationFn: (kpi: Omit<KpiDefinition, 'id'>) => kpiDefinitionRepository.create(kpi), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, changes }: { id: string; changes: Partial<KpiDefinition> }) => kpiDefinitionRepository.update(id, changes), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: (id: string) => kpiDefinitionRepository.delete(id), onSuccess: invalidate }),
  };
};

export const useReportCategoryMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['reportCategories'] });
  return {
    create: useMutation({ mutationFn: (category: Omit<ReportCategory, 'id'>) => reportCategoryRepository.create(category), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, changes }: { id: string; changes: Partial<ReportCategory> }) => reportCategoryRepository.update(id, changes), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: (id: string) => reportCategoryRepository.delete(id), onSuccess: invalidate }),
  };
};

export const useTargetMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['targets'] });
  return {
    create: useMutation({ mutationFn: (target: Omit<Target, 'id'>) => targetRepository.create(target), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, changes }: { id: string; changes: Partial<Target> }) => targetRepository.update(id, changes), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: (id: string) => targetRepository.delete(id), onSuccess: invalidate }),
    updateValues: useMutation({
      mutationFn: async (targets: Array<{ id: string; pyActual: number | null; cyTarget: number | null }>) => {
        for (const target of targets) {
          await targetRepository.update(target.id, { pyActual: target.pyActual, cyTarget: target.cyTarget });
        }
      },
      onSuccess: invalidate,
    }),
    createMissing: useMutation({
      mutationFn: async ({ year, plants, kpis, existing }: { year: number; plants: Plant[]; kpis: KpiDefinition[]; existing: Target[] }) => {
        const existingKeys = new Set(existing.filter((target) => target.targetYear === year).map((target) => `${target.plantId}:${target.kpiId}`));
        const missing = plants.flatMap((plant) => kpis
          .filter((kpi) => !existingKeys.has(`${plant.id}:${kpi.id}`))
          .map((kpi) => ({ targetYear: year, plantId: plant.id, kpiId: kpi.id, pyActual: null, cyTarget: null })));
        for (const target of missing) await targetRepository.create(target);
        return missing.length;
      },
      onSuccess: invalidate,
    }),
  };
};

export const useMonthlyReportMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['monthlyReports'] });
  return {
    create: useMutation({ mutationFn: (report: Omit<MonthlyReport, 'id'>) => monthlyReportRepository.create(report), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, changes }: { id: string; changes: Partial<MonthlyReport> }) => monthlyReportRepository.update(id, changes), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: (id: string) => monthlyReportRepository.delete(id), onSuccess: invalidate }),
    createMissing: useMutation({
      mutationFn: async ({ year, month, plants, categories, existing }: { year: number; month: number; plants: Plant[]; categories: ReportCategory[]; existing: MonthlyReport[] }) => {
        const types = [ReportType.Highlights, ReportType.Lowlights];
        const existingKeys = new Set(existing.filter((report) => report.year === year && report.month === month).map((report) => `${report.plantId}:${report.categoryId}:${report.type}`));
        const missing = plants.flatMap((plant) => categories.flatMap((category) => types
          .filter((type) => !existingKeys.has(`${plant.id}:${category.id}:${type}`))
          .map((type) => ({ year, month, plantId: plant.id, categoryId: category.id, type, content: '', displayOrder: category.displayOrder }))));
        for (const report of missing) await monthlyReportRepository.create(report);
        return missing.length;
      },
      onSuccess: invalidate,
    }),
    updateContents: useMutation({
      mutationFn: async (reports: Array<{ id: string; content: string }>) => {
        for (const report of reports) await monthlyReportRepository.update(report.id, { content: report.content });
      },
      onSuccess: invalidate,
    }),
  };
};


// Monthly KPI Results Query
export const useMonthlyKpiResults = (year: number, month: number, plantId = 'all') => {
  return useQuery<MonthlyKpiResult[]>({
    queryKey: ['monthlyKpiResults', year, month, plantId],
    queryFn: () => monthlyKpiResultRepository.getByPlantAndPeriod(plantId, year, month),
  });
};

export const useMonthlyKpiResultsByYear = (year: number, enabled = true) => useQuery<MonthlyKpiResult[]>({
  queryKey: ['monthlyKpiResults', year, 'allMonths'],
  queryFn: () => monthlyKpiResultRepository.getByYear(year),
  enabled,
});

// Save Monthly KPI Results Mutation
export const useSaveMonthlyKpiResults = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (results: Array<Omit<MonthlyKpiResult, 'id'> & { id?: string }>) =>
      monthlyKpiResultRepository.saveBatch(results),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monthlyKpiResults'] });
    },
  });
};

// Report Categories Query
export const useReportCategories = (enabled = true) => {
  return useQuery<ReportCategory[]>({
    queryKey: ['reportCategories'],
    queryFn: () => reportCategoryRepository.getAll(),
    enabled,
  });
};

// Monthly Reports Query
export const useAllMonthlyReports = () => {
  return useQuery<MonthlyReport[]>({
    queryKey: ['monthlyReports', 'all'],
    queryFn: () => monthlyReportRepository.getAll(),
  });
};

export const useMonthlyReports = (year: number, month: number, plantId = 'all') => {
  return useQuery<MonthlyReport[]>({
    queryKey: ['monthlyReports', year, month, plantId],
    queryFn: () => monthlyReportRepository.getByPlantAndPeriod(plantId, year, month),
  });
};

// Save Monthly Report Mutation
export const useSaveMonthlyReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      report,
      isEdit,
    }: {
      report: Omit<MonthlyReport, 'id'> & { id?: string };
      isEdit: boolean;
    }) => {
      if (isEdit && report.id) {
        return monthlyReportRepository.update(report.id, report);
      }
      return monthlyReportRepository.create(report);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monthlyReports'] });
    },
  });
};

// Report Attachments Query
export const useReportAttachments = (reportId: string | null) => {
  return useQuery({
    queryKey: ['reportAttachments', reportId],
    queryFn: () => (reportId ? attachmentRepository.getByReportId(reportId) : Promise.resolve([])),
    enabled: !!reportId,
  });
};

export const useDownloadAttachment = () => {
  return useMutation({
    mutationFn: ({ attachmentId, fileName }: { attachmentId: string; fileName?: string }) =>
      attachmentRepository.download(attachmentId, fileName),
  });
};

export const useUploadAttachment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ monthlyReportId, title, file }: { monthlyReportId: string; title: string; file: File }) =>
      attachmentRepository.upload(monthlyReportId, title, file),
    onSuccess: (_attachment, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reportAttachments', variables.monthlyReportId] });
      queryClient.invalidateQueries({ queryKey: ['monthlyReports'] });
    },
  });
};

``

---

## File: src/hooks/useAppToast.ts

- Size: 344 bytes
- Last modified: 2026-09-11 12:18:37

``typescript
import { useContext } from 'react';
import { ToastContext, type ToastContextType } from '../app/providers/ToastContext';

export const useAppToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useAppToast must be used within a ToastProvider');
  }
  return context;
};

``

---

## File: src/index.css

- Size: 371 bytes
- Last modified: 2026-09-11 13:58:59

``css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8fafc;
  color: #0f172a;
}

``

---

## File: src/layouts/AppShell/AboutDialog.tsx

- Size: 2451 bytes
- Last modified: 2026-09-11 11:59:50

``tsx
import React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Body1,
  Caption1,
  makeStyles,
  tokens,
  Badge,
} from '@fluentui/react-components';
import { Info24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
    gap: tokens.spacingVerticalS,
    alignItems: 'center',
  },
  label: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
});

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AboutDialog: React.FC<AboutDialogProps> = ({ open, onOpenChange }) => {
  const styles = useStyles();

  return (
    <Dialog open={open} onOpenChange={(_e, data) => onOpenChange(data.open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle action={<Info24Regular />}>
            About PMT Plants Excellence Review System
          </DialogTitle>
          <DialogContent className={styles.container}>
            <Body1>
              PMT Plants Excellence Review System provides centralized data entry,
              multi-plant status comparison, monthly report highlights/lowlights review, and target tracking for BASF TPU sites.
            </Body1>
            <div className={styles.infoGrid}>
              <Caption1 className={styles.label}>Version:</Caption1>
              <Caption1>1.0.0 (Phase 1 Build)</Caption1>

              <Caption1 className={styles.label}>Platform:</Caption1>
              <Caption1>Power Apps Code App (React 19 + Fluent UI v9)</Caption1>

              <Caption1 className={styles.label}>Environment:</Caption1>
              <Badge color="brand" appearance="tint">Prod (4d7fa01b...)</Badge>

              <Caption1 className={styles.label}>Supported Plants:</Caption1>
              <Caption1>Pudong-TPU, Zhanjiang-TPU, Changhua-TPU, Yokkaichi-TPU</Caption1>
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="primary" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

``

---

## File: src/layouts/AppShell/AppHeader.tsx

- Size: 3404 bytes
- Last modified: 2026-09-13 20:04:59

``tsx
import React, { useState } from 'react';
import {
  makeStyles,
  tokens,
  Text,
  Button,
  Avatar,
  Tooltip,
} from '@fluentui/react-components';
import {
  Info24Regular,
  Navigation24Regular,
} from '@fluentui/react-icons';
import { AboutDialog } from './AboutDialog';
import { useCurrentUser } from '../../hooks/queries';

const useStyles = makeStyles({
  header: {
    height: '56px',
    backgroundColor: '#FFFFFF',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    boxShadow: tokens.shadow2,
    zIndex: 10,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  toggleButton: {
    '@media (min-width: 900px)': {
      display: 'none',
    },
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: tokens.fontWeightBold,
    color: '#0F172A',
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  userName: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
});

interface AppHeaderProps {
  onToggleMobileMenu: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleMobileMenu }) => {
  const styles = useStyles();
  const [aboutOpen, setAboutOpen] = useState(false);
  const currentUserQuery = useCurrentUser();
  const userName = currentUserQuery.data?.displayName || 'BASF User';

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Button
          appearance="subtle"
          icon={<Navigation24Regular />}
          className={styles.toggleButton}
          onClick={onToggleMobileMenu}
          aria-label="Toggle Navigation Menu"
        />
        <div className={styles.titleContainer}>
          <Text className={styles.title}>PMT Plants Excellence Review System</Text>
          <Text className={styles.subtitle}>
            Manage KPI Input, Review, Four-Plant Status and Monthly Reports in One Platform
          </Text>
        </div>
      </div>

      <div className={styles.rightSection}>
        <Tooltip content="System Info & About" relationship="label">
          <Button
            appearance="subtle"
            icon={<Info24Regular />}
            onClick={() => setAboutOpen(true)}
            aria-label="About system"
          />
        </Tooltip>

        <div className={styles.userInfo}>
          <Avatar name={userName} color="brand" badge={{ status: 'available' }} />
          <Text className={styles.userName}>{userName}</Text>
        </div>
      </div>

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </header>
  );
};

``

---

## File: src/layouts/AppShell/AppShell.tsx

- Size: 2384 bytes
- Last modified: 2026-09-11 13:56:57

``tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles, tokens, Drawer, DrawerBody } from '@fluentui/react-components';
import { AppHeader } from './AppHeader';
import { SideNavigation } from './SideNavigation';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
    fontFamily: tokens.fontFamilyBase,
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    overflow: 'hidden',
  },
  desktopSidebar: {
    height: '100%',
    flexShrink: 0,
    '@media (max-width: 899px)': {
      display: 'none',
    },
  },
  mainContent: {
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F8FAFC',
    padding: tokens.spacingHorizontalL,
    boxSizing: 'border-box',
  },
  mobileDrawerBody: {
    padding: 0,
    backgroundColor: '#0F172A',
    height: '100%',
  },
});

export const AppShell: React.FC = () => {
  const styles = useStyles();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={styles.root}>
      <AppHeader onToggleMobileMenu={() => setMobileMenuOpen(true)} />

      <div className={styles.body}>
        {/* Desktop Permanent Sidebar */}
        <div className={styles.desktopSidebar}>
          <SideNavigation
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Mobile / Tablet Overlay Drawer */}
        <Drawer
          type="overlay"
          open={mobileMenuOpen}
          onOpenChange={(_e, { open }) => setMobileMenuOpen(open)}
          size="medium"
        >
          <DrawerBody className={styles.mobileDrawerBody}>
            <SideNavigation
              collapsed={false}
              onToggleCollapse={() => setMobileMenuOpen(false)}
              onMobileItemClick={() => setMobileMenuOpen(false)}
            />
          </DrawerBody>
        </Drawer>

        {/* Main Content Area */}
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

``

---

## File: src/layouts/AppShell/SideNavigation.tsx

- Size: 9941 bytes
- Last modified: 2026-10-06 23:13:16

``tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  makeStyles,
  tokens,
  Text,
  Badge,
  Button,
  Tooltip,
} from '@fluentui/react-components';
import {
  Home24Regular,
  Home24Filled,
  DataBarHorizontal24Regular,
  DataBarHorizontal24Filled,
  Form24Regular,
  Form24Filled,
  DocumentText24Regular,
  DocumentText24Filled,
  Settings24Regular,
  Settings24Filled,
  ChevronLeft24Regular,
  ChevronRight24Regular,
  ChevronDown24Regular,
  ChevronUp24Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  sidebar: {
    backgroundColor: '#0F172A', // Dark Navy
    color: '#F8FAFC',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'width 0.2s ease-in-out',
    boxShadow: tokens.shadow16,
    userSelect: 'none',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  expanded: {
    width: '240px',
  },
  collapsed: {
    width: '64px',
  },
  brandHeader: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '16px',
    paddingRight: '16px',
    borderBottom: '1px solid #1E293B',
    gap: '12px',
  },
  brandLogo: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    backgroundColor: '#005A9E',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    flexShrink: 0,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontWeight: tokens.fontWeightBold,
    fontSize: tokens.fontSizeBase300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '12px 8px',
    flexGrow: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    borderRadius: '6px',
    padding: '0 12px',
    color: '#94A3B8',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.15s ease-in-out',
    gap: '12px',
    textDecoration: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'left',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    ':hover': {
      backgroundColor: '#1E293B',
      color: '#F8FAFC',
    },
  },
  activeNavItem: {
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    fontWeight: tokens.fontWeightSemibold,
    '::before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '6px',
      bottom: '6px',
      width: '4px',
      borderRadius: '0 4px 4px 0',
      backgroundColor: '#2563EB',
    },
  },
  disabledNavItem: {
    opacity: 0.5,
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: 'transparent',
      color: '#94A3B8',
    },
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '24px',
    height: '24px',
  },
  label: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexGrow: 1,
  },
  badge: {
    marginLeft: 'auto',
    flexShrink: 0,
  },
  footer: {
    padding: '12px 8px',
    borderTop: '1px solid #1E293B',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  toggleButton: {
    color: '#94A3B8',
    ':hover': {
      color: '#FFFFFF',
      backgroundColor: '#1E293B',
    },
  },
});

interface SideNavigationProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onMobileItemClick?: () => void;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
  collapsed,
  onToggleCollapse,
  onMobileItemClick,
}) => {
  const styles = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [administrationExpanded, setAdministrationExpanded] = React.useState(location.pathname.startsWith('/administration'));
  const [chartExpanded, setChartExpanded] = React.useState(location.pathname.startsWith('/chart'));

  const navItems: Array<{
    key: string;
    path: string;
    label: string;
    icon: React.ReactNode;
    isMatch: (path: string) => boolean;
    disabled?: boolean;
    badge?: string;
  }> = [
    {
      key: 'overview',
      path: '/kpi-overview',
      label: 'KPI Overview',
      icon: location.pathname === '/kpi-overview' || location.pathname === '/' ? <Home24Filled /> : <Home24Regular />,
      isMatch: (p: string) => p === '/' || p === '/kpi-overview',
    },
    {
      key: 'chart',
      path: '/chart',
      label: 'Chart',
      icon: location.pathname.startsWith('/chart') ? <DataBarHorizontal24Filled /> : <DataBarHorizontal24Regular />,
      isMatch: (path: string) => path.startsWith('/chart'),
    },
    {
      key: 'entry',
      path: '/kpi-entry',
      label: 'KPI Data Entry',
      icon: location.pathname.startsWith('/kpi-entry') ? <Form24Filled /> : <Form24Regular />,
      isMatch: (p: string) => p.startsWith('/kpi-entry'),
    },
    {
      key: 'production-entry',
      path: '/production-entry',
      label: 'Production Data Entry',
      icon: location.pathname.startsWith('/production-entry') ? <Form24Filled /> : <Form24Regular />,
      isMatch: (path: string) => path.startsWith('/production-entry'),
    },
    {
      key: 'reports',
      path: '/monthly-reports',
      label: 'Monthly Reports',
      icon: location.pathname.startsWith('/monthly-reports') ? <DocumentText24Filled /> : <DocumentText24Regular />,
      isMatch: (p: string) => p.startsWith('/monthly-reports'),
    },
    {
      key: 'administration',
      path: '/administration',
      label: 'Administration',
      icon: location.pathname.startsWith('/administration') ? <Settings24Filled /> : <Settings24Regular />,
      isMatch: (p: string) => p.startsWith('/administration'),
    },
  ];

  const handleNavigate = (path: string, disabled?: boolean) => {
    if (disabled) return;
    navigate(path);
    if (onMobileItemClick) {
      onMobileItemClick();
    }
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : styles.expanded}`}>
      <div className={styles.brandHeader}>
        <div className={styles.brandLogo}>TPU</div>
        {!collapsed && <Text className={styles.brandTitle}>PMT Review</Text>}
      </div>

      <nav className={styles.navList}>
        {navItems.map((item) => {
          const isActive = item.isMatch(location.pathname);
          const isParent = item.key === 'administration' || item.key === 'chart';
          const expanded = item.key === 'chart' ? chartExpanded : administrationExpanded;
          const childItems = item.key === 'chart'
            ? [{ label: 'Volume & PAC', path: '/chart/volume-pac' }, { label: 'Production & Quality', path: '/chart/production-quality' }]
            : item.key === 'administration'
              ? [{ label: 'Configuration', path: '/administration/configuration' }, { label: 'Basic Data Management', path: '/administration/basic-data' }]
              : [];
          const className = `${styles.navItem} ${isActive ? styles.activeNavItem : ''} ${
            item.disabled ? styles.disabledNavItem : ''
          }`;

          const content = (
            <button
              key={item.key}
              type="button"
              className={className}
              onClick={() => {
                if (isParent) {
                  if (collapsed) onToggleCollapse();
                  if (item.key === 'chart') setChartExpanded((value) => collapsed || !value);
                  else setAdministrationExpanded((value) => collapsed || !value);
                } else handleNavigate(item.path, item.disabled);
              }}
              aria-disabled={item.disabled}
              aria-expanded={isParent ? expanded : undefined}
              aria-current={!isParent && isActive ? 'page' : undefined}
            >
              <div className={styles.iconContainer}>{item.icon}</div>
              {!collapsed && (
                <>
                  <span className={styles.label}>{item.label}</span>
                  {isParent ? (expanded ? <ChevronUp24Regular /> : <ChevronDown24Regular />) : null}
                  {item.badge && (
                    <Badge size="small" appearance="tint" color="informative" className={styles.badge}>
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.key} content={item.label} relationship="label" positioning="after">
                {content}
              </Tooltip>
            );
          }

          return <React.Fragment key={item.key}>
            {content}
            {isParent && expanded ? <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '36px' }}>
              {childItems.map((child) => <button key={child.path} type="button" className={`${styles.navItem} ${location.pathname === child.path ? styles.activeNavItem : ''}`} onClick={() => handleNavigate(child.path)} aria-current={location.pathname === child.path ? 'page' : undefined}>{child.label}</button>)}
            </div> : null}
          </React.Fragment>;
        })}
      </nav>

      <div className={styles.footer}>
        <Button
          appearance="subtle"
          icon={collapsed ? <ChevronRight24Regular /> : <ChevronLeft24Regular />}
          onClick={onToggleCollapse}
          className={styles.toggleButton}
          aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        />
      </div>
    </aside>
  );
};

``

---

## File: src/main.tsx

- Size: 230 bytes
- Last modified: 2026-09-11 11:59:51

``tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

``

---

## File: src/pages/AdministrationPage/AdministrationPage.tsx

- Size: 59620 bytes
- Last modified: 2026-10-11 20:05:37

``tsx
import React, { useMemo, useState } from 'react';
import { Button, Card, Checkbox, Combobox, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, Input, Label, Option, Select, Textarea, makeStyles, Tab, TabList, tokens } from '@fluentui/react-components';
import { Add24Regular, Delete24Regular, Edit24Regular, Save24Regular } from '@fluentui/react-icons';
import { PageHeader } from '../../components/common/PageHeader';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { useAeCategories, useAllAe, useAllMonthlyReports, useAllTargets, useAllVolumePac, useChartAdminMutations, useKpiDefinitionMutations, useKpiDefinitions, useMonthlyReportMutations, usePlantMutations, usePlants, useProductionKpiMatrices, useProductionLineMatrices, useProductionLines, useReportCategoryMutations, useReportCategories, useTargetMutations, useTargets } from '../../hooks/queries';
import type { KpiDefinition, MonthlyReport, Plant, ReportCategory, Target } from '../../domain/models';
import type { AeCategory, AeRecord, ProductionLine, ProductionLineMatrix, ProductionKpiMatrix, VolumePacRecord } from '../../domain/models/charts';
import { ReportType } from '../../domain/enums';
import { getPreviousPeriod } from '../../domain/services/period';
import { Apma_pmtkpidefinitionsesapma_kpilogic } from '../../generated/models/Apma_pmtkpidefinitionsesModel';
import { Apma_pmtproductionkpimatrixesapma_type, Apma_pmtproductionkpimatrixesapma_productionclass } from '../../generated/models/Apma_pmtproductionkpimatrixesModel';

type AdminTab = 'plants' | 'kpis' | 'reportCategories' | 'aeCategories' | 'productionLines' | 'productionLineMatrices' | 'productionKpiMatrices' | 'targets' | 'ae' | 'volumePac' | 'monthlyReports';
type AdminItem = Plant | KpiDefinition | ReportCategory | Target | AeCategory | ProductionLine | ProductionLineMatrix | ProductionKpiMatrix | AeRecord | VolumePacRecord | MonthlyReport;

const columns: Record<AdminTab, string[]> = {
    productionKpiMatrices: ['mainName', 'plantName', 'type', 'categories', 'productionClass', 'displayOrder'],
    plants: ['name', 'displayOrder'], kpis: ['name', 'category', 'unit', 'kpiLogic', 'displayOrder'], reportCategories: ['name', 'displayOrder'], aeCategories: ['name', 'displayOrder'], productionLines: ['name', 'displayOrder'], productionLineMatrices: ['mainName', 'plantName', 'productionLineName', 'displayOrder'], targets: ['targetYear', 'plantName', 'kpiName', 'kpiUnit', 'pyActual', 'cyTarget'], ae: ['mainName', 'year', 'month', 'plantName', 'productionLineName', 'categoryName', 'value'], volumePac: ['mainName', 'year', 'month', 'plantName', 'productionLineName', 'volume', 'forecast', 'pac'], monthlyReports: ['mainName', 'year', 'month', 'plantName', 'categoryName', 'type', 'content'],
};
const labels: Record<string, string> = { name: 'Name', displayOrder: 'Display Order', category: 'Category', categories: 'Categories', productionClass: 'Production Class', unit: 'Unit', kpiUnit: 'Unit', kpiLogic: 'KPI Logic', targetYear: 'Target Year', plantName: 'Plant Name', kpiName: 'KPI Name', pyActual: 'PY Actual', cyTarget: 'CY Target', mainName: 'Main Name', year: 'Year', month: 'Month', productionLineName: 'Production Line', categoryName: 'Category', value: 'Value (%)', volume: 'Volume (t)', forecast: 'Forecast (t)', pac: 'PAC (t)', type: 'Type', content: 'Content' };

const styles = makeStyles({
    page: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', gap: tokens.spacingVerticalL },
    tabs: { overflowX: 'auto', flexShrink: 0 },
    toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 },
    toolbarActions: { display: 'flex', gap: tokens.spacingHorizontalS },
    filters: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalM, flexShrink: 0, position: 'relative', zIndex: 5 },
    filter: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, minWidth: '190px', maxWidth: '260px', position: 'relative' },
    filterOptions: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: tokens.spacingVerticalXXS, position: 'absolute', zIndex: 1, top: '100%', left: 0, right: 0, maxHeight: '180px', overflowY: 'auto', padding: tokens.spacingVerticalXS, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke1}`, borderRadius: tokens.borderRadiusSmall, boxShadow: tokens.shadow8 },
    filterOption: { padding: tokens.spacingVerticalXS },
    scroll: { display: 'block', flex: 1, minHeight: 0, overflow: 'auto', padding: 0, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium },
    table: { width: '100%', minWidth: '900px', borderCollapse: 'separate', borderSpacing: 0 },
    tableHead: { position: 'sticky', top: 0, zIndex: 3, backgroundColor: '#F3F2F1' },
    cell: { padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`, borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, textAlign: 'left', whiteSpace: 'nowrap' },
    header: { position: 'sticky', top: 0, zIndex: 4, backgroundColor: '#F3F2F1', backgroundClip: 'padding-box', boxShadow: `0 1px 0 ${tokens.colorNeutralStroke2}`, fontWeight: tokens.fontWeightSemibold },
    field: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS, marginBottom: tokens.spacingVerticalM },
});

const lookupName = (items: Array<{ id: string; name: string }>, id: unknown) => items.find((item) => item.id === id)?.name ?? String(id ?? 'N/A');
const lookupField = (field: string) => ({ plantName: 'plantId', kpiName: 'kpiId', productionLineName: 'productionLineId', categoryName: 'categoryId' }[field] ?? field);
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((label, index) => ({ value: String(index + 1), label }));
type BatchMonth = number | 'all'

type FilterOption = { value: string; label: string };
type TableFilter = { key: string; label: string; recordField: string; options: FilterOption[] };

const SearchMultiSelect: React.FC<{ label: string; options: FilterOption[]; selected: string[]; onChange: (selected: string[]) => void; disabled?: boolean }> = ({ label, options, selected, onChange, disabled = false }) => {
    const css = styles();
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const matches = options.filter((option) => option.label.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
    const toggle = (value: string) => onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
    return <div className={css.filter}><Label>{label}{selected.length ? ` (${selected.length})` : ''}</Label><Input placeholder="Search and select" value={search} disabled={disabled} onFocus={() => setOpen(true)} onClick={() => setOpen(true)} onBlur={() => setOpen(false)} onChange={(_event, data) => { setSearch(data.value); setOpen(true); }} />{open && !disabled ? <div className={css.filterOptions}>{matches.map((option) => <Checkbox className={css.filterOption} key={option.value} label={option.label} checked={selected.includes(option.value)} onMouseDown={(event) => event.preventDefault()} onChange={() => toggle(option.value)} />)}</div> : null}</div>;
};

const BatchTargetDialog: React.FC<{ onClose: () => void; onConfirm: (year: number) => Promise<void> }> = ({ onClose, onConfirm }) => {
    const css = styles();
    const [year, setYear] = useState(String(new Date().getFullYear()));
    const [saving, setSaving] = useState(false);
    const numericYear = Number(year);
    const validYear = Number.isInteger(numericYear) && numericYear > 0;
    const confirm = async () => {
        if (!validYear) return;
        setSaving(true);
        try {
            await onConfirm(numericYear);
            onClose();
        } finally {
            setSaving(false);
        }
    };
    return <Dialog open onOpenChange={(_event, data) => !data.open && onClose()}><DialogSurface><DialogBody><DialogTitle>Batch add PMT Targets</DialogTitle><DialogContent><div className={css.field}><Label htmlFor="batch-target-year">Target Year</Label><Input id="batch-target-year" type="number" value={year} onChange={(_event, data) => setYear(data.value)} /></div><p>Missing Plant and KPI combinations will be created. Existing records will not be changed.</p></DialogContent><DialogActions><Button onClick={onClose} disabled={saving}>Cancel</Button><Button appearance="primary" onClick={() => void confirm()} disabled={!validYear || saving}>{saving ? 'Creating...' : 'Confirm'}</Button></DialogActions></DialogBody></DialogSurface></Dialog>;
};

const BatchAeDialog: React.FC<{ onClose: () => void; onConfirm: (year: number, month: number) => Promise<void> }> = ({ onClose, onConfirm }) => {
    const css = styles();
    const targetsQuery = useAllTargets();
    const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear))].sort((left, right) => left - right);
    const [year, setYear] = useState(new Date().getFullYear());
    const validYear = years.includes(year);
    const [month, setMonth] = useState(String(new Date().getMonth() + 1));
    const [saving, setSaving] = useState(false);
    const confirm = async () => {
        if (!validYear) return;
        setSaving(true);
        try {
            await onConfirm(year, Number(month));
            onClose();
        } finally {
            setSaving(false);
        }
    };
    return <Dialog open onOpenChange={(_event, data) => !data.open && onClose()}><DialogSurface><DialogBody><DialogTitle>Batch add AE</DialogTitle><DialogContent><div className={css.field}><Label>Year</Label><Select aria-label="Year" value={validYear ? String(year) : ''} disabled={saving || targetsQuery.isLoading} onChange={(_event, data) => setYear(Number(data.value))}><option value="">Select year</option>{years.map((option) => <option key={option} value={String(option)}>{option}</option>)}</Select></div><div className={css.field}><Label>Month</Label><Select value={month} onChange={(_event, data) => setMonth(data.value)}>{months.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</Select></div><p>Missing Plant, Production Line and AE Category combinations will be created. Existing records will not be changed.</p></DialogContent><DialogActions><Button onClick={onClose} disabled={saving}>Cancel</Button><Button appearance="primary" onClick={() => void confirm()} disabled={saving || !validYear || targetsQuery.isLoading || targetsQuery.isError}>{saving ? 'Creating...' : 'Confirm'}</Button></DialogActions></DialogBody></DialogSurface></Dialog>;
};


const BatchVolumePacDialog: React.FC<{
  onClose: () => void
  onConfirm: (year: number, month: BatchMonth) => Promise<void>
}> = ({ onClose, onConfirm }) => {
  const css = styles()
  const targetsQuery = useAllTargets()

  const years = [
    ...new Set(
      (targetsQuery.data ?? [])
        .map((target) => target.targetYear)
    ),
  ].sort((left, right) => left - right)

  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState<string>(
    String(new Date().getMonth() + 1)
  )
  const [saving, setSaving] = useState(false)

  const validYear = years.includes(year)
  const selectedMonth: BatchMonth =
    month === 'all' ? 'all' : Number(month)

  const confirm = async () => {
    if (!validYear) {
      return
    }

    setSaving(true)

    try {
      await onConfirm(year, selectedMonth)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog
      open
      onOpenChange={(_event, data) => {
        if (!data.open && !saving) {
          onClose()
        }
      }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Batch add Volume & PAC</DialogTitle>

          <DialogContent>
            <div className={css.field}>
              <Label htmlFor="batch-volume-pac-year">
                Year
              </Label>

              <Select
                id="batch-volume-pac-year"
                aria-label="Year"
                value={validYear ? String(year) : ''}
                disabled={saving || targetsQuery.isLoading}
                onChange={(_event, data) => {
                  setYear(Number(data.value))
                }}
              >
                <option value="">Select year</option>

                {years.map((option) => (
                  <option
                    key={option}
                    value={String(option)}
                  >
                    {option}
                  </option>
                ))}
              </Select>
            </div>

            <div className={css.field}>
              <Label htmlFor="batch-volume-pac-month">
                Month
              </Label>

              <Select
                id="batch-volume-pac-month"
                value={month}
                disabled={saving}
                onChange={(_event, data) => {
                  setMonth(data.value)
                }}
              >
                <option value="all">All</option>

                {months.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              {month === 'all'
                ? 'Missing Plant and Production Line combinations will be created for all 12 months of the selected year. Existing records will not be changed.'
                : 'Missing Plant and Production Line combinations will be created for the selected month. Existing records will not be changed.'}
            </div>
          </DialogContent>

          <DialogActions>
            <Button
              appearance="secondary"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </Button>

            <Button
              appearance="primary"
              onClick={() => void confirm()}
              disabled={
                saving ||
                !validYear ||
                targetsQuery.isLoading ||
                targetsQuery.isError
              }
            >
              {saving
                ? month === 'all'
                  ? 'Creating full year...'
                  : 'Creating...'
                : 'Confirm'}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

const BatchMonthlyReportDialog: React.FC<{ onClose: () => void; onConfirm: (year: number, month: number) => Promise<void> }> = ({ onClose, onConfirm }) => {
    const css = styles();
    const targetsQuery = useAllTargets();
    const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear))].sort((left, right) => left - right);
    const [year, setYear] = useState(new Date().getFullYear());
    const validYear = years.includes(year);
    const [month, setMonth] = useState(String(new Date().getMonth() + 1));
    const [saving, setSaving] = useState(false);
    const confirm = async () => {
        if (!validYear) return;
        setSaving(true);
        try {
            await onConfirm(year, Number(month));
            onClose();
        } finally {
            setSaving(false);
        }
    };
    return <Dialog open onOpenChange={(_event, data) => !data.open && onClose()}><DialogSurface><DialogBody><DialogTitle>Batch add Monthly Reports</DialogTitle><DialogContent><div className={css.field}><Label>Year</Label><Select aria-label="Year" value={validYear ? String(year) : ''} disabled={saving || targetsQuery.isLoading} onChange={(_event, data) => setYear(Number(data.value))}><option value="">Select year</option>{years.map((option) => <option key={option} value={String(option)}>{option}</option>)}</Select></div><div className={css.field}><Label>Month</Label><Select value={month} onChange={(_event, data) => setMonth(data.value)}>{months.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</Select></div><p>Missing Plant, Report Category, Highlights and Lowlights combinations will be created. Existing records will not be changed.</p></DialogContent><DialogActions><Button onClick={onClose} disabled={saving}>Cancel</Button><Button appearance="primary" onClick={() => void confirm()} disabled={saving || !validYear || targetsQuery.isLoading || targetsQuery.isError}>{saving ? 'Creating...' : 'Confirm'}</Button></DialogActions></DialogBody></DialogSurface></Dialog>;
};

const DialogForm: React.FC<{ tab: AdminTab; item?: AdminItem; onClose: () => void; onSave: (item: AdminItem) => Promise<void>; plants: Plant[]; kpis: KpiDefinition[]; lines: ProductionLine[]; aeCategories: AeCategory[]; reportCategories: ReportCategory[] }> = ({ tab, item, onClose, onSave, plants, kpis, lines, aeCategories, reportCategories }) => {
  const css = styles();
    const [values, setValues] = useState<Record<string, string>>(() => {
        const currentDate = new Date();
        const record = item as unknown as Record<string, unknown> | undefined;
        return Object.fromEntries(columns[tab].map((field) => {
            const sourceField = lookupField(field);
            const defaultValue = !item && sourceField === 'year'
                ? currentDate.getFullYear()
                : !item && sourceField === 'month'
                    ? currentDate.getMonth() + 1
                    : '';
            return [sourceField, String(record?.[sourceField] ?? defaultValue)];
        }));
    });
  const [lookupQueries, setLookupQueries] = useState<Record<string, string>>({});
  const update = (field: string, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const optionsFor = (field: string) => field === 'plantName' ? plants : field === 'kpiName' ? kpis : field === 'productionLineName' ? lines : tab === 'ae' ? aeCategories : reportCategories;
  const save = async () => {
    const parsed: Record<string, unknown> = { ...(item as unknown as Record<string, unknown> | undefined), ...values };
        ['displayOrder', 'targetYear', 'month', 'year', 'pyActual', 'cyTarget', 'value', 'volume', 'forecast', 'pac'].forEach((field) => {
            if (!(field in parsed)) return;
            parsed[field] = parsed[field] === '' && ['pyActual', 'cyTarget', 'value', 'volume', 'forecast', 'pac'].includes(field)
                ? null
                : Number(parsed[field]);
        });
    await onSave(parsed as unknown as AdminItem); onClose();
  };
    return (
    <Dialog
        open
        onOpenChange={(_event, data) => {
        if (!data.open) {
            onClose();
        }
        }}
    >
        <DialogSurface>
        <DialogBody>
            <DialogTitle>
            {item ? 'Edit' : 'Add'} record
            </DialogTitle>

            <DialogContent>
            {columns[tab]
                .filter(
                (field) =>
                    field !== 'id' &&
                    field !== 'mainName' &&
                    field !== 'kpiUnit',
                )
                .map((field) => {
                const sourceField = lookupField(field);
                const isLookup = sourceField !== field;

                if (isLookup) {
                    const options = optionsFor(field);

                    const selectedName = lookupName(
                    options,
                    values[sourceField],
                    );

                    const query =
                    lookupQueries[field] ??
                    (selectedName === 'N/A'
                        ? ''
                        : selectedName);

                    const normalizedQuery = query
                    .trim()
                    .toLocaleLowerCase();

                    const matchingOptions = options.filter(
                    (option) =>
                        option.name
                        .toLocaleLowerCase()
                        .includes(normalizedQuery),
                    );

                    return (
                    <div
                        className={css.field}
                        key={field}
                    >
                        <Label>
                        {labels[field] ?? field}
                        </Label>

                        <Combobox
                        placeholder="Search and select"
                        value={query}
                        selectedOptions={
                            values[sourceField]
                            ? [values[sourceField]]
                            : []
                        }
                        onChange={(event) => {
                            const nextQuery =
                            event.currentTarget?.value ?? '';

                            setLookupQueries((current) => ({
                            ...current,
                            [field]: nextQuery,

                            }));
                        }}
                        onOptionSelect={(_event, data) => {
                            const selectedId =
                            data.optionValue ?? '';

                            const selectedOption =
                            options.find(
                                (entry) =>
                                entry.id === selectedId,
                            );

                            update(
                            sourceField,
                            selectedId,
                            );

                            setLookupQueries(
                            (current) => ({
                                ...current,
                                [field]:

                                selectedOption?.name ?? '',
                            }),
                            );
                        }}
                        >
                        {matchingOptions.map((option) => (
                            <Option
                            key={option.id}
                            value={option.id}
                            text={option.name}
                            >
                            {option.name}
                            </Option>
                        ))}
                        </Combobox>
                    </div>
                    );
                }

                if (field === 'type') {
                    const typeOptions = tab === 'productionKpiMatrices'
                        ? Object.values(Apma_pmtproductionkpimatrixesapma_type)
                        : Object.values(ReportType);
                    return (
                    <div
                        className={css.field}
                        key={field}
                    >
                        <Label>
                        {labels[field]}
                        </Label>

                        <Select
                        value={values.type ?? ''}
                        onChange={(_event, data) => {
                            update('type', data.value);
                        }}
                        >
                        <option value="">
                            Select type
                        </option>
                        {typeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </Select>
                    </div>
                    );
                }

                if (field === 'productionClass') {
                    return <div className={css.field} key={field}>
                        <Label htmlFor="production-class">{labels[field]}</Label>
                        <Select id="production-class" value={values.productionClass ?? ''} onChange={(_event, data) => update('productionClass', data.value)}>
                            <option value="">Select Production Class</option>
                            {Object.values(Apma_pmtproductionkpimatrixesapma_productionclass).map((option) => <option key={option} value={option}>{option === 'FPYFG' ? 'FPY FG' : option}</option>)}
                        </Select>
                    </div>;
                }

                if (field === 'kpiLogic') {
                    return (
                    <div
                        className={css.field}
                        key={field}
                    >
                        <Label>
                        {labels[field]}
                        </Label>

                        <Select
                        value={values.kpiLogic ?? ''}
                        onChange={(_event, data) => {
                            update('kpiLogic', data.value);
                        }}
                        >
                        <option value="">
                            Select KPI Logic
                        </option>
                        {Object.values(Apma_pmtkpidefinitionsesapma_kpilogic).map((logic) => (
                            <option key={logic} value={logic}>
                            {logic}
                            </option>
                        ))}
                        </Select>
                    </div>
                    );
                }

                if (field === 'month') {
                    return (
                    <div
                        className={css.field}
                        key={field}
                    >
                        <Label>
                        {labels[field]}
                        </Label>

                        <Select
                        value={values.month ?? ''}
                        onChange={(_event, data) => {
                            update('month', data.value);
                        }}
                        >
                        <option value="">
                            Select month
                        </option>

                        {months.map((month) => (
                            <option
                            key={month.value}
                            value={month.value}
                            >
                            {month.label}
                            </option>
                        ))}
                        </Select>
                    </div>
                    );
                }

                return (
                    <div
                    className={css.field}
                    key={field}
                    >
                    <Label>
                        {labels[field] ?? field}
                    </Label>

                    <Input
                        value={values[sourceField] ?? ''}
                        onChange={(_event, data) => {
                        update(
                            sourceField,
                            data.value,
                        );
                        }}
                    />
                    </div>
                );
                })}
            </DialogContent>

            <DialogActions>
            <Button onClick={onClose}>
                Cancel
            </Button>

            <Button
                appearance="primary"
                icon={<Save24Regular />}
                onClick={() => void save()}
            >
                Save
            </Button>
            </DialogActions>
        </DialogBody>
        </DialogSurface>
    </Dialog>
    );
//   return <Dialog open onOpenChange={(_event, data) => !data.open && onClose()}><DialogSurface><DialogBody><DialogTitle>{item ? 'Edit' : 'Add'} record</DialogTitle><DialogContent>{columns[tab].filter((field) => field !== 'id' && field !== 'mainName').map((field) => { const sourceField = lookupField(field); const isLookup = sourceField !== field; if (isLookup) { const options = optionsFor(field); const selectedName = lookupName(options, values[sourceField]); const query = lookupQueries[field] ?? (selectedName === 'N/A' ? '' : selectedName); const matchingOptions = options.filter((option) => option.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())); return <div className={css.field} key={field}><Label>{labels[field] ?? field}</Label><Combobox placeholder="Search and select" value={query} onChange={(event) => setLookupQueries((current) => ({ ...current, [field]: event.currentTarget.value }))} onOptionSelect={(_event, data) => { const option = options.find((entry) => entry.id === data.optionValue); update(sourceField, data.optionValue ?? ''); setLookupQueries((current) => ({ ...current, [field]: option?.name ?? '' })); }}>{matchingOptions.map((option) => <Option key={option.id} value={option.id} text={option.name}>{option.name}</Option>)}</Combobox></div>; } if (field === 'month') return <div className={css.field} key={field}><Label>{labels[field]}</Label><Select value={values.month ?? ''} onChange={(_event, data) => update('month', data.value)}><option value="">Select month</option>{months.map((month) => <option key={month.value} value={month.value}>{month.label}</option>)}</Select></div>; return <div className={css.field} key={field}><Label>{labels[field] ?? field}</Label><Input value={values[sourceField] ?? ''} onChange={(_event, data) => update(sourceField, data.value)} /></div>; })}</DialogContent><DialogActions><Button onClick={onClose}>Cancel</Button><Button appearance="primary" icon={<Save24Regular />} onClick={() => void save()}>Save</Button></DialogActions></DialogBody></DialogSurface></Dialog>;
};

export const AdministrationPage: React.FC<{ mode?: 'configuration' | 'basic' }> = ({ mode = 'configuration' }) => {
    const css = styles(); const currentYear = new Date().getFullYear(); const previousPeriod = getPreviousPeriod(); const [tab, setTab] = useState<AdminTab>(mode === 'configuration' ? 'plants' : 'targets'); const [dialog, setDialog] = useState<{ item?: AdminItem } | null>(null); const [batchTargetDialog, setBatchTargetDialog] = useState(false); const [batchAeDialog, setBatchAeDialog] = useState(false); const [batchVolumePacDialog, setBatchVolumePacDialog] = useState(false); const [targetEditing, setTargetEditing] = useState(false); const [targetEditingIds, setTargetEditingIds] = useState<string[]>([]); const [targetDrafts, setTargetDrafts] = useState<Record<string, { pyActual: string; cyTarget: string }>>({}); const [aeEditing, setAeEditing] = useState(false); const [aeEditingIds, setAeEditingIds] = useState<string[]>([]); const [aeDrafts, setAeDrafts] = useState<Record<string, string>>({}); const [volumePacEditing, setVolumePacEditing] = useState(false); const [volumePacEditingIds, setVolumePacEditingIds] = useState<string[]>([]); const [volumePacDrafts, setVolumePacDrafts] = useState<Record<string, { volume: string; forecast: string; pac: string }>>({}); const [tableFilters, setTableFilters] = useState<Record<string, string[]>>({ 'targets:targetYear': [String(currentYear)], 'ae:year': [String(previousPeriod.year)], 'ae:month': [String(previousPeriod.month)], 'volumePac:year': [String(previousPeriod.year)], 'volumePac:month': [String(previousPeriod.month)], 'monthlyReports:year': [String(previousPeriod.year)], 'monthlyReports:month': [String(previousPeriod.month)] });
    const [batchMonthlyReportDialog, setBatchMonthlyReportDialog] = useState(false);
    const [monthlyReportEditing, setMonthlyReportEditing] = useState(false);
    const [monthlyReportEditingIds, setMonthlyReportEditingIds] = useState<string[]>([]);
    const [monthlyReportDrafts, setMonthlyReportDrafts] = useState<Record<string, string>>({});
    const kpiMatricesQ = useProductionKpiMatrices(tab === 'productionKpiMatrices');
    const plantsQ = usePlants(); const kpisQ = useKpiDefinitions(); const categoriesQ = useReportCategories(); const aeCategoriesQ = useAeCategories(); const linesQ = useProductionLines(); const matricesQ = useProductionLineMatrices(); const targetsQ = useTargets(currentYear); const allTargetsQ = useAllTargets(); const aeQ = useAllAe(); const volumeQ = useAllVolumePac(); const reportsQ = useAllMonthlyReports();
  const plantM = usePlantMutations(); const kpiM = useKpiDefinitionMutations(); const categoryM = useReportCategoryMutations(); const targetM = useTargetMutations(); const chartM = useChartAdminMutations(); const reportM = useMonthlyReportMutations();
  const plants = useMemo(() => plantsQ.data ?? [], [plantsQ.data]); const kpis = useMemo(() => kpisQ.data ?? [], [kpisQ.data]); const categories = useMemo(() => aeCategoriesQ.data ?? [], [aeCategoriesQ.data]); const lines = useMemo(() => linesQ.data ?? [], [linesQ.data]); const reportCategories = useMemo(() => categoriesQ.data ?? [], [categoriesQ.data]);
    const data: Record<AdminTab, AdminItem[]> = { plants, kpis, reportCategories, aeCategories: categories, productionLines: lines, productionLineMatrices: matricesQ.data ?? [], productionKpiMatrices: kpiMatricesQ.data ?? [], targets: allTargetsQ.data ?? [], ae: aeQ.data ?? [], volumePac: volumeQ.data ?? [], monthlyReports: reportsQ.data ?? [] };
    const valuesAsOptions = (items: AdminItem[], field: string) => { const sourceItems = field === 'year' ? (allTargetsQ.data ?? []) : items; const sourceField = field === 'year' ? 'targetYear' : field; const values = sourceItems.map((item) => String((item as unknown as Record<string, unknown>)[sourceField] ?? '')).filter(Boolean); if (field === 'year') values.push(String(currentYear), String(previousPeriod.year)); return [...new Set(values)].sort((left, right) => left.localeCompare(right, undefined, { numeric: true })).map((value) => ({ value, label: field === 'month' ? months.find((month) => month.value === value)?.label ?? value : value })); };
    const tableFilterDefinitions: TableFilter[] = tab === 'targets' ? [{ key: 'targetYear', label: 'Target Year', recordField: 'targetYear', options: valuesAsOptions(data.targets, 'targetYear') }, { key: 'plantId', label: 'Plant Name', recordField: 'plantId', options: plants.map((plant) => ({ value: plant.id, label: plant.name })) }] : tab === 'ae' ? [{ key: 'year', label: 'Year', recordField: 'year', options: valuesAsOptions(data.ae, 'year') }, { key: 'month', label: 'Month', recordField: 'month', options: months }, { key: 'plantId', label: 'Plant Name', recordField: 'plantId', options: plants.map((plant) => ({ value: plant.id, label: plant.name })) }, { key: 'productionLineId', label: 'Production Line', recordField: 'productionLineId', options: lines.map((line) => ({ value: line.id, label: line.name })) }] : tab === 'volumePac' ? [{ key: 'year', label: 'Year', recordField: 'year', options: valuesAsOptions(data.volumePac, 'year') }, { key: 'month', label: 'Month', recordField: 'month', options: months }, { key: 'plantId', label: 'Plant Name', recordField: 'plantId', options: plants.map((plant) => ({ value: plant.id, label: plant.name })) }, { key: 'productionLineId', label: 'Production Line', recordField: 'productionLineId', options: lines.map((line) => ({ value: line.id, label: line.name })) }] : tab === 'monthlyReports' ? [{ key: 'year', label: 'Year', recordField: 'year', options: valuesAsOptions(data.monthlyReports, 'year') }, { key: 'month', label: 'Month', recordField: 'month', options: months }, { key: 'plantId', label: 'Plant Name', recordField: 'plantId', options: plants.map((plant) => ({ value: plant.id, label: plant.name })) }, { key: 'categoryId', label: 'Category', recordField: 'categoryId', options: reportCategories.map((category) => ({ value: category.id, label: category.name })) }, { key: 'type', label: 'Type', recordField: 'type', options: valuesAsOptions(data.monthlyReports, 'type') }] : [];
        const filteredRows = data[tab].filter((item) => tableFilterDefinitions.every((filter) => { const selected = tableFilters[`${tab}:${filter.key}`] ?? []; return selected.length === 0 || selected.includes(String((item as unknown as Record<string, unknown>)[filter.recordField] ?? '')); }));
        const displayOrderOf = (items: Array<{ id: string; displayOrder: number }>, id: unknown) => items.find((entry) => entry.id === id)?.displayOrder ?? Number.MAX_SAFE_INTEGER;
        const compareAscending = (left: unknown, right: unknown) => Number(left ?? Number.MAX_SAFE_INTEGER) - Number(right ?? Number.MAX_SAFE_INTEGER);
        const sortedRows = [...filteredRows].sort((left, right) => {
            const first = left as unknown as Record<string, unknown>;
            const second = right as unknown as Record<string, unknown>;
            if (tab === 'productionKpiMatrices') {
                const normalizeId = (id: unknown) => String(id ?? '').replace(/[{}]/g, '').trim().toLowerCase();
                const plantOrder = (id: unknown) => plants.find((plant) => normalizeId(plant.id) === normalizeId(id))?.displayOrder ?? Number.MAX_SAFE_INTEGER;
                return compareAscending(plantOrder(first.plantId), plantOrder(second.plantId))
                    || compareAscending(first.displayOrder, second.displayOrder)
                    || String(first.mainName ?? '').localeCompare(String(second.mainName ?? ''));
            }
            const comparisons = tab === 'targets'
                ? [compareAscending(first.targetYear, second.targetYear), compareAscending(displayOrderOf(plants, first.plantId), displayOrderOf(plants, second.plantId)), compareAscending(displayOrderOf(kpis, first.kpiId), displayOrderOf(kpis, second.kpiId))]
                : tab === 'ae'
                    ? [compareAscending(first.year, second.year), compareAscending(first.month, second.month), compareAscending(displayOrderOf(plants, first.plantId), displayOrderOf(plants, second.plantId)), compareAscending(displayOrderOf(lines, first.productionLineId), displayOrderOf(lines, second.productionLineId)), compareAscending(displayOrderOf(categories, first.categoryId), displayOrderOf(categories, second.categoryId))]
                    : tab === 'volumePac'
                        ? [compareAscending(first.year, second.year), compareAscending(first.month, second.month), compareAscending(displayOrderOf(plants, first.plantId), displayOrderOf(plants, second.plantId)), compareAscending(displayOrderOf(lines, first.productionLineId), displayOrderOf(lines, second.productionLineId))]
                        : tab === 'monthlyReports'
                            ? [compareAscending(first.year, second.year), compareAscending(first.month, second.month), compareAscending(displayOrderOf(plants, first.plantId), displayOrderOf(plants, second.plantId)), compareAscending(displayOrderOf(reportCategories, first.categoryId), displayOrderOf(reportCategories, second.categoryId)), (first.type === 'Highlights' ? 0 : 1) - (second.type === 'Highlights' ? 0 : 1)]
                            : [];
            return comparisons.find((comparison) => comparison !== 0) ?? 0;
        });
    const queries = [plantsQ, kpisQ, categoriesQ, aeCategoriesQ, linesQ, matricesQ, ...(tab === 'productionKpiMatrices' ? [kpiMatricesQ] : []), targetsQ, allTargetsQ, aeQ, volumeQ, reportsQ]; const error = queries.find((query) => query.error)?.error; const loading = queries.some((query) => query.isLoading);
    const display = (item: AdminItem, field: string) => { const record = item as unknown as Record<string, unknown>; if (field === 'plantName') return lookupName(plants, record.plantId); if (field === 'kpiName') return lookupName(kpis, record.kpiId); if (field === 'kpiUnit') return kpis.find((kpi) => kpi.id === record.kpiId)?.unit ?? ''; if (field === 'productionLineName') return lookupName(lines, record.productionLineId); if (field === 'categoryName') return lookupName(tab === 'ae' ? categories : reportCategories, record.categoryId); const value = record[field]; if (tab === 'volumePac' && ['volume', 'forecast', 'pac'].includes(field) && typeof value === 'number') return value.toFixed(2); return String(value ?? ''); };
    const save = async (item: AdminItem) => {
        if (tab === 'plants') {
            const value = item as Plant;
            await (value.id ? plantM.update.mutateAsync({ id: value.id, changes: value }) : plantM.create.mutateAsync(value));
        } else if (tab === 'kpis') {
            const value = item as KpiDefinition;
            await (value.id ? kpiM.update.mutateAsync({ id: value.id, changes: value }) : kpiM.create.mutateAsync(value));
        } else if (tab === 'reportCategories') {
            const value = item as ReportCategory;
            await (value.id ? categoryM.update.mutateAsync({ id: value.id, changes: value }) : categoryM.create.mutateAsync(value));
        } else if (tab === 'targets') {
            const value = item as Target;
            if (value.id) {
                await targetM.update.mutateAsync({ id: value.id, changes: value });
            } else {
                await targetM.create.mutateAsync({ targetYear: value.targetYear, plantId: value.plantId, kpiId: value.kpiId, pyActual: value.pyActual, cyTarget: value.cyTarget });
                setTableFilters((current) => ({ ...current, 'targets:targetYear': [String(value.targetYear)] }));
            }
        } else if (tab === 'aeCategories') {
            const value = item as AeCategory;
            await (value.id ? chartM.updateCategory.mutateAsync({ id: value.id, value }) : chartM.createCategory.mutateAsync(value));
        } else if (tab === 'productionLines') {
            const value = item as ProductionLine;
            await (value.id ? chartM.updateLine.mutateAsync({ id: value.id, value }) : chartM.createLine.mutateAsync(value));
        } else if (tab === 'productionLineMatrices') {
            const value = item as ProductionLineMatrix;
            const payload = { plantId: value.plantId, productionLineId: value.productionLineId, displayOrder: value.displayOrder };
            await (value.id ? chartM.updateMatrix.mutateAsync({ id: value.id, value: payload }) : chartM.createMatrix.mutateAsync(payload));
        } else if (tab === 'productionKpiMatrices') {
            const value = item as ProductionKpiMatrix;
            const payload = { plantId: value.plantId, type: value.type, categories: value.categories, productionClass: value.productionClass, displayOrder: value.displayOrder };
            await (value.id ? chartM.updateKpiMatrix.mutateAsync({ id: value.id, value: payload }) : chartM.createKpiMatrix.mutateAsync(payload));
        } else if (tab === 'ae') {
            const value = item as AeRecord;
            if (value.id) {
                await chartM.updateAe.mutateAsync({ id: value.id, value });
            } else {
                await chartM.createAe.mutateAsync({ year: value.year, month: value.month, plantId: value.plantId, productionLineId: value.productionLineId, categoryId: value.categoryId, value: value.value });
                setTableFilters((current) => ({ ...current, 'ae:year': [String(value.year)] }));
            }
        } else if (tab === 'volumePac') {
            const value = item as VolumePacRecord;
            if (value.id) {
                await chartM.updateVolumePac.mutateAsync({ id: value.id, value });
            } else {
                await chartM.createVolumePac.mutateAsync({ year: value.year, month: value.month, plantId: value.plantId, productionLineId: value.productionLineId, volume: value.volume, forecast: value.forecast, pac: value.pac });
                setTableFilters((current) => ({ ...current, 'volumePac:year': [String(value.year)] }));
            }
        } else {
            const value = item as MonthlyReport;
            if (value.id) {
                await reportM.update.mutateAsync({ id: value.id, changes: value });
            } else {
                await reportM.create.mutateAsync({ year: value.year, month: value.month, plantId: value.plantId, categoryId: value.categoryId, type: value.type, content: value.content, displayOrder: value.displayOrder ?? 1 });
                setTableFilters((current) => ({ ...current, 'monthlyReports:year': [String(value.year)] }));
            }
        }
    };
    const remove = async (item: AdminItem) => { if (tab === 'plants') await plantM.remove.mutateAsync(item.id); else if (tab === 'kpis') await kpiM.remove.mutateAsync(item.id); else if (tab === 'reportCategories') await categoryM.remove.mutateAsync(item.id); else if (tab === 'targets') await targetM.remove.mutateAsync(item.id); else if (tab === 'aeCategories') await chartM.deleteCategory.mutateAsync(item.id); else if (tab === 'productionLines') await chartM.deleteLine.mutateAsync(item.id); else if (tab === 'productionLineMatrices') await chartM.deleteMatrix.mutateAsync(item.id); else if (tab === 'productionKpiMatrices') await chartM.deleteKpiMatrix.mutateAsync(item.id); else if (tab === 'ae') await chartM.deleteAe.mutateAsync(item.id); else if (tab === 'volumePac') await chartM.deleteVolumePac.mutateAsync(item.id); else await reportM.remove.mutateAsync(item.id); };
    const createMissingTargets = async (year: number) => {
        await targetM.createMissing.mutateAsync({ year, plants, kpis, existing: allTargetsQ.data ?? [] });
        setTableFilters((current) => ({ ...current, 'targets:targetYear': [String(year)] }));
    };
    const startTargetEditing = () => {
        setTargetEditingIds(sortedRows.map((item) => item.id));
        setTargetDrafts(Object.fromEntries(sortedRows.map((item) => {
            const target = item as Target;
            return [target.id, { pyActual: target.pyActual == null ? '' : String(target.pyActual), cyTarget: target.cyTarget == null ? '' : String(target.cyTarget) }];
        })));
        setTargetEditing(true);
    };
    const updateTargetDraft = (id: string, field: 'pyActual' | 'cyTarget', value: string) => setTargetDrafts((current) => ({ ...current, [id]: { ...current[id], [field]: value } }));
    const saveTargetDrafts = async () => {
        const parse = (value: string) => value.trim() === '' ? null : Number(value);
        const targetsById = new Map((allTargetsQ.data ?? []).map((target) => [target.id, target]));
        const updates = targetEditingIds.flatMap((id) => {
            const target = targetsById.get(id);
            if (!target) return [];
            const draft = targetDrafts[target.id] ?? { pyActual: '', cyTarget: '' };
            const pyActual = parse(draft.pyActual);
            const cyTarget = parse(draft.cyTarget);
            if (pyActual === (target.pyActual ?? null) && cyTarget === (target.cyTarget ?? null)) return [];
            return [{ id: target.id, pyActual, cyTarget }];
        });
        if (updates.length > 0) await targetM.updateValues.mutateAsync(updates);
        setTargetEditing(false);
        setTargetEditingIds([]);
        setTargetDrafts({});
    };
    const createMissingAe = async (year: number, month: number) => {
        await chartM.createMissingAe.mutateAsync({ year, month, plants, matrices: matricesQ.data ?? [], categories, existing: aeQ.data ?? [] });
        setTableFilters((current) => ({ ...current, 'ae:year': [String(year)], 'ae:month': [String(month)] }));
    };
    const startAeEditing = () => {
        setAeEditingIds(sortedRows.map((item) => item.id));
        setAeDrafts(Object.fromEntries(sortedRows.map((item) => {
            const record = item as AeRecord;
            return [record.id, record.value == null ? '' : String(record.value)];
        })));
        setAeEditing(true);
    };
    const saveAeDrafts = async () => {
        const recordsById = new Map((aeQ.data ?? []).map((record) => [record.id, record]));
        const updates = aeEditingIds.flatMap((id) => {
            const record = recordsById.get(id);
            if (!record) return [];
            const draft = aeDrafts[id] ?? '';
            const value = draft.trim() === '' ? null : Number(draft);
            return value === record.value ? [] : [{ record, value }];
        });
        if (updates.length > 0) await chartM.updateAeValues.mutateAsync(updates);
        setAeEditing(false);
        setAeEditingIds([]);
        setAeDrafts({});
    };

    const createMissingVolumePac = async (
    year: number,
    month: BatchMonth
    ) => {
    const selectedMonths =
        month === 'all'
        ? Array.from({ length: 12 }, (_value, index) => index + 1)
        : [month]

    const existingRecords = volumeQ.data ?? []

    for (const selectedMonth of selectedMonths) {
        await chartM.createMissingVolumePac.mutateAsync({
        year,
        month: selectedMonth,
        plants,
        matrices: matricesQ.data ?? [],
        existing: existingRecords,
        })
    }

    setTableFilters((current) => ({
        ...current,
        'volumePac:year': [String(year)],
        'volumePac:month':
        month === 'all'
            ? []
            : [String(month)],
    }))
    }

    const startVolumePacEditing = () => {
        setVolumePacEditingIds(sortedRows.map((item) => item.id));
        setVolumePacDrafts(Object.fromEntries(sortedRows.map((item) => {
            const record = item as VolumePacRecord;
            return [record.id, { volume: record.volume == null ? '' : String(record.volume), forecast: record.forecast == null ? '' : String(record.forecast), pac: record.pac == null ? '' : String(record.pac) }];
        })));
        setVolumePacEditing(true);
    };
    const updateVolumePacDraft = (id: string, field: 'volume' | 'forecast' | 'pac', value: string) => setVolumePacDrafts((current) => ({ ...current, [id]: { ...current[id], [field]: value } }));
    const saveVolumePacDrafts = async () => {
        const parse = (value: string) => value.trim() === '' ? null : Number(value);
        const recordsById = new Map((volumeQ.data ?? []).map((record) => [record.id, record]));
        const updates = volumePacEditingIds.flatMap((id) => {
            const record = recordsById.get(id);
            if (!record) return [];
            const draft = volumePacDrafts[id] ?? { volume: '', forecast: '', pac: '' };
            const volume = parse(draft.volume);
            const forecast = parse(draft.forecast);
            const pac = parse(draft.pac);
            if (volume === record.volume && forecast === record.forecast && pac === record.pac) return [];
            return [{ record, volume, forecast, pac }];
        });
        if (updates.length > 0) await chartM.updateVolumePacValues.mutateAsync(updates);
        setVolumePacEditing(false);
        setVolumePacEditingIds([]);
        setVolumePacDrafts({});
    };
    const createMissingMonthlyReports = async (year: number, month: number) => {
        await reportM.createMissing.mutateAsync({ year, month, plants, categories: reportCategories, existing: reportsQ.data ?? [] });
        setTableFilters((current) => ({ ...current, 'monthlyReports:year': [String(year)], 'monthlyReports:month': [String(month)] }));
    };
    const startMonthlyReportEditing = () => {
        setMonthlyReportEditingIds(sortedRows.map((item) => item.id));
        setMonthlyReportDrafts(Object.fromEntries(sortedRows.map((item) => {
            const report = item as MonthlyReport;
            return [report.id, report.content ?? ''];
        })));
        setMonthlyReportEditing(true);
    };
    const saveMonthlyReportDrafts = async () => {
        const reportsById = new Map((reportsQ.data ?? []).map((report) => [report.id, report]));
        const updates = monthlyReportEditingIds.flatMap((id) => {
            const report = reportsById.get(id);
            if (!report) return [];
            const content = monthlyReportDrafts[id] ?? '';
            return content === report.content ? [] : [{ id, content }];
        });
        if (updates.length > 0) await reportM.updateContents.mutateAsync(updates);
        setMonthlyReportEditing(false);
        setMonthlyReportEditingIds([]);
        setMonthlyReportDrafts({});
    };
    const renderCell = (item: AdminItem, field: string) => {
        if (tab === 'targets' && targetEditing && targetEditingIds.includes(item.id) && (field === 'pyActual' || field === 'cyTarget')) {
            const target = item as Target;
            return <Input type="number" value={targetDrafts[target.id]?.[field] ?? ''} onChange={(_event, data) => updateTargetDraft(target.id, field, data.value)} />;
        }
        if (tab === 'ae' && aeEditing && aeEditingIds.includes(item.id) && field === 'value') {
            return <Input type="number" value={aeDrafts[item.id] ?? ''} onChange={(_event, data) => setAeDrafts((current) => ({ ...current, [item.id]: data.value }))} />;
        }
        if (tab === 'volumePac' && volumePacEditing && volumePacEditingIds.includes(item.id) && (field === 'volume' || field === 'forecast' || field === 'pac')) {
            return <Input type="number" step="0.01" value={volumePacDrafts[item.id]?.[field] ?? ''} onChange={(_event, data) => updateVolumePacDraft(item.id, field, data.value)} />;
        }
        if (tab === 'monthlyReports' && monthlyReportEditing && monthlyReportEditingIds.includes(item.id) && field === 'content') {
            return <Textarea resize="vertical" value={monthlyReportDrafts[item.id] ?? ''} onChange={(_event, data) => setMonthlyReportDrafts((current) => ({ ...current, [item.id]: data.value }))} />;
        }
        return display(item, field);
    };
    const tabList = mode === 'configuration' ? [['plants', 'PMT Plants'], ['kpis', 'KPI Definitions'], ['reportCategories', 'Report Categories'], ['aeCategories', 'AE Categories'], ['productionLines', 'Production Lines'], ['productionLineMatrices', 'Production Line Matrix'], ['productionKpiMatrices', 'Production KPI Matrix']] : [['targets', 'Targets'], ['ae', 'AE'], ['volumePac', 'Volume & PAC'], ['monthlyReports', 'Monthly Reports']];
    const inlineEditing = targetEditing || aeEditing || volumePacEditing || monthlyReportEditing;
    return <div className={css.page}>
        <PageHeader title={mode === 'configuration' ? 'Configuration' : 'Basic Data Management'} subtitle="Add, edit and delete Dataverse records" />
        <TabList className={css.tabs} selectedValue={tab} onTabSelect={(_event, selected) => setTab(selected.value as AdminTab)}>{tabList.map(([value, label]) => <Tab key={value} value={value}>{label}</Tab>)}</TabList>
        {mode === 'basic' && tableFilterDefinitions.length > 0 ? <div className={css.filters}>{tableFilterDefinitions.map((filter) => <SearchMultiSelect key={`${tab}:${filter.key}`} label={filter.label} options={filter.options} selected={tableFilters[`${tab}:${filter.key}`] ?? []} onChange={(selected) => setTableFilters((current) => ({ ...current, [`${tab}:${filter.key}`]: selected }))} disabled={inlineEditing} />)}</div> : null}
        {error ? <ErrorState message={error instanceof Error ? error.message : 'Administration data could not be loaded.'} /> : null}
        {loading ? <LoadingSkeleton rows={4} /> : null}
        {!loading && !error ? <>
            <div className={css.toolbar}><span /><div className={css.toolbarActions}>
                {tab === 'targets' ? <><Button onClick={() => setBatchTargetDialog(true)} disabled={targetEditing}>Batch Add</Button><Button icon={<Edit24Regular />} onClick={startTargetEditing} disabled={targetEditing || targetM.updateValues.isPending}>Edit</Button><Button icon={<Save24Regular />} onClick={() => void saveTargetDrafts()} disabled={!targetEditing || targetM.updateValues.isPending}>{targetM.updateValues.isPending ? 'Saving...' : 'Save'}</Button></> : null}
                {tab === 'ae' ? <><Button onClick={() => setBatchAeDialog(true)} disabled={aeEditing}>Batch Add</Button><Button icon={<Edit24Regular />} onClick={startAeEditing} disabled={aeEditing || chartM.updateAeValues.isPending}>Edit</Button><Button icon={<Save24Regular />} onClick={() => void saveAeDrafts()} disabled={!aeEditing || chartM.updateAeValues.isPending}>{chartM.updateAeValues.isPending ? 'Saving...' : 'Save'}</Button></> : null}
                {tab === 'volumePac' ? <><Button onClick={() => setBatchVolumePacDialog(true)} disabled={volumePacEditing}>Batch Add</Button><Button icon={<Edit24Regular />} onClick={startVolumePacEditing} disabled={volumePacEditing || chartM.updateVolumePacValues.isPending}>Edit</Button><Button icon={<Save24Regular />} onClick={() => void saveVolumePacDrafts()} disabled={!volumePacEditing || chartM.updateVolumePacValues.isPending}>{chartM.updateVolumePacValues.isPending ? 'Saving...' : 'Save'}</Button></> : null}
                {tab === 'monthlyReports' ? <><Button onClick={() => setBatchMonthlyReportDialog(true)} disabled={monthlyReportEditing}>Batch Add</Button><Button icon={<Edit24Regular />} onClick={startMonthlyReportEditing} disabled={monthlyReportEditing || reportM.updateContents.isPending}>Edit</Button><Button icon={<Save24Regular />} onClick={() => void saveMonthlyReportDrafts()} disabled={!monthlyReportEditing || reportM.updateContents.isPending}>{reportM.updateContents.isPending ? 'Saving...' : 'Save'}</Button></> : null}
                <Button appearance="primary" icon={<Add24Regular />} onClick={() => setDialog({})} disabled={inlineEditing}>Add</Button>
            </div></div>
            <Card className={css.scroll}><table className={css.table}><thead className={css.tableHead}><tr>{columns[tab].map((field) => <th className={`${css.cell} ${css.header}`} key={field}>{labels[field] ?? field}</th>)}<th className={`${css.cell} ${css.header}`}>Actions</th></tr></thead><tbody>{sortedRows.map((item) => <tr key={item.id}>{columns[tab].map((field) => <td className={css.cell} key={field}>{renderCell(item, field)}</td>)}<td className={css.cell}><Button icon={<Edit24Regular />} onClick={() => setDialog({ item })} aria-label="Edit" disabled={inlineEditing} /><Button icon={<Delete24Regular />} onClick={() => void remove(item)} aria-label="Delete" disabled={inlineEditing} /></td></tr>)}</tbody></table></Card>
        </> : null}
        {dialog ? <DialogForm tab={tab} item={dialog.item} onClose={() => setDialog(null)} onSave={save} plants={plants} kpis={kpis} lines={lines} aeCategories={categories} reportCategories={reportCategories} /> : null}
        {batchTargetDialog ? <BatchTargetDialog onClose={() => setBatchTargetDialog(false)} onConfirm={createMissingTargets} /> : null}
        {batchAeDialog ? <BatchAeDialog onClose={() => setBatchAeDialog(false)} onConfirm={createMissingAe} /> : null}
        {batchVolumePacDialog ? <BatchVolumePacDialog onClose={() => setBatchVolumePacDialog(false)} onConfirm={createMissingVolumePac} /> : null}
        {batchMonthlyReportDialog ? <BatchMonthlyReportDialog onClose={() => setBatchMonthlyReportDialog(false)} onConfirm={createMissingMonthlyReports} /> : null}
    </div>;
};

``

---

## File: src/pages/ComingSoonPage/ComingSoonPage.tsx

- Size: 870 bytes
- Last modified: 2026-09-11 11:59:50

``tsx
import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, Text, Body1 } from '@fluentui/react-components';

export const ComingSoonPage: React.FC<{ featureName?: string }> = ({ featureName = 'Trend & Insights' }) => {
  return (
    <div>
      <PageHeader
        title={featureName}
        subtitle="This feature module is reserved for future releases"
      />
      <Card style={{ padding: '32px', textAlign: 'center' }}>
        <CardHeader header={<Text weight="semibold" size={500}>{featureName} - Coming Soon</Text>} />
        <Body1 style={{ marginTop: '16px', color: '#64748B' }}>
          Production volume trend charts, material balance analytics, and forecast comparison modules will be added in upcoming project releases.
        </Body1>
      </Card>
    </div>
  );
};

``

---

## File: src/pages/HelpPage/HelpPage.tsx

- Size: 2025 bytes
- Last modified: 2026-09-11 11:59:51

``tsx
import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, Text, Body1, Accordion, AccordionItem, AccordionHeader, AccordionPanel } from '@fluentui/react-components';

export const HelpPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Help & System Guide"
        subtitle="Frequently asked questions and usage rules for PMT Plants Excellence Review System"
      />
      <Card style={{ padding: '24px' }}>
        <CardHeader header={<Text weight="semibold" size={400}>User FAQs</Text>} />
        <Accordion collapsible style={{ marginTop: '16px' }}>
          <AccordionItem value="1">
            <AccordionHeader>How is the completion status calculated on KPI Overview?</AccordionHeader>
            <AccordionPanel>
              <Body1>
                Completion percentage is derived from entered Monthly KPI Results divided by total applicable active KPI Definitions for the selected plant and period.
              </Body1>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionHeader>What is the difference between 0 and Missing data?</AccordionHeader>
            <AccordionPanel>
              <Body1>
                Numeric 0 is a valid entered actual result (e.g. 0 safety incidents). Missing data indicates no result has been recorded yet and is styled with a Grey status.
              </Body1>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionHeader>Who can edit PMT Plants, KPI Definitions, and Targets?</AccordionHeader>
            <AccordionPanel>
              <Body1>
                Only authorized administrators with Dataverse write privileges can access administration tools to update master records.
              </Body1>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

``

---

## File: src/pages/KPIComparisonPage/chartMetrics.ts

- Size: 2516 bytes
- Last modified: 2026-10-04 19:41:36

``typescript
import type { AeCategory, AeRecord, VolumePacRecord } from '../../domain/models/charts';

export interface MonthlyVolumePacPoint {
  month: number;
  label: string;
  volume: number;
  forecast: number;
  pac: number;
}

export interface AeStackPoint {
  plantId: string;
  productionLineId: string;
  values: Record<string, number>;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function aggregateVolumePac(
  records: VolumePacRecord[],
  plantIds: string[],
  productionLineIds: string[],
  annualOperatingPlan: number | null = null,
): MonthlyVolumePacPoint[] {
  const selected = records.filter((record) =>
    (plantIds.length === 0 || plantIds.includes(record.plantId))
    && (productionLineIds.length === 0 || productionLineIds.includes(record.productionLineId)),
  );

  const monthlyPoints = MONTHS.map((label, index) => {
    const month = index + 1;
    return selected.filter((record) => record.month === month).reduce<MonthlyVolumePacPoint>(
      (point, record) => ({
        ...point,
        volume: point.volume + (record.volume ?? 0),
        forecast: point.forecast + (record.forecast ?? 0),
        pac: point.pac + (record.pac ?? 0),
      }),
      { month, label, volume: 0, forecast: 0, pac: 0 },
    );
  });

  return [
    { month: 0, label: 'OP', volume: annualOperatingPlan == null ? 0 : annualOperatingPlan / 12, forecast: 0, pac: 0 },
    ...monthlyPoints,
  ];
}

export function buildAeStacks(
  records: AeRecord[],
  categories: AeCategory[],
  plantIds: string[],
  productionLineIds: string[],
): AeStackPoint[] {
  const selected = records.filter((record) =>
    (plantIds.length === 0 || plantIds.includes(record.plantId))
    && (productionLineIds.length === 0 || productionLineIds.includes(record.productionLineId)),
  );
  const keys = new Set(selected.map((record) => `${record.plantId}:${record.productionLineId}`));

  return [...keys].map((key) => {
    const [plantId, productionLineId] = key.split(':');
    const lineRecords = selected.filter((record) => record.plantId === plantId && record.productionLineId === productionLineId);
    return {
      plantId,
      productionLineId,
      values: Object.fromEntries(categories.map((category) => [
        category.id,
        lineRecords.filter((record) => record.categoryId === category.id).reduce((sum, record) => sum + (record.value ?? 0), 0),
      ])),
    };
  });
}

``

---

## File: src/pages/KPIComparisonPage/comparisonMetrics.ts

- Size: 2505 bytes
- Last modified: 2026-10-04 17:28:15

``typescript
import { KpiStatus } from '../../domain/enums';
import { calculateKpiStatus } from '../../domain/strategies/kpiStatusStrategy';
import type { KpiDefinition, MonthlyKpiResult, Plant, Target } from '../../domain/models';

export interface ComparisonRow {
  plant: Plant;
  kpi: KpiDefinition;
  target?: Target;
  result?: MonthlyKpiResult;
  variance: number | null;
  achievement: number | null;
  status: KpiStatus;
}

export interface ComparisonMatrixRow {
  kpi: KpiDefinition;
  statuses: Record<string, KpiStatus>;
}

export function buildComparisonRows(
  plants: Plant[],
  kpis: KpiDefinition[],
  targets: Target[],
  results: MonthlyKpiResult[],
  plantId: string,
): ComparisonRow[] {
  const targetByPlantAndKpi = new Map(
    targets.map((target) => [`${target.plantId}:${target.kpiId}`, target]),
  );
  const resultByPlantAndKpi = new Map(
    results.map((result) => [`${result.plantId}:${result.kpiId}`, result]),
  );
  const selectedPlants = plantId === 'all' ? plants : plants.filter((plant) => plant.id === plantId);

  return selectedPlants.flatMap((plant) => kpis.map((kpi) => {
    const target = targetByPlantAndKpi.get(`${plant.id}:${kpi.id}`);
    const result = resultByPlantAndKpi.get(`${plant.id}:${kpi.id}`);
    const monthlyActual = result?.monthlyActual;
    const cyTarget = target?.cyTarget;

    return {
      plant,
      kpi,
      target,
      result,
      variance: monthlyActual === null || monthlyActual === undefined || cyTarget === null || cyTarget === undefined
        ? null
        : monthlyActual - cyTarget,
      achievement: result?.ytdActual === null || result?.ytdActual === undefined || !cyTarget
        ? null
        : Math.round((result.ytdActual / cyTarget) * 10000) / 100,
      status: calculateKpiStatus(kpi.kpiLogic, result?.ytdActual, target?.cyTarget),
    };
  }));
}

export function buildComparisonMatrix(
  plants: Plant[],
  kpis: KpiDefinition[],
  results: MonthlyKpiResult[],
): ComparisonMatrixRow[] {
  const resultByPlantAndKpi = new Map(
    results.map((result) => [`${result.plantId}:${result.kpiId}`, result.status]),
  );

  return [...kpis]
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .map((kpi) => ({
      kpi,
      statuses: Object.fromEntries(
        plants.map((plant) => [
          plant.id,
          resultByPlantAndKpi.get(`${plant.id}:${kpi.id}`) ?? KpiStatus.Missing,
        ]),
      ),
    }));
}

``

---

## File: src/pages/KPIComparisonPage/KpiComparisonPage.tsx

- Size: 10357 bytes
- Last modified: 2026-10-08 23:28:49

``tsx
import React, { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  LabelList,
  Line,
  ResponsiveContainer,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardHeader, Caption1, makeStyles, Text, tokens } from '@fluentui/react-components';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { VolumePacFilters, type VolumePacFilterState } from '../../components/filters/VolumePacFilters';
import { useAe, useAeCategories, useKpiDefinitions, usePlants, useProductionLines, useTargets, useVolumePac } from '../../hooks/queries';
import { aggregateVolumePac, buildAeStacks } from './chartMetrics';
import type { MonthlyVolumePacPoint } from './chartMetrics';
import type { AeCategory } from '../../domain/models/charts';
import { getPreviousPeriod } from '../../domain/services/period';

const AE_COLORS = ['#0F6CBD', '#D13438', '#F2C811', '#107C10', '#8764B8', '#00B7C3', '#8E562E', '#69797E'];
const AE_CATEGORY_COLORS: Record<string, string> = {
  oae: '#0070C0',
  uliac: '#FF0000',
  sloac: '#C6E0B4',
  sliac: '#FFC000',
  bo: '#00B050',
};

const getAeCategoryColor = (name: string | undefined, index: number) => {
  const key = name?.replace(/[^a-z]/gi, '').toLowerCase() ?? '';
  return AE_CATEGORY_COLORS[key] ?? AE_COLORS[index % AE_COLORS.length];
};

type VolumeBarShapeProps = React.ComponentProps<typeof Rectangle> & { payload?: { month?: number } };

function VolumeBarShape(props: VolumeBarShapeProps): React.ReactElement {
  const barWidth = Number(props.width ?? 0);
  const horizontalOffset = props.payload?.month === 0 ? barWidth / 2 + 4 : 0;
  return <Rectangle {...props} x={Number(props.x ?? 0) - horizontalOffset} />;
}

const useStyles = makeStyles({
  page: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', gap: tokens.spacingVerticalL },
  dataArea: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', gap: tokens.spacingVerticalL },
  cards: { display: 'grid', gap: tokens.spacingVerticalL },
  plantCard: { padding: tokens.spacingHorizontalL, minWidth: 0 },
  plantName: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightSemibold },
  chartLayout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(240px, 0.8fr) minmax(560px, 2.2fr)',
    gap: tokens.spacingHorizontalL,
    alignItems: 'stretch',
    '@media (max-width: 1100px)': { gridTemplateColumns: '1fr' },
  },
  aeGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: tokens.spacingHorizontalM },
  aeSection: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS, minWidth: 0 },
  aeLegend: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalS },
  legendItem: { display: 'inline-flex', alignItems: 'center', gap: tokens.spacingHorizontalXXS, fontSize: tokens.fontSizeBase200 },
  swatch: { width: '10px', height: '10px', flexShrink: 0 },
  chartPanel: { minWidth: 0, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusSmall, padding: tokens.spacingHorizontalS, backgroundColor: tokens.colorNeutralBackground1 },
  chartTitle: { display: 'block', textAlign: 'center', fontWeight: tokens.fontWeightSemibold, marginTop: tokens.spacingVerticalXS },
  chartHeight: { width: '100%', height: '310px' },
  aeHeight: { width: '100%', height: '275px' },
  note: { color: tokens.colorNeutralForeground3 },
});

export const AeLineChart: React.FC<{
  plantId: string;
  productionLineId: string;
  productionLineName: string;
  values: Record<string, number>;
  categories: AeCategory[];
  showLabels?: boolean;
  exportSize?: { width: number; height: number };
}> = ({ productionLineName, values, categories, showLabels = false, exportSize }) => {
  const styles = useStyles();
  const data = [{ name: 'AE', ...values }];
  return <div className={styles.chartPanel}><div className={styles.aeHeight}><ResponsiveContainer width={exportSize?.width ?? '100%'} height={exportSize?.height ?? '100%'}><BarChart data={data} margin={{ top: 18, right: 12, left: -12, bottom: 4 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" hide /><YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} /><Tooltip formatter={(value, name) => [`${Number(value).toFixed(1)}%`, categories.find((category) => category.id === name)?.name ?? name]} />{showLabels ? <Legend /> : null}{categories.map((category, index) => <Bar key={category.id} dataKey={category.id} stackId="ae" fill={getAeCategoryColor(category.name, index)} name={category.name} isAnimationActive={!showLabels}>{showLabels ? <LabelList dataKey={category.id} position="center" formatter={(value) => Number(value) > 0 ? `${Number(value).toFixed(1)}%` : ''} fill={['#C6E0B4', '#FFC000', '#F2C811'].includes(getAeCategoryColor(category.name, index)) ? '#111111' : '#FFFFFF'} style={{ fontSize: 11 }} /> : null}</Bar>)}</BarChart></ResponsiveContainer></div><Text className={styles.chartTitle}>{productionLineName}</Text></div>;
};

export function VolumePacChart({ data, exportSize }: { data: MonthlyVolumePacPoint[]; exportSize?: { width: number; height: number } }) {
  return <ResponsiveContainer width={exportSize?.width ?? '100%'} height={exportSize?.height ?? '100%'}><ComposedChart data={data} barGap={0} margin={{ top: 18, right: 20, left: 0, bottom: 4 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" /><YAxis unit=" kt" /><Tooltip formatter={(value, name) => [`${Number(value).toFixed(2)} t`, name]} /><Legend /><Bar dataKey="forecast" name="Forecast" fill="#F07A2B" radius={[2, 2, 0, 0]} isAnimationActive={false} /><Bar dataKey="volume" name="Volume" fill="#092B62" radius={[2, 2, 0, 0]} shape={VolumeBarShape} isAnimationActive={false} /><Line dataKey="pac" name="PAC" type="monotone" stroke="#00A651" strokeWidth={3} dot={{ r: 3 }} isAnimationActive={false} /></ComposedChart></ResponsiveContainer>;
}

export const KpiComparisonPage: React.FC = () => {
  const styles = useStyles();
  const previousPeriod = getPreviousPeriod();
  const [filters, setFilters] = useState<VolumePacFilterState>({
    year: previousPeriod.year,
    month: previousPeriod.month,
    plantIds: [],
    productionLineIds: [],
  });
  const plantsQuery = usePlants();
  const linesQuery = useProductionLines();
  const categoriesQuery = useAeCategories();
  const volumeQuery = useVolumePac(filters.year);
  const aeQuery = useAe(filters.year, filters.month);
  const kpisQuery = useKpiDefinitions();
  const targetsQuery = useTargets(filters.year);

  const plants = useMemo(() => [...(plantsQuery.data ?? [])].filter((plant) => filters.plantIds.length === 0 || filters.plantIds.includes(plant.id)).sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name)), [filters.plantIds, plantsQuery.data]);
  const lines = linesQuery.data ?? [];
  const categories = useMemo(() => categoriesQuery.data ?? [], [categoriesQuery.data]);
  const aeStacks = useMemo(() => buildAeStacks(aeQuery.data ?? [], categories, filters.plantIds, filters.productionLineIds), [aeQuery.data, categories, filters.plantIds, filters.productionLineIds]);
  const productionVolumeKpiId = kpisQuery.data?.find((kpi) => kpi.name.trim().toLowerCase() === 'production volume')?.id;
  const isLoading = plantsQuery.isLoading || linesQuery.isLoading || categoriesQuery.isLoading || volumeQuery.isLoading || aeQuery.isLoading || kpisQuery.isLoading || targetsQuery.isLoading;
  const error = plantsQuery.error || linesQuery.error || categoriesQuery.error || volumeQuery.error || aeQuery.error || kpisQuery.error || targetsQuery.error;

  return <div className={styles.page}>
    <PageHeader title="Volume & PAC" subtitle="Monthly production volume, forecast, PAC and production-line AE performance" />
    <VolumePacFilters value={filters} plants={plantsQuery.data ?? []} productionLines={lines} onChange={setFilters} />
    <div className={styles.dataArea}>
    {error ? <ErrorState message="Volume, PAC or AE data could not be loaded from Dataverse." /> : null}
    {isLoading ? <LoadingSkeleton rows={6} /> : null}
    {!isLoading && !error && plants.length === 0 ? <EmptyState title="No plants selected" /> : null}
    {!isLoading && !error && plants.length > 0 ? <div className={styles.cards}>{plants.map((plant) => {
      const operatingPlan = targetsQuery.data?.find((target) => target.plantId === plant.id && target.kpiId === productionVolumeKpiId)?.cyTarget ?? null;
      const monthlyData = aggregateVolumePac(volumeQuery.data ?? [], [plant.id], filters.productionLineIds, operatingPlan);
      const plantAeStacks = aeStacks.filter((stack) => stack.plantId === plant.id);
      return <Card className={styles.plantCard} key={plant.id}><CardHeader header={<Text className={styles.plantName}>{plant.name}</Text>} description={<Caption1 className={styles.note}>{filters.year} Volume & PAC; Month {filters.month} AE</Caption1>} /><div className={styles.chartLayout}><div className={styles.aeSection}><div className={styles.aeLegend}>{categories.map((category, index) => <span className={styles.legendItem} key={category.id}><span className={styles.swatch} style={{ backgroundColor: getAeCategoryColor(category.name, index) }} />{category.name}</span>)}</div><div className={styles.aeGrid}>{plantAeStacks.length > 0 ? plantAeStacks.map((stack) => <AeLineChart key={stack.productionLineId} plantId={stack.plantId} productionLineId={stack.productionLineId} productionLineName={lines.find((line) => line.id === stack.productionLineId)?.name ?? 'Production Line'} values={stack.values} categories={categories} />) : <EmptyState title="No AE data" message="No AE records match this plant, month and production-line selection." />}</div></div><div className={styles.chartPanel}><div className={styles.chartHeight}><VolumePacChart data={monthlyData} /></div></div></div></Card>;
    })}</div> : null}
    </div>
  </div>;
};

``

---

## File: src/pages/KPIEntryPage/entryRows.ts

- Size: 1998 bytes
- Last modified: 2026-10-08 12:50:57

``typescript
import type { KpiDefinition, MonthlyKpiResult, Target } from '../../domain/models';

export interface EditableKpiRow {
  kpi: KpiDefinition;
  target?: Target;
  result?: MonthlyKpiResult;
  monthlyActual: number | null;
  ytdActual: number | null;
}

export function buildEditableKpiRows(
  kpis: KpiDefinition[],
  targets: Target[],
  results: MonthlyKpiResult[],
  plantId: string,
): EditableKpiRow[] {
  const normalizeId = (id: string) => id.replace(/[{}]/g, '').trim().toLowerCase();
  const selectedPlantId = normalizeId(plantId);
  const targetByKpi = new Map(targets
    .filter((target) => normalizeId(target.plantId) === selectedPlantId)
    .map((target) => [normalizeId(target.kpiId), target]));
  const resultByKpi = new Map(results
    .filter((result) => normalizeId(result.plantId) === selectedPlantId)
    .map((result) => [normalizeId(result.kpiId), result]));

  return [...kpis]
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .flatMap((kpi) => {
      const target = targetByKpi.get(normalizeId(kpi.id));
      if (target?.cyTarget === null || target?.cyTarget === undefined) return [];
      const result = resultByKpi.get(normalizeId(kpi.id));
      return [{
        kpi,
        target,
        result,
        monthlyActual: result?.monthlyActual ?? null,
        ytdActual: result?.ytdActual ?? null,
      }];
    });
}

export function parseNumericInput(value: string): number | null {
  if (value.trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function getChangedKpiRows(baseRows: EditableKpiRow[], currentRows: EditableKpiRow[]): EditableKpiRow[] {
  const baseByKpiId = new Map(baseRows.map((row) => [row.kpi.id, row]));
  return currentRows.filter((row) => {
    const base = baseByKpiId.get(row.kpi.id);
    return base && (row.monthlyActual !== base.monthlyActual || row.ytdActual !== base.ytdActual);
  });
}

``

---

## File: src/pages/KPIEntryPage/KpiDataEntryPage.tsx

- Size: 15615 bytes
- Last modified: 2026-10-08 12:35:00

``tsx
import React, { useMemo, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { GlobalFilters } from '../../components/filters/GlobalFilters';
import type { GlobalFilterState } from '../../types/filters';
import {
  useKpiDefinitions,
  useMonthlyKpiResults,
  usePlants,
  useSaveMonthlyKpiResults,
  useTargets,
} from '../../hooks/queries';
import { useAppToast } from '../../hooks/useAppToast';
import { getPreviousPeriod } from '../../domain/services/period';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { StatusBadge } from '../../components/common/StatusBadge';
import type { MonthlyKpiResult } from '../../domain/models';
import { calculateKpiStatus } from '../../domain/strategies/kpiStatusStrategy';
import { buildEditableKpiRows, getChangedKpiRows, parseNumericInput, type EditableKpiRow } from './entryRows';
import {
  Button,
  Card,
  Caption1,
  Input,
  Label,
  makeStyles,
  Subtitle2,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular, Edit24Regular, Save24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    gap: tokens.spacingVerticalL,
  },
  dataArea: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', gap: tokens.spacingVerticalL },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    flexWrap: 'wrap',
  },
  categorySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  categoryTitle: {
    fontWeight: tokens.fontWeightSemibold,
  },
  tableScroll: {
    overflowX: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  table: {
    width: '100%',
    minWidth: '1000px',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },
  cell: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
  },
  numeric: {
    textAlign: 'right',
    fontVariantNumeric: 'tabular-nums',
  },
  input: {
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
  },
  missing: {
    color: tokens.colorNeutralForeground3,
  },
});

export const KpiDataEntryPage: React.FC = () => {
  const styles = useStyles();
  const { notifySuccess, notifyError } = useAppToast();
  const [isEditing, setIsEditing] = useState(false);
  const previousPeriod = getPreviousPeriod();
  const [filters, setFilters] = useState<GlobalFilterState>({
    year: previousPeriod.year,
    month: previousPeriod.month,
    plantId: 'all',
    kpiCategory: 'all',
    kpiId: 'all',
    status: 'all',
  });
  const [draftState, setDraftState] = useState<{
    key: string;
    values: Record<string, Partial<Record<'monthlyActual' | 'ytdActual', string>>>;
  }>({ key: '', values: {} });

  const plantsQuery = usePlants();
  const kpisQuery = useKpiDefinitions();
  const targetsQuery = useTargets(filters.year, filters.plantId);
  const resultsQuery = useMonthlyKpiResults(filters.year, filters.month, filters.plantId);
  const saveMutation = useSaveMonthlyKpiResults();

  const categoryList = useMemo(() => Array.from(new Set((kpisQuery.data ?? []).map((kpi) => kpi.category).filter(Boolean))), [kpisQuery.data]);
  const selectedCategory = categoryList.includes(filters.kpiCategory) ? filters.kpiCategory : 'all';
  const visibleKpis = useMemo(() => (kpisQuery.data ?? []).filter((kpi) =>
    selectedCategory === 'all' || kpi.category === selectedCategory,
  ).filter((kpi) => filters.kpiId === 'all' || kpi.id === filters.kpiId), [filters.kpiId, kpisQuery.data, selectedCategory]);

  const draftKey = `${filters.year}:${filters.month}:${filters.plantId}:${filters.kpiCategory}:${filters.kpiId}`;
  const baseRows = useMemo(() => {
    if (filters.plantId === 'all' || !targetsQuery.data || !resultsQuery.data) return [];
    return buildEditableKpiRows(visibleKpis, targetsQuery.data, resultsQuery.data, filters.plantId);
  }, [filters.plantId, resultsQuery.data, targetsQuery.data, visibleKpis]);
  const rows = useMemo(() => baseRows.map((row) => ({
    ...row,
    monthlyActual: draftState.key === draftKey && draftState.values[row.kpi.id]?.monthlyActual !== undefined
      ? parseNumericInput(draftState.values[row.kpi.id].monthlyActual!)
      : row.monthlyActual,
    ytdActual: draftState.key === draftKey && draftState.values[row.kpi.id]?.ytdActual !== undefined
      ? parseNumericInput(draftState.values[row.kpi.id].ytdActual!)
      : row.ytdActual,
  })), [baseRows, draftKey, draftState.key, draftState.values]);

  const isLoading = kpisQuery.isLoading || targetsQuery.isLoading || resultsQuery.isLoading || plantsQuery.isLoading;
  const error = kpisQuery.error || targetsQuery.error || resultsQuery.error || plantsQuery.error;
  const groupedRows = useMemo(() => {
    return rows.reduce<Record<string, EditableKpiRow[]>>((groups, row) => {
      const category = row.kpi.category || 'Other';
      groups[category] = groups[category] ? [...groups[category], row] : [row];
      return groups;
    }, {});
  }, [rows]);

  const updateRow = (kpiId: string, field: 'monthlyActual' | 'ytdActual', value: string) => {
    setDraftState((currentState) => ({
      key: draftKey,
      values: {
        ...(currentState.key === draftKey ? currentState.values : {}),
        [kpiId]: {
          ...(currentState.key === draftKey ? currentState.values[kpiId] : {}),
          [field]: value,
        },
      },
    }));
  };

  const getRowStatus = (row: EditableKpiRow) => calculateKpiStatus(row.kpi.kpiLogic, row.ytdActual, row.target?.cyTarget);

  const save = async () => {
    if (!isEditing) return;
    const hasInvalidInput = draftState.key === draftKey && Object.values(draftState.values).some((values) =>
      Object.values(values).some((value) => value !== undefined && value.trim() !== '' && parseNumericInput(value) === null),
    );
    if (hasInvalidInput) {
      notifyError('Invalid value', 'Enter a valid number in Monthly Actual and YTD Actual.');
      return;
    }
    const changedRows = getChangedKpiRows(baseRows, rows);
    if (changedRows.length === 0) {
      setIsEditing(false);
      setDraftState({ key: '', values: {} });
      return;
    }
    if (filters.plantId === 'all') {
      notifyError('Plant is required', 'Select one plant before saving KPI results.');
      return;
    }
    const missingTargets = changedRows.filter((row) => !row.target);
    if (missingTargets.length > 0) {
      notifyError('Target is missing', `${missingTargets.length} KPI row(s) have no target for the selected plant and year.`);
      return;
    }
    const invalidRows = changedRows.filter((row) => row.monthlyActual === null && row.ytdActual === null && row.result);
    if (invalidRows.length > 0) {
      notifyError('Incomplete values', 'Existing KPI results cannot be cleared by leaving both values empty.');
      return;
    }

    const payload: Array<Omit<MonthlyKpiResult, 'id'> & { id?: string }> = changedRows.map((row) => ({
      id: row.result?.id,
      year: filters.year,
      month: filters.month,
      plantId: filters.plantId,
      kpiId: row.kpi.id,
      targetId: row.target?.id,
      monthlyActual: row.monthlyActual,
      ytdActual: row.ytdActual,
      status: getRowStatus(row),
    }));

    try {
      await saveMutation.mutateAsync(payload);
      setIsEditing(false);
      setDraftState({ key: '', values: {} });
      notifySuccess('KPI results saved', 'Dataverse values were saved and the grid will refresh.');
    } catch {
      notifyError('Save failed', 'The KPI results could not be saved to Dataverse.');
    }
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="KPI Data Entry"
        subtitle="Enter and validate monthly actual KPI results for the selected plant and period"
      />
      <GlobalFilters
        value={filters}
        onChange={(nextFilters) => {
          setIsEditing(false);
          setDraftState({ key: '', values: {} });
          setFilters(nextFilters);
        }}
        showPlant
        showCategory
        plantsList={[
          { id: 'all', name: 'Select Plant' },
          ...(plantsQuery.data ?? []).map((plant) => ({ id: plant.id, name: plant.name })),
        ]}
        kpiList={kpisQuery.data?.map((kpi) => ({ id: kpi.id, name: kpi.name })) ?? []}
        categoryList={categoryList}
        showKpi
      />

      <div className={styles.dataArea}>
      {error ? <ErrorState message="The KPI entry grid could not load the selected Dataverse period." /> : null}
      {isLoading ? <LoadingSkeleton rows={6} /> : null}
      {!isLoading && !error && filters.plantId === 'all' ? <EmptyState title="Select a plant" message="Choose a plant to load its KPI entry rows." /> : null}
      {!isLoading && !error && filters.plantId !== 'all' && rows.length === 0 ? <EmptyState title="No KPI rows available" message="No KPI definitions or targets were returned for this selection." /> : null}

      {!isLoading && !error && filters.plantId !== 'all' && rows.length > 0 ? (
        <>
          <div className={styles.toolbar}>
            <div>
              <Subtitle2>Monthly KPI results</Subtitle2>
              <Caption1> (Zero is a valid value. Leave a field empty only when the value is missing.)</Caption1>
            </div>
            <div>
              {isEditing ? <Button
                appearance="secondary"
                icon={<Dismiss24Regular />}
                onClick={() => { setIsEditing(false); setDraftState({ key: '', values: {} }); }}
                disabled={saveMutation.isPending}
              >Cancel</Button> : null}
              {!isEditing ? <Button
                appearance="secondary"
                icon={<Edit24Regular />}
                onClick={() => setIsEditing(true)}
                disabled={saveMutation.isPending}
              >Edit</Button> : null}
              <Button
                appearance="primary"
                icon={<Save24Regular />}
                onClick={save}
                disabled={!isEditing || saveMutation.isPending}
                style={{ marginLeft: '8px' }}
              >
              {saveMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
          {Object.entries(groupedRows).map(([category, categoryRows]) => (
            <section className={styles.categorySection} key={category}>
              <Subtitle2 className={styles.categoryTitle}>{category}</Subtitle2>
              <Card className={styles.tableScroll}>
                <table className={styles.table}>
                  <colgroup>
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '9%' }} />
                    <col style={{ width: '11%' }} />
                    <col style={{ width: '11%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '14%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th className={`${styles.cell} ${styles.header}`}>KPI</th>
                      <th className={`${styles.cell} ${styles.header}`}>Unit</th>
                      <th className={`${styles.cell} ${styles.header} ${styles.numeric}`}>PY Actual</th>
                      <th className={`${styles.cell} ${styles.header} ${styles.numeric}`}>Target</th>
                      <th className={`${styles.cell} ${styles.header}`}>Monthly Actual</th>
                      <th className={`${styles.cell} ${styles.header}`}>YTD Actual</th>
                      <th className={`${styles.cell} ${styles.header}`}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryRows.map((row) => (
                      <tr key={row.kpi.id}>
                        <td className={styles.cell}>{row.kpi.name}</td>
                        <td className={styles.cell}>{row.kpi.unit}</td>
                        <td className={`${styles.cell} ${styles.numeric}`}>{row.target?.pyActual ?? 'N/A'}</td>
                        <td className={`${styles.cell} ${styles.numeric}`}>{row.target?.cyTarget ?? 'N/A'}</td>
                        <td className={styles.cell}>
                          <Label htmlFor={`${row.kpi.id}-monthly`} hidden>Monthly Actual for {row.kpi.name}</Label>
                          <Input
                            className={styles.input}
                            id={`${row.kpi.id}-monthly`}
                            type="text"
                            inputMode="decimal"
                            disabled={!isEditing}
                            value={draftState.key === draftKey && draftState.values[row.kpi.id]?.monthlyActual !== undefined
                              ? draftState.values[row.kpi.id].monthlyActual
                              : row.monthlyActual === null ? '' : String(row.monthlyActual)}
                            onChange={(_event, data) => updateRow(row.kpi.id, 'monthlyActual', data.value)}
                            aria-label={`Monthly Actual for ${row.kpi.name}`}
                          />
                        </td>
                        <td className={styles.cell}>
                          <Label htmlFor={`${row.kpi.id}-ytd`} hidden>YTD Actual for {row.kpi.name}</Label>
                          <Input
                            className={styles.input}
                            id={`${row.kpi.id}-ytd`}
                            type="text"
                            inputMode="decimal"
                            disabled={!isEditing}
                            value={draftState.key === draftKey && draftState.values[row.kpi.id]?.ytdActual !== undefined
                              ? draftState.values[row.kpi.id].ytdActual
                              : row.ytdActual === null ? '' : String(row.ytdActual)}
                            onChange={(_event, data) => updateRow(row.kpi.id, 'ytdActual', data.value)}
                            aria-label={`YTD Actual for ${row.kpi.name}`}
                          />
                        </td>
                        <td className={styles.cell}>
                          <StatusBadge status={getRowStatus(row)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </section>
          ))}
        </>
      ) : null}
      </div>
    </div>
  );
};

``

---

## File: src/pages/KPIOverviewPage/KpiOverviewPage.tsx

- Size: 13434 bytes
- Last modified: 2026-10-08 12:53:41

``tsx
import React, { useMemo, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { GlobalFilters } from '../../components/filters/GlobalFilters';
import type { GlobalFilterState } from '../../types/filters';
import { useKpiDefinitions, useMonthlyKpiResults, useMonthlyKpiResultsByYear, usePlants, useTargets } from '../../hooks/queries';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { StatusBadge } from '../../components/common/StatusBadge';
import { KpiStatus } from '../../domain/enums';
import { buildKpiMonthlyMatrixRows, buildOverviewMatrix, buildPlantOverviewMetrics } from './overviewMetrics';
import { buildComparisonRows } from '../KPIComparisonPage/comparisonMetrics';
import { getPreviousPeriod } from '../../domain/services/period';
import { KpiDetailTable } from '../../components/kpi/KpiDetailTable';
import { KpiMonthlyMatrixTable } from '../../components/kpi/KpiMonthlyMatrixTable';
import {
  Caption1,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  ProgressBar,
  Subtitle2,
  Tab,
  TabList,
  Text,
  tokens,
} from '@fluentui/react-components';


const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    gap: tokens.spacingVerticalL,
  },
  dataArea: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', gap: tokens.spacingVerticalL },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: tokens.spacingHorizontalM,
  },
  summaryCard: {
    minWidth: 0,
  },
  cardHeader: {
    alignItems: 'flex-start',
  },
  plantName: {
    fontWeight: tokens.fontWeightSemibold,
  },
  completion: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    marginTop: tokens.spacingVerticalM,
  },
  completionValue: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightBold,
  },
  statusCounts: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalM,
  },
  count: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXXS,
    fontSize: tokens.fontSizeBase200,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
    flexWrap: 'wrap',
  },
  sectionQualifier: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    marginLeft: tokens.spacingHorizontalXS,
  },
  matrixScroll: {
    overflowX: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  matrix: {
    width: '100%',
    minWidth: '720px',
    borderCollapse: 'collapse',
  },
  matrixCell: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
  matrixHeader: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
  },
  centered: {
    textAlign: 'center',
  },
});

export const KpiOverviewPage: React.FC = () => {

  const styles = useStyles();
  const previousPeriod = getPreviousPeriod();
  const [activeView, setActiveView] = useState<'matrix' | 'detail' | 'monthly'>('matrix');
  const [selectedPlantIds, setSelectedPlantIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<GlobalFilterState>({
    year: previousPeriod.year,
    month: previousPeriod.month,
    plantId: 'all',
    kpiCategory: 'all',
    kpiId: 'all',
    status: 'all',
  });

  const plantsQuery = usePlants();
  const kpisQuery = useKpiDefinitions();
  const targetsQuery = useTargets(filters.year);
  const resultsQuery = useMonthlyKpiResults(filters.year, filters.month);
  const monthlyResultsQuery = useMonthlyKpiResultsByYear(filters.year, activeView === 'monthly');

  const plantMetrics = useMemo(() => {
    if (!plantsQuery.data || !kpisQuery.data || !targetsQuery.data || !resultsQuery.data) return [];
    return buildPlantOverviewMetrics(
      plantsQuery.data,
      kpisQuery.data,
      targetsQuery.data,
      resultsQuery.data,
      filters.year,
    );
  }, [filters.year, kpisQuery.data, plantsQuery.data, resultsQuery.data, targetsQuery.data]);

  const matrixRows = useMemo(() => {
    if (!plantsQuery.data || !kpisQuery.data || !resultsQuery.data) return [];
    return buildOverviewMatrix(plantsQuery.data, kpisQuery.data, targetsQuery.data ?? [], resultsQuery.data);
  }, [kpisQuery.data, plantsQuery.data, resultsQuery.data, targetsQuery.data]);

  const detailRows = useMemo(() => {
    if (!plantsQuery.data || !kpisQuery.data || !targetsQuery.data || !resultsQuery.data) return [];
    return buildComparisonRows(plantsQuery.data, kpisQuery.data, targetsQuery.data, resultsQuery.data, 'all')
      .filter((row) => row.target?.cyTarget !== null && row.target?.cyTarget !== undefined);
  }, [kpisQuery.data, plantsQuery.data, resultsQuery.data, targetsQuery.data]);

  const monthlyMatrixRows = useMemo(() => {
    if (!plantsQuery.data || !kpisQuery.data || !targetsQuery.data || !monthlyResultsQuery.data) return [];
    return buildKpiMonthlyMatrixRows(plantsQuery.data, kpisQuery.data, targetsQuery.data, monthlyResultsQuery.data, filters.month);
  }, [filters.month, kpisQuery.data, monthlyResultsQuery.data, plantsQuery.data, targetsQuery.data]);

  const tablePlants = (plantsQuery.data ?? []).filter((plant) => selectedPlantIds.length === 0 || selectedPlantIds.includes(plant.id));
  const tablePlantIds = new Set(tablePlants.map((plant) => plant.id));
  const tableMatrixRows = matrixRows.filter((row) => tablePlants.some((plant) => row.statuses[plant.id] !== null));
  const tableDetailRows = detailRows.filter((row) => tablePlantIds.has(row.plant.id));
  const tableMonthlyMatrixRows = monthlyMatrixRows.filter((row) => tablePlantIds.has(row.plant.id));

  const isLoading = plantsQuery.isLoading || kpisQuery.isLoading || targetsQuery.isLoading || resultsQuery.isLoading || (activeView === 'monthly' && monthlyResultsQuery.isLoading);
  const error = plantsQuery.error || kpisQuery.error || targetsQuery.error || resultsQuery.error || (activeView === 'monthly' ? monthlyResultsQuery.error : null);

  if (error) {
    return <ErrorState message="The KPI Overview could not load the selected Dataverse period." />;
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="KPI Overview"
        subtitle="Compare completion status and traffic light metrics across four TPU plants"
      />
      <GlobalFilters
        value={filters}
        onChange={setFilters}
        showPlant={false}
        showPlantMultiSelect
        plantsList={(plantsQuery.data ?? []).map((plant) => ({ id: plant.id, name: plant.name }))}
        selectedPlantIds={selectedPlantIds}
        onPlantIdsChange={setSelectedPlantIds}
        showCategory={false}
      />
      <div className={styles.dataArea}>
      {isLoading ? <LoadingSkeleton rows={4} /> : null}

      {!isLoading && plantMetrics.length === 0 ? (
        <EmptyState title="No plants available" message="No plant records were returned from Dataverse." />
      ) : null}

      {!isLoading && plantMetrics.length > 0 ? (
        <>
          <section className={styles.section} aria-labelledby="plant-summary-heading">
            <div className={styles.sectionHeader}>
              <div>
                <Subtitle2 id="plant-summary-heading">
                  Plant completion summary
                  <Caption1 className={styles.sectionQualifier}>({filters.year} / {filters.month} YTD)</Caption1>
                </Subtitle2>
              </div>
              <Caption1>Missing results are excluded from entered counts</Caption1>
            </div>
            <div className={styles.summaryGrid}>
              {plantMetrics.map((metrics) => (
                <Card className={styles.summaryCard} key={metrics.plant.id}>
                  <CardHeader
                    className={styles.cardHeader}
                    header={<Text className={styles.plantName}>{metrics.plant.name}</Text>}
                    description={<Caption1>{metrics.enteredCount} of {metrics.expectedCount} KPI results entered</Caption1>}
                  />
                  <div className={styles.completion}>
                    <div>
                      <Text className={styles.completionValue}>{metrics.completionRate}%</Text>
                      <Caption1>Completion</Caption1>
                    </div>
                    <ProgressBar value={metrics.completionRate / 100} aria-label={`${metrics.plant.name} completion`} />
                  </div>
                  <div className={styles.statusCounts} aria-label={`${metrics.plant.name} status counts`}>
                    <span className={styles.count}><StatusBadge status={KpiStatus.Green} showText={false} /> {metrics.statusCounts[KpiStatus.Green]}</span>
                    <span className={styles.count}><StatusBadge status={KpiStatus.Amber} showText={false} /> {metrics.statusCounts[KpiStatus.Amber]}</span>
                    <span className={styles.count}><StatusBadge status={KpiStatus.Red} showText={false} /> {metrics.statusCounts[KpiStatus.Red]}</span>
                    <span className={styles.count}><StatusBadge status={KpiStatus.Missing} showText={false} /> {metrics.statusCounts[KpiStatus.Missing]}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Divider />

          <TabList
            selectedValue={activeView}
            onTabSelect={(_event, data) => setActiveView(data.value as 'matrix' | 'detail' | 'monthly')}
            aria-label="KPI overview data view"
          >
            <Tab value="matrix">KPI status matrix</Tab>
            <Tab value="detail">KPI detail table</Tab>
            <Tab value="monthly">KPI Monthly Matrix</Tab>
          </TabList>

          {activeView === 'matrix' ? <section className={styles.section} aria-labelledby="status-matrix-heading">
            <div className={styles.sectionHeader}>
              <div>
                <Subtitle2 id="status-matrix-heading">
                  KPI status matrix
                  <Caption1 className={styles.sectionQualifier}>(Review status across all available plants for the selected period.)</Caption1>
                </Subtitle2>
              </div>
            </div>
            <div className={styles.matrixScroll}>
              <table className={styles.matrix}>
                <thead>
                  <tr>
                    <th className={`${styles.matrixCell} ${styles.matrixHeader}`}>KPI</th>
                    <th className={`${styles.matrixCell} ${styles.matrixHeader}`}>Category</th>
                    {tablePlants.map((plant) => (
                      <th className={`${styles.matrixCell} ${styles.matrixHeader} ${styles.centered}`} key={plant.id}>{plant.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableMatrixRows.map((row) => (
                    <tr key={row.kpi.id}>
                      <td className={styles.matrixCell}>{row.kpi.name}</td>
                      <td className={styles.matrixCell}>{row.kpi.category}</td>
                      {tablePlants.map((plant) => (
                        <td className={`${styles.matrixCell} ${styles.centered}`} key={plant.id}>
                          {row.statuses[plant.id] === null ? null : <StatusBadge status={row.statuses[plant.id]!} />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section> : null}

          {activeView === 'detail' ? <section className={styles.section} aria-labelledby="detail-table-heading">
            <Subtitle2 id="detail-table-heading">
              KPI detail table
              <Caption1 className={styles.sectionQualifier}>(Target, actual, YTD and achievement by plant.)</Caption1>
            </Subtitle2>
            <KpiDetailTable rows={tableDetailRows} />
          </section> : null}
          {activeView === 'monthly' ? <section className={styles.section} aria-labelledby="monthly-matrix-heading">
            <Subtitle2 id="monthly-matrix-heading">KPI Monthly Matrix</Subtitle2>
            <KpiMonthlyMatrixTable rows={tableMonthlyMatrixRows} />
          </section> : null}
        </>
      ) : null}
      </div>
    </div>
  );
};

``

---

## File: src/pages/KPIOverviewPage/overviewMetrics.ts

- Size: 5400 bytes
- Last modified: 2026-10-08 12:50:57

``typescript
import { KpiStatus } from '../../domain/enums';
import { calculateKpiStatus } from '../../domain/strategies/kpiStatusStrategy';
import type { KpiDefinition, MonthlyKpiResult, Plant, Target } from '../../domain/models';

export interface PlantOverviewMetrics {
  plant: Plant;
  expectedCount: number;
  enteredCount: number;
  completionRate: number;
  statusCounts: Record<KpiStatus, number>;
}

export interface OverviewMatrixRow {
  kpi: KpiDefinition;
  statuses: Record<string, KpiStatus | null>;
}

export interface KpiMonthlyMatrixRow {
  plant: Plant;
  kpi: KpiDefinition;
  target?: Target;
  monthlyActuals: Array<number | null | undefined>;
  ytdActual: number | null | undefined;
}

const emptyStatusCounts = (): Record<KpiStatus, number> => ({
  [KpiStatus.Green]: 0,
  [KpiStatus.Amber]: 0,
  [KpiStatus.Red]: 0,
  [KpiStatus.Grey]: 0,
  [KpiStatus.Missing]: 0,
});

export function getApplicableKpiIds(
  plantId: string,
  year: number,
  targets: Target[],
  kpis: KpiDefinition[],
): Set<string> {
  const plantTargets = targets.filter((target) => target.plantId === plantId && target.targetYear === year);
  const targetKpiIds = new Set(plantTargets
    .filter((target) => target.cyTarget !== null && target.cyTarget !== undefined)
    .map((target) => target.kpiId));

  return plantTargets.length > 0 ? targetKpiIds : new Set(kpis.map((kpi) => kpi.id));
}

export function buildPlantOverviewMetrics(
  plants: Plant[],
  kpis: KpiDefinition[],
  targets: Target[],
  results: MonthlyKpiResult[],
  year: number,
): PlantOverviewMetrics[] {
  return plants.map((plant) => {
    const applicableKpiIds = getApplicableKpiIds(plant.id, year, targets, kpis);
    const plantResults = results.filter((result) => result.plantId === plant.id);
    const enteredKpiIds = new Set(
      plantResults
        .filter((result) => result.monthlyActual !== null && result.monthlyActual !== undefined)
        .map((result) => result.kpiId),
    );
    const statusCounts = emptyStatusCounts();
    const targetsByKpi = new Map(targets
      .filter((target) => target.plantId === plant.id && target.targetYear === year)
      .map((target) => [target.kpiId, target]));
    const resultsByKpi = new Map(plantResults.map((result) => [result.kpiId, result]));
    const kpisById = new Map(kpis.map((kpi) => [kpi.id, kpi]));

    applicableKpiIds.forEach((kpiId) => {
      const kpi = kpisById.get(kpiId);
      const result = resultsByKpi.get(kpiId);
      const target = targetsByKpi.get(kpiId);
      const status = calculateKpiStatus(kpi?.kpiLogic, result?.ytdActual, target?.cyTarget);
      statusCounts[status] += 1;
    });

    const expectedCount = applicableKpiIds.size;
    const enteredCount = [...enteredKpiIds].filter((id) => applicableKpiIds.has(id)).length;

    return {
      plant,
      expectedCount,
      enteredCount,
      completionRate: expectedCount === 0 ? 0 : Math.round((enteredCount / expectedCount) * 100),
      statusCounts,
    };
  });
}

export function buildOverviewMatrix(
  plants: Plant[],
  kpis: KpiDefinition[],
  targets: Target[],
  results: MonthlyKpiResult[],
): OverviewMatrixRow[] {
  const resultByPlantAndKpi = new Map(
    results.map((result) => [`${result.plantId}:${result.kpiId}`, result]),
  );
  const targetByPlantAndKpi = new Map(
    targets.map((target) => [`${target.plantId}:${target.kpiId}`, target]),
  );

  return [...kpis]
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .map((kpi) => ({
      kpi,
      statuses: Object.fromEntries(
        plants.map((plant) => [
          plant.id,
          targetByPlantAndKpi.get(`${plant.id}:${kpi.id}`)?.cyTarget === null
            || targetByPlantAndKpi.get(`${plant.id}:${kpi.id}`)?.cyTarget === undefined
            ? null
            : calculateKpiStatus(
              kpi.kpiLogic,
              resultByPlantAndKpi.get(`${plant.id}:${kpi.id}`)?.ytdActual,
              targetByPlantAndKpi.get(`${plant.id}:${kpi.id}`)?.cyTarget,
            ),
        ]),
      ),
    }));
}

export function buildKpiMonthlyMatrixRows(
  plants: Plant[],
  kpis: KpiDefinition[],
  targets: Target[],
  results: MonthlyKpiResult[],
  selectedMonth: number,
): KpiMonthlyMatrixRow[] {
  const targetByPlantAndKpi = new Map(targets.map((target) => [`${target.plantId}:${target.kpiId}`, target]));
  const resultByPlantKpiAndMonth = new Map(results.map((result) => [`${result.plantId}:${result.kpiId}:${result.month}`, result]));
  const sortedPlants = [...plants].sort((left, right) => left.displayOrder - right.displayOrder);
  const sortedKpis = [...kpis].sort((left, right) => left.displayOrder - right.displayOrder);

  return sortedPlants.flatMap((plant) => sortedKpis.flatMap((kpi) => {
    const target = targetByPlantAndKpi.get(`${plant.id}:${kpi.id}`);
    if (target?.cyTarget === null || target?.cyTarget === undefined) return [];
    const selectedResult = resultByPlantKpiAndMonth.get(`${plant.id}:${kpi.id}:${selectedMonth}`);
    return [{
      plant,
      kpi,
      target,
      monthlyActuals: Array.from({ length: 12 }, (_value, index) =>
        resultByPlantKpiAndMonth.get(`${plant.id}:${kpi.id}:${index + 1}`)?.monthlyActual),
      ytdActual: selectedResult?.ytdActual,
    }];
  }));
}

``

---

## File: src/pages/MonthlyReportsPage/exportMonthlyReport.ts

- Size: 3303 bytes
- Last modified: 2026-10-11 14:14:38

``typescript
import { dataverseRepositories } from '../../data/adapters/dataverseRepositories';
import { volumePacRepository } from '../../data/adapters/volumePacRepository';
import { productionKpiRepository } from '../../data/adapters/productionKpiRepository';
import { buildMonthlyReportPowerPoint } from './reportPowerPoint';
import { renderPlantReportCharts } from './renderReportCharts';
import type { MonthlyReportExportData } from './reportExportData';
import { REPORT_MIME_TYPE } from './reportSave';
import reportTemplateDataUrl from '../../assets/monthly-report-template.pptx?inline'

function dataUrlToArrayBuffer(dataUrl: string): ArrayBuffer {
  const commaIndex = dataUrl.indexOf(',')

  if (commaIndex < 0) {
    throw new Error('The embedded PowerPoint template has an invalid data URL.')
  }

  const metadata = dataUrl.slice(0, commaIndex)
  const encodedData = dataUrl.slice(commaIndex + 1)

  if (!metadata.includes(';base64')) {
    throw new Error(
      'The embedded PowerPoint template is not Base64 encoded.'
    )
  }

  const binaryString = atob(encodedData)
  const bytes = new Uint8Array(binaryString.length)

  for (let index = 0; index < binaryString.length; index += 1) {
    bytes[index] = binaryString.charCodeAt(index)
  }

  return bytes.buffer
}

export async function exportMonthlyReport(year: number, month: number, onProgress: (message: string) => void): Promise<Blob> {
  // v1 copy - current only modify export report logic
  // onProgress('Loading report data');
  // const templateResponse = await fetch(`${import.meta.env.BASE_URL}monthly-report-template.pptx`);
  // if (!templateResponse.ok) throw new Error('The monthly report PowerPoint template could not be loaded.');
  // const template = await templateResponse.arrayBuffer();

  onProgress('Loading PowerPoint template')

  const template = dataUrlToArrayBuffer(reportTemplateDataUrl)

  onProgress('Loading report data')


  const { plantRepository, kpiDefinitionRepository, targetRepository, monthlyKpiResultRepository, monthlyReportRepository, reportCategoryRepository } = dataverseRepositories;
  const [plants, kpis, targets, monthlyResults, reports, categories, lines, lineMatrices, aeCategories, aeRecords, volumeRecords, productionMatrices, productionRecords] = await Promise.all([
    plantRepository.getAll(), kpiDefinitionRepository.getAll(), targetRepository.getByYear(year), monthlyKpiResultRepository.getByYear(year),
    monthlyReportRepository.getByPeriod(year, month), reportCategoryRepository.getAll(), volumePacRepository.getProductionLines(),
    volumePacRepository.getProductionLineMatrices(), volumePacRepository.getAeCategories(), volumePacRepository.getAe(year, month),
    volumePacRepository.getVolumePac(year), volumePacRepository.getProductionKpiMatrices(), productionKpiRepository.getAll(),
  ]);
  const data: MonthlyReportExportData = { year, month, plants, kpis, targets, monthlyResults, reports, categories, lines, lineMatrices, aeCategories, aeRecords, volumeRecords, productionMatrices, productionRecords };
  const bytes = await buildMonthlyReportPowerPoint(template, data, (plant) => renderPlantReportCharts(data, plant), onProgress);
  return new Blob([new Uint8Array(bytes).buffer], { type: REPORT_MIME_TYPE });
}

``

---

## File: src/pages/MonthlyReportsPage/MonthlyReportsPage.tsx

- Size: 17316 bytes
- Last modified: 2026-10-08 23:05:38

``tsx
import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { GlobalFilters } from '../../components/filters/GlobalFilters';
import { ReportFilters, type ReportFilterState } from '../../components/filters/ReportFilters';
import type { GlobalFilterState } from '../../types/filters';
import {
  useDownloadAttachment,
  useMonthlyReports,
  usePlants,
  useReportAttachments,
  useReportCategories,
  useSaveMonthlyReport,
  useUploadAttachment,
} from '../../hooks/queries';
import { useAppToast } from '../../hooks/useAppToast';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { ReportType } from '../../domain/enums';
import type { MonthlyReport, ReportCategory } from '../../domain/models';
import { filterMonthlyReports, groupReportsByPlantAndCategory } from './reportView';
import { getPreviousPeriod } from '../../domain/services/period';
import { pickReportSaveLocation, reportFileName, writeReportFile } from './reportSave';
import {
  Button,
  Card,
  CardHeader,
  Caption1,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Input,
  Label,
  makeStyles,
  Text,
  Textarea,
  tokens,
} from '@fluentui/react-components';
import { ArrowDownload24Regular, Edit24Regular, Save24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  page: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', gap: tokens.spacingVerticalL },
  dataArea: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', gap: tokens.spacingVerticalL },
  plantSection: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL },
  plantCard: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, padding: tokens.spacingHorizontalL, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium, boxShadow: tokens.shadow2 },
  plantHeading: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightSemibold, marginBottom: tokens.spacingVerticalXS },
  categorySection: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS, padding: tokens.spacingHorizontalM, backgroundColor: tokens.colorNeutralBackground2, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusSmall },
  categoryHeading: { fontSize: tokens.fontSizeBase400, fontWeight: tokens.fontWeightSemibold, color: tokens.colorNeutralForeground2 },
  reportGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: tokens.spacingHorizontalM, '@media (max-width: 800px)': { gridTemplateColumns: '1fr' } },
  reportCard: { minWidth: 0 },
  reportContent: { whiteSpace: 'pre-wrap', color: tokens.colorNeutralForeground2, minHeight: '64px', lineHeight: tokens.lineHeightBase300 },
  reportMeta: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacingHorizontalS, marginTop: tokens.spacingVerticalM, flexWrap: 'wrap' },
  emptyContent: { color: tokens.colorNeutralForeground3, fontStyle: 'italic', minHeight: '64px' },
  dialogField: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, marginBottom: tokens.spacingVerticalM },
  attachmentList: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, marginTop: tokens.spacingVerticalS },
  attachmentRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacingHorizontalS, padding: tokens.spacingVerticalXS, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusSmall },
});

interface ReportCardProps {
  report?: MonthlyReport;
  type: ReportType;
  plantId: string;
  onEdit: (report: MonthlyReport | undefined, type: ReportType, categoryId: string, plantId: string) => void;
  categoryId: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, type, plantId, onEdit, categoryId }) => {
  const styles = useStyles();
  const { notifyError } = useAppToast();
  const attachmentsQuery = useReportAttachments(report?.id ?? null);
  const downloadMutation = useDownloadAttachment();
  const label = type === ReportType.Highlights ? 'Highlights' : 'Lowlights';

  const download = async (attachmentId: string, fileName?: string) => {
    try {
      await downloadMutation.mutateAsync({ attachmentId, fileName });
    } catch {
      notifyError('Download failed', 'The attachment could not be downloaded.');
    }
  };

  return (
    <Card className={styles.reportCard}>
      <CardHeader
        header={<Text weight="semibold" style={{ color: type === ReportType.Highlights ? '#107C10' : '#D13438' }}>{type === ReportType.Highlights ? '+ ' : '- '}{label}</Text>}
        action={<Button appearance="subtle" icon={<Edit24Regular />} onClick={() => onEdit(report, type, categoryId, plantId)} aria-label={`Edit ${label}`} />}
      />
      {report?.content ? <Text className={styles.reportContent}>{report.content}</Text> : <Text className={styles.emptyContent}>No content entered</Text>}
      <div className={styles.reportMeta}>
        <Caption1>{report?.attachmentsCount ?? attachmentsQuery.data?.length ?? 0} attachment(s)</Caption1>
        {attachmentsQuery.data && attachmentsQuery.data.length > 0 ? (
          <div className={styles.attachmentList}>
            {attachmentsQuery.data.map((attachment) => (
              <div className={styles.attachmentRow} key={attachment.id}>
                <Caption1>{attachment.fileName ?? attachment.title}</Caption1>
                <Button appearance="subtle" icon={<ArrowDownload24Regular />} onClick={() => download(attachment.id, attachment.fileName ?? attachment.title)} aria-label={`Download ${attachment.fileName ?? attachment.title}`} disabled={downloadMutation.isPending} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

interface ReportEditDialogProps {
  open: boolean;
  plantId: string;
  plantName: string;
  year: number;
  month: number;
  categories: ReportCategory[];
  report?: MonthlyReport;
  type: ReportType;
  categoryId: string;
  onClose: () => void;
}

const ReportEditDialog: React.FC<ReportEditDialogProps> = ({ open, plantId, plantName, year, month, categories, report, type, categoryId, onClose }) => {
  const styles = useStyles();
  const { notifySuccess, notifyError } = useAppToast();
  const saveMutation = useSaveMonthlyReport();
  const uploadMutation = useUploadAttachment();
  const [content, setContent] = useState(report?.content ?? '');
  const [displayOrder, setDisplayOrder] = useState(String(report?.displayOrder ?? 1));
  const [savedReport, setSavedReport] = useState<MonthlyReport | undefined>(report);

  const save = async () => {
    if (!plantId || categoryId === 'all') {
      notifyError('Required fields missing', 'Select a plant and report category before saving.');
      return;
    }
    try {
      const result = await saveMutation.mutateAsync({
        isEdit: Boolean(savedReport?.id),
        report: {
          id: savedReport?.id,
          year,
          month,
          plantId,
          categoryId,
          type,
          content,
          displayOrder: Number(displayOrder) || 1,
        },
      });
      setSavedReport(result);
      notifySuccess('Report saved', 'The monthly report content was saved to Dataverse.');
      onClose();
    } catch {
      notifyError('Save failed', 'The monthly report could not be saved.');
    }
  };

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !savedReport?.id) {
      if (file) notifyError('Save report first', 'Save the report before uploading an attachment.');
      return;
    }
    try {
      await uploadMutation.mutateAsync({ monthlyReportId: savedReport.id, title: file.name, file });
      notifySuccess('Attachment uploaded', file.name);
      event.target.value = '';
    } catch {
      notifyError('Upload failed', 'The attachment could not be uploaded.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(_event, data) => { if (!data.open) onClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{savedReport ? 'Edit monthly report' : 'New monthly report'}</DialogTitle>
          <DialogContent>
            <div className={styles.dialogField}><Label>Plant</Label><Input value={plantName} readOnly /></div>
            <div className={styles.dialogField}><Label>Year / Month</Label><Input value={`${year} / ${month}`} readOnly /></div>
            <div className={styles.dialogField}><Label>Report Category</Label><Input value={categories.find((category) => category.id === categoryId)?.name ?? ''} readOnly /></div>
            <div className={styles.dialogField}><Label>Type</Label><Input value={type} readOnly /></div>
            <div className={styles.dialogField}><Label htmlFor="report-content">Content</Label><Textarea id="report-content" rows={8} resize="vertical" value={content} onChange={(_event, data) => setContent(data.value)} /></div>
            <div className={styles.dialogField}><Label htmlFor="report-order">Display Order</Label><Input id="report-order" type="number" value={displayOrder} readOnly onChange={(_event, data) => setDisplayOrder(data.value)} /></div>
            <div className={styles.dialogField}><Label htmlFor="report-attachment">Attachment</Label><input id="report-attachment" type="file" onChange={upload} disabled={!savedReport?.id || uploadMutation.isPending} /></div>
          </DialogContent>
          <DialogActions><Button appearance="secondary" onClick={onClose}>Cancel</Button><Button appearance="primary" icon={<Save24Regular />} onClick={save} disabled={saveMutation.isPending}>{saveMutation.isPending ? 'Saving...' : 'Save'}</Button></DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export const MonthlyReportsPage: React.FC = () => {
  const styles = useStyles();
  const { notifySuccess, notifyError } = useAppToast();
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const [reportDownload, setReportDownload] = useState<{ fileName: string; url: string } | null>(null);
  useEffect(() => {
    if (!reportDownload) return;
    return () => URL.revokeObjectURL(reportDownload.url);
  }, [reportDownload]);
  const previousPeriod = getPreviousPeriod();
  const [filters, setFilters] = useState<GlobalFilterState>({ year: previousPeriod.year, month: previousPeriod.month, plantId: 'all', kpiCategory: 'all', kpiId: 'all', status: 'all' });
  const [reportFilters, setReportFilters] = useState<ReportFilterState>({ plantIds: [], categoryIds: [], types: [] });
  const [editState, setEditState] = useState<{ report?: MonthlyReport; type: ReportType; categoryId: string; plantId: string } | null>(null);
  const plantsQuery = usePlants();
  const categoriesQuery = useReportCategories();
  const reportsQuery = useMonthlyReports(filters.year, filters.month, 'all');
  const selectedReports = useMemo(() => filterMonthlyReports(reportsQuery.data ?? [], reportFilters), [reportFilters, reportsQuery.data]);
  const selectedPlants = useMemo(() => (plantsQuery.data ?? []).filter((plant) => reportFilters.plantIds.length === 0 || reportFilters.plantIds.includes(plant.id)), [plantsQuery.data, reportFilters.plantIds]);
  const selectedCategories = useMemo(() => (categoriesQuery.data ?? []).filter((category) => reportFilters.categoryIds.length === 0 || reportFilters.categoryIds.includes(category.id)), [categoriesQuery.data, reportFilters.categoryIds]);
  const reportGroups = useMemo(() => groupReportsByPlantAndCategory(selectedPlants, selectedCategories, selectedReports), [selectedCategories, selectedPlants, selectedReports]);
  const isLoading = plantsQuery.isLoading || categoriesQuery.isLoading || reportsQuery.isLoading;
  const error = plantsQuery.error || categoriesQuery.error || reportsQuery.error;

  const exportReport = async () => {
    if (exporting) return;
    setExporting(true);
    setReportDownload(null);
    setExportProgress('Loading report data');
    try {
      const fileName = reportFileName(filters.year, filters.month);
      const destination = await pickReportSaveLocation(fileName);
      const { exportMonthlyReport } = await import('./exportMonthlyReport');
      const blob = await exportMonthlyReport(filters.year, filters.month, setExportProgress);
      if (destination) {
        setExportProgress('Saving PowerPoint file');
        try {
          await writeReportFile(destination, blob);
          notifySuccess('Report saved', fileName);
        } catch (failure) {
          setReportDownload({ fileName, url: URL.createObjectURL(blob) });
          notifyError('Save failed', failure instanceof Error ? failure.message : 'The selected file could not be written.');
        }
      } else {
        setReportDownload({ fileName, url: URL.createObjectURL(blob) });
        notifySuccess('Report ready', fileName);
      }
    } catch (failure) {
      if (failure instanceof DOMException && failure.name === 'AbortError') return;
      notifyError('Export failed', failure instanceof Error ? failure.message : 'The monthly report could not be exported.');
    } finally {
      setExporting(false);
      setExportProgress('');
    }
  };

  return (
    <div className={styles.page}>
      <PageHeader title="Monthly Reports" subtitle="Browse plant highlights and lowlights by report category with attachments" />
      <GlobalFilters value={filters} onChange={setFilters} showPlant={false} showCategory={false} />
      <ReportFilters value={reportFilters} plants={plantsQuery.data ?? []} categories={categoriesQuery.data ?? []} onChange={setReportFilters}
        actions={<div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
          {exporting ? <Caption1 role="status" aria-live="polite">{exportProgress}</Caption1> : null}
          <Button appearance="primary" icon={<ArrowDownload24Regular />} onClick={() => void exportReport()} disabled={exporting || isLoading || Boolean(error) || (plantsQuery.data ?? []).length === 0}>Export Report</Button>
        </div>} />
      <div className={styles.dataArea}>
      {error ? <ErrorState message={error instanceof Error ? error.message : 'Monthly Reports could not load the selected Dataverse period.'} /> : null}
      {isLoading ? <LoadingSkeleton rows={5} /> : null}
      {!isLoading && !error && reportGroups.length > 0 ? <div className={styles.plantSection}>{reportGroups.map((plantGroup) => <section className={styles.plantCard} key={plantGroup.plant.id}><Text className={styles.plantHeading}>{plantGroup.plant.name}</Text>{plantGroup.categories.map((group) => <div className={styles.categorySection} key={group.category.id}><Text className={styles.categoryHeading}>{group.category.name}</Text><div className={styles.reportGrid}>{(reportFilters.types.length === 0 || reportFilters.types.includes(ReportType.Highlights)) ? <ReportCard report={group.highlights} type={ReportType.Highlights} plantId={plantGroup.plant.id} categoryId={group.category.id} onEdit={(report, type, categoryId, plantId) => setEditState({ report, type, categoryId, plantId })} /> : null}{(reportFilters.types.length === 0 || reportFilters.types.includes(ReportType.Lowlights)) ? <ReportCard report={group.lowlights} type={ReportType.Lowlights} plantId={plantGroup.plant.id} categoryId={group.category.id} onEdit={(report, type, categoryId, plantId) => setEditState({ report, type, categoryId, plantId })} /> : null}</div></div>)}</section>)}</div> : null}
      {editState ? <ReportEditDialog key={`${editState.report?.id ?? 'new'}:${editState.plantId}:${editState.categoryId}:${editState.type}`} open plantId={editState.plantId} plantName={plantsQuery.data?.find((plant) => plant.id === editState.plantId)?.name ?? ''} year={filters.year} month={filters.month} categories={categoriesQuery.data ?? []} report={editState.report} type={editState.type} categoryId={editState.categoryId} onClose={() => setEditState(null)} /> : null}
      </div>
      {reportDownload ? <Dialog open onOpenChange={(_event, data) => { if (!data.open) setReportDownload(null); }}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Report ready</DialogTitle>
            <DialogContent><Text>{reportDownload.fileName}</Text></DialogContent>
            <DialogActions>
              <Button onClick={() => setReportDownload(null)}>Close</Button>
              <Button as="a" appearance="primary" icon={<ArrowDownload24Regular />} href={reportDownload.url} download={reportDownload.fileName}>Download PPT</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog> : null}
    </div>
  );
};

``

---

## File: src/pages/MonthlyReportsPage/renderReportCharts.tsx

- Size: 7349 bytes
- Last modified: 2026-10-09 16:44:29

``tsx
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { toPng } from 'html-to-image';
import type { Plant } from '../../domain/models';
import { AeLineChart, VolumePacChart } from '../KPIComparisonPage/KpiComparisonPage';
import { buildAeStacks } from '../KPIComparisonPage/chartMetrics';
import { MetricChart } from '../ProductionQualityPage/ProductionQualityPage';
import { buildProductionQualityMetrics } from '../ProductionQualityPage/chartMetrics';
import type { MonthlyReportExportData } from './reportExportData';
import { buildExportVolumeGroups, sameExportId } from './reportExportData';
import type { ExportImage, PlantReportImages } from './reportPowerPoint';

export function emphasizeReportChartText(host: HTMLElement): void {
  host.querySelectorAll<HTMLElement | SVGElement>('.recharts-cartesian-axis-tick-value, .recharts-legend-item-text, .recharts-label-list text, [data-report-legend]')
    .forEach((text) => { text.style.fontWeight = '700'; });
}

export function waitForReportCharts(host: HTMLElement, expectedCount: number, chartName: string, timeoutMs = 10000): Promise<void> {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver(check);
    const timer = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`${chartName}: chart layout did not become ready within ${timeoutMs / 1000} seconds.`));
    }, timeoutMs);
    function check() {
      const surfaces = Array.from(host.querySelectorAll('.recharts-wrapper > svg.recharts-surface'));
      const ready = surfaces.length === expectedCount && surfaces.every((surface) => {
        const bounds = surface.getBoundingClientRect();
        return bounds.width > 0 && bounds.height > 0 && surface.querySelector('.recharts-cartesian-axis') !== null;
      });
      if (!ready) return;
      observer.disconnect();
      clearTimeout(timer);
      resolve();
    }
    observer.observe(host, { childList: true, subtree: true, attributes: true });
    check();
  });
}

async function snapshot(content: ReactNode, width: number, expectedCount: number, chartName: string, height?: number): Promise<ExportImage> {
  const host = document.createElement('div');
  Object.assign(host.style, { position: 'fixed', left: '-20000px', top: '0', width: `${width}px`, backgroundColor: '#FFFFFF', pointerEvents: 'none' });
  host.setAttribute('aria-hidden', 'true');
  document.body.appendChild(host);
  const root = createRoot(host);
  try {
    flushSync(() => root.render(<FluentProvider theme={webLightTheme} style={{ width, height, backgroundColor: '#FFFFFF', padding: 0 }}>{content}</FluentProvider>));
    await document.fonts.ready;
    await waitForReportCharts(host, expectedCount, chartName);
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    emphasizeReportChartText(host);
    const imageWidth = host.offsetWidth;
    const imageHeight = host.offsetHeight;
    const dataUrl = await toPng(host, { pixelRatio: 3, backgroundColor: '#FFFFFF', skipFonts: true, width: imageWidth, height: imageHeight, style: { position: 'static', inset: 'auto', insetInline: 'auto', insetBlock: 'auto' } });
    return { dataUrl, width: imageWidth, height: imageHeight };
  } finally {
    root.unmount();
    host.remove();
  }
}

export async function renderPlantReportCharts(data: MonthlyReportExportData, plant: Plant): Promise<PlantReportImages> {
  const categories = [...data.aeCategories].sort((left, right) => left.displayOrder - right.displayOrder);
  const aeRecords = data.aeRecords.filter((record) => sameExportId(record.plantId, plant.id) && record.year === data.year && record.month === data.month);
  const stacks = buildAeStacks(aeRecords.map((record) => ({ ...record, plantId: plant.id })), categories, [plant.id], []);
  const lineIds = new Set([
    ...data.lineMatrices.filter((matrix) => sameExportId(matrix.plantId, plant.id)).map((matrix) => matrix.productionLineId),
    ...aeRecords.map((record) => record.productionLineId),
  ]);
  const lines = [...data.lines].filter((line) => [...lineIds].some((id) => sameExportId(id, line.id))).sort((left, right) => left.displayOrder - right.displayOrder);
  const ae = await snapshot(<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {lines.length > 0 ? lines.map((line) => <AeLineChart key={line.id} plantId={plant.id} productionLineId={line.id} productionLineName={line.name}
        exportSize={{ width: 190, height: 275 }} categories={categories} showLabels values={stacks.find((stack) => sameExportId(stack.productionLineId, line.id))?.values ?? {}} />)
        : <AeLineChart exportSize={{ width: 190, height: 275 }} plantId={plant.id} productionLineId="" productionLineName="No AE data" categories={categories} showLabels values={{}} />}
      </div>, 210, Math.max(lines.length, 1), `${plant.name} / AE`);
  const volumeGroups = buildExportVolumeGroups(data, plant);
  const volume = await snapshot(<div style={{ width: '100%' }}>
    {volumeGroups.map((group, index) => <div key={group.label ?? 'total'} style={{ height: 400 }}>
      {group.label ? <div style={{ height: 20, fontSize: 14, fontWeight: 600, textAlign: 'center' }}>{group.label}</div> : null}
      <VolumePacChart exportSize={{ width: 660, height: index === 0 ? 400 : 380 }} data={group.points} />
    </div>)}
  </div>, 660, volumeGroups.length, `${plant.name} / Volume & PAC`, volumeGroups.length * 400);
  const categoryNames = [...new Set([...data.productionMatrices.map((matrix) => matrix.categories), ...data.productionRecords.map((record) => record.categories)])];
  const fixedColors: Record<string, string> = { liquid: '#111111', melt: '#C80046', recycle: '#F39200', fg: '#0066B3' };
  const palette = ['#0066B3', '#D13438', '#F39200', '#107C10', '#00A6A6', '#8764B8', '#69797E'];
  const colors = Object.fromEntries(categoryNames.map((name, index) => [name.trim(), fixedColors[name.trim().toLowerCase()] ?? palette[index % palette.length]]));
  const monthly = async (type: 'Production' | 'Quality') => {
    const metrics = buildProductionQualityMetrics(data.productionRecords, data.productionMatrices, plant.id, type, data.year, Array.from({ length: 12 }, (_value, index) => index + 1));
    return snapshot(<div>
      <MetricChart exportSize={{ width: 1180, height: 330 }} metrics={metrics} points={metrics.months} colors={colors} />
      <div data-report-legend style={{ display: 'flex', gap: 16, padding: '8px 12px', flexWrap: 'wrap', fontSize: 12 }}>
        {metrics.series.map((series) => <span key={series.key}><span style={{ display: 'inline-block', width: 10, height: 10, marginRight: 5, backgroundColor: colors[series.name] }} />{series.name}</span>)}
        <span><span style={{ display: 'inline-block', width: 24, height: 3, marginRight: 5, verticalAlign: 'middle', backgroundColor: '#0066B3' }} />{metrics.lineName}</span>
      </div>
    </div>, 1200, 1, `${plant.name} / ${type}`);
  };
  const production = await monthly('Production');
  const quality = await monthly('Quality');
  return { ae, volume, production, quality };
}

``

---

## File: src/pages/MonthlyReportsPage/reportExportData.ts

- Size: 4959 bytes
- Last modified: 2026-10-09 13:59:18

``typescript
import type { KpiDefinition, MonthlyKpiResult, MonthlyReport, Plant, ReportCategory, Target } from '../../domain/models';
import type { AeCategory, AeRecord, ProductionKpiMatrix, ProductionKpiRecord, ProductionLine, ProductionLineMatrix, VolumePacRecord } from '../../domain/models/charts';
import { ReportType } from '../../domain/enums';
import { buildKpiMonthlyMatrixRows } from '../KPIOverviewPage/overviewMetrics';
import { aggregateVolumePac } from '../KPIComparisonPage/chartMetrics';
import type { MonthlyVolumePacPoint } from '../KPIComparisonPage/chartMetrics';

export interface MonthlyReportExportData {
  year: number;
  month: number;
  plants: Plant[];
  categories: ReportCategory[];
  reports: MonthlyReport[];
  kpis: KpiDefinition[];
  targets: Target[];
  monthlyResults: MonthlyKpiResult[];
  lines: ProductionLine[];
  lineMatrices: ProductionLineMatrix[];
  aeCategories: AeCategory[];
  aeRecords: AeRecord[];
  volumeRecords: VolumePacRecord[];
  productionMatrices: ProductionKpiMatrix[];
  productionRecords: ProductionKpiRecord[];
}

export interface ReportParagraph {
  text: string;
  kind: 'category' | 'highlights' | 'lowlights' | 'content';
}

export const sameExportId = (left: string, right: string) => left.replace(/[{}]/g, '').trim().toLowerCase() === right.replace(/[{}]/g, '').trim().toLowerCase();
export const reportCategoryKey = (name: string) => name.trim().toLowerCase().replace(/\s+/g, ' ');

export function buildExportParagraphs(data: MonthlyReportExportData, plantId: string, section: 'operations' | 'production' | 'quality'): ReportParagraph[] {
  const categories = [...data.categories].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name))
    .filter((category) => {
      const name = reportCategoryKey(category.name);
      return section === 'operations' ? name !== 'production update' && name !== 'quality update'
        : name === `${section} update`;
    });
  return categories.flatMap((category) => {
    const paragraphs: ReportParagraph[] = [{ text: category.name, kind: 'category' }];
    for (const type of [ReportType.Highlights, ReportType.Lowlights]) {
      const reports = data.reports.filter((report) => report.year === data.year && report.month === data.month
        && sameExportId(report.plantId, plantId) && sameExportId(report.categoryId, category.id)
        && report.type === type && report.content.trim())
        .sort((left, right) => left.displayOrder - right.displayOrder);
      if (reports.length === 0) continue;
      paragraphs.push({ text: type === ReportType.Highlights ? '+ Highlights:' : '- Lowlights:', kind: type === ReportType.Highlights ? 'highlights' : 'lowlights' });
      reports.forEach((report) => report.content.split(/\r?\n/).filter((line) => line.trim())
        .forEach((line) => paragraphs.push({ text: line, kind: 'content' })));
    }
    return paragraphs;
  });
}

export function buildExportKpiRows(data: MonthlyReportExportData, plant: Plant) {
  const targets = data.targets.filter((target) => target.targetYear === data.year);
  const results = data.monthlyResults.filter((result) => result.year === data.year);
  return buildKpiMonthlyMatrixRows([plant], data.kpis, targets, results, data.month);
}

export function orderedExportPlants(data: MonthlyReportExportData): Plant[] {
  return [...data.plants].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
}

export function buildExportVolumeGroups(data: MonthlyReportExportData, plant: Plant): Array<{ label: string | null; points: MonthlyVolumePacPoint[] }> {
  const records = data.volumeRecords.filter((record) => sameExportId(record.plantId, plant.id) && record.year === data.year);
  const volumeKpi = data.kpis.find((kpi) => kpi.name.trim().toLowerCase() === 'production volume');
  const operatingPlan = data.targets.find((target) => sameExportId(target.plantId, plant.id) && target.targetYear === data.year
    && volumeKpi && sameExportId(target.kpiId, volumeKpi.id))?.cyTarget ?? null;
  const groups: Array<{ label: string | null; points: MonthlyVolumePacPoint[] }> = [
    { label: null, points: aggregateVolumePac(records, [], [], operatingPlan) },
  ];
  const lineGroups = plant.name.trim().toLowerCase() === 'pudong-tpu' ? [['Belt-DE', 'REX'], ['FHF']]
    : plant.name.trim().toLowerCase() === 'changhua-tpu' ? [['Belt-Cast'], ['REX']] : [];
  for (const names of lineGroups) {
    const lineIds = data.lines.filter((line) => names.some((name) => name.toLowerCase() === line.name.trim().toLowerCase())).map((line) => line.id);
    const selected = records.filter((record) => lineIds.some((id) => sameExportId(id, record.productionLineId)));
    groups.push({ label: names.join(' + '), points: aggregateVolumePac(selected, [], []).filter((point) => point.month !== 0) });
  }
  return groups;
}

``

---

## File: src/pages/MonthlyReportsPage/reportGroups.ts

- Size: 1055 bytes
- Last modified: 2026-09-13 23:49:34

``typescript
import { ReportType } from '../../domain/enums';
import type { MonthlyReport, ReportCategory } from '../../domain/models';

export interface ReportGroup {
  category: ReportCategory;
  highlights?: MonthlyReport;
  lowlights?: MonthlyReport;
}

export function groupMonthlyReports(
  categories: ReportCategory[],
  reports: MonthlyReport[],
): ReportGroup[] {
  const reportsByCategory = new Map<string, MonthlyReport[]>();
  reports.forEach((report) => {
    const current = reportsByCategory.get(report.categoryId) ?? [];
    reportsByCategory.set(report.categoryId, [...current, report]);
  });

  return [...categories]
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .map((category) => {
      const categoryReports = reportsByCategory.get(category.id) ?? [];
      return {
        category,
        highlights: categoryReports.find((report) => report.type === ReportType.Highlights),
        lowlights: categoryReports.find((report) => report.type === ReportType.Lowlights),
      };
    });
}

``

---

## File: src/pages/MonthlyReportsPage/reportPowerPoint.ts

- Size: 21924 bytes
- Last modified: 2026-10-09 16:42:48

``typescript
import JSZip from 'jszip';
import type { Plant } from '../../domain/models';
import { buildExportKpiRows, buildExportParagraphs, orderedExportPlants } from './reportExportData';
import type { MonthlyReportExportData, ReportParagraph } from './reportExportData';

const NS = {
  a: 'http://schemas.openxmlformats.org/drawingml/2006/main',
  p: 'http://schemas.openxmlformats.org/presentationml/2006/main',
  r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
  rel: 'http://schemas.openxmlformats.org/package/2006/relationships',
  content: 'http://schemas.openxmlformats.org/package/2006/content-types',
};
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export interface ExportImage { dataUrl: string; width: number; height: number }
export interface PlantReportImages { ae: ExportImage; volume: ExportImage; production: ExportImage; quality: ExportImage }
interface ImageBox { x: number; y: number; width: number; height: number }

const nodes = (parent: Document | Element, namespace: string, name: string) => Array.from(parent.getElementsByTagNameNS(namespace, name));
const first = (parent: Document | Element, namespace: string, name: string) => nodes(parent, namespace, name)[0];
const xml = (value: string) => {
  const document = new DOMParser().parseFromString(value, 'application/xml');
  if (document.getElementsByTagName('parsererror').length) throw new Error('The PowerPoint template contains invalid XML.');
  return document;
};
const serialize = (document: Document) => new XMLSerializer().serializeToString(document);
const element = (document: Document, namespace: string, name: string, attributes: Record<string, string | number> = {}) => {
  const value = document.createElementNS(namespace, name);
  Object.entries(attributes).forEach(([key, attribute]) => value.setAttribute(key, String(attribute)));
  return value;
};
async function readXml(zip: JSZip, path: string) {
  const file = zip.file(path);
  if (!file) throw new Error(`The report template is missing ${path}.`);
  return xml(await file.async('string'));
}
function shapeById(document: Document, id: number): Element {
  const tree = first(document, NS.p, 'spTree');
  const shape = Array.from(tree.children).find((child) => first(child, NS.p, 'cNvPr')?.getAttribute('id') === String(id));
  if (!shape) throw new Error(`The report template has changed: shape ${id} was not found.`);
  return shape;
}
function boxOf(shape: Element): ImageBox {
  const transform = first(shape, NS.a, 'xfrm') ?? first(shape, NS.p, 'xfrm');
  const offset = first(transform, NS.a, 'off');
  const extent = first(transform, NS.a, 'ext');
  return { x: Number(offset.getAttribute('x')), y: Number(offset.getAttribute('y')), width: Number(extent.getAttribute('cx')), height: Number(extent.getAttribute('cy')) };
}
export function fitReportImage(image: ExportImage, box: ImageBox, alignment: 'center' | 'top' | 'top-right' = 'center'): ImageBox {
  const scale = Math.min(box.width / image.width, box.height / image.height);
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);
  return { x: Math.round(box.x + (alignment === 'top-right' ? box.width - width : (box.width - width) / 2)), y: alignment === 'center' ? Math.round(box.y + (box.height - height) / 2) : box.y, width, height };
}
function removeMarkers(document: Document) {
  const tree = first(document, NS.p, 'spTree');
  Array.from(tree.children).forEach((shape) => {
    const properties = Array.from(shape.children).find((child) => child.localName === 'spPr');
    const line = properties && Array.from(properties.children).find((child) => child.localName === 'ln');
    if (line && nodes(line, NS.a, 'srgbClr').some((color) => ['FF0000', 'C00000'].includes(color.getAttribute('val')?.toUpperCase() ?? ''))) shape.remove();
  });
}
function replaceText(shape: Element, text: string) {
  const texts = nodes(shape, NS.a, 't');
  if (!texts.length) {
    const paragraph = first(shape, NS.a, 'p');
    if (!paragraph) throw new Error('A report text placeholder is missing.');
    const document = shape.ownerDocument;
    const run = element(document, NS.a, 'a:r');
    const properties = element(document, NS.a, 'a:rPr');
    const original = first(paragraph, NS.a, 'endParaRPr');
    if (original) {
      Array.from(original.attributes).forEach((attribute) => properties.setAttributeNS(attribute.namespaceURI, attribute.name, attribute.value));
      Array.from(original.childNodes).forEach((child) => properties.appendChild(child.cloneNode(true)));
    }
    run.appendChild(properties);
    const value = element(document, NS.a, 'a:t');
    run.appendChild(value);
    paragraph.insertBefore(run, original ?? null);
    texts.push(value);
  }
  texts[0].textContent = text;
  texts.slice(1).forEach((value) => { value.textContent = ''; });
  const body = first(shape, NS.a, 'bodyPr');
  if (body) {
    Array.from(body.children).filter((child) => ['noAutofit', 'spAutoFit', 'normAutofit'].includes(child.localName)).forEach((child) => child.remove());
    body.appendChild(element(shape.ownerDocument, NS.a, 'a:normAutofit'));
  }
}
function updatePlantTitle(document: Document, id: number, plant: Plant) {
  const shape = shapeById(document, id);
  const title = nodes(shape, NS.a, 't').map((text) => text.textContent ?? '').join('');
  replaceText(shape, title.replace('Shanghai', plant.name));
}

function widenReportTitle(document: Document, slideWidth: number) {
  const shape = shapeById(document, 2);
  const transform = first(shape, NS.a, 'xfrm');
  const left = Number(first(transform, NS.a, 'off').getAttribute('x'));
  first(transform, NS.a, 'ext').setAttribute('cx', String(slideWidth - left));
  first(shape, NS.a, 'bodyPr').setAttribute('wrap', 'none');
}

function fitParagraphFont(paragraphs: ReportParagraph[], box: ImageBox, preferred: number): number {
  const widthPoints = Math.max(10, box.width / 12700 - 24);
  const heightPoints = Math.max(10, box.height / 12700 - 12);
  const canvas = typeof CanvasRenderingContext2D !== 'undefined' ? document.createElement('canvas') : null;
  const context = canvas?.getContext('2d');
  for (let size = preferred; size >= 1; size -= 0.5) {
    if (context) context.font = `${size * 96 / 72}px Arial`;
    const measure = (text: string) => context ? context.measureText(text).width * 72 / 96 : Array.from(text).reduce((width, character) => width + (character.charCodeAt(0) > 127 ? size : size * 0.55), 0);
    let lineCount = 0;
    for (const paragraph of paragraphs) {
      let lineWidth = 0;
      lineCount += 1;
      for (const word of paragraph.text.split(/(\s+)/)) {
        const wordWidth = measure(word);
        if (lineWidth > 0 && lineWidth + wordWidth > widthPoints) { lineCount += 1; lineWidth = 0; }
        if (wordWidth > widthPoints) lineCount += Math.ceil(wordWidth / widthPoints) - 1;
        lineWidth += wordWidth % widthPoints;
      }
    }
    if (lineCount * size * 1.3 <= heightPoints) return size;
  }
  return 1;
}
function fillReportText(document: Document, id: number, paragraphs: ReportParagraph[]) {
  const shape = shapeById(document, id);
  const body = first(shape, NS.p, 'txBody');
  const originals = nodes(body, NS.a, 'p');
  const baseRun = first(body, NS.a, 'rPr');
  const fontSize = fitParagraphFont(paragraphs, boxOf(shape), Number(baseRun?.getAttribute('sz') ?? 1600) / 100);
  originals.forEach((paragraph) => paragraph.remove());
  for (const paragraph of paragraphs) {
    const value = element(document, NS.a, 'a:p');
    const properties = element(document, NS.a, 'a:pPr', { marL: 0, indent: 0 });
    properties.appendChild(element(document, NS.a, 'a:buNone'));
    const lineSpacing = element(document, NS.a, 'a:lnSpc');
    lineSpacing.appendChild(element(document, NS.a, 'a:spcPct', { val: 110000 }));
    properties.appendChild(lineSpacing);
    value.appendChild(properties);
    const run = element(document, NS.a, 'a:r');
    const runProperties = baseRun ? baseRun.cloneNode(true) as Element : element(document, NS.a, 'a:rPr');
    runProperties.setAttribute('sz', String(Math.round(fontSize * 100)));
    runProperties.setAttribute('b', paragraph.kind === 'content' ? '0' : '1');
    nodes(runProperties, NS.a, 'solidFill').forEach((fill) => fill.remove());
    const fill = element(document, NS.a, 'a:solidFill');
    fill.appendChild(element(document, NS.a, 'a:srgbClr', { val: '000000' }));
    runProperties.appendChild(fill);
    run.appendChild(runProperties);
    const text = element(document, NS.a, 'a:t');
    text.textContent = paragraph.kind === 'content' ? `o  ${paragraph.text}` : paragraph.text;
    run.appendChild(text);
    value.appendChild(run);
    body.appendChild(value);
  }
  if (paragraphs.length === 0) body.appendChild(element(document, NS.a, 'a:p'));
  const bodyProperties = first(body, NS.a, 'bodyPr');
  bodyProperties.setAttribute('wrap', 'square');
  Array.from(bodyProperties.children).filter((child) => ['noAutofit', 'spAutoFit', 'normAutofit'].includes(child.localName)).forEach((child) => child.remove());
  bodyProperties.appendChild(element(document, NS.a, 'a:normAutofit', { fontScale: 100000, lnSpcReduction: 0 }));
}

function fillKpiTable(document: Document, data: MonthlyReportExportData, plant: Plant, slidePosition: number, slideHeight: number) {
  const shape = shapeById(document, 8);
  const table = first(shape, NS.a, 'tbl');
  const templateRows = nodes(table, NS.a, 'tr');
  const header = templateRows[0].cloneNode(true) as Element;
  const rowTemplate = templateRows[1];
  const headerHeight = Number(header.getAttribute('h'));
  const rowHeight = Number(rowTemplate.getAttribute('h'));
  const columnWidths = nodes(table, NS.a, 'gridCol').map((column) => Number(column.getAttribute('w')) / 12700);
  const rows = buildExportKpiRows(data, plant);
  const headings = ['Plant KPI', 'Unit', `${data.year - 1}\nActual`, `${data.year}\nTarget`, ...MONTHS, 'YTD'];
  const format = (value: number | null | undefined) => value == null ? '' : value.toFixed(2);
  const values = rows.map((row) => [row.kpi.name, row.kpi.unit, format(row.target?.pyActual), format(row.target?.cyTarget), ...row.monthlyActuals.map(format), format(row.ytdActual)]);
  templateRows.forEach((row) => row.remove());
  const originalBox = boxOf(shape);
  const totalHeight = Math.min(originalBox.height, slideHeight - originalBox.y - 127000);
  const heightScale = Math.min(1, totalHeight / (headerHeight + rowHeight * values.length));
  const cellRows = [headings, ...values];
  let fontSize = 1;
  for (let candidate = 10; candidate >= 1; candidate -= 0.25) {
    const fits = cellRows.every((cells, rowIndex) => {
      const heightPoints = (rowIndex === 0 ? headerHeight : rowHeight) * heightScale / 12700;
      return cells.every((text, columnIndex) => {
        const widthPoints = Math.max(1, columnWidths[columnIndex] - 14);
        const widths = text.split('\n').map((line) => Array.from(line).reduce((width, character) => width + (character.charCodeAt(0) > 127 ? candidate : candidate * 0.62), 0));
        const lineCount = widths.reduce((count, width) => count + (columnIndex === 0 ? Math.max(1, Math.ceil(width / widthPoints)) : 1), 0);
        return (columnIndex === 0 || widths.every((width) => width <= widthPoints)) && lineCount * candidate * 1.3 + 8 <= heightPoints;
      });
    });
    if (fits) { fontSize = candidate; break; }
  }
  let fittedHeight = 0;
  cellRows.forEach((cells, index) => {
    const row = index === 0 ? header : rowTemplate.cloneNode(true) as Element;
    const height = Math.floor((index === 0 ? headerHeight : rowHeight) * heightScale);
    row.setAttribute('h', String(height));
    fittedHeight += height;
    const tableCells = nodes(row, NS.a, 'tc');
    if (tableCells.length !== headings.length) throw new Error('The KPI table template must contain 17 columns.');
    tableCells.forEach((cell, cellIndex) => {
      replaceText(cell, cells[cellIndex]);
      nodes(cell, NS.a, 'p').slice(1).forEach((paragraph) => paragraph.remove());
      nodes(cell, NS.a, 'r').filter((run) => !first(run, NS.a, 't')?.textContent).forEach((run) => run.remove());
      const paragraph = first(cell, NS.a, 'p');
      let paragraphProperties = first(paragraph, NS.a, 'pPr');
      if (!paragraphProperties) {
        paragraphProperties = element(document, NS.a, 'a:pPr');
        paragraph.insertBefore(paragraphProperties, paragraph.firstChild);
      }
      if (!first(paragraphProperties, NS.a, 'defRPr')) paragraphProperties.appendChild(element(document, NS.a, 'a:defRPr'));
      if (!first(paragraph, NS.a, 'endParaRPr')) paragraph.appendChild(element(document, NS.a, 'a:endParaRPr'));
      for (const name of ['rPr', 'endParaRPr', 'defRPr']) nodes(cell, NS.a, name).forEach((properties) => properties.setAttribute('sz', String(Math.round(fontSize * 100))));
      const body = first(cell, NS.a, 'bodyPr');
      body.setAttribute('wrap', cellIndex === 0 ? 'square' : 'none');
      Array.from(body.children).filter((child) => ['normAutofit', 'spAutoFit', 'noAutofit'].includes(child.localName)).forEach((child) => child.remove());
      body.appendChild(element(document, NS.a, 'a:noAutofit'));
    });
    table.appendChild(row);
  });
  first(first(shape, NS.p, 'xfrm'), NS.a, 'ext').setAttribute('cy', String(fittedHeight));
  replaceText(shapeById(document, 3), String(slidePosition));
}

function addPng(zip: JSZip, document: Document, relationships: Document, region: ImageBox, image: ExportImage, name: string, alignment: 'center' | 'top' | 'top-right' = 'center') {
  if (!image.dataUrl.startsWith('data:image/png;base64,')) throw new Error('An exported chart is not a PNG image.');
  zip.file(`ppt/media/${name}.png`, image.dataUrl.split(',')[1], { base64: true });
  const relationshipId = `rId${name}`;
  relationships.documentElement.appendChild(element(relationships, NS.rel, 'Relationship', { Id: relationshipId, Type: `${NS.r}/image`, Target: `../media/${name}.png` }));
  const tree = first(document, NS.p, 'spTree');
  const nextId = Math.max(1, ...nodes(tree, NS.p, 'cNvPr').map((properties) => Number(properties.getAttribute('id')))) + 1;
  const picture = element(document, NS.p, 'p:pic');
  const nonVisual = element(document, NS.p, 'p:nvPicPr');
  nonVisual.appendChild(element(document, NS.p, 'p:cNvPr', { id: nextId, name }));
  const pictureProperties = element(document, NS.p, 'p:cNvPicPr');
  pictureProperties.appendChild(element(document, NS.a, 'a:picLocks', { noChangeAspect: 1 }));
  nonVisual.appendChild(pictureProperties);
  nonVisual.appendChild(element(document, NS.p, 'p:nvPr'));
  picture.appendChild(nonVisual);
  const fill = element(document, NS.p, 'p:blipFill');
  const blip = element(document, NS.a, 'a:blip');
  blip.setAttributeNS(NS.r, 'r:embed', relationshipId);
  fill.appendChild(blip);
  const stretch = element(document, NS.a, 'a:stretch');
  stretch.appendChild(element(document, NS.a, 'a:fillRect'));
  fill.appendChild(stretch);
  picture.appendChild(fill);
  const properties = element(document, NS.p, 'p:spPr');
  const fitted = fitReportImage(image, region, alignment);
  const transform = element(document, NS.a, 'a:xfrm');
  transform.appendChild(element(document, NS.a, 'a:off', { x: fitted.x, y: fitted.y }));
  transform.appendChild(element(document, NS.a, 'a:ext', { cx: fitted.width, cy: fitted.height }));
  properties.appendChild(transform);
  const geometry = element(document, NS.a, 'a:prstGeom', { prst: 'rect' });
  geometry.appendChild(element(document, NS.a, 'a:avLst'));
  properties.appendChild(geometry);
  picture.appendChild(properties);
  const extensions = Array.from(tree.children).find((child) => child.localName === 'extLst');
  tree.insertBefore(picture, extensions ?? null);
}

export async function buildMonthlyReportPowerPoint(
  template: ArrayBuffer | Uint8Array,
  data: MonthlyReportExportData,
  renderPlant: (plant: Plant) => Promise<PlantReportImages>,
  onProgress: (message: string) => void = () => {},
): Promise<Uint8Array> {
  const zip = await JSZip.loadAsync(template);
  const presentation = await readXml(zip, 'ppt/presentation.xml');
  const relationships = await readXml(zip, 'ppt/_rels/presentation.xml.rels');
  const contentTypes = await readXml(zip, '[Content_Types].xml');
  const slideSize = first(presentation, NS.p, 'sldSz');
  const slideWidth = Number(slideSize.getAttribute('cx'));
  const slideHeight = Number(slideSize.getAttribute('cy'));
  const slideIds = first(presentation, NS.p, 'sldIdLst');
  if (slideIds.children.length !== 6) throw new Error('The monthly report template must contain six slides.');
  const plants = orderedExportPlants(data);
  if (plants.length === 0) throw new Error('No plants are available to export.');
  nodes(relationships, NS.rel, 'Relationship').filter((relationship) => relationship.getAttribute('Type') === `${NS.r}/slide`).forEach((relationship) => relationship.remove());
  slideIds.replaceChildren();
  let position = 0;
  const appendSlide = (number: number) => {
    position += 1;
    const relationId = `rIdReportSlide${position}`;
    const slide = element(presentation, NS.p, 'p:sldId', { id: 255 + position });
    slide.setAttributeNS(NS.r, 'r:id', relationId);
    slideIds.appendChild(slide);
    relationships.documentElement.appendChild(element(relationships, NS.rel, 'Relationship', { Id: relationId, Type: `${NS.r}/slide`, Target: `slides/slide${number}.xml` }));
  };
  appendSlide(1);
  for (const [plantIndex, plant] of plants.entries()) {
    onProgress(`Exporting ${plant.name} (${plantIndex + 1}/${plants.length})`);
    const images = await renderPlant(plant);
    for (const templateNumber of [2, 3, 4, 5]) {
      const slideNumber = 7 + plantIndex * 4 + templateNumber - 2;
      const document = await readXml(zip, `ppt/slides/slide${templateNumber}.xml`);
      const slideRelationships = await readXml(zip, `ppt/slides/_rels/slide${templateNumber}.xml.rels`);
      nodes(document, NS.p, 'custDataLst').forEach((value) => value.remove());
      nodes(slideRelationships, NS.rel, 'Relationship').filter((relationship) => /\/(notesSlide|comments|tags)$/.test(relationship.getAttribute('Type') ?? '')).forEach((relationship) => relationship.remove());
      if (templateNumber === 2) {
        const aeRegion = boxOf(shapeById(document, 15));
        const volumeRegion = boxOf(shapeById(document, 33));
        const title = shapeById(document, 4);
        replaceText(title, nodes(title, NS.a, 't').map((text) => text.textContent ?? '').join('').replace(/Sep\s*2026/, `${MONTHS[data.month - 1]} ${data.year}`));
        replaceText(shapeById(document, 18), plant.name);
        fillReportText(document, 3, buildExportParagraphs(data, plant.id, 'operations'));
        for (const id of [17, 23, 5, 25, 28, 26, 27, 29, 30, 31, 21, 22, 6]) shapeById(document, id).remove();
        const narrowAeRegion = { ...aeRegion, x: aeRegion.x + aeRegion.width * 0.25, width: aeRegion.width * 0.75 };
        addPng(zip, document, slideRelationships, narrowAeRegion, images.ae, `report${slideNumber}ae`, 'top-right');
        addPng(zip, document, slideRelationships, volumeRegion, images.volume, `report${slideNumber}volume`, 'top');
      } else if (templateNumber === 3 || templateNumber === 4) {
        const production = templateNumber === 3;
        const chartRegion = boxOf(shapeById(document, production ? 14 : 22));
        updatePlantTitle(document, 2, plant);
        widenReportTitle(document, slideWidth);
        fillReportText(document, production ? 10 : 17, buildExportParagraphs(data, plant.id, production ? 'production' : 'quality'));
        shapeById(document, production ? 12 : 6).remove();
        addPng(zip, document, slideRelationships, chartRegion, production ? images.production : images.quality, `report${slideNumber}chart`);
      } else {
        updatePlantTitle(document, 2, plant);
        fillKpiTable(document, data, plant, position + 1, slideHeight);
      }
      removeMarkers(document);
      appendSlide(slideNumber);
      zip.file(`ppt/slides/slide${slideNumber}.xml`, serialize(document));
      zip.file(`ppt/slides/_rels/slide${slideNumber}.xml.rels`, serialize(slideRelationships));
      contentTypes.documentElement.appendChild(element(contentTypes, NS.content, 'Override', { PartName: `/ppt/slides/slide${slideNumber}.xml`, ContentType: 'application/vnd.openxmlformats-officedocument.presentationml.slide+xml' }));
    }
  }
  appendSlide(6);
  if (!nodes(contentTypes, NS.content, 'Default').some((value) => value.getAttribute('Extension') === 'png')) contentTypes.documentElement.appendChild(element(contentTypes, NS.content, 'Default', { Extension: 'png', ContentType: 'image/png' }));
  nodes(presentation, NS.p, 'custShowLst').forEach((value) => value.remove());
  Array.from(presentation.getElementsByTagName('*')).filter((value) => value.localName === 'sectionLst').forEach((value) => value.remove());
  zip.file('ppt/presentation.xml', serialize(presentation));
  zip.file('ppt/_rels/presentation.xml.rels', serialize(relationships));
  zip.file('[Content_Types].xml', serialize(contentTypes));
  const properties = await readXml(zip, 'docProps/app.xml');
  const slides = Array.from(properties.getElementsByTagName('*')).find((value) => value.localName === 'Slides');
  if (slides) slides.textContent = String(position);
  zip.file('docProps/app.xml', serialize(properties));
  onProgress('Preparing PowerPoint download');
  return zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
}

``

---

## File: src/pages/MonthlyReportsPage/reportSave.ts

- Size: 1541 bytes
- Last modified: 2026-10-08 23:04:25

``typescript
export const REPORT_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

export interface ReportSaveHandle {
  createWritable(): Promise<{
    write(data: Blob): Promise<void>;
    close(): Promise<void>;
    abort(): Promise<void>;
  }>;
}

type ReportSaveWindow = Window & {
  showSaveFilePicker?: (options: {
    suggestedName: string;
    types: Array<{ description: string; accept: Record<string, string[]> }>;
  }) => Promise<ReportSaveHandle>;
};

export function reportFileName(year: number, month: number): string {
  return `TPU monthly report_${year}_${String(month).padStart(2, '0')}.pptx`;
}

export async function pickReportSaveLocation(fileName: string): Promise<ReportSaveHandle | null> {
  const browser = window as ReportSaveWindow;
  if (!browser.showSaveFilePicker) return null;
  try {
    return await browser.showSaveFilePicker({
      suggestedName: fileName,
      types: [{ description: 'PowerPoint Presentation', accept: { [REPORT_MIME_TYPE]: ['.pptx'] } }],
    });
  } catch (failure) {
    if (failure instanceof DOMException && ['SecurityError', 'NotAllowedError'].includes(failure.name)) return null;
    throw failure;
  }
}

export async function writeReportFile(handle: ReportSaveHandle, blob: Blob): Promise<void> {
  const writable = await handle.createWritable();
  try {
    await writable.write(blob);
    await writable.close();
  } catch (failure) {
    await writable.abort().catch(() => {});
    throw failure;
  }
}

``

---

## File: src/pages/MonthlyReportsPage/reportView.ts

- Size: 1665 bytes
- Last modified: 2026-09-26 12:57:01

``typescript
import { ReportType } from '../../domain/enums';
import type { MonthlyReport, ReportCategory, Plant } from '../../domain/models';

export interface PlantReportGroup {
  plant: Plant;
  categories: Array<{
    category: ReportCategory;
    highlights?: MonthlyReport;
    lowlights?: MonthlyReport;
  }>;
}

export function filterMonthlyReports(
  reports: MonthlyReport[],
  filter: { plantIds: string[]; categoryIds: string[]; types: string[] },
): MonthlyReport[] {
  return reports.filter((report) =>
    (filter.plantIds.length === 0 || filter.plantIds.includes(report.plantId))
    && (filter.categoryIds.length === 0 || filter.categoryIds.includes(report.categoryId))
    && (filter.types.length === 0 || filter.types.includes(report.type)),
  );
}

export function groupReportsByPlantAndCategory(
  plants: Plant[],
  categories: ReportCategory[],
  reports: MonthlyReport[],
): PlantReportGroup[] {
  return [...plants]
    .sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name))
    .map((plant) => ({
    plant,
    categories: [...categories]
      .sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name))
      .map((category) => {
        const categoryReports = reports.filter((report) => report.plantId === plant.id && report.categoryId === category.id);
        return {
          category,
          highlights: categoryReports.find((report) => report.type === ReportType.Highlights),
          lowlights: categoryReports.find((report) => report.type === ReportType.Lowlights),
        };
        })
      }));
}

``

---

## File: src/pages/ProductionDataEntryPage/ProductionDataEntryPage.tsx

- Size: 13589 bytes
- Last modified: 2026-10-07 21:21:05

``tsx
import { useState } from 'react';
import { Button, Card, Combobox, Input, Label, Option, Subtitle2, Tag, TagGroup, Text, makeStyles, tokens } from '@fluentui/react-components';
import { ArrowReset24Regular, Dismiss24Regular, Edit24Regular, Save24Regular } from '@fluentui/react-icons';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { useAllTargets, usePlants, useProductionKpiMatrices, useProductionKpiRecords, useSaveProductionKpis } from '../../hooks/queries';
import { useAppToast } from '../../hooks/useAppToast';
import { getPreviousPeriod } from '../../domain/services/period';
import { buildProductionRows, buildProductionSavePayload, calculateProductionRatios, calculateProductionSummary, isCalculatedProductionQuantity } from './productionRows';
import type { ProductionFilters } from './productionRows';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
type FilterOption = { value: string; label: string };

const useStyles = makeStyles({
  page: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', gap: tokens.spacingVerticalL },
  filters: { display: 'flex', flexDirection: 'column', flexShrink: 0, gap: tokens.spacingVerticalS, padding: tokens.spacingHorizontalM, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium, boxShadow: tokens.shadow2 },
  filterRow: { display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', columnGap: tokens.spacingHorizontalM, rowGap: tokens.spacingVerticalM },
  filter: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, flex: '1 1 180px', minWidth: 0, maxWidth: '220px' },
  filterControl: { width: '100%', minWidth: 0, boxSizing: 'border-box' },
  reset: { marginLeft: 'auto', flexShrink: 0 },
  activeFilters: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacingHorizontalS },
  activeTags: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalXS, minWidth: 0 },
  toolbar: { display: 'flex', justifyContent: 'flex-end', gap: tokens.spacingHorizontalS, flexShrink: 0 },
  dataArea: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'auto', gap: tokens.spacingVerticalL },
  plantSection: { display: 'flex', flexDirection: 'column', flexShrink: 0, gap: tokens.spacingVerticalM },
  typeSection: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS },
  plantHeading: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightSemibold },
  tableScroll: { display: 'block', padding: 0, overflowX: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium },
  table: { width: '100%', minWidth: '800px', tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: 0 },
  cell: { padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`, textAlign: 'left', borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, overflowWrap: 'anywhere' },
  header: { backgroundColor: tokens.colorNeutralBackground3, fontWeight: tokens.fontWeightSemibold },
  input: { width: '100%', minWidth: 0, boxSizing: 'border-box' },
});

function MultiSelectFilter({ label, options, selected, placeholder, disabled, multiSelect = true, onChange }: {
  label: string;
  options: FilterOption[];
  selected: string[];
  placeholder: string;
  disabled: boolean;
  multiSelect?: boolean;
  onChange: (selected: string[]) => void;
}) {
  const styles = useStyles();
  const [search, setSearch] = useState('');
  const selectedLabel = selected.length === 0 ? placeholder : options.filter((option) => selected.includes(option.value)).map((option) => option.label).join(', ');
  const matching = options.filter((option) => option.label.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
  return <div className={styles.filter}>
    <Label size="small">{label}</Label>
    <Combobox
      className={styles.filterControl}
      aria-label={label}
      multiselect={multiSelect}
      disabled={disabled}
      placeholder={selectedLabel}
      value={search}
      selectedOptions={selected}
      onChange={(event) => { const value = event.currentTarget.value; setSearch(value); }}
      onOptionSelect={(_event, data) => { onChange(multiSelect ? data.selectedOptions : data.selectedOptions.slice(-1)); setSearch(''); }}
      onBlur={() => setSearch('')}
    >
      {matching.map((option) => <Option key={option.value} value={option.value} text={option.label}>{option.label}</Option>)}
      {matching.length === 0 ? <Option disabled>No matches</Option> : null}
    </Combobox>
  </div>;
}

export function ProductionDataEntryPage() {
  const styles = useStyles();
  const { notifySuccess, notifyError } = useAppToast();
  const [filters, setFilters] = useState<ProductionFilters>(() => {
    const period = getPreviousPeriod();
    return { years: [period.year], months: [period.month], plantIds: [], categories: [] };
  });
  const [editing, setEditing] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const plantsQuery = usePlants();
  const targetsQuery = useAllTargets();
  const matricesQuery = useProductionKpiMatrices();
  const recordsQuery = useProductionKpiRecords(filters.plantIds.length > 0);
  const saveMutation = useSaveProductionKpis();

  const plants = [...(plantsQuery.data ?? [])].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  const matrices = [...(matricesQuery.data ?? [])].sort((left, right) => left.displayOrder - right.displayOrder || left.categories.localeCompare(right.categories));
  const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear).concat(new Date().getFullYear(), getPreviousPeriod().year))].sort((left, right) => left - right);
  const categoryNames = [...new Set(matrices.map((matrix) => matrix.categories).filter(Boolean))];
  const referenceRows = buildProductionRows(plants, matrices, recordsQuery.data ?? [], { ...filters, categories: [] });
  const rows = calculateProductionRatios(referenceRows, drafts, matrices)
    .filter((row) => filters.categories.length === 0 || filters.categories.includes(row.categories));
  const loading = plantsQuery.isLoading || targetsQuery.isLoading || matricesQuery.isLoading || (filters.plantIds.length > 0 && recordsQuery.isLoading);
  const error = plantsQuery.error || targetsQuery.error || matricesQuery.error || (filters.plantIds.length > 0 ? recordsQuery.error : null);
  const locked = editing || saveMutation.isPending;

  const changeFilter = (next: ProductionFilters) => { setFilters(next); setDrafts({}); };
  const resetFilters = () => {
    const period = getPreviousPeriod();
    changeFilter({ years: [period.year], months: [period.month], plantIds: [], categories: [] });
  };
  const activeFilters = [
    ...filters.years.map((year) => `Year: ${year}`),
    ...filters.months.map((month) => `Month: ${months[month - 1]}`),
    ...plants.filter((plant) => filters.plantIds.includes(plant.id)).map((plant) => `Plant: ${plant.name}`),
    ...filters.categories.map((category) => `Categories: ${category}`),
  ];
  const save = async () => {
    if (!editing || saveMutation.isPending) return;
    try {
      const payload = buildProductionSavePayload(rows, drafts, referenceRows, matrices);
      await saveMutation.mutateAsync(payload);
      setEditing(false);
      setDrafts({});
      notifySuccess('Production data saved', `${payload.length} record(s) saved.`);
    } catch (failure) {
      notifyError('Save failed', failure instanceof Error ? failure.message : 'Production data could not be saved.');
    }
  };

  return <div className={styles.page}>
    <PageHeader title="Production Data Entry" />
    <div className={styles.filters}>
      <div className={styles.filterRow}>
      <MultiSelectFilter label="Year" placeholder="Select Year" options={years.map((year) => ({ value: String(year), label: String(year) }))} selected={filters.years.map(String)} disabled={locked} onChange={(selected) => changeFilter({ ...filters, years: selected.map(Number) })} />
      <MultiSelectFilter label="Month" placeholder="Select Month" options={months.map((month, index) => ({ value: String(index + 1), label: month }))} selected={filters.months.map(String)} disabled={locked} onChange={(selected) => changeFilter({ ...filters, months: selected.map(Number) })} />
      <MultiSelectFilter label="Plant" placeholder="Select Plant" options={plants.map((plant) => ({ value: plant.id, label: plant.name }))} selected={filters.plantIds} disabled={locked} multiSelect={false} onChange={(selected) => changeFilter({ ...filters, plantIds: selected })} />
      <MultiSelectFilter label="Categories" placeholder="All Categories" options={categoryNames.map((category) => ({ value: category, label: category }))} selected={filters.categories} disabled={locked} onChange={(selected) => changeFilter({ ...filters, categories: selected })} />
      <Button className={styles.reset} appearance="subtle" icon={<ArrowReset24Regular />} disabled={locked} onClick={resetFilters}>Reset</Button>
      </div>
      <div className={styles.activeFilters}>
        <Text size={200}>Active:</Text>
        <TagGroup className={styles.activeTags} aria-label="Active filters">
          {activeFilters.map((label) => <Tag key={label} size="small">{label}</Tag>)}
        </TagGroup>
      </div>
    </div>
    <div className={styles.toolbar}>
      {editing ? <Button icon={<Dismiss24Regular />} disabled={saveMutation.isPending} onClick={() => { setEditing(false); setDrafts({}); }}>Cancel</Button> : null}
      <Button icon={<Edit24Regular />} disabled={locked || loading || Boolean(error) || rows.length === 0} onClick={() => { setDrafts({}); setEditing(true); }}>Edit</Button>
      <Button appearance="primary" icon={<Save24Regular />} disabled={!editing || saveMutation.isPending || loading || Boolean(error)} onClick={() => void save()}>{saveMutation.isPending ? 'Saving...' : 'Save'}</Button>
    </div>
    <div className={styles.dataArea}>
      {error ? <ErrorState message={error instanceof Error ? error.message : 'Production data could not be loaded.'} /> : null}
      {loading ? <LoadingSkeleton rows={6} /> : null}
      {!loading && !error && filters.plantIds.length === 0 ? <EmptyState title="Select a plant" message="Choose a plant to load its production entry rows." /> : null}
      {!loading && !error && filters.plantIds.length > 0 && (filters.years.length === 0 || filters.months.length === 0) ? <EmptyState title="Select a year and month" /> : null}
      {!loading && !error && filters.plantIds.length > 0 && filters.years.length > 0 && filters.months.length > 0 && rows.length === 0 ? <EmptyState title="No production rows available" /> : null}
      {!loading && !error ? plants.filter((plant) => rows.some((row) => row.plantId === plant.id)).map((plant) => <section className={styles.plantSection} key={plant.id}>
        <Subtitle2 className={styles.plantHeading}>{plant.name}</Subtitle2>
        {(['Production', 'Quality'] as const).map((type) => {
          const typeRows = rows.filter((row) => row.plantId === plant.id && row.type === type);
          if (typeRows.length === 0) return null;
          const summary = calculateProductionSummary(plant.id, type, referenceRows, matrices, drafts);
          return <section className={styles.typeSection} key={type}>
            <Subtitle2>{type}</Subtitle2>
            <Card className={styles.tableScroll}><table className={styles.table}>
              <colgroup><col style={{ width: '40%' }} /><col style={{ width: '25%' }} /><col style={{ width: '20%' }} /><col style={{ width: '15%' }} /></colgroup>
              <thead><tr>{['Main Name', 'Categories', 'Quantity (t)', 'Ratio (%)'].map((label) => <th className={`${styles.cell} ${styles.header}`} key={label}>{label}</th>)}</tr></thead>
              <tbody>{typeRows.map((row) => <tr key={row.key}>
                <td className={styles.cell}>{row.mainName}</td>
                <td className={styles.cell}>{row.categories}</td>
                <td className={styles.cell}><Input className={styles.input} type="number" step="any" aria-label={`Quantity for ${plant.name} ${row.mainName}`} disabled={!editing || saveMutation.isPending || isCalculatedProductionQuantity(row, matrices)} value={drafts[row.key] ?? (row.quantity === null ? '' : String(row.quantity))} onChange={(_event, data) => setDrafts((current) => ({ ...current, [row.key]: data.value }))} /></td>
                <td className={styles.cell}>{row.ratio == null ? '' : row.ratio.toFixed(2)}</td>
              </tr>)}
                <tr><th className={styles.cell} scope="row"></th><th className={styles.cell}>{summary.label}</th><td className={styles.cell}>{summary.quantity == null ? '' : summary.quantity.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td><td className={styles.cell}>{summary.ratio == null ? '' : summary.ratio.toFixed(2)}</td></tr>
              </tbody>
            </table></Card>
          </section>;
        })}
      </section>) : null}
    </div>
  </div>;
}

``

---

## File: src/pages/ProductionDataEntryPage/productionRows.ts

- Size: 9582 bytes
- Last modified: 2026-10-23 03:05:18

``typescript
import type { Plant } from '../../domain/models';
import type { ProductionKpiMatrix, ProductionKpiRecord } from '../../domain/models/charts';
import { calculateFpyQuantity, calculateRatioPercent, calculateWasteQuantity, sumFinite } from '../../domain/services/productionFormulas';

export interface ProductionFilters {
  years: number[];
  months: number[];
  plantIds: string[];
  categories: string[];
}

export type ProductionEntryRow = Omit<ProductionKpiRecord, 'id'> & { id?: string; key: string; plantName: string };

const normalizeId = (id: string) => id.replace(/[{}]/g, '').trim().toLowerCase();
const recordKey = (record: Pick<ProductionKpiRecord, 'year' | 'month' | 'plantId' | 'type' | 'categories'>) =>
  JSON.stringify([record.year, record.month, normalizeId(record.plantId), record.type, record.categories]);
const matrixKey = (plantId: string, type: string | undefined, categories: string) =>
  JSON.stringify([normalizeId(plantId), type, categories.trim()]);
const ratioGroupKey = (row: ProductionEntryRow) => JSON.stringify([row.year, row.month, normalizeId(row.plantId)]);
const isRm = (category: string) => category.trim().toUpperCase() === 'RM';
const isFg = (category: string) => category.trim().toUpperCase() === 'FG';
const isNt = (category: string) => category.trim().toUpperCase() === 'NT';

const classifyRow = (
  row: Pick<ProductionEntryRow, 'plantId' | 'type' | 'categories'>,
  productionClasses: Map<string, ProductionKpiMatrix['productionClass']>,
): ProductionKpiMatrix['productionClass'] => {
  const productionClass = productionClasses.get(matrixKey(row.plantId, row.type, row.categories));
  if (productionClass) return productionClass;
  if (isRm(row.categories)) return 'RM';
  if (isFg(row.categories)) return 'FG';
  if (isNt(row.categories)) return 'NT';
  return null;
};

export function isCalculatedProductionQuantity(row: ProductionEntryRow, matrices: ProductionKpiMatrix[]): boolean {
  return matrices.some((matrix) => matrix.productionClass === 'FPYFG'
    && matrixKey(matrix.plantId, matrix.type, matrix.categories) === matrixKey(row.plantId, row.type, row.categories));
}

export function calculateProductionRatios(
  rows: ProductionEntryRow[],
  drafts: Record<string, string> = {},
  matrices: ProductionKpiMatrix[] = [],
): ProductionEntryRow[] {
  const productionClasses = new Map(matrices.map((matrix) => [matrixKey(matrix.plantId, matrix.type, matrix.categories), matrix.productionClass]));
  const currentRows = rows.map((row) => {
    const draft = productionClasses.get(matrixKey(row.plantId, row.type, row.categories)) === 'FPYFG' ? undefined : drafts[row.key];
    const quantity = draft === undefined ? row.quantity : draft.trim() === '' ? null : Number(draft);
    return { ...row, quantity: quantity !== null && !Number.isFinite(quantity) ? null : quantity };
  });
  const classQuantities = new Map<string, { fg: number | null; defect: number | null }>();
  currentRows.forEach((row) => {
    const productionClass = classifyRow(row, productionClasses);
    if ((productionClass !== 'FG' && productionClass !== 'Defect') || row.quantity === null) return;
    const key = ratioGroupKey(row);
    const totals = classQuantities.get(key) ?? { fg: null, defect: null };
    if (productionClass === 'FG') totals.fg = (totals.fg ?? 0) + row.quantity;
    else totals.defect = (totals.defect ?? 0) + row.quantity;
    classQuantities.set(key, totals);
  });
  currentRows.forEach((row) => {
    if (classifyRow(row, productionClasses) !== 'FPYFG') return;
    const totals = classQuantities.get(ratioGroupKey(row));
    row.quantity = calculateFpyQuantity(totals?.fg ?? null, totals?.defect ?? null);
  });
  const rmQuantities = new Map<string, number>();
  currentRows.filter((row) => classifyRow(row, productionClasses) === 'RM' && row.quantity !== null).forEach((row) => {
    const key = ratioGroupKey(row);
    rmQuantities.set(key, (rmQuantities.get(key) ?? 0) + row.quantity!);
  });
  return currentRows.map((row) => {
    const denominator = rmQuantities.get(ratioGroupKey(row)) ?? null;
    const ratio = !isRm(row.categories)
      ? calculateRatioPercent(row.quantity, denominator)
      : null;
    return { ...row, ratio };
  });
}

export function buildProductionRows(
  plants: Plant[],
  matrices: ProductionKpiMatrix[],
  records: ProductionKpiRecord[],
  filters: ProductionFilters,
): ProductionEntryRow[] {
  const existing = new Map(records.map((record) => [recordKey(record), record]));
  const rows = new Map<string, ProductionEntryRow>();
  const years = [...new Set(filters.years)].sort((left, right) => left - right);
  const months = [...new Set(filters.months)].sort((left, right) => left - right);
  const selectedPlants = [...plants]
    .filter((plant) => filters.plantIds.some((id) => normalizeId(id) === normalizeId(plant.id)))
    .sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));

  for (const plant of selectedPlants) {
    const configurations = [...matrices]
      .filter((matrix) => normalizeId(matrix.plantId) === normalizeId(plant.id))
      .filter((matrix) => matrix.type && matrix.categories.trim())
      .sort((left, right) => left.displayOrder - right.displayOrder || left.categories.localeCompare(right.categories));
    for (const type of ['Production', 'Quality'] as const) {
      for (const year of years) {
        for (const month of months) {
          for (const matrix of configurations.filter((configuration) => configuration.type === type)) {
            const values = { year, month, plantId: plant.id, type, categories: matrix.categories };
            const key = recordKey(values);
            const record = existing.get(key);
            rows.set(key, {
              ...values,
              key,
              id: record?.id,
              mainName: [year, month, type, matrix.categories].join('_'),
              plantName: plant.name,
              quantity: record?.quantity ?? null,
            });
          }
        }
      }
    }
  }
  return calculateProductionRatios([...rows.values()], {}, matrices)
    .filter((row) => filters.categories.length === 0 || filters.categories.includes(row.categories));
}

export function buildProductionSavePayload(
  rows: ProductionEntryRow[],
  drafts: Record<string, string>,
  referenceRows = rows,
  matrices: ProductionKpiMatrix[] = [],
): Array<Omit<ProductionKpiRecord, 'id'> & { id?: string }> {
  const productionClasses = new Map(matrices.map((matrix) => [matrixKey(matrix.plantId, matrix.type, matrix.categories), matrix.productionClass]));
  const currentRows = referenceRows.map((row) => {
    const isCalculated = productionClasses.get(matrixKey(row.plantId, row.type, row.categories)) === 'FPYFG';
    const draft = isCalculated ? undefined : drafts[row.key];
    const quantity = draft === undefined ? row.quantity : draft.trim() === '' ? null : Number(draft);
    if (quantity !== null && !Number.isFinite(quantity)) throw new Error(`Invalid Quantity for ${row.mainName}.`);
    return { ...row, quantity };
  });
  const visibleKeys = new Set(rows.map((row) => row.key));
  return calculateProductionRatios(currentRows, {}, matrices).filter((row) => visibleKeys.has(row.key)).map((row) => ({
    id: row.id, mainName: row.mainName, year: row.year, month: row.month, plantId: row.plantId, type: row.type, categories: row.categories, quantity: row.quantity, ratio: row.ratio,
  }));
}

export interface ProductionSummary {
  label: 'Waste' | 'FPY';
  quantity: number | null;
  ratio: number | null;
}

export function calculateProductionSummary(
  plantId: string,
  type: 'Production' | 'Quality',
  rows: ProductionEntryRow[],
  matrices: ProductionKpiMatrix[],
  drafts: Record<string, string> = {},
): ProductionSummary {
  const productionClass = type === 'Production' ? 'Waste' : 'FPYFG';
  const label = type === 'Production' ? 'Waste' : 'FPY';
  const productionClasses = new Map(matrices.map((matrix) => [matrixKey(matrix.plantId, matrix.type, matrix.categories), matrix.productionClass]));
  const classifications = new Set(matrices
    .filter((matrix) => normalizeId(matrix.plantId) === normalizeId(plantId) && matrix.type === type && matrix.productionClass === productionClass)
    .map((matrix) => matrixKey(matrix.plantId, matrix.type, matrix.categories)));
  const currentRows = calculateProductionRatios(rows, drafts, matrices);
  const plantRows = currentRows.filter((row) => normalizeId(row.plantId) === normalizeId(plantId));
  const typeRows = plantRows.filter((row) => row.type === type);
  const rmRows = plantRows.filter((row) => classifyRow(row, productionClasses) === 'RM');
  const fgRows = typeRows.filter((row) => classifyRow(row, productionClasses) === 'FG');
  const ntRows = typeRows.filter((row) => classifyRow(row, productionClasses) === 'NT');
  const relevant = typeRows.filter((row) => classifications.has(matrixKey(row.plantId, row.type, row.categories)));
  const denominator = sumFinite(rmRows.map((row) => row.quantity));
  const quantity = type === 'Production'
    ? calculateWasteQuantity(
      sumFinite(rmRows.map((row) => row.quantity)),
      sumFinite(fgRows.map((row) => row.quantity)),
      sumFinite(ntRows.map((row) => row.quantity)),
    )
    : sumFinite(relevant.map((row) => row.quantity));
  const ratio = calculateRatioPercent(quantity, denominator);
  return { label, quantity, ratio };
}

``

---

## File: src/pages/ProductionQualityPage/chartMetrics.ts

- Size: 7792 bytes
- Last modified: 2026-10-23 02:51:59

``typescript
import type { ProductionKpiMatrix, ProductionKpiRecord } from '../../domain/models/charts';
import { calculateFpyQuantity, calculateRatioPercent, calculateWasteQuantity, sumFinite } from '../../domain/services/productionFormulas';

export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface ProductionQualitySeries {
  key: string;
  name: string;
}

export interface ProductionQualityPoint {
  label: string;
  quantities: Record<string, number | null>;
  percentages: Record<string, number | null>;
  ratio: number | null;
}

export interface ProductionQualityMetrics {
  series: ProductionQualitySeries[];
  months: ProductionQualityPoint[];
  comparison: ProductionQualityPoint[];
  lineName: 'Waste' | 'FPY' | null;
  rmCategory: string | null;
}

const normalizeId = (id: string) => id.replace(/[{}]/g, '').trim().toLowerCase();
const categoryKey = (name: string) => name.trim();

export function buildProductionQualityAxisDomains(points: ProductionQualityPoint[]): {
  quantity: [number, number];
  ratio: [number, number];
} {
  const stackTotals = points.map((point) => Object.values(point.quantities)
    .filter((value): value is number => value !== null && Number.isFinite(value))
    .reduce((total, value) => total + Math.max(0, value), 0));
  const ratios = points.map((point) => point.ratio)
    .filter((value): value is number => value !== null && Number.isFinite(value));
  const minimum = ratios.length > 0 ? Math.min(...ratios) : 0;
  const maximum = ratios.length > 0 ? Math.max(...ratios) : 0;
  const range = Math.max(maximum - minimum, Math.abs(minimum) * 0.1, 1) / 0.06;
  return {
    quantity: [0, Math.max(...stackTotals, 1) / 0.65],
    ratio: [minimum - range * 0.715, minimum + range * 0.285],
  };
}

export function sumProductionQuantities(records: ProductionKpiRecord[]): number | null {
  return sumFinite(records.map((record) => record.quantity));
}

export function calculatePercentage(numerator: number | null, denominator: number | null): number | null {
  return calculateRatioPercent(numerator, denominator);
}

export function buildProductionQualityMetrics(
  records: ProductionKpiRecord[],
  matrices: ProductionKpiMatrix[],
  plantId: string,
  type: string,
  year: number,
  selectedMonths: number[],
): ProductionQualityMetrics {
  const plantMatrices = [...matrices]
    .filter((matrix) => normalizeId(matrix.plantId) === normalizeId(plantId))
    .sort((left, right) => left.displayOrder - right.displayOrder || left.categories.localeCompare(right.categories));
  const rmCategories = [...new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'RM').map((matrix) => categoryKey(matrix.categories)).filter(Boolean))];
  const ntCategories = [...new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'NT').map((matrix) => categoryKey(matrix.categories)).filter(Boolean))];
  const rmCategory = rmCategories.length === 1 ? rmCategories[0] : null;
  const typeMatrices = plantMatrices.filter((matrix) => matrix.type === type);
  const plantRecords = records.filter((record) => normalizeId(record.plantId) === normalizeId(plantId));
  const typeRecords = plantRecords.filter((record) => record.type === type);
  const categoryNames = [...new Set([
    ...typeMatrices.map((matrix) => categoryKey(matrix.categories)),
    ...typeRecords.filter((record) => record.year === year || record.year === year - 1).map((record) => categoryKey(record.categories)),
  ])].filter((category) => category && !rmCategories.includes(category) && !ntCategories.includes(category));
  const series = categoryNames.map((name, index) => ({ name, key: `category_${index}` }));
  const lineName = type === 'Production' ? 'Waste' : type === 'Quality' ? 'FPY' : null;
  const ratioClass = type === 'Production' ? 'Waste' : null;
  const ratioCategories = new Set(typeMatrices.filter((matrix) => matrix.productionClass === ratioClass).map((matrix) => categoryKey(matrix.categories)));
  const rmCategoriesByType = new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'RM').map((matrix) => `${matrix.type}:${categoryKey(matrix.categories)}`));
  const ntCategoriesByType = new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'NT').map((matrix) => `${matrix.type}:${categoryKey(matrix.categories)}`));
  const fgCategories = new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'FG').map((matrix) => `${matrix.type}:${categoryKey(matrix.categories)}`));
  const defectCategories = new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'Defect').map((matrix) => `${matrix.type}:${categoryKey(matrix.categories)}`));
  const fpyMatrixCount = typeMatrices.filter((matrix) => matrix.productionClass === 'FPYFG').length;
  const rmTypes = new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'RM').map((matrix) => matrix.type));
  const monthSet = new Set(selectedMonths);

  const aggregate = (label: string, periodYear: number, months: Set<number>): ProductionQualityPoint => {
    const periodRecords = plantRecords.filter((record) => record.year === periodYear && months.has(record.month));
    const rmRecords = periodRecords.filter((record) => categoryKey(record.categories) === rmCategory && rmTypes.has(record.type));
    const denominator = rmCategory === null ? null : sumProductionQuantities(rmRecords);
    const currentTypeRecords = periodRecords.filter((record) => record.type === type);
    const quantities = Object.fromEntries(series.map((category) => [category.key, sumProductionQuantities(currentTypeRecords.filter((record) => categoryKey(record.categories) === category.name))]));
    const percentages = Object.fromEntries(series.map((category) => [category.key, calculatePercentage(quantities[category.key], denominator)]));
    const numerator = type === 'Quality'
      ? fpyMatrixCount === 0 ? null : (() => {
        const fgQuantity = sumProductionQuantities(periodRecords.filter((record) => fgCategories.has(`${record.type}:${categoryKey(record.categories)}`)));
        const defectQuantity = sumProductionQuantities(periodRecords.filter((record) => defectCategories.has(`${record.type}:${categoryKey(record.categories)}`)));
        const fpyQuantity = calculateFpyQuantity(fgQuantity, defectQuantity);
        return fpyQuantity === null ? null : fpyQuantity * fpyMatrixCount;
      })()
      : (() => {
        const rmQuantity = sumProductionQuantities(periodRecords.filter((record) => rmCategoriesByType.has(`${record.type}:${categoryKey(record.categories)}`)));
        const fgQuantity = sumProductionQuantities(periodRecords.filter((record) => fgCategories.has(`${record.type}:${categoryKey(record.categories)}`)));
        const ntQuantity = sumProductionQuantities(periodRecords.filter((record) => ntCategoriesByType.has(`${record.type}:${categoryKey(record.categories)}`)));
        if (rmQuantity === null && fgQuantity === null && ntQuantity === null) {
          return sumProductionQuantities(currentTypeRecords.filter((record) => ratioCategories.has(categoryKey(record.categories))));
        }
        return calculateWasteQuantity(rmQuantity, fgQuantity, ntQuantity);
      })();
    return { label, quantities, percentages, ratio: lineName === null ? null : calculatePercentage(numerator, denominator) };
  };

  return {
    series,
    rmCategory,
    lineName,
    months: MONTH_LABELS.map((label, index) => aggregate(label, year, new Set(monthSet.has(index + 1) ? [index + 1] : []))),
    comparison: [aggregate('PY', year - 1, new Set(MONTH_LABELS.map((_label, index) => index + 1))), aggregate('CY YTD', year, monthSet)],
  };
}

``

---

## File: src/pages/ProductionQualityPage/ProductionQualityPage.tsx

- Size: 14763 bytes
- Last modified: 2026-10-08 23:28:49

``tsx
import { useState } from 'react';
import { Button, Caption1, Card, Dropdown, Label, Option, Subtitle2, Text, makeStyles, tokens } from '@fluentui/react-components';
import { ArrowReset24Regular } from '@fluentui/react-icons';
import { Bar, CartesianGrid, ComposedChart, LabelList, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PageHeader } from '../../components/common/PageHeader';
import { ErrorState } from '../../components/common/ErrorState';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { useAllTargets, usePlants, useProductionKpiMatrices, useProductionKpiRecords } from '../../hooks/queries';
import { Apma_pmtproductionkpisapma_type } from '../../generated/models/Apma_pmtproductionkpisModel';
import { buildProductionQualityAxisDomains, buildProductionQualityMetrics, MONTH_LABELS } from './chartMetrics';
import type { ProductionQualityMetrics, ProductionQualityPoint } from './chartMetrics';

const CATEGORY_COLORS: Record<string, string> = { liquid: '#111111', melt: '#C80046', recycle: '#F39200', fg: '#0066B3' };
const PALETTE = ['#0066B3', '#D13438', '#F39200', '#107C10', '#00A6A6', '#8764B8', '#69797E'];
const LINE_COLOR = '#0066B3';
const percent = (value: number | null) => value === null ? '' : `${value.toFixed(2)}%`;

const useStyles = makeStyles({
  page: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', gap: tokens.spacingVerticalL },
  filters: { display: 'flex', flexWrap: 'wrap', flexShrink: 0, alignItems: 'flex-end', gap: tokens.spacingHorizontalM, padding: tokens.spacingHorizontalM, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium },
  filter: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, minWidth: 0, flex: '1 1 170px', maxWidth: '240px' },
  filterControl: { width: '100%', minWidth: 0 },
  monthControl: { width: '100%', minWidth: 0, height: '32px', minHeight: '32px', maxHeight: '32px' },
  monthButton: { display: 'flex', minWidth: 0, alignItems: 'center' },
  monthText: { flex: 1, minWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
  reset: { marginLeft: 'auto' },
  dataArea: { flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL },
  plant: { flexShrink: 0, minWidth: 0, padding: tokens.spacingHorizontalL, gap: tokens.spacingVerticalL },
  plantName: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightSemibold },
  typeSection: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, minWidth: 0 },
  charts: { display: 'grid', gridTemplateColumns: 'minmax(0, 2.5fr) minmax(0, 1fr)', gap: tokens.spacingHorizontalL, '@media (max-width: 1100px)': { gridTemplateColumns: 'minmax(0, 1fr)' } },
  chartPanel: { minWidth: 0, overflowX: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusSmall, padding: tokens.spacingHorizontalS, backgroundColor: tokens.colorNeutralBackground1 },
  monthlyChart: { height: '330px', minWidth: '560px', width: '100%' },
  comparisonChart: { height: '330px', minWidth: '260px', width: '100%' },
  legend: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalM },
  legendItem: { display: 'inline-flex', alignItems: 'center', gap: tokens.spacingHorizontalXS, fontSize: tokens.fontSizeBase200 },
  swatch: { width: '12px', height: '12px', flexShrink: 0 },
  lineSwatch: { width: '24px', height: '3px', flexShrink: 0, backgroundColor: LINE_COLOR },
  tableScroll: { overflowX: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusSmall },
  table: { width: '100%', minWidth: '1120px', borderCollapse: 'separate', borderSpacing: 0, fontVariantNumeric: 'tabular-nums' },
  cell: { padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`, textAlign: 'right', whiteSpace: 'nowrap', borderBottom: `1px solid ${tokens.colorNeutralStroke2}` },
  heading: { backgroundColor: tokens.colorNeutralBackground3, fontWeight: tokens.fontWeightSemibold },
  rowHeading: { textAlign: 'left', position: 'sticky', left: 0, backgroundColor: tokens.colorNeutralBackground1 },
  ratioRow: { fontWeight: tokens.fontWeightSemibold },
});

export function MetricChart({ metrics, points, colors, comparison = false, exportSize }: {
  metrics: ProductionQualityMetrics;
  points: ProductionQualityPoint[];
  colors: Record<string, string>;
  comparison?: boolean;
  exportSize?: { width: number; height: number };
}) {
  const styles = useStyles();
  const data = points.map((point) => ({ label: point.label, ratio: point.ratio, ...point.quantities }));
  const domains = buildProductionQualityAxisDomains(points);
  return <div className={styles.chartPanel}>
    <div className={comparison ? styles.comparisonChart : styles.monthlyChart}>
      <ResponsiveContainer width={exportSize?.width ?? '100%'} height={exportSize?.height ?? '100%'}>
        <ComposedChart data={data} margin={{ top: 28, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" interval={0} tick={{ fontSize: 11 }} />
          <YAxis yAxisId="quantity" width={64} domain={domains.quantity} allowDataOverflow allowDecimals={false} tickFormatter={(value) => Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })} label={{ value: 'Quantity (t)', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="ratio" orientation="right" width={60} domain={domains.ratio} allowDataOverflow allowDecimals={false} tickFormatter={(value) => `${Number(value).toFixed(0)}%`} />
          <Tooltip formatter={(value, name, item) => [item.dataKey === 'ratio' ? `${Number(value).toFixed(2)}%` : `${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })} t`, name]} />
          {[...metrics.series].reverse().map((series) => <Bar key={series.key} yAxisId="quantity" dataKey={series.key} name={series.name} stackId="quantity" fill={colors[series.name]} maxBarSize={comparison ? 56 : 36} isAnimationActive={false} />)}
          {metrics.lineName ? <>
            <Line yAxisId="ratio" dataKey="ratio" type="linear" stroke="#FFFFFF" strokeWidth={6} dot={false} activeDot={false} tooltipType="none" legendType="none" zIndex={500} connectNulls={false} isAnimationActive={false} />
            <Line yAxisId="ratio" dataKey="ratio" name={metrics.lineName} type="linear" stroke={LINE_COLOR} strokeWidth={3} dot={{ r: 4, fill: '#FFFFFF', stroke: LINE_COLOR }} activeDot={{ r: 5 }} zIndex={501} connectNulls={false} isAnimationActive={false}>
              <LabelList dataKey="ratio" position="top" formatter={(value) => value == null ? '' : `${Number(value).toFixed(2)}%`} fill={LINE_COLOR} style={{ fontSize: '11px', stroke: '#FFFFFF', strokeWidth: 3, paintOrder: 'stroke' }} />
            </Line>
          </> : null}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </div>;
}

function MetricsSection({ type, metrics, colors }: { type: string; metrics: ProductionQualityMetrics; colors: Record<string, string> }) {
  const styles = useStyles();
  const columns = [...metrics.comparison, ...metrics.months];
  return <section className={styles.typeSection}>
    <Subtitle2>{type}</Subtitle2>
    {metrics.rmCategory === null ? <Caption1>RM configuration is missing or ambiguous.</Caption1> : null}
    <div className={styles.charts}>
      <MetricChart metrics={metrics} points={metrics.months} colors={colors} />
      <MetricChart metrics={metrics} points={metrics.comparison} colors={colors} comparison />
    </div>
    <div className={styles.legend}>
      {metrics.series.map((series) => <span className={styles.legendItem} key={series.key}><span className={styles.swatch} style={{ backgroundColor: colors[series.name] }} />{series.name}</span>)}
      {metrics.lineName ? <span className={styles.legendItem}><span className={styles.lineSwatch} />{metrics.lineName}</span> : null}
    </div>
    <div className={styles.tableScroll}><table className={styles.table} aria-label={`${type} percentages`}>
      <thead><tr><th className={`${styles.cell} ${styles.heading} ${styles.rowHeading}`}>Categories</th>{columns.map((column) => <th className={`${styles.cell} ${styles.heading}`} key={column.label}>{column.label}</th>)}</tr></thead>
      <tbody>
        {metrics.series.map((series) => <tr key={series.key}><th scope="row" className={`${styles.cell} ${styles.rowHeading}`}>{series.name}</th>{columns.map((column) => <td className={styles.cell} key={column.label}>{percent(column.percentages[series.key])}</td>)}</tr>)}
        {metrics.lineName ? <tr className={styles.ratioRow}><th scope="row" className={`${styles.cell} ${styles.rowHeading}`}>{metrics.lineName}</th>{columns.map((column) => <td className={styles.cell} key={column.label}>{percent(column.ratio)}</td>)}</tr> : null}
      </tbody>
    </table></div>
  </section>;
}

export function ProductionQualityPage() {
  const styles = useStyles();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [months, setMonths] = useState<number[]>(() => Array.from({ length: new Date().getMonth() }, (_value, index) => index + 1));
  const [plantIds, setPlantIds] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const plantsQuery = usePlants();
  const targetsQuery = useAllTargets();
  const matricesQuery = useProductionKpiMatrices();
  const recordsQuery = useProductionKpiRecords();
  const loading = plantsQuery.isLoading || targetsQuery.isLoading || matricesQuery.isLoading || recordsQuery.isLoading;
  const error = plantsQuery.error || targetsQuery.error || matricesQuery.error || recordsQuery.error;
  const records = recordsQuery.data ?? [];
  const matrices = matricesQuery.data ?? [];
  const plants = [...(plantsQuery.data ?? [])].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
  const years = [...new Set((targetsQuery.data ?? []).map((target) => target.targetYear).concat(new Date().getFullYear()))].sort((left, right) => left - right);
  const availableTypes = [...new Set([...Object.values(Apma_pmtproductionkpisapma_type), ...matrices.map((matrix) => matrix.type), ...records.map((record) => record.type)].filter((type): type is string => Boolean(type)))];
  const categoryNames = [...new Set([...matrices.map((matrix) => matrix.categories), ...records.map((record) => record.categories)])];
  const colors = Object.fromEntries(categoryNames.map((name, index) => [name.trim(), CATEGORY_COLORS[name.trim().toLowerCase()] ?? PALETTE[index % PALETTE.length]]));
  const selectedPlants = plants.filter((plant) => plantIds.length === 0 || plantIds.includes(plant.id));
  const label = (values: string[], all: string) => values.length === 0 ? all : values.join(', ');
  const reset = () => { setYear(new Date().getFullYear()); setMonths(Array.from({ length: new Date().getMonth() }, (_value, index) => index + 1)); setPlantIds([]); setTypes([]); };

  return <div className={styles.page}>
    <PageHeader title="Production & Quality" />
    <div className={styles.filters}>
      <div className={styles.filter}><Label>Year</Label><Dropdown className={styles.filterControl} aria-label="Year" value={String(year)} selectedOptions={[String(year)]} onOptionSelect={(_event, data) => data.optionValue && setYear(Number(data.optionValue))}>{years.map((value) => <Option key={value} value={String(value)} text={String(value)}>{String(value)}</Option>)}</Dropdown></div>
      <div className={styles.filter}><Label>Month</Label><Dropdown className={styles.monthControl} button={{ className: styles.monthButton, title: label(months.map((month) => MONTH_LABELS[month - 1]), 'Select Months'), children: <span className={styles.monthText}>{label(months.map((month) => MONTH_LABELS[month - 1]), 'Select Months')}</span> }} expandIcon={{ style: { flexShrink: 0 } }} aria-label="Month" multiselect value={label(months.map((month) => MONTH_LABELS[month - 1]), 'Select Months')} selectedOptions={months.map(String)} onOptionSelect={(_event, data) => setMonths(data.selectedOptions.map(Number))}>{MONTH_LABELS.map((month, index) => <Option key={month} value={String(index + 1)}>{month}</Option>)}</Dropdown></div>
      <div className={styles.filter}><Label>Plant Name</Label><Dropdown className={styles.filterControl} aria-label="Plant Name" multiselect value={label(plants.filter((plant) => plantIds.includes(plant.id)).map((plant) => plant.name), 'All Plants')} selectedOptions={plantIds} onOptionSelect={(_event, data) => setPlantIds(data.selectedOptions)}>{plants.map((plant) => <Option key={plant.id} value={plant.id} text={plant.name}>{plant.name}</Option>)}</Dropdown></div>
      <div className={styles.filter}><Label>Type</Label><Dropdown className={styles.filterControl} aria-label="Type" multiselect value={label(types, 'All Types')} selectedOptions={types} onOptionSelect={(_event, data) => setTypes(data.selectedOptions)}>{availableTypes.map((type) => <Option key={type} value={type}>{type}</Option>)}</Dropdown></div>
      <Button className={styles.reset} appearance="subtle" icon={<ArrowReset24Regular />} onClick={reset}>Reset</Button>
    </div>
    <div className={styles.dataArea}>
      {error ? <ErrorState message={error instanceof Error ? error.message : 'Production and Quality data could not be loaded.'} /> : null}
      {loading ? <LoadingSkeleton rows={6} /> : null}
      {!loading && !error && selectedPlants.length === 0 ? <EmptyState title="No plants available" /> : null}
      {!loading && !error ? selectedPlants.map((plant) => {
        const plantTypes = availableTypes.filter((type) => (types.length === 0 || types.includes(type)) && (matrices.some((matrix) => matrix.plantId.toLowerCase() === plant.id.toLowerCase() && matrix.type === type) || records.some((record) => record.plantId.toLowerCase() === plant.id.toLowerCase() && record.type === type && (record.year === year || record.year === year - 1))));
        return <Card className={styles.plant} key={plant.id}>
          <Text className={styles.plantName}>{plant.name}</Text>
          {plantTypes.length === 0 ? <EmptyState title="No production or quality data" /> : plantTypes.map((type) => <MetricsSection key={type} type={type} metrics={buildProductionQualityMetrics(records, matrices, plant.id, type, year, months)} colors={colors} />)}
        </Card>;
      }) : null}
    </div>
  </div>;
}

``

---

## File: src/styles/theme.ts

- Size: 971 bytes
- Last modified: 2026-09-11 12:19:32

``typescript
import { createLightTheme, type BrandVariants, type Theme } from '@fluentui/react-components';

export const basfBrandVariants: BrandVariants = {
  10: '#02132B',
  20: '#042247',
  30: '#073268',
  40: '#0A438C',
  50: '#0E55B3',
  60: '#1468DC',
  70: '#2A7CF2',
  80: '#4D92F5',
  90: '#75A9F7',
  100: '#9DC2FA',
  110: '#C4DCFC',
  120: '#E1EDFE',
  130: '#F0F6FE',
  140: '#F8FAFF',
  150: '#FFFFFF',
  160: '#FFFFFF',
};

export const appTheme: Theme = {
  ...createLightTheme(basfBrandVariants),
  colorBrandBackground: '#005A9E',
  colorBrandBackgroundHover: '#004578',
  colorBrandBackgroundPressed: '#00335A',
};

export const statusColors = {
  greenBg: '#DFF6DD',
  greenFg: '#107C41',
  greenBorder: '#107C41',
  amberBg: '#FFF4CE',
  amberFg: '#D97706',
  amberBorder: '#D97706',
  redBg: '#FDE7E9',
  redFg: '#D13438',
  redBorder: '#D13438',
  greyBg: '#F3F4F6',
  greyFg: '#687076',
  greyBorder: '#D1D5DB',
};

``

---

## File: src/test/aeBatch.test.ts

- Size: 1782 bytes
- Last modified: 2026-10-03 16:45:04

``typescript
import { describe, expect, it } from 'vitest';
import type { Plant } from '../domain/models';
import type { AeCategory, AeRecord, ProductionLineMatrix } from '../domain/models/charts';
import { buildMissingAeRecords } from '../domain/services/aeBatch';

const plants: Plant[] = [
  { id: 'plant-a', name: 'Plant A', displayOrder: 1 },
  { id: 'plant-b', name: 'Plant B', displayOrder: 2 },
];
const matrices: ProductionLineMatrix[] = [
  { id: 'matrix-a', mainName: 'A_Line 1', plantId: '{PLANT-A}', productionLineId: '{LINE-1}', displayOrder: 1 },
  { id: 'matrix-b', mainName: 'B_Line 2', plantId: 'plant-b', productionLineId: 'line-2', displayOrder: 1 },
];
const categories: AeCategory[] = [{ id: 'category-a', name: 'Category A', displayOrder: 1 }];

describe('AE batch generation from Production Line Matrix', () => {
  it('uses only production lines mapped to each plant', () => {
    const records = buildMissingAeRecords(2026, 10, plants, matrices, categories, []);

    expect(records).toEqual([
      { year: 2026, month: 10, plantId: 'plant-a', productionLineId: 'line-1', categoryId: 'category-a', value: null },
      { year: 2026, month: 10, plantId: 'plant-b', productionLineId: 'line-2', categoryId: 'category-a', value: null },
    ]);
  });

  it('does not create records already present for that year and month', () => {
    const existing: AeRecord[] = [{
      id: 'existing', mainName: '', year: 2026, month: 10, plantId: 'plant-a', productionLineId: 'line-1', categoryId: 'category-a', value: null,
    }];
    const records = buildMissingAeRecords(2026, 10, plants, matrices, categories, existing);

    expect(records.map((record) => `${record.plantId}:${record.productionLineId}`)).toEqual(['plant-b:line-2']);
  });
});

``

---

## File: src/test/chartMetrics.test.ts

- Size: 1529 bytes
- Last modified: 2026-10-04 19:41:36

``typescript
import { describe, expect, it } from 'vitest';
import type { AeCategory, AeRecord, VolumePacRecord } from '../domain/models/charts';
import { aggregateVolumePac, buildAeStacks } from '../pages/KPIComparisonPage/chartMetrics';

const volume: VolumePacRecord[] = [
  { id: '1', mainName: 'one', year: 2026, month: 1, plantId: 'p1', productionLineId: 'l1', volume: 2, forecast: 3, pac: 1 },
  { id: '2', mainName: 'two', year: 2026, month: 1, plantId: 'p1', productionLineId: 'l2', volume: 4, forecast: 5, pac: 2 },
];
const categories: AeCategory[] = [{ id: 'c1', name: 'Runtime', displayOrder: 1 }];
const ae: AeRecord[] = [
  { id: 'a1', mainName: 'ae-one', year: 2026, month: 9, plantId: 'p1', productionLineId: 'l1', categoryId: 'c1', value: 88 },
  { id: 'a2', mainName: 'ae-two', year: 2026, month: 9, plantId: 'p1', productionLineId: 'l2', categoryId: 'c1', value: 75 },
];

describe('Volume and PAC chart metrics', () => {
  it('sums selected production lines by month', () => {
    const points = aggregateVolumePac(volume, ['p1'], ['l1', 'l2'], 12);
    const january = points[1];
    expect(points[0]).toMatchObject({ label: 'OP', volume: 1, forecast: 0, pac: 0 });
    expect(january).toMatchObject({ volume: 6, forecast: 8, pac: 3 });
  });

  it('keeps AE stacks separate by production line', () => {
    const stacks = buildAeStacks(ae, categories, ['p1'], ['l1', 'l2']);
    expect(stacks).toHaveLength(2);
    expect(stacks.map((stack) => stack.values.c1)).toEqual([88, 75]);
  });
});

``

---

## File: src/test/comparisonMetrics.test.ts

- Size: 1574 bytes
- Last modified: 2026-10-04 17:31:57

``typescript
import { describe, expect, it } from 'vitest';
import { KpiStatus } from '../domain/enums';
import type { KpiDefinition, MonthlyKpiResult, Plant, Target } from '../domain/models';
import { buildComparisonMatrix, buildComparisonRows } from '../pages/KPIComparisonPage/comparisonMetrics';

const plants: Plant[] = [{ id: 'plant-1', name: 'Plant 1', displayOrder: 1 }];
const kpis: KpiDefinition[] = [{ id: 'kpi-1', name: 'Production Volume', category: 'Production', unit: 'kt', kpiLogic: 'Over', displayOrder: 1 }];
const targets: Target[] = [{ id: 'target-1', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-1', pyActual: 8, cyTarget: 10 }];
const results: MonthlyKpiResult[] = [{
  id: 'result-1', year: 2026, month: 9, plantId: 'plant-1', kpiId: 'kpi-1',
  monthlyActual: 9, ytdActual: 11, status: KpiStatus.Missing,
}];

describe('KPI comparison metrics', () => {
  it('joins target and result by plant and KPI IDs', () => {
    const [row] = buildComparisonRows(plants, kpis, targets, results, 'all');

    expect(row.target?.cyTarget).toBe(10);
    expect(row.result?.ytdActual).toBe(11);
    expect(row.variance).toBe(-1);
    expect(row.achievement).toBe(110);
    expect(row.status).toBe(KpiStatus.Green);
  });

  it('uses Missing when a plant has no result', () => {
    const [row] = buildComparisonRows(plants, kpis, targets, [], 'all');
    const [matrixRow] = buildComparisonMatrix(plants, kpis, []);

    expect(row.status).toBe(KpiStatus.Missing);
    expect(matrixRow.statuses['plant-1']).toBe(KpiStatus.Missing);
  });
});

``

---

## File: src/test/domain.test.ts

- Size: 824 bytes
- Last modified: 2026-09-11 11:59:51

``typescript
import { describe, it, expect } from 'vitest';
import { KpiStatus, KpiCategory, ReportType } from '../domain/enums';

describe('Domain Enums', () => {
  it('should have correct KpiStatus values', () => {
    expect(KpiStatus.Green).toBe('Green');
    expect(KpiStatus.Amber).toBe('Amber');
    expect(KpiStatus.Red).toBe('Red');
    expect(KpiStatus.Grey).toBe('Grey');
    expect(KpiStatus.Missing).toBe('Missing');
  });

  it('should have correct KpiCategory values', () => {
    expect(KpiCategory.EHS).toBe('EHS');
    expect(KpiCategory.Production).toBe('Production');
    expect(KpiCategory.Quality).toBe('Quality');
  });

  it('should have correct ReportType values', () => {
    expect(ReportType.Highlights).toBe('Highlights');
    expect(ReportType.Lowlights).toBe('Lowlights');
  });
});

``

---

## File: src/test/entryRows.test.ts

- Size: 2755 bytes
- Last modified: 2026-10-08 12:50:57

``typescript
import { describe, expect, it } from 'vitest';
import { KpiStatus } from '../domain/enums';
import type { KpiDefinition, MonthlyKpiResult, Target } from '../domain/models';
import { buildEditableKpiRows, getChangedKpiRows, parseNumericInput } from '../pages/KPIEntryPage/entryRows';

const kpis: KpiDefinition[] = [
  { id: 'kpi-2', name: 'Production', category: 'Production', unit: 'kt', displayOrder: 2 },
  { id: 'kpi-1', name: 'LTI', category: 'EHS', unit: '#', displayOrder: 1 },
];
const targets: Target[] = [
  { id: 'target-1', targetYear: 2026, plantId: '{PLANT-1}', kpiId: '{KPI-1}', pyActual: 8, cyTarget: 10 },
  { id: 'target-blank', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-2', cyTarget: null },
  { id: 'target-other-plant', targetYear: 2026, plantId: 'plant-2', kpiId: 'kpi-1', pyActual: 90, cyTarget: 100 },
];
const results: MonthlyKpiResult[] = [{
  id: 'result-1', year: 2026, month: 9, plantId: '{PLANT-1}', kpiId: '{KPI-1}',
  monthlyActual: 0, ytdActual: 0, status: KpiStatus.Green,
}];

describe('KPI entry rows', () => {
  it('sorts KPI rows and preserves zero values', () => {
    const rows = buildEditableKpiRows(kpis, targets, results, 'plant-1');
    expect(rows.map((row) => row.kpi.id)).toEqual(['kpi-1']);
    expect(rows[0].monthlyActual).toBe(0);
    expect(rows[0].target?.id).toBe('target-1');
    expect(rows[0].target?.pyActual).toBe(8);
    expect(rows[0].target?.cyTarget).toBe(10);
  });

  it('omits KPIs without a CY Target but keeps zero targets', () => {
    const rows = buildEditableKpiRows(kpis, [
      { id: 'zero-target', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-1', cyTarget: 0 },
      { id: 'blank-target', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-2', cyTarget: null },
    ], [], 'plant-1');
    expect(rows.map((row) => row.kpi.id)).toEqual(['kpi-1']);
    expect(rows[0].target?.cyTarget).toBe(0);
  });

  it('parses numeric inputs without converting empty to zero', () => {
    expect(parseNumericInput('0')).toBe(0);
    expect(parseNumericInput('12.5')).toBe(12.5);
    expect(parseNumericInput('')).toBeNull();
    expect(parseNumericInput('invalid')).toBeNull();
  });

  it('returns no rows when KPI values are unchanged', () => {
    const rows = buildEditableKpiRows(kpis, targets, results, 'plant-1');
    expect(getChangedKpiRows(rows, rows)).toEqual([]);
  });

  it('returns only KPI rows with edited values', () => {
    const rows = buildEditableKpiRows(kpis, targets, results, 'plant-1');
    const changedRows = rows.map((row) => row.kpi.id === 'kpi-1' ? { ...row, monthlyActual: 12 } : row);
    expect(getChangedKpiRows(rows, changedRows).map((row) => row.kpi.id)).toEqual(['kpi-1']);
  });
});

``

---

## File: src/test/mainName.test.ts

- Size: 1715 bytes
- Last modified: 2026-10-05 13:42:35

``typescript
import { describe, expect, it } from 'vitest';
import {
  buildAeMainName,
  buildMonthlyReportMainName,
  buildProductionLineMatrixMainName,
  buildProductionKpiMatrixMainName,
  buildTargetMainName,
  buildVolumePacMainName,
} from '../domain/services/mainName';

const named = (name: string) => ({ name });

describe('Main Name generation', () => {
  it('uses display names and underscores for Targets', () => {
    expect(buildTargetMainName(2026, named('Pudong-TPU'), named('Production Volume')))
      .toBe('2026_Pudong-TPU_Production Volume');
  });

  it('uses the defined AE and Volume/PAC formats', () => {
    expect(buildAeMainName(2026, 9, named('Pudong-TPU'), named('TPU Line 1'), named('QHES')))
      .toBe('2026_9_Pudong-TPU_TPU Line 1_QHES');
    expect(buildVolumePacMainName(2026, 9, named('Pudong-TPU'), named('TPU Line 1')))
      .toBe('2026_9_Pudong-TPU_TPU Line 1');
  });

  it('uses the defined Monthly Report format', () => {
    expect(buildMonthlyReportMainName(2026, 9, named('Pudong-TPU'), 'Highlights', named('QHES')))
      .toBe('2026_9_Pudong-TPU_Highlights_QHES');
  });

  it('uses display names for Production Line Matrix', () => {
    expect(buildProductionLineMatrixMainName(named('Pudong-TPU'), named('TPU Line 1')))
      .toBe('Pudong-TPU_TPU Line 1');
  });

  it('uses Plant, Type and Categories for Production KPI Matrix', () => {
    expect(buildProductionKpiMatrixMainName(named('Pudong-TPU'), 'Production', 'Volume'))
      .toBe('Pudong-TPU_Production_Volume');
    expect(buildProductionKpiMatrixMainName(named('Pudong-TPU'), 'Quality', 'First Pass Ratio'))
      .toBe('Pudong-TPU_Quality_First Pass Ratio');
  });
});

``

---

## File: src/test/monthlyKpiResultRepository.test.ts

- Size: 3835 bytes
- Last modified: 2026-10-11 22:53:13

``typescript
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { MonthlyKpiResult } from '../domain/models';

const services = vi.hoisted(() => ({
  results: { create: vi.fn(), update: vi.fn(), getAll: vi.fn() },
  plants: { get: vi.fn() },
  kpis: { get: vi.fn() },
}));
vi.mock('@microsoft/power-apps/data', () => ({ getClient: vi.fn(() => ({})) }));
vi.mock('../generated/services/Apma_pmtmonthlykpiresultsesService', () => ({ Apma_pmtmonthlykpiresultsesService: services.results }));
vi.mock('../generated/services/Apma_pmtplantsesService', () => ({ Apma_pmtplantsesService: services.plants }));
vi.mock('../generated/services/Apma_pmtkpidefinitionsesService', () => ({ Apma_pmtkpidefinitionsesService: services.kpis }));
import { DataverseMonthlyKpiResultRepository } from '../data/adapters/dataverseRepositories';

const result: Omit<MonthlyKpiResult, 'id'> = {
  year: 2026, month: 9, plantId: 'plant-guid', kpiId: 'kpi-guid', monthlyActual: 12.5, ytdActual: 90, status: 'Green' as MonthlyKpiResult['status'],
};

describe('Monthly KPI Results Main name generation', () => {
  const repository = new DataverseMonthlyKpiResultRepository();

  beforeEach(() => {
    vi.resetAllMocks();
    services.plants.get.mockResolvedValue({ success: true, data: { apma_pmtplantsid: 'plant-guid', apma_name: 'Pudong-TPU' } });
    services.kpis.get.mockResolvedValue({ success: true, data: { apma_pmtkpidefinitionsid: 'kpi-guid', apma_kpiname: 'Production Volume' } });
    const savedRecord = { apma_pmtmonthlykpiresultsid: 'result-id', apma_mainname: 'name', apma_year: 2026, apma_month: 457470008, _apma_plantname_value: 'plant-guid', _apma_kpiname_value: 'kpi-guid', apma_monthlyactual: 12.5, apma_ytdactual: 90 };
    services.results.create.mockResolvedValue({ success: true, data: savedRecord });
    services.results.update.mockResolvedValue({ success: true, data: savedRecord });
  });

  it('creates with Year_Month_Plant Name_KPI Name and binds lookups by ID', async () => {
    await repository.saveBatch([result]);
    expect(services.results.create).toHaveBeenCalledWith(expect.objectContaining({
      apma_mainname: '2026_9_Pudong-TPU_Production Volume',
      'apma_PlantName@odata.bind': '/apma_pmtplantses(plant-guid)',
      'apma_KPIName@odata.bind': '/apma_pmtkpidefinitionses(kpi-guid)',
    }));
  });

  it('updates the Main name using the current displayed Plant and KPI names', async () => {
    services.plants.get.mockResolvedValue({ success: true, data: { apma_pmtplantsid: 'plant-guid', apma_name: 'Changhua-TPU' } });
    services.kpis.get.mockResolvedValue({ success: true, data: { apma_pmtkpidefinitionsid: 'kpi-guid', apma_kpiname: 'Waste Ratio' } });
    await repository.saveBatch([{ ...result, id: 'result-id' }]);
    expect(services.results.update).toHaveBeenCalledWith('result-id', expect.objectContaining({
      apma_mainname: '2026_9_Changhua-TPU_Waste Ratio',
    }));
  });

  it('resolves each unique Plant and KPI display name only once per batch', async () => {
    await repository.saveBatch([result, { ...result, month: 10 }]);
    expect(services.plants.get).toHaveBeenCalledTimes(1);
    expect(services.kpis.get).toHaveBeenCalledTimes(1);
    expect(services.results.create).toHaveBeenNthCalledWith(2, expect.objectContaining({
      apma_mainname: '2026_10_Pudong-TPU_Production Volume',
    }));
  });

  it('does not save when the Plant display name cannot be resolved', async () => {
    services.plants.get.mockResolvedValue({ success: false, error: new Error('Plant lookup failed') });
    await expect(repository.saveBatch([result])).rejects.toThrow('Plant lookup failed');
    expect(services.results.create).not.toHaveBeenCalled();
    expect(services.results.update).not.toHaveBeenCalled();
  });
});

``

---

## File: src/test/overviewMetrics.test.ts

- Size: 3983 bytes
- Last modified: 2026-10-08 12:52:25

``typescript
import { describe, expect, it } from 'vitest';
import { KpiStatus } from '../domain/enums';
import type { KpiDefinition, MonthlyKpiResult, Plant, Target } from '../domain/models';
import { buildKpiMonthlyMatrixRows, buildOverviewMatrix, buildPlantOverviewMetrics } from '../pages/KPIOverviewPage/overviewMetrics';

const plants: Plant[] = [
  { id: 'plant-1', name: 'Plant 1', displayOrder: 1 },
  { id: 'plant-2', name: 'Plant 2', displayOrder: 2 },
];
const kpis: KpiDefinition[] = [
  { id: 'kpi-1', name: 'LTI', category: 'EHS', unit: '#', kpiLogic: 'Less', displayOrder: 1 },
  { id: 'kpi-2', name: 'Production Volume', category: 'Production', unit: 'kt', kpiLogic: 'Over', displayOrder: 2 },
];
const targets: Target[] = [
  { id: 'target-1', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-1', cyTarget: 0 },
  { id: 'target-2', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-2', cyTarget: 10 },
  { id: 'target-plant-2-kpi-1', targetYear: 2026, plantId: 'plant-2', kpiId: 'kpi-1', cyTarget: 5 },
  { id: 'target-blank', targetYear: 2026, plantId: 'plant-2', kpiId: 'kpi-2', cyTarget: null },
];

const results: MonthlyKpiResult[] = [
  {
    id: 'result-1',
    year: 2026,
    month: 7,
    plantId: 'plant-1',
    kpiId: 'kpi-1',
    monthlyActual: 0,
    ytdActual: 0,
    status: KpiStatus.Green,
  },
  {
    id: 'result-2',
    year: 2026,
    month: 7,
    plantId: 'plant-1',
    kpiId: 'kpi-2',
    monthlyActual: null,
    ytdActual: null,
    status: KpiStatus.Missing,
  },
];

describe('KPI overview metrics', () => {
  it('counts zero as entered and null as missing', () => {
    const [plantMetrics] = buildPlantOverviewMetrics(plants, kpis, targets, results, 2026);

    expect(plantMetrics.expectedCount).toBe(2);
    expect(plantMetrics.enteredCount).toBe(1);
    expect(plantMetrics.completionRate).toBe(50);
    expect(plantMetrics.statusCounts[KpiStatus.Green]).toBe(1);
    expect(plantMetrics.statusCounts[KpiStatus.Missing]).toBe(1);
  });

  it('shows missing status for a plant without a result', () => {
    const matrix = buildOverviewMatrix(plants, kpis, targets, results);

    expect(matrix[0].statuses['plant-2']).toBe(KpiStatus.Missing);
    expect(matrix[1].statuses['plant-2']).toBeNull();
  });

  it('does not count blank-target KPIs as expected for plant completion', () => {
    const plantTwoMetrics = buildPlantOverviewMetrics(plants, kpis, targets, results, 2026)[1];
    expect(plantTwoMetrics.expectedCount).toBe(1);
    expect(plantTwoMetrics.statusCounts[KpiStatus.Missing]).toBe(1);
  });

  it('calculates matrix status from YTD actual and target instead of stored status', () => {
    const staleResults = [{ ...results[1], ytdActual: 11, status: KpiStatus.Missing }];
    const matrix = buildOverviewMatrix(plants, kpis, targets, staleResults);

    expect(matrix[1].statuses['plant-1']).toBe(KpiStatus.Green);
  });

  it('builds monthly matrix values and takes YTD actual from the selected month', () => {
    const monthlyResults = [
      ...results,
      { ...results[0], id: 'june', month: 6, monthlyActual: 4, ytdActual: 20 },
      { ...results[0], id: 'july', month: 7, monthlyActual: 0, ytdActual: 25 },
      { ...results[0], id: 'august', month: 8, monthlyActual: 7, ytdActual: 32 },
    ];
    const rows = buildKpiMonthlyMatrixRows([...plants].reverse(), [...kpis].reverse(), targets, monthlyResults, 8);
    const row = rows.find((item) => item.plant.id === 'plant-1' && item.kpi.id === 'kpi-1')!;
    expect(rows.some((item) => item.plant.id === 'plant-2' && item.kpi.id === 'kpi-2')).toBe(false);
    expect(rows[0]).toMatchObject({ plant: { id: 'plant-1' }, kpi: { id: 'kpi-1' } });
    expect(row.monthlyActuals[5]).toBe(4);
    expect(row.monthlyActuals[6]).toBe(0);
    expect(row.monthlyActuals[7]).toBe(7);
    expect(row.monthlyActuals[8]).toBeUndefined();
    expect(row.ytdActual).toBe(32);
  });
});

``

---

## File: src/test/period.test.ts

- Size: 482 bytes
- Last modified: 2026-10-03 17:18:37

``typescript
import { describe, expect, it } from 'vitest';
import { getPreviousPeriod } from '../domain/services/period';

describe('getPreviousPeriod', () => {
  it('returns the previous month in the same year', () => {
    expect(getPreviousPeriod(new Date(2026, 8, 26))).toEqual({ year: 2026, month: 8 });
  });

  it('rolls January back to December of the previous year', () => {
    expect(getPreviousPeriod(new Date(2026, 0, 3))).toEqual({ year: 2025, month: 12 });
  });
});

``

---

## File: src/test/productionKpiMatrixRepository.test.ts

- Size: 3405 bytes
- Last modified: 2026-10-07 16:53:20

``typescript
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProductionKpiMatrix } from '../domain/models/charts';

const services = vi.hoisted(() => ({
  matrix: { getAll: vi.fn(), create: vi.fn(), update: vi.fn() },
  plant: { get: vi.fn() },
}));
vi.mock('@microsoft/power-apps/data', () => ({ getClient: vi.fn(() => ({})) }));
vi.mock('../generated/services/Apma_pmtproductionkpimatrixesService', () => ({ Apma_pmtproductionkpimatrixesService: services.matrix }));
vi.mock('../generated/services/Apma_pmtplantsesService', () => ({ Apma_pmtplantsesService: services.plant }));
import { volumePacRepository } from '../data/adapters/volumePacRepository';

const values: Omit<ProductionKpiMatrix, 'id' | 'mainName'> = {
  plantId: 'plant-1', type: 'Production', categories: 'Product', productionClass: 'FG', displayOrder: 2,
};

describe('Production KPI Matrix Production Class', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    services.plant.get.mockResolvedValue({ success: true, data: { apma_name: 'Pudong-TPU' } });
    services.matrix.create.mockResolvedValue({ success: true, data: { apma_pmtproductionkpimatrixid: 'matrix-1' } });
    services.matrix.update.mockResolvedValue({ success: true, data: {} });
  });

  it('reads Production Class labels and preserves unset values', async () => {
    services.matrix.getAll.mockResolvedValue({ success: true, data: [
      { apma_pmtproductionkpimatrixid: 'matrix-1', apma_mainname: 'name', apma_type: 457470000, apma_productionclass: 457470001 },
      { apma_pmtproductionkpimatrixid: 'matrix-2', apma_mainname: 'name', apma_type: 457470001 },
      { apma_pmtproductionkpimatrixid: 'matrix-3', apma_mainname: 'name', apma_type: 457470000, apma_productionclass: 457470004 },
    ] });
    const records = await volumePacRepository.getProductionKpiMatrices();
    expect(records.map((record) => record.productionClass)).toEqual(['FG', null, 'FPYFG']);
    expect(services.matrix.getAll).toHaveBeenCalledWith(expect.objectContaining({ select: expect.arrayContaining(['apma_productionclass']) }));
  });

  it('creates the selected choice without changing the Main Name format', async () => {
    await volumePacRepository.createProductionKpiMatrix(values);
    expect(services.matrix.create).toHaveBeenCalledWith(expect.objectContaining({
      apma_mainname: 'Pudong-TPU_Production_Product', apma_productionclass: 457470001,
    }));
  });

  it('updates the selected Production Class', async () => {
    await volumePacRepository.updateProductionKpiMatrix('matrix-1', { ...values, productionClass: 'RM' });
    expect(services.matrix.update).toHaveBeenCalledWith('matrix-1', expect.objectContaining({ apma_productionclass: 457470002 }));
  });

  it('updates the FPY FG Production Class choice', async () => {
    await volumePacRepository.updateProductionKpiMatrix('matrix-1', { ...values, productionClass: 'FPYFG' });
    expect(services.matrix.update).toHaveBeenCalledWith('matrix-1', expect.objectContaining({ apma_productionclass: 457470004 }));
  });

  it('clears the Production Class selection with null', async () => {
    await volumePacRepository.updateProductionKpiMatrix('matrix-1', { ...values, productionClass: null });
    expect(services.matrix.update).toHaveBeenCalledWith('matrix-1', expect.objectContaining({ apma_productionclass: null }));
  });
});

``

---

## File: src/test/productionKpiRepository.test.ts

- Size: 2948 bytes
- Last modified: 2026-10-06 17:50:11

``typescript
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProductionKpiRecord } from '../domain/models/charts';

const service = vi.hoisted(() => ({ getAll: vi.fn(), create: vi.fn(), update: vi.fn() }));
vi.mock('../generated/services/Apma_pmtproductionkpisService', () => ({ Apma_pmtproductionkpisService: service }));
import { productionKpiRepository } from '../data/adapters/productionKpiRepository';

const values: Omit<ProductionKpiRecord, 'id'> = {
  mainName: 'unused', year: 2026, month: 9, plantId: 'plant-1', type: 'Production', categories: 'Volume', quantity: null,
};

describe('Production KPI persistence', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    service.create.mockResolvedValue({ success: true, data: {} });
    service.update.mockResolvedValue({ success: true, data: {} });
  });

  it('creates every displayed record, including blank quantity, with all business fields', async () => {
    await productionKpiRepository.saveBatch([values]);
    expect(service.create).toHaveBeenCalledWith({
      apma_mainname: '2026_9_Production_Volume', apma_year: 2026, apma_month: 457470008,
      'apma_PlantName@odata.bind': '/apma_pmtplantses(plant-1)', apma_type: 457470000,
      apma_categories: 'Volume', apma_quantityt: null, apma_ratio: null,
    });
    expect(service.update).not.toHaveBeenCalled();
  });

  it('updates an existing row using its ID and preserves zero quantity', async () => {
    await productionKpiRepository.saveBatch([{ ...values, id: 'record-1', quantity: 0, ratio: 0, type: 'Quality' }]);
    expect(service.update).toHaveBeenCalledWith('record-1', expect.objectContaining({
      apma_mainname: '2026_9_Quality_Volume', apma_type: 457470001, apma_quantityt: 0, apma_ratio: 0,
    }));
    expect(service.create).not.toHaveBeenCalled();
  });

  it('persists a calculated Ratio when creating a record', async () => {
    await productionKpiRepository.saveBatch([{ ...values, quantity: 25, ratio: 12.5 }]);
    expect(service.create).toHaveBeenCalledWith(expect.objectContaining({ apma_quantityt: 25, apma_ratio: 12.5 }));
  });

  it('loads Ratio values from the generated Dataverse field', async () => {
    service.getAll.mockResolvedValue({ success: true, data: [{
      apma_pmtproductionkpiid: 'r1', apma_mainname: 'name', apma_year: 2026, apma_month: 457470008,
      _apma_plantname_value: 'plant-1', apma_type: 457470000, apma_categories: 'Volume', apma_quantityt: 25, apma_ratio: 12.5,
    }] });
    expect(await productionKpiRepository.getAll()).toEqual([expect.objectContaining({ quantity: 25, ratio: 12.5 })]);
  });

  it('propagates Dataverse failures rather than reporting a successful save', async () => {
    service.create.mockResolvedValue({ success: false, error: new Error('Not permitted') });
    await expect(productionKpiRepository.saveBatch([values])).rejects.toThrow('Not permitted');
  });
});

``

---

## File: src/test/productionQualityMetrics.test.ts

- Size: 6415 bytes
- Last modified: 2026-10-14 22:55:23

``typescript
import { describe, expect, it } from 'vitest';
import type { ProductionKpiMatrix, ProductionKpiRecord } from '../domain/models/charts';
import { buildProductionQualityAxisDomains, buildProductionQualityMetrics } from '../pages/ProductionQualityPage/chartMetrics';

const matrices: ProductionKpiMatrix[] = [
  { id: 'rm', mainName: '', plantId: 'p1', type: 'Production', categories: 'Raw material', productionClass: 'RM', displayOrder: 0 },
  { id: 'fg', mainName: '', plantId: 'p1', type: 'Production', categories: 'FG', productionClass: 'FG', displayOrder: 1 },
  { id: 'nt', mainName: '', plantId: 'p1', type: 'Production', categories: 'NT', productionClass: 'NT', displayOrder: 2 },
  { id: 'w1', mainName: '', plantId: 'p1', type: 'Production', categories: 'Liquid', productionClass: 'Waste', displayOrder: 3 },
  { id: 'w2', mainName: '', plantId: 'p1', type: 'Production', categories: 'Recycle', productionClass: 'Waste', displayOrder: 4 },
  { id: 'q1', mainName: '', plantId: 'p1', type: 'Quality', categories: 'Defects', productionClass: 'Defect', displayOrder: 1 },
  { id: 'q2', mainName: '', plantId: 'p1', type: 'Quality', categories: 'FPY FG', productionClass: 'FPYFG', displayOrder: 2 },
];
const record = (categories: string, quantity: number | null, month = 1, year = 2026, type: 'Production' | 'Quality' = 'Production', plantId = 'p1'): ProductionKpiRecord => ({
  id: `${plantId}-${year}-${month}-${categories}`, mainName: '', plantId, year, month, type, categories, quantity,
});
const records = [
  record('Raw material', 100), record('FG', 80), record('NT', 8), record('Liquid', 5), record('Recycle', 5), record('Defects', 3, 1, 2026, 'Quality'),
  record('Raw material', 200, 2), record('FG', 160, 2), record('NT', 20, 2), record('Liquid', 10, 2), record('Recycle', null, 2), record('Defects', 8, 2, 2026, 'Quality'),
  record('Raw material', 400, 12, 2025), record('FG', 300, 12, 2025), record('NT', 12, 12, 2025), record('Liquid', 20, 12, 2025), record('Defects', 4, 12, 2025, 'Quality'),
];

describe('Production & Quality chart metrics', () => {
  it('keeps ratio points above all stacked bars for varying, constant, zero and negative ratios', () => {
    for (const ratios of [[0, 100], [75, 75], [0, 0], [-20, -5]]) {
      const points = ratios.map((ratio) => ({ label: '', ratio, quantities: { fg: 100, waste: 50 }, percentages: {} }));
      const domains = buildProductionQualityAxisDomains(points);
      const barHeight = 150 / domains.quantity[1];
      for (const ratio of ratios) {
        const pointHeight = (ratio - domains.ratio[0]) / (domains.ratio[1] - domains.ratio[0]);
        expect(pointHeight).toBeGreaterThan(barHeight + 0.06);
        expect(pointHeight).toBeLessThanOrEqual(0.775001);
        const minimum = Math.min(...ratios);
        const previousRange = Math.max(Math.max(...ratios) - minimum, Math.abs(minimum) * 0.1, 1) / 0.12;
        const previousHeight = (ratio - minimum) / previousRange + 0.78;
        expect(pointHeight - barHeight).toBeCloseTo((previousHeight - barHeight) / 2);
      }
    }
    const empty = buildProductionQualityAxisDomains([]);
    expect(empty.quantity[1]).toBeGreaterThan(0);
    expect(empty.ratio[1]).toBeGreaterThan(empty.ratio[0]);
  });

  it('excludes RM and NT from bars and calculates Waste ratio as RM-FG-NT over RM', () => {
    const metrics = buildProductionQualityMetrics(records, [...matrices].reverse(), '{P1}', 'Production', 2026, [1, 2]);
    expect(metrics.series.map((series) => series.name)).toEqual(['FG', 'Liquid', 'Recycle']);
    expect(metrics.months[0].ratio).toBe(12);
    expect(metrics.months[0].percentages.category_0).toBe(80);
    expect(metrics.months[1].ratio).toBe(10);
  });

  it('aggregates all prior-year months for PY but only selected CY months', () => {
    const metrics = buildProductionQualityMetrics(records, matrices, 'p1', 'Production', 2026, [1]);
    expect(metrics.comparison[0].quantities.category_0).toBe(300);
    expect(metrics.comparison[0].ratio).toBe(22);
    expect(metrics.comparison[1].quantities.category_0).toBe(80);
    expect(metrics.comparison[1].ratio).toBe(12);
    expect(metrics.months[1].ratio).toBeNull();
    expect(metrics.months[1].quantities.category_0).toBeNull();
    expect(metrics.months).toHaveLength(12);
  });

  it('calculates YTD as ratio of totals rather than average of monthly percentages', () => {
    const metrics = buildProductionQualityMetrics(records, matrices, 'p1', 'Production', 2026, [1, 2]);
    expect(metrics.comparison[1].ratio).toBeCloseTo(32 / 300 * 100);
  });

  it('uses the plant shared RM and derives Quality FPY from FG minus Defect', () => {
    const metrics = buildProductionQualityMetrics(records, matrices, 'p1', 'Quality', 2026, [1, 2]);
    expect(metrics.lineName).toBe('FPY');
    expect(metrics.months[0].ratio).toBe(77);
    expect(metrics.comparison[1].ratio).toBeCloseTo(229 / 300 * 100);
    expect(metrics.comparison[0].ratio).toBe(296 / 400 * 100);
  });

  it('never mixes other plants, years or types in the numerator', () => {
    const input = [...records, record('Liquid', 1000, 1, 2026, 'Production', 'p2'), record('Liquid', 1000, 1, 2024), record('Liquid', 1000, 1, 2026, 'Quality')];
    expect(buildProductionQualityMetrics(input, matrices, 'p1', 'Production', 2026, [1]).months[0].ratio).toBe(12);
  });

  it('preserves zero numerator, ignores empty quantities and sums multiple records', () => {
    const input = [record('Raw material', 50), record('Raw material', 50), record('FG', 90), record('NT', 10), record('Liquid', 0), record('Recycle', null)];
    const metrics = buildProductionQualityMetrics(input, matrices, 'p1', 'Production', 2026, [1]);
    expect(metrics.months[0].ratio).toBe(0);
    expect(metrics.months[0].quantities.category_2).toBeNull();
  });

  it('leaves percentages blank with missing or zero RM and for empty month selection', () => {
    expect(buildProductionQualityMetrics([record('Liquid', 5)], matrices, 'p1', 'Production', 2026, [1]).months[0].ratio).toBeNull();
    expect(buildProductionQualityMetrics([record('Liquid', 5), record('Raw material', 0)], matrices, 'p1', 'Production', 2026, [1]).months[0].ratio).toBeNull();
    expect(buildProductionQualityMetrics(records, matrices, 'p1', 'Production', 2026, []).comparison[1].ratio).toBeNull();
  });
});

``

---

## File: src/test/productionRows.test.ts

- Size: 10550 bytes
- Last modified: 2026-10-14 22:37:27

``typescript
import { describe, expect, it } from 'vitest';
import type { Plant } from '../domain/models';
import type { ProductionKpiMatrix, ProductionKpiRecord } from '../domain/models/charts';
import { buildProductionRows, buildProductionSavePayload, calculateProductionRatios, calculateProductionSummary } from '../pages/ProductionDataEntryPage/productionRows';

const plants: Plant[] = [{ id: 'p1', name: 'Plant 1', displayOrder: 1 }, { id: 'p2', name: 'Plant 2', displayOrder: 2 }];
const matrices: ProductionKpiMatrix[] = [
  { id: 'm1', mainName: '', plantId: '{P1}', type: 'Production', categories: 'Volume', displayOrder: 1 },
  { id: 'm2', mainName: '', plantId: 'p1', type: 'Quality', categories: 'First Pass', displayOrder: 2 },
  { id: 'm3', mainName: '', plantId: 'p2', type: 'Production', categories: 'Volume', displayOrder: 1 },
];
const filters = { years: [2026], months: [9], plantIds: ['p1'], categories: [] };

describe('Production Data Entry rows', () => {
  it('shows nothing before selecting a plant', () => {
    expect(buildProductionRows(plants, matrices, [], { ...filters, plantIds: [] })).toEqual([]);
  });

  it('uses selected plant Matrix entries and generates names and empty quantities', () => {
    const rows = buildProductionRows(plants, matrices, [], filters);
    expect(rows.map((row) => [row.mainName, row.plantId, row.quantity])).toEqual([
      ['2026_9_Production_Volume', 'p1', null], ['2026_9_Quality_First Pass', 'p1', null],
    ]);
    expect(buildProductionSavePayload(rows, {})).toHaveLength(2);
    expect(buildProductionSavePayload(rows, {})[0].quantity).toBeNull();
  });

  it('matches existing records and saves all displayed rows, including zero and cleared values', () => {
    const record: ProductionKpiRecord = { id: 'r1', mainName: '', year: 2026, month: 9, plantId: 'p1', type: 'Production', categories: 'Volume', quantity: 12 };
    const rows = buildProductionRows(plants, matrices, [record], filters);
    const payload = buildProductionSavePayload(rows, { [rows[0].key]: '', [rows[1].key]: '0' });
    expect(payload[0]).toMatchObject({ id: 'r1', quantity: null, year: 2026, month: 9, plantId: 'p1', type: 'Production', categories: 'Volume' });
    expect(payload[1]).toMatchObject({ id: undefined, quantity: 0 });
  });

  it('supports multi-year, month, plant and category selections without duplicate Matrix rows', () => {
    const rows = buildProductionRows(plants, [...matrices, matrices[0]], [], { years: [2025, 2026], months: [8, 9], plantIds: ['p1', 'p2'], categories: ['Volume'] });
    expect(rows).toHaveLength(8);
    expect(rows.every((row) => row.categories === 'Volume')).toBe(true);
  });

  it('rejects invalid numeric input before saving', () => {
    const rows = buildProductionRows(plants, matrices, [], filters);
    expect(() => buildProductionSavePayload(rows, { [rows[0].key]: 'invalid' })).toThrow('Invalid Quantity');
  });

  it('uses RM from the same Plant, Year and Month across Types and recalculates edited quantities', () => {
    const rows = buildProductionRows(plants, matrices, [], filters);
    const volume = { ...rows[0], quantity: 25 };
    const quality = { ...rows[1], quantity: 10 };
    const rm = { ...volume, key: 'rm', categories: 'RM', quantity: 100 };
    const otherPlantRm = { ...rm, key: 'rm-other-plant', plantId: 'p2', quantity: 200 };
    const otherMonthRm = { ...rm, key: 'rm-other-month', month: 8, quantity: 300 };
    const otherYearRm = { ...rm, key: 'rm-other-year', year: 2025, quantity: 400 };
    const input = [volume, quality, rm, otherPlantRm, otherMonthRm, otherYearRm];
    const calculated = calculateProductionRatios(input);
    expect(calculated[0].ratio).toBe(25);
    expect(calculated[1].ratio).toBe(10);
    expect(calculated[2].ratio).toBeNull();
    expect(calculateProductionRatios(input, { rm: '200' })[0].ratio).toBe(12.5);
    expect(calculateProductionRatios(input, { [volume.key]: '0' })[0].ratio).toBe(0);
  });

  it('leaves ratios blank when numerator or RM is blank, missing or zero', () => {
    const [volume] = buildProductionRows(plants, matrices, [], filters);
    const rm = { ...volume, key: 'rm', categories: 'RM', quantity: 0 };
    expect(calculateProductionRatios([{ ...volume, quantity: 25 }])[0].ratio).toBeNull();
    expect(calculateProductionRatios([{ ...volume, quantity: 25 }, rm])[0].ratio).toBeNull();
    expect(calculateProductionRatios([{ ...volume, quantity: 25 }, { ...rm, quantity: null }])[0].ratio).toBeNull();
    expect(calculateProductionRatios([volume, { ...rm, quantity: 100 }])[0].ratio).toBeNull();
  });

  it('uses hidden RM as denominator but saves only visible categories', () => {
    const rmMatrix = { ...matrices[0], id: 'rm-matrix', categories: 'RM' };
    const records: ProductionKpiRecord[] = [
      { id: 'volume-record', mainName: '', year: 2026, month: 9, plantId: 'p1', type: 'Production', categories: 'Volume', quantity: 25 },
      { id: 'rm-record', mainName: '', year: 2026, month: 9, plantId: 'p1', type: 'Production', categories: 'RM', quantity: 100 },
    ];
    const allRows = buildProductionRows(plants, [...matrices, rmMatrix], records, filters);
    const visible = buildProductionRows(plants, [...matrices, rmMatrix], records, { ...filters, categories: ['Volume'] });
    expect(visible).toHaveLength(1);
    expect(visible[0].ratio).toBe(25);
    const payload = buildProductionSavePayload(visible, { [visible[0].key]: '50' }, allRows);
    expect(payload).toHaveLength(1);
    expect(payload[0]).toMatchObject({ id: 'volume-record', quantity: 50, ratio: 50 });
  });

  it('calculates Production Waste summary as (RM - FG - NT) over RM', () => {
    const classifiedMatrices: ProductionKpiMatrix[] = [
      { id: 'rm-matrix', mainName: '', plantId: 'p1', type: 'Production', categories: 'RM', productionClass: 'RM', displayOrder: 0 },
      { id: 'fg-matrix', mainName: '', plantId: 'p1', type: 'Production', categories: 'FG', productionClass: 'FG', displayOrder: 1 },
      { id: 'nt-matrix', mainName: '', plantId: 'p1', type: 'Production', categories: 'NT', productionClass: 'NT', displayOrder: 2 },
      { id: 'waste-matrix', mainName: '', plantId: 'p1', type: 'Production', categories: 'Waste A', productionClass: 'Waste', displayOrder: 3 },
    ];
    const rows = [
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'rm-1', categories: 'RM', quantity: 100 },
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'rm-2', month: 10, categories: 'RM', quantity: 200 },
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'fg-1', categories: 'FG', quantity: 65 },
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'fg-2', month: 10, categories: 'FG', quantity: 120 },
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'nt-1', categories: 'NT', quantity: 5 },
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'nt-2', month: 10, categories: 'NT', quantity: 15 },
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'waste-next-month', month: 10, categories: 'Waste A', quantity: 999 },
    ];
    const summary = calculateProductionSummary('p1', 'Production', rows, classifiedMatrices);
    expect(summary).toEqual({ label: 'Waste', quantity: 95, ratio: 95 / 300 * 100 });
  });

  it('calculates Quality FPY from Defect quantity and shared Production RM quantity', () => {
    const classifiedMatrices: ProductionKpiMatrix[] = [
      { id: 'rm-matrix', mainName: '', plantId: 'p1', type: 'Production', categories: 'RM', productionClass: 'RM', displayOrder: 0 },
      { id: 'fg-matrix', mainName: '', plantId: 'p1', type: 'Production', categories: 'FG', productionClass: 'FG', displayOrder: 1 },
      { id: 'defect-matrix', mainName: '', plantId: 'p1', type: 'Quality', categories: 'Defects', productionClass: 'Defect', displayOrder: 1 },
      { id: 'fpy-matrix', mainName: '', plantId: 'p1', type: 'Quality', categories: 'FPY FG', productionClass: 'FPYFG', displayOrder: 2 },
    ];
    const rows = buildProductionRows(plants, classifiedMatrices, [], { ...filters, months: [9, 10] }).map((row) => ({
      ...row,
      quantity: ({
        '9:RM': 100, '9:FG': 80, '9:Defects': 10, '9:FPY FG': 999,
        '10:RM': 200, '10:FG': 140, '10:Defects': 20, '10:FPY FG': 999,
      } as Record<string, number>)[`${row.month}:${row.categories}`] ?? null,
    }));
    const summary = calculateProductionSummary('p1', 'Quality', rows, classifiedMatrices);
    expect(summary.label).toBe('FPY');
    expect(summary.quantity).toBe(190);
    expect(summary.ratio).toBeCloseTo(190 / 300 * 100);
  });

  it('calculates FPY FG as FG minus Defect, recalculates its Ratio, and saves the derived quantity', () => {
    const classifiedMatrices: ProductionKpiMatrix[] = [
      { id: 'rm-matrix', mainName: '', plantId: 'p1', type: 'Production', categories: 'RM', productionClass: 'RM', displayOrder: 0 },
      { id: 'fg-a', mainName: '', plantId: 'p1', type: 'Production', categories: 'FG A', productionClass: 'FG', displayOrder: 1 },
      { id: 'fg-b', mainName: '', plantId: 'p1', type: 'Production', categories: 'FG B', productionClass: 'FG', displayOrder: 2 },
      { id: 'defect', mainName: '', plantId: 'p1', type: 'Quality', categories: 'Defects', productionClass: 'Defect', displayOrder: 3 },
      { id: 'fpy', mainName: '', plantId: 'p1', type: 'Quality', categories: 'FPY FG', productionClass: 'FPYFG', displayOrder: 4 },
    ];
    const rows = buildProductionRows(plants, classifiedMatrices, [], filters).map((row) => ({
      ...row,
      quantity: ({ RM: 200, 'FG A': 60, 'FG B': 40, Defects: 8, 'FPY FG': 999 } as Record<string, number>)[row.categories] ?? null,
    }));
    const fpyRow = rows.find((row) => row.categories === 'FPY FG')!;
    const fgRow = rows.find((row) => row.categories === 'FG A')!;
    const drafts = { [fgRow.key]: '65', [fpyRow.key]: '0' };
    const calculated = calculateProductionRatios(rows, drafts, classifiedMatrices);
    expect(calculated.find((row) => row.key === fpyRow.key)).toMatchObject({ quantity: 97, ratio: 48.5 });
    const payload = buildProductionSavePayload(rows, drafts, rows, classifiedMatrices);
    expect(payload.find((row) => row.categories === 'FPY FG')).toMatchObject({ quantity: 97, ratio: 48.5 });
  });
});

``

---

## File: src/test/reportExport.test.ts

- Size: 23860 bytes
- Last modified: 2026-10-09 16:44:29

``typescript
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { readFile } from 'node:fs/promises';
import JSZip from 'jszip';
import { ReportType, KpiStatus } from '../domain/enums';
import { buildExportKpiRows, buildExportParagraphs, buildExportVolumeGroups, orderedExportPlants } from '../pages/MonthlyReportsPage/reportExportData';
import type { MonthlyReportExportData } from '../pages/MonthlyReportsPage/reportExportData';
import { buildMonthlyReportPowerPoint, fitReportImage } from '../pages/MonthlyReportsPage/reportPowerPoint';
import { pickReportSaveLocation, REPORT_MIME_TYPE, reportFileName, writeReportFile } from '../pages/MonthlyReportsPage/reportSave';
import { MonthlyReportsPage } from '../pages/MonthlyReportsPage/MonthlyReportsPage';
import { emphasizeReportChartText, waitForReportCharts } from '../pages/MonthlyReportsPage/renderReportCharts';

const pageMocks = vi.hoisted(() => ({ exporter: vi.fn(), success: vi.fn(), error: vi.fn() }));
vi.mock('../pages/MonthlyReportsPage/exportMonthlyReport', () => ({ exportMonthlyReport: pageMocks.exporter }));
vi.mock('../hooks/useAppToast', () => ({ useAppToast: () => ({ notifySuccess: pageMocks.success, notifyError: pageMocks.error }) }));
vi.mock('../hooks/queries', () => ({
  usePlants: () => ({ data: [{ id: 'p1', name: 'Plant 1', displayOrder: 1 }], isLoading: false }),
  useReportCategories: () => ({ data: [], isLoading: false }),
  useMonthlyReports: () => ({ data: [], isLoading: false }),
  useAllTargets: () => ({ data: [], isLoading: false }),
  useReportAttachments: () => ({ data: [] }),
  useDownloadAttachment: () => ({}),
  useSaveMonthlyReport: () => ({}),
  useUploadAttachment: () => ({}),
}));

export const exportFixture: MonthlyReportExportData = {
  year: 2026, month: 9,
  plants: [{ id: 'p2', name: 'Plant 2', displayOrder: 2 }, { id: 'p1', name: 'Plant 1', displayOrder: 1 }],
  categories: [{ id: 'ehs', name: 'QEHS', displayOrder: 1 }, { id: 'production', name: 'Production Update', displayOrder: 2 }, { id: 'quality', name: 'Quality Update', displayOrder: 3 }],
  reports: [
    { id: 'r1', plantId: 'p1', year: 2026, month: 9, categoryId: 'ehs', type: ReportType.Highlights, content: 'Safety update', displayOrder: 1 },
    { id: 'r2', plantId: 'p1', year: 2026, month: 9, categoryId: 'ehs', type: ReportType.Lowlights, content: '   ', displayOrder: 1 },
    { id: 'r3', plantId: 'p1', year: 2026, month: 9, categoryId: 'quality', type: ReportType.Lowlights, content: 'Quality issue', displayOrder: 1 },
  ],
  kpis: [{ id: 'k1', name: 'Volume', category: 'Production', unit: 't', displayOrder: 1 }, { id: 'k2', name: 'Unused', category: 'Quality', unit: '%', displayOrder: 2 }],
  targets: [{ id: 't1', targetYear: 2026, plantId: 'p1', kpiId: 'k1', cyTarget: 0 }, { id: 't2', targetYear: 2026, plantId: 'p1', kpiId: 'k2', cyTarget: null }],
  monthlyResults: [{ id: 'm1', year: 2026, month: 9, plantId: 'p1', kpiId: 'k1', monthlyActual: 0, ytdActual: 10, status: KpiStatus.Green }],
  lines: [], lineMatrices: [], aeCategories: [], aeRecords: [], volumeRecords: [], productionMatrices: [], productionRecords: [],
};

describe('Monthly PowerPoint export data', () => {
  it('exports the requested Pudong and Changhua line groups without OP on line charts', () => {
    const names = ['Belt-DE', 'REX', 'FHF', 'Belt-Cast'];
    const data = { ...exportFixture, lines: names.map((name, index) => ({ id: `line-${index}`, name, displayOrder: index })),
      volumeRecords: names.map((_name, index) => ({ id: `volume-${index}`, mainName: '', plantId: 'p1', year: 2026, month: 9, productionLineId: `line-${index}`, volume: index + 1, forecast: index + 2, pac: index + 3 })) };
    const pudong = buildExportVolumeGroups(data, { id: 'p1', name: 'Pudong-TPU', displayOrder: 1 });
    expect(pudong.map((group) => group.label)).toEqual([null, 'Belt-DE + REX', 'FHF']);
    expect(pudong[0].points[0].label).toBe('OP');
    expect(pudong[0].points.find((point) => point.month === 9)?.volume).toBe(10);
    expect(pudong[1].points.find((point) => point.month === 9)?.volume).toBe(3);
    expect(pudong[2].points.find((point) => point.month === 9)?.volume).toBe(3);
    expect(pudong[1].points).toHaveLength(12);
    expect(pudong[2].points.some((point) => point.label === 'OP')).toBe(false);
    const changhua = buildExportVolumeGroups(data, { id: 'p1', name: 'Changhua-TPU', displayOrder: 1 });
    expect(changhua.map((group) => group.label)).toEqual([null, 'Belt-Cast', 'REX']);
    expect(changhua[1].points.find((point) => point.month === 9)?.volume).toBe(4);
    expect(changhua[2].points.find((point) => point.month === 9)?.volume).toBe(2);
    expect(buildExportVolumeGroups(data, { id: 'p1', name: 'Yokkaichi-TPU', displayOrder: 1 })).toHaveLength(1);
  });

  it('exports every plant in display order', () => {
    expect(orderedExportPlants(exportFixture).map((plant) => plant.id)).toEqual(['p1', 'p2']);
  });
  it('omits empty Highlights/Lowlights labels and separates Quality Update', () => {
    expect(buildExportParagraphs(exportFixture, 'p1', 'operations').map((paragraph) => paragraph.text)).toEqual(['QEHS', '+ Highlights:', 'Safety update']);
    expect(buildExportParagraphs(exportFixture, 'p1', 'quality').map((paragraph) => paragraph.text)).toEqual(['Quality Update', '- Lowlights:', 'Quality issue']);
  });
  it('uses selected-month YTD and omits blank-target KPIs', () => {
    const rows = buildExportKpiRows(exportFixture, exportFixture.plants[1]);
    expect(rows).toHaveLength(1);
    expect(rows[0].monthlyActuals).toHaveLength(12);
    expect(rows[0].monthlyActuals[8]).toBe(0);
    expect(rows[0].ytdActual).toBe(10);
  });
});

describe('Monthly PowerPoint template export', () => {
  it('fits charts inside their fixed region without stretching', () => {
    const fitted = fitReportImage({ dataUrl: '', width: 1000, height: 400 }, { x: 10, y: 20, width: 500, height: 500 });
    expect(fitted).toEqual({ x: 10, y: 170, width: 500, height: 200 });
    expect(fitReportImage({ dataUrl: '', width: 1000, height: 400 }, { x: 10, y: 20, width: 500, height: 500 }, 'top')).toEqual({ x: 10, y: 20, width: 500, height: 200 });
    const previousAe = fitReportImage({ dataUrl: '', width: 280, height: 320 }, { x: 0, y: 0, width: 280, height: 1000 }, 'top');
    const narrowedAe = fitReportImage({ dataUrl: '', width: 210, height: 320 }, { x: 70, y: 0, width: 210, height: 1000 }, 'top-right');
    expect(narrowedAe.width).toBe(previousAe.width * 0.75);
    expect(narrowedAe.height).toBe(previousAe.height);
    expect(narrowedAe.x + narrowedAe.width).toBe(280);
    expect(fitReportImage({ dataUrl: '', width: 210, height: 2000 }, { x: 70, y: 0, width: 210, height: 1000 }, 'top-right')).toEqual({ x: 175, y: 0, width: 105, height: 1000 });
  });

  it('top-aligns short charts, extends titles and keeps a dense KPI table inside the slide with one font size', async () => {
    const template = await readFile('public/monthly-report-template.pptx');
    const image = { dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN9sAAAAASUVORK5CYII=', width: 660, height: 400 };
    const kpis = Array.from({ length: 24 }, (_value, index) => ({ id: `kpi-${index}`, name: `Long KPI description for item ${index}`, category: 'Production', unit: '%', displayOrder: index }));
    const data = { ...exportFixture, plants: [exportFixture.plants[1]], kpis,
      targets: kpis.map((kpi, index) => ({ id: `target-${index}`, targetYear: 2026, plantId: 'p1', kpiId: kpi.id, pyActual: 12345.67, cyTarget: 99999.99 })) };
    const zip = await JSZip.loadAsync(await buildMonthlyReportPowerPoint(template, data, async () => ({ ae: image, volume: image, production: image, quality: image })));
    const parse = async (path: string) => new DOMParser().parseFromString(await zip.file(path)!.async('string'), 'application/xml');
    const shape = (document: Document, id: string) => Array.from(document.getElementsByTagName('p:spTree')[0].children)
      .find((child) => child.getElementsByTagName('p:cNvPr')[0]?.getAttribute('id') === id)!;
    const operations = await parse('ppt/slides/slide7.xml');
    const pictures = Array.from(operations.getElementsByTagName('p:pic'));
    const ae = pictures.find((picture) => picture.getElementsByTagName('p:cNvPr')[0].getAttribute('name') === 'report7ae')!;
    const volume = pictures.find((picture) => picture.getElementsByTagName('p:cNvPr')[0].getAttribute('name') === 'report7volume')!;
    expect(Number(ae.getElementsByTagName('a:off')[0].getAttribute('y'))).toBe(1314067);
    expect(Number(ae.getElementsByTagName('a:off')[0].getAttribute('x')) + Number(ae.getElementsByTagName('a:ext')[0].getAttribute('cx'))).toBe(211276 + 1581749);
    expect(Number(volume.getElementsByTagName('a:off')[0].getAttribute('y'))).toBe(1314067);
    expect(Number(volume.getElementsByTagName('a:ext')[0].getAttribute('cy'))).toBe(Math.round(2980906 * 400 / 660));
    const presentation = await parse('ppt/presentation.xml');
    const size = presentation.getElementsByTagName('p:sldSz')[0];
    for (const slide of [8, 9]) {
      const title = shape(await parse(`ppt/slides/slide${slide}.xml`), '2');
      const transform = title.getElementsByTagName('a:xfrm')[0];
      expect(Number(transform.getElementsByTagName('a:off')[0].getAttribute('x')) + Number(transform.getElementsByTagName('a:ext')[0].getAttribute('cx'))).toBe(Number(size.getAttribute('cx')));
      expect(title.getElementsByTagName('a:bodyPr')[0].getAttribute('wrap')).toBe('none');
    }
    const tableShape = shape(await parse('ppt/slides/slide10.xml'), '8');
    const table = tableShape.getElementsByTagName('a:tbl')[0];
    const fonts = Array.from(table.getElementsByTagName('*')).filter((value) => ['rPr', 'endParaRPr', 'defRPr'].includes(value.localName)).map((value) => value.getAttribute('sz'));
    expect(new Set(fonts).size).toBe(1);
    expect(Number(fonts[0])).toBeGreaterThan(0);
    const tableTransform = tableShape.getElementsByTagName('p:xfrm')[0];
    const top = Number(tableTransform.getElementsByTagName('a:off')[0].getAttribute('y'));
    const height = Number(tableTransform.getElementsByTagName('a:ext')[0].getAttribute('cy'));
    expect(top + height).toBeLessThan(Number(size.getAttribute('cy')));
    const rows = Array.from(table.getElementsByTagName('a:tr'));
    expect(rows).toHaveLength(25);
    expect(rows.reduce((total, row) => total + Number(row.getAttribute('h')), 0)).toBe(height);
    expect(Array.from(table.getElementsByTagName('a:tc')).every((cell) => cell.getElementsByTagName('a:p').length === 1)).toBe(true);
    expect(Array.from(table.getElementsByTagName('a:tc')).every((cell) => cell.getElementsByTagName('a:defRPr')[0]?.getAttribute('sz') === fonts[0]
      && cell.getElementsByTagName('a:endParaRPr')[0]?.getAttribute('sz') === fonts[0])).toBe(true);
  }, 20000);

  it('creates four slides per plant and retains the original cover and last page', async () => {
    const template = await readFile('public/monthly-report-template.pptx');
    const image = { dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN9sAAAAASUVORK5CYII=', width: 1000, height: 400 };
    const result = await buildMonthlyReportPowerPoint(template, exportFixture, async () => ({ ae: image, volume: image, production: image, quality: image }));
    const zip = await JSZip.loadAsync(result);
    const original = await JSZip.loadAsync(template);
    const presentation = new DOMParser().parseFromString(await zip.file('ppt/presentation.xml')!.async('string'), 'application/xml');
    expect(presentation.getElementsByTagName('p:sldId')).toHaveLength(10);
    expect(await zip.file('ppt/slides/slide1.xml')!.async('string')).toBe(await original.file('ppt/slides/slide1.xml')!.async('string'));
    expect(await zip.file('ppt/slides/slide6.xml')!.async('string')).toBe(await original.file('ppt/slides/slide6.xml')!.async('string'));
    const operations = await zip.file('ppt/slides/slide7.xml')!.async('string');
    expect(operations).toContain('Plant 1');
    expect(operations).toContain('Sep 2026');
    expect(operations).toContain('Safety update');
    expect(operations).not.toContain('FF0000');
    expect(operations).not.toContain('Shanghai');
    expect(operations).not.toContain('custDataLst');
    expect(await zip.file('ppt/slides/_rels/slide7.xml.rels')!.async('string')).not.toContain('/tags');
    const quality = await zip.file('ppt/slides/slide9.xml')!.async('string');
    expect(quality).toContain('Quality issue');
    const table = await zip.file('ppt/slides/slide10.xml')!.async('string');
    expect(table).toContain('Volume');
    expect(table).toContain('10.00');
    expect(table).not.toContain('Unused');
    expect(table).not.toContain('LTI');
    const tableXml = new DOMParser().parseFromString(table, 'application/xml');
    expect(tableXml.getElementsByTagName('a:tr')).toHaveLength(2);
    expect(tableXml.getElementsByTagName('a:tc')).toHaveLength(34);
    expect(await zip.file('ppt/slides/slide11.xml')!.async('string')).toContain('Plant 2');
  });

  it('updates period headings and reduces font size to fit long report content', async () => {
    const template = await readFile('public/monthly-report-template.pptx');
    const image = { dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN9sAAAAASUVORK5CYII=', width: 1000, height: 400 };
    const data = { ...exportFixture, year: 2027, month: 8, plants: [exportFixture.plants[1]], reports: [{ ...exportFixture.reports[0], year: 2027, month: 8, content: Array.from({ length: 150 }, (_value, index) => `Report item ${index}: completed review and follow-up actions.`).join('\n') }] };
    const zip = await JSZip.loadAsync(await buildMonthlyReportPowerPoint(template, data, async () => ({ ae: image, volume: image, production: image, quality: image })));
    const slide = await zip.file('ppt/slides/slide7.xml')!.async('string');
    expect(slide).toContain('Aug 2027');
    expect(slide).toContain('Report item 149');
    const document = new DOMParser().parseFromString(slide, 'application/xml');
    const runs = Array.from(document.getElementsByTagName('a:rPr'));
    expect(runs.some((run) => Number(run.getAttribute('sz')) > 0 && Number(run.getAttribute('sz')) < 1000)).toBe(true);
  });
});

describe('Monthly PowerPoint save destination', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('opens the save picker synchronously before any asynchronous export work', async () => {
    const handle = { createWritable: vi.fn() };
    const picker = vi.fn().mockResolvedValue(handle);
    vi.stubGlobal('showSaveFilePicker', picker);
    const destination = pickReportSaveLocation(reportFileName(2026, 9));
    expect(picker).toHaveBeenCalledWith({ suggestedName: 'TPU monthly report_2026_09.pptx', types: [{ description: 'PowerPoint Presentation', accept: { [REPORT_MIME_TYPE]: ['.pptx'] } }] });
    expect(await destination).toBe(handle);
  });

  it('falls back for browsers without a picker and restricted embedded hosts', async () => {
    vi.stubGlobal('showSaveFilePicker', undefined);
    expect(await pickReportSaveLocation('report.pptx')).toBeNull();
    vi.stubGlobal('showSaveFilePicker', vi.fn().mockRejectedValue(new DOMException('Blocked in iframe', 'SecurityError')));
    expect(await pickReportSaveLocation('report.pptx')).toBeNull();
  });

  it('preserves cancellation instead of reporting export success', async () => {
    vi.stubGlobal('showSaveFilePicker', vi.fn().mockRejectedValue(new DOMException('Cancelled', 'AbortError')));
    await expect(pickReportSaveLocation('report.pptx')).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('writes and closes the selected file and aborts on write failure', async () => {
    const writable = { write: vi.fn().mockResolvedValue(undefined), close: vi.fn().mockResolvedValue(undefined), abort: vi.fn().mockResolvedValue(undefined) };
    const handle = { createWritable: vi.fn().mockResolvedValue(writable) };
    const blob = new Blob(['ppt'], { type: REPORT_MIME_TYPE });
    await writeReportFile(handle, blob);
    expect(writable.write).toHaveBeenCalledWith(blob);
    expect(writable.close).toHaveBeenCalledOnce();
    writable.write.mockRejectedValueOnce(new Error('Disk full'));
    await expect(writeReportFile(handle, blob)).rejects.toThrow('Disk full');
    expect(writable.abort).toHaveBeenCalledOnce();
  });
});

describe('Monthly Reports export button', () => {
  const createUrl = vi.fn();
  const revokeUrl = vi.fn();

  beforeEach(() => {
    pageMocks.exporter.mockReset().mockResolvedValue(new Blob(['test PPT'], { type: REPORT_MIME_TYPE }));
    pageMocks.success.mockReset();
    pageMocks.error.mockReset();
    createUrl.mockReset().mockReturnValue('blob:test-report');
    revokeUrl.mockReset();
    vi.stubGlobal('showSaveFilePicker', undefined);
    vi.stubGlobal('URL', Object.assign(class extends URL {}, { createObjectURL: createUrl, revokeObjectURL: revokeUrl }));
  });
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  it('shows a real download link that stays valid until the dialog closes', async () => {
    render(createElement(MonthlyReportsPage));
    fireEvent.click(screen.getByRole('button', { name: 'Export Report' }));
    const link = await screen.findByRole('link', { name: 'Download PPT' });
    expect(link.getAttribute('href')).toBe('blob:test-report');
    expect(link.getAttribute('download')).toMatch(/TPU monthly report_\d{4}_\d{2}\.pptx/);
    expect(pageMocks.exporter).toHaveBeenCalledOnce();
    expect(revokeUrl).not.toHaveBeenCalled();
    link.addEventListener('click', (event) => event.preventDefault());
    fireEvent.click(link);
    expect(revokeUrl).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(revokeUrl).toHaveBeenCalledWith('blob:test-report'));
    expect(pageMocks.success).toHaveBeenCalledWith('Report ready', expect.any(String));
  });

  it('opens the save picker on click and reports success only after writing the file', async () => {
    const writable = { write: vi.fn().mockResolvedValue(undefined), close: vi.fn().mockResolvedValue(undefined), abort: vi.fn().mockResolvedValue(undefined) };
    const picker = vi.fn().mockResolvedValue({ createWritable: vi.fn().mockResolvedValue(writable) });
    vi.stubGlobal('showSaveFilePicker', picker);
    render(createElement(MonthlyReportsPage));
    fireEvent.click(screen.getByRole('button', { name: 'Export Report' }));
    expect(picker).toHaveBeenCalledOnce();
    await waitFor(() => expect(writable.close).toHaveBeenCalledOnce());
    expect(pageMocks.success).toHaveBeenCalledWith('Report saved', expect.any(String));
    expect(screen.queryByRole('link', { name: 'Download PPT' })).toBeNull();
  });

  it('does not generate or report success if the save picker is cancelled', async () => {
    vi.stubGlobal('showSaveFilePicker', vi.fn().mockRejectedValue(new DOMException('Cancelled', 'AbortError')));
    render(createElement(MonthlyReportsPage));
    fireEvent.click(screen.getByRole('button', { name: 'Export Report' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Export Report' }).hasAttribute('disabled')).toBe(false));
    expect(pageMocks.exporter).not.toHaveBeenCalled();
    expect(pageMocks.success).not.toHaveBeenCalled();
    expect(pageMocks.error).not.toHaveBeenCalled();
  });
});

describe('Report chart rendering readiness', () => {
  let host: HTMLDivElement;
  const bounds = { x: 0, y: 0, left: 0, top: 0, right: 260, bottom: 275, width: 260, height: 275, toJSON: () => ({}) };
  const surface = (ready = true) => {
    const chart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chart.setAttribute('class', 'recharts-surface');
    const axis = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    axis.setAttribute('class', 'recharts-cartesian-axis');
    chart.appendChild(axis);
    vi.spyOn(chart, 'getBoundingClientRect').mockReturnValue(ready ? bounds : { ...bounds, width: 0, height: 0 });
    return chart;
  };

  beforeEach(() => {
    vi.useFakeTimers();
    host = document.createElement('div');
    host.className = 'recharts-wrapper';
    document.body.appendChild(host);
  });
  afterEach(() => { host.remove(); vi.useRealTimers(); vi.restoreAllMocks(); });

  it('bolds only exported tick, legend and label text without altering other text', () => {
    host.innerHTML = '<svg><text class="recharts-cartesian-axis-tick-value">Jan</text><g class="recharts-label-list"><text>75%</text></g><text class="unrelated">Title</text><text class="recharts-label">Quantity (t)</text></svg><span class="recharts-legend-item-text">Volume</span><div data-report-legend>Waste</div>';
    emphasizeReportChartText(host);
    for (const selector of ['.recharts-cartesian-axis-tick-value', '.recharts-label-list text', '.recharts-legend-item-text', '[data-report-legend]']) {
      expect((host.querySelector(selector) as HTMLElement).style.fontWeight).toBe('700');
    }
    expect((host.querySelector('.unrelated') as SVGElement).style.fontWeight).toBe('');
    expect((host.querySelector('.recharts-label') as SVGElement).style.fontWeight).toBe('');
  });

  it('waits for a chart that appears later than two animation frames', async () => {
    const ready = waitForReportCharts(host, 1, 'Plant 1 / AE');
    setTimeout(() => host.appendChild(surface()), 250);
    await vi.advanceTimersByTimeAsync(250);
    await expect(ready).resolves.toBeUndefined();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('does not treat legend icon surfaces as zero-sized unfinished charts', async () => {
    host.appendChild(surface());
    const legend = document.createElement('div');
    legend.className = 'recharts-default-legend';
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'recharts-surface');
    legend.appendChild(icon);
    host.appendChild(legend);
    await expect(waitForReportCharts(host, 1, 'Plant 1 / AE')).resolves.toBeUndefined();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('waits for every production line and a non-zero layout', async () => {
    host.appendChild(surface());
    let finished = false;
    const ready = waitForReportCharts(host, 2, 'Plant 1 / AE').then(() => { finished = true; });
    await vi.advanceTimersByTimeAsync(100);
    expect(finished).toBe(false);
    const second = surface(false);
    host.appendChild(second);
    await vi.advanceTimersByTimeAsync(100);
    expect(finished).toBe(false);
    vi.mocked(second.getBoundingClientRect).mockReturnValue(bounds);
    second.setAttribute('width', '260');
    await ready;
    expect(finished).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('reports the plant and chart on timeout and disconnects its observer', async () => {
    const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect');
    const ready = waitForReportCharts(host, 1, 'Plant 2 / Quality', 1000);
    const failed = expect(ready).rejects.toThrow('Plant 2 / Quality: chart layout did not become ready within 1 seconds.');
    await vi.advanceTimersByTimeAsync(1000);
    await failed;
    expect(disconnect).toHaveBeenCalledOnce();
  });
});

``

---

## File: src/test/reportGroups.test.ts

- Size: 1166 bytes
- Last modified: 2026-09-13 23:49:34

``typescript
import { describe, expect, it } from 'vitest';
import { ReportType } from '../domain/enums';
import type { MonthlyReport, ReportCategory } from '../domain/models';
import { groupMonthlyReports } from '../pages/MonthlyReportsPage/reportGroups';

const categories: ReportCategory[] = [
  { id: 'cat-2', name: 'Projects', displayOrder: 2 },
  { id: 'cat-1', name: 'QEHS', displayOrder: 1 },
];
const reports: MonthlyReport[] = [
  { id: 'low', year: 2026, month: 9, plantId: 'plant', categoryId: 'cat-1', type: ReportType.Lowlights, content: 'Low', displayOrder: 1 },
  { id: 'high', year: 2026, month: 9, plantId: 'plant', categoryId: 'cat-1', type: ReportType.Highlights, content: 'High', displayOrder: 1 },
];

describe('monthly report grouping', () => {
  it('sorts categories and separates highlights from lowlights', () => {
    const groups = groupMonthlyReports(categories, reports);

    expect(groups.map((group) => group.category.id)).toEqual(['cat-1', 'cat-2']);
    expect(groups[0].highlights?.content).toBe('High');
    expect(groups[0].lowlights?.content).toBe('Low');
    expect(groups[1].highlights).toBeUndefined();
  });
});

``

---

## File: src/test/reportView.test.ts

- Size: 1686 bytes
- Last modified: 2026-09-22 09:23:59

``typescript
import { describe, expect, it } from 'vitest';
import { ReportType } from '../domain/enums';
import type { MonthlyReport, Plant, ReportCategory } from '../domain/models';
import { filterMonthlyReports, groupReportsByPlantAndCategory } from '../pages/MonthlyReportsPage/reportView';

const plants: Plant[] = [
  { id: 'p1', name: 'Plant 1', displayOrder: 1 },
  { id: 'p2', name: 'Plant 2', displayOrder: 2 },
];
const categories: ReportCategory[] = [{ id: 'c1', name: 'QEHS', displayOrder: 1 }];
const reports: MonthlyReport[] = [
  { id: 'h1', year: 2026, month: 9, plantId: 'p1', categoryId: 'c1', type: ReportType.Highlights, content: 'H', displayOrder: 1 },
  { id: 'l1', year: 2026, month: 9, plantId: 'p1', categoryId: 'c1', type: ReportType.Lowlights, content: 'L', displayOrder: 1 },
  { id: 'h2', year: 2026, month: 9, plantId: 'p2', categoryId: 'c1', type: ReportType.Highlights, content: 'H2', displayOrder: 1 },
];

describe('monthly report view filtering', () => {
  it('filters by plant, category, and type independently', () => {
    expect(filterMonthlyReports(reports, { plantIds: ['p2'], categoryIds: [], types: [] })).toHaveLength(1);
    expect(filterMonthlyReports(reports, { plantIds: [], categoryIds: ['c1'], types: [ReportType.Lowlights] })).toHaveLength(1);
  });

  it('keeps plants and categories as distinct hierarchy levels', () => {
    const groups = groupReportsByPlantAndCategory(plants, categories, reports);
    expect(groups).toHaveLength(2);
    expect(groups[0].plant.name).toBe('Plant 1');
    expect(groups[0].categories[0].highlights?.content).toBe('H');
    expect(groups[1].plant.name).toBe('Plant 2');
  });
});

``

---

## File: src/test/repositories.test.ts

- Size: 2175 bytes
- Last modified: 2026-10-07 21:51:40

``typescript
import { describe, it, expect } from 'vitest';
import {
  plantRepository,
  kpiDefinitionRepository,
  targetRepository,
  monthlyKpiResultRepository,
  monthlyReportRepository,
} from '../data/mock/mockRepositories';
import { KpiStatus, ReportType } from '../domain/enums';

describe('Mock Repositories', () => {
  it('should fetch all plants sorted by display order', async () => {
    const plants = await plantRepository.getAll();
    expect(plants.length).toBeGreaterThan(0);
    expect(plants[0].name).toBe('Pudong-TPU');
  });

  it('should fetch all 14 KPI definitions', async () => {
    const kpis = await kpiDefinitionRepository.getAll();
    expect(kpis.length).toBe(14);
  });

  it('should fetch targets for 2026', async () => {
    const targets = await targetRepository.getByYear(2026);
    expect(targets.length).toBeGreaterThan(0);
  });

  it('should fetch monthly KPI results for a selected year across all months', async () => {
    const results = await monthlyKpiResultRepository.getByYear(2026);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.year === 2026)).toBe(true);
  });

  it('should mark monthly KPI results Missing when KPI Logic is unset', async () => {
    const saved = await monthlyKpiResultRepository.saveBatch([
      {
        year: 2026,
        month: 8,
        plantId: 'pudong',
        kpiId: 'kpi-7',
        monthlyActual: 13.0,
        ytdActual: 13.0,
        status: KpiStatus.Missing,
      },
    ]);

    expect(saved.length).toBe(1);
    expect(saved[0].status).toBe(KpiStatus.Missing);
  });

  it('should create and retrieve monthly reports', async () => {
    const report = await monthlyReportRepository.create({
      year: 2026,
      month: 8,
      plantId: 'zhanjiang',
      categoryId: 'cat-qehs',
      type: ReportType.Highlights,
      content: 'New safety campaign launched.',
      displayOrder: 1,
    });

    expect(report.id).toBeDefined();
    const fetched = await monthlyReportRepository.getById(report.id);
    expect(fetched?.content).toBe('New safety campaign launched.');
  });
});

``

---

## File: src/test/setup.ts

- Size: 37 bytes
- Last modified: 2026-09-11 11:51:56

``typescript
import '@testing-library/jest-dom';

``

---

## File: src/test/strategy.test.ts

- Size: 2202 bytes
- Last modified: 2026-10-04 17:52:24

``typescript
import { describe, it, expect } from 'vitest';
import { DefaultKpiStatusStrategy } from '../domain/strategies/kpiStatusStrategy';
import { KpiStatus } from '../domain/enums';

describe('DefaultKpiStatusStrategy', () => {
  const strategy = new DefaultKpiStatusStrategy();

  it('uses Missing when KPI Logic is None or unset', () => {
    expect(strategy.calculateStatus(null, 100, 'None')).toBe(KpiStatus.Missing);
    expect(strategy.calculateStatus(undefined, null, undefined)).toBe(KpiStatus.Missing);
  });

  it('uses Over logic with Green at 100%, Amber from 50% to below 100%, and Red below 50%', () => {
    expect(strategy.calculateStatus(100, 100, 'Over')).toBe(KpiStatus.Green);
    expect(strategy.calculateStatus(120, 100, 'Over')).toBe(KpiStatus.Green);
    expect(strategy.calculateStatus(99, 100, 'Over')).toBe(KpiStatus.Amber);
    expect(strategy.calculateStatus(50, 100, 'Over')).toBe(KpiStatus.Amber);
    expect(strategy.calculateStatus(49, 100, 'Over')).toBe(KpiStatus.Red);
  });

  it('uses Less logic with Green through 100%, Amber through 150%, and Red above 150%', () => {
    expect(strategy.calculateStatus(100, 100, 'Less')).toBe(KpiStatus.Green);
    expect(strategy.calculateStatus(80, 100, 'Less')).toBe(KpiStatus.Green);
    expect(strategy.calculateStatus(101, 100, 'Less')).toBe(KpiStatus.Amber);
    expect(strategy.calculateStatus(150, 100, 'Less')).toBe(KpiStatus.Amber);
    expect(strategy.calculateStatus(151, 100, 'Less')).toBe(KpiStatus.Red);
  });

  it('returns Missing for empty calculated inputs and Grey when a target is absent', () => {
    expect(strategy.calculateStatus(null, 100, 'Over')).toBe(KpiStatus.Missing);
    expect(strategy.calculateStatus(undefined, 100, 'Less')).toBe(KpiStatus.Missing);
    expect(strategy.calculateStatus(12, null, 'Over')).toBe(KpiStatus.Grey);
  });

  it('should calculate completion percentage accurately', () => {
    expect(strategy.calculateCompletionRate(14, 14)).toBe(100);
    expect(strategy.calculateCompletionRate(7, 14)).toBe(50);
    expect(strategy.calculateCompletionRate(0, 14)).toBe(0);
    expect(strategy.calculateCompletionRate(0, 0)).toBe(0);
  });
});

``

---

## File: src/test/volumePacBatch.test.ts

- Size: 1700 bytes
- Last modified: 2026-10-03 17:09:03

``typescript
import { describe, expect, it } from 'vitest';
import type { Plant } from '../domain/models';
import type { ProductionLineMatrix, VolumePacRecord } from '../domain/models/charts';
import { buildMissingVolumePacRecords } from '../domain/services/volumePacBatch';

const plants: Plant[] = [
  { id: 'plant-a', name: 'Plant A', displayOrder: 1 },
  { id: 'plant-b', name: 'Plant B', displayOrder: 2 },
];
const matrices: ProductionLineMatrix[] = [
  { id: 'matrix-a', mainName: 'A_Line 1', plantId: '{PLANT-A}', productionLineId: '{LINE-1}', displayOrder: 1 },
  { id: 'matrix-b', mainName: 'B_Line 2', plantId: 'plant-b', productionLineId: 'line-2', displayOrder: 1 },
];

describe('Volume/PAC batch generation from Production Line Matrix', () => {
  it('generates only the lines mapped to each plant', () => {
    const records = buildMissingVolumePacRecords(2026, 10, plants, matrices, []);

    expect(records).toEqual([
      { year: 2026, month: 10, plantId: 'plant-a', productionLineId: 'line-1', volume: null, forecast: null, pac: null },
      { year: 2026, month: 10, plantId: 'plant-b', productionLineId: 'line-2', volume: null, forecast: null, pac: null },
    ]);
  });

  it('skips combinations already present for the selected period', () => {
    const existing: VolumePacRecord[] = [{
      id: 'existing', mainName: '', year: 2026, month: 10, plantId: 'plant-a', productionLineId: 'line-1', volume: null, forecast: null, pac: null,
    }];
    const records = buildMissingVolumePacRecords(2026, 10, plants, matrices, existing);

    expect(records.map((record) => `${record.plantId}:${record.productionLineId}`)).toEqual(['plant-b:line-2']);
  });
});

``

---

## File: src/types/assets.d.ts

- Size: 165 bytes
- Last modified: 2026-10-11 14:11:43

``typescript
declare module '*.pptx?url' {
  const url: string
  export default url
}

declare module '*.pptx?inline' {
  const dataUrl: string
  export default dataUrl
}

``

---

## File: src/types/filters.ts

- Size: 240 bytes
- Last modified: 2026-09-11 11:52:50

``typescript
export interface GlobalFilterState {
  year: number;
  month: number;
  plantId: string;
  kpiCategory: string;
  kpiId: string;
  status: string;
}

export interface FilterOption {
  label: string;
  value: string | number;
}

``

---

## File: tsconfig.app.json

- Size: 655 bytes
- Last modified: 2026-09-11 10:53:22

``json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

``

---

## File: tsconfig.json

- Size: 119 bytes
- Last modified: 2026-09-11 10:53:22

``json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

``

---

## File: tsconfig.node.json

- Size: 558 bytes
- Last modified: 2026-09-11 10:53:22

``json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

``

---

## File: vite.config.ts

- Size: 412 bytes
- Last modified: 2026-10-11 13:56:11

``typescript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: './',

  assetsInclude: ['**/*.pptx'],
  plugins: [react()],

  server: {
    port: 3000,
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    pool: 'threads',
    maxWorkers: 1,
    fileParallelism: false,
    isolate: false,
  },
})


``

---

