import { createUser, fetchUsers, deleteUser, updateUser } from '@/mockApi'
import { type User } from '@/types'
import { describe, expect, test } from 'vitest'

describe('Mock API - createUser', () => {
  test('should create a new user and add it to the users list', async () => {
    // Arrange: Create mock user data
    const newUser: Omit<User, 'id'> = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      role: 'editor',
      brief: 'Test user',
      permissions: ['read_user', 'edit_user'],
    }

    const createdUser = await createUser(newUser)

    expect(createdUser).toHaveProperty('id')
    expect(createdUser.first_name).toBe('John')
    expect(createdUser.email).toBe('john.doe@example.com')

    const users = await fetchUsers({ page: 1, itemsPerPage: 100 })
    expect(users.data.some((user) => user.email === 'john.doe@example.com')).toBe(true)
  })

  test('should delete a user by ID', async () => {
    const userId = 1

    const deletedUser = await deleteUser(userId)

    expect(deletedUser).toBeDefined()
    expect(deletedUser.id).toBe(userId)

    await expect(deleteUser(userId)).rejects.toThrow('User not found')
  })

  test('should update a user by ID', async () => {
    const userId = 2
    const updatedUserData: Partial<User> = {
      first_name: 'Updated Name',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      role: 'editor',
      permissions: ['read_user', 'edit_user'],
      id: userId,
    }

    const updatedUser = await updateUser(userId, updatedUserData)

    expect(updatedUser).toBeDefined()
    expect(updatedUser.id).toBe(userId)
    expect(updatedUser.first_name).toBe('Updated Name')
  })
})
