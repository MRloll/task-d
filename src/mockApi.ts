import { type User } from './types'

const users: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  first_name: `first name ${i + 1}`,
  last_name: `last name`,
  email: `user${i + 1}@example.com`,
  role: ['admin', 'editor', 'viewer'][Math.floor(Math.random() * 3)] as
    | 'admin'
    | 'editor'
    | 'viewer',
  brief: `loren ipsum ${i + 1}`,
}))

const roles = ['admin', 'editor', 'viewer']

function simulateLatency() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300))
}

export async function fetchUsers({
  page = 1,
  itemsPerPage = 10,
  sortBy = 'id',
  filterRole,
}: {
  page?: number
  itemsPerPage?: number
  sortBy?: keyof User
  filterRole?: User['role']
}) {
  await simulateLatency()

  let filteredUsers = users
  if (filterRole) {
    filteredUsers = users.filter((user) => user.role === filterRole)
  }

  filteredUsers.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))

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
  return user
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
