import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const SALT = 10

const communities = [
  {
    id: '410544b2-4001-7271-9855-fec4b6a6442a',
    name: 'MozDevz',
    location: 'Maputo, Mozambique',
    image:
      'https://firebasestorage.googleapis.com/v0/b/even-ti.appspot.com/o/communities%2Fmozdevz%2Fmozdevz.png?alt=media&token=98274d48-f24a-4859-a272-f85974f7ac35',
    background:
      'https://firebasestorage.googleapis.com/v0/b/even-ti.appspot.com/o/communities%2Fmozdevz%2Fmozdevz-background.png?alt=media&token=769a69ce-b192-48a1-876e-d52ba14c1d11',
    description:
      'MozDevz Community is a community of MozDevz contributors. We are always looking for new contributors. Join us and get your questions answered!',
    url: 'https://www.mozdevz.org/',
    tagLine: 'Impactamos milhares de devz e impulsionamos carreiras',
  },
]

const partners = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442c',
    name: 'MozDevz-partner',
    image: 'https://via.placeholder.com/150',
  },
]

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'Celio Cumba',
    email: 'celio.joaquim.cumba@gmail.com',
    password: 'Password123.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/even-ti.appspot.com/o/users%2Fcelio.joaquim.cumba%40gmail.com%2Fprofile.jpg?alt=media&token=7e17e7e4-bc40-4ac0-bd9c-245d58bbd846',
  },
]

const events = [
  {
    tickets: 10,
    id: '410544b2-4001-4271-9875-fec4b6a6442b',
    community: 'MozDevz',
    location: 'Maputo, Incubadora do ...',
    background:
      'https://firebasestorage.googleapis.com/v0/b/even-ti.appspot.com/o/events%2Fdatawave%2Fdatawave-background.png?alt=media&token=138071c4-1907-48d1-8248-e030fdc64668',
    logo: 'https://firebasestorage.googleapis.com/v0/b/even-ti.appspot.com/o/events%2Fdatawave%2Fdatawave.png?alt=media&token=631665e6-12da-4843-960d-b0a83031e98f',
    title: 'DataWave',
    tagLine:
      'Explorando o Potencial da Ciência de Dados e Inteligência Artificial',
    date: '2023-06-05T00:00:00.000Z',
    time: '08:00 - 17:00',
    description:
      'Data Wave é uma conferência sobre Dados e ramo de Inteligência Artificial que irá contar com painéis, palestras e sessões práticas denominadas codelabs, de modo a garantir que os participantes possam ter uma contextualização sobre a relevância do campo de ciência de dados, entender conceitos básicos e poder criar os seus primeiros modelos.',
    objectives: [
      'Explorar oportunidades e desafios no ramo de ciência de dados no contexto local;',
      'Dar a conhecer aos participantes sobre ciência de dados;',
      'Explorar a criação de modelos e exploração de dados.',
    ],
  },
]

const eventOrganizers = [
  {
    id: '410544b2-4001-4271-9855-cec4b6a6442b',
    eventId: '410544b2-4001-4271-9875-fec4b6a6442b',
    organizerId: '410544b2-4001-7271-9855-fec4b6a6442a',
  },
]

const communityMembers = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6446b',
    communityId: '410544b2-4001-7271-9855-fec4b6a6442a',
    memberId: '410544b2-4001-4271-9855-fec4b6a6442b',
  },
]

const eventPartners = [
  {
    id: '410544b2-4001-4271-9855-eec4b6a6442b',
    eventId: '410544b2-4001-4271-9875-fec4b6a6442b',
    partnerId: '410544b2-4001-4271-9855-fec4b6a6442c',
  },
]
const communityPartners = [
  {
    id: '410544b2-4001-4271-9855-eec4b6a6442b',
    communityId: '410544b2-4001-7271-9855-fec4b6a6442a',
    partnerId: '410544b2-4001-4271-9855-fec4b6a6442c',
  },
]

const eventSpeakers = [
  {
    id: '410544b2-4001-4276-9855-cec4b6a6442b',
    eventId: '410544b2-4001-4271-9875-fec4b6a6442b',
    speakerId: '410544b2-4001-4271-9855-fec4b6a6442b',
  },
]

const reservations = [
  {
    id: '410544b2-4001-4276-9855-ceczb6a6442b',
    code: '13-10-122-23',
    eventId: '410544b2-4001-4271-9875-fec4b6a6442b',
    userId: '410544b2-4001-4271-9855-fec4b6a6442b',
  },
]

async function seed() {
  try {
    await prisma.$connect()

    // Seed Communities
    for (const community of communities) {
      await prisma.community.create({
        data: community,
      })
    }

    // Seed Partners
    for (const partner of partners) {
      await prisma.partner.create({
        data: partner,
      })
    }

    // Seed Users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, SALT)
      await prisma.user.create({
        data: { ...user, password: hashedPassword },
      })
    }

    // Seed Events
    for (const event of events) {
      await prisma.event.create({
        data: event,
      })
    }

    // Seed EventOrganizers
    for (const eventOrganizer of eventOrganizers) {
      await prisma.eventOrganizer.create({
        data: eventOrganizer,
      })
    }

    // Seed EventPartners
    for (const eventPartner of eventPartners) {
      await prisma.eventPartner.create({
        data: eventPartner,
      })
    }

    // Seed CommunityPartners
    for (const communityPartner of communityPartners) {
      await prisma.communityPartner.create({
        data: communityPartner,
      })
    }

    // Seed CommunityPartners
    for (const communityPartner of communityPartners) {
      await prisma.communityPartner.create({
        data: communityPartner,
      })
    }

    // Seed EventSpeakers
    for (const eventSpeaker of eventSpeakers) {
      await prisma.eventSpeaker.create({
        data: eventSpeaker,
      })
    }

    // Seed CommunityMembers
    for (const communityMember of communityMembers) {
      await prisma.communityMember.create({
        data: communityMember,
      })
    }

    // Seed CommunityMembers
    for (const communityMember of communityMembers) {
      await prisma.communityMember.create({
        data: communityMember,
      })
    }

    for (const reservation of reservations) {
      await prisma.reservation.create({
        data: reservation,
      })
    }

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Failed to seed database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
