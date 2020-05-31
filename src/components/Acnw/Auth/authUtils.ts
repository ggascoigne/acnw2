// this started off based on https://auth0.com/blog/role-based-access-control-rbac-and-react-apps/
// changes are all my fault

import find from 'lodash/find'

import { Perms, Rules } from './PermissionRules'

const check = (rules: Rules, role: string | null, action: Perms, data?: any) => {
  if (!role) {
    return false
  }
  const permissions = rules[role] as any
  if (!permissions) {
    // role is not present in the rules
    return false
  }

  const staticPermissions = permissions.static

  if (staticPermissions && staticPermissions.includes(action)) {
    return true
  }

  const dynamicPermissions = permissions.dynamic

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action] || dynamicPermissions['*']
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false
    }

    return permissionCondition(data)
  }
  return false
}

export const checkMany = (rules: Rules, roles: string[] | undefined, action: Perms, data?: any) =>
  !!find(roles, (role) => check(rules, role, action, data))