'use server'
import prisma from '@/lib/prisma'
import { User } from '@/data/types'

export async function getUserById(id: string): Promise<User | null> {
  if (!id) {
    return null
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return {
      id: user?.id || '',
      name: user?.name || '',
      email: user?.email || '',
      image: user?.image || '',
      phone: user?.phone || '',
      gender: user?.gender || '',
      username: user?.username || '',
      bio: user?.bio || '',
      profession: user?.profession || '',
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function updateUserImage(id: string, image: string) {
  if (!id || !image) return
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        image,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export async function updateUser(user: User): Promise<User | null> {
  if (!user) return null
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    })
    return updatedUser
  } catch (error) {
    console.log(error)
    return null
  }
}
