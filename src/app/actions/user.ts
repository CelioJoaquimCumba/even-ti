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
