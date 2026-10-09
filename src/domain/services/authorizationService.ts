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
