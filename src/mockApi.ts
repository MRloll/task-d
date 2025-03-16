import { type User } from './types'
const roles = {
  admin: ['create_user', 'edit_user', 'delete_user', 'read_user', 'view_reports', 'manage_roles'],
  editor: ['edit_user', 'view_reports', 'read_user'],
  viewer: ['view_reports'],
}

const users: User[] = Array.from({ length: 50 }, (_, i) => {
  const role = ['admin', 'editor', 'viewer'][Math.floor(Math.random() * 3)] as keyof typeof roles

  return {
    id: i + 1,
    first_name: `first name ${i + 1}`,
    last_name: `last name`,
    email: `user${i + 1}@example.com`,
    role,
    permissions: roles[role], // ✅ إضافة الصلاحيات بناءً على الدور
    brief: `lorem ipsum ${i + 1}`,
  }
})

function simulateLatency() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300))
}

export async function fetchUsers({
  page = 1,
  itemsPerPage = 10,
  sortBy = [],
  search = '',
  filter = {},
}: {
  page?: number
  itemsPerPage?: number
  sortBy?: { key: string; order: 'asc' | 'desc' }[]
  search?: string
  filter?: { [key: string]: string }
}) {
  await simulateLatency()

  let filteredUsers = users

  if (search) {
    const searchLower = search.toLowerCase()
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchLower) ||
        user.last_name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower),
    )
  }

  Object.keys(filter).forEach((key) => {
    if (filter[key]) {
      filteredUsers = filteredUsers.filter((user) =>
        String(user[key as keyof User])
          .toLowerCase()
          .includes(filter[key].toLowerCase()),
      )
    }
  })

  if (sortBy.length > 0) {
    filteredUsers.sort((a, b) => {
      for (const sort of sortBy) {
        const key = sort.key as keyof User
        const order = sort.order === 'desc' ? -1 : 1

        if (a[key] > b[key]) return order
        if (a[key] < b[key]) return -order
      }
      return 0
    })
  }

  const start = (page - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(start, start + itemsPerPage)

  return {
    data: paginatedUsers,
    total: filteredUsers.length,
    page,
    itemsPerPage,
  }
}

export async function fetchUserById(id: number) {
  await simulateLatency()
  const user = users.find((u) => u.id === id)
  if (!user) throw new Error('User not found')

  return {
    ...user,
    permissions: roles[user.role as keyof typeof roles],
  }
}

export async function createUser(data: Omit<User, 'id'>) {
  await simulateLatency()
  const newUser: User = { id: users.length + 1, ...data }
  users.push(newUser)
  return newUser
}

export async function updateUser(id: any, data: Partial<User>) {
  await simulateLatency()
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) throw new Error('User not found')
  users[index] = { ...users[index], ...data }
  return users[index]
}

export async function deleteUser(id: number) {
  await simulateLatency()
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) throw new Error('User not found')
  return users.splice(index, 1)[0]
}

export async function fetchRoles() {
  await simulateLatency()
  return roles
}
