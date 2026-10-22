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