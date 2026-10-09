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
