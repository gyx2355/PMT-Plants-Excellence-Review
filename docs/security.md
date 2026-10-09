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
