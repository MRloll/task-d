export function hasPermission(
  userPermissions: string[],
  requiredPermissions: string | string[],
): boolean {
  if (Array.isArray(requiredPermissions)) {
    return requiredPermissions.some((perm) => userPermissions.includes(perm))
  }
  return userPermissions.includes(requiredPermissions)
}
