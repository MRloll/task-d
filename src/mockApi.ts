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

  // ✅ تطبيق البحث العام على بعض الحقول (name, email, role)
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

  // ✅ تطبيق الفلترة حسب الحقول المحددة
  Object.keys(filter).forEach((key) => {
    if (filter[key]) {
      filteredUsers = filteredUsers.filter((user) =>
        String(user[key as keyof User])
          .toLowerCase()
          .includes(filter[key].toLowerCase()),
      )
    }
  })

  // ✅ الترتيب بناءً على `sortBy`
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

  // ✅ تقسيم البيانات إلى صفحات
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
