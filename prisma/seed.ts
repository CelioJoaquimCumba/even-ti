import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT = 10;

const organizers = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'John Doe',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Jane Doe',
    image: 'https://via.placeholder.com/150',
  },
];

const partners = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442c',
    name: 'MozDevz-partner',
    image: 'https://via.placeholder.com/150',
  },
];

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'Celio Cumba',
    email: 'celio.joaquim.cumba@gmail.com',
    password: 'Password123.',
    image: 'https://via.placeholder.com/150',
  },
];

const events = [
  {
    tickets: 10,
    id: "410544b2-4001-4271-9875-fec4b6a6442b",
    community: "MozDevz",
    location: "Maputo, Incubadora do ...",
    background: "DataWaveBackground.src",
    logo: "DataWaveEvent.src",
    title: "DataWave",
    date: "2023-06-05T00:00:00.000Z",
    time: "08:00 - 17:00",
    description: "Data Wave é uma conferência sobre Dados e ramo de Inteligência Artificial que irá contar com painéis, palestras e sessões práticas denominadas codelabs, de modo a garantir que os participantes possam ter uma contextualização sobre a relevância do campo de ciência de dados, entender conceitos básicos e poder criar os seus primeiros modelos.",
    objectives: ["Explorar oportunidades e desafios no ramo de ciência de dados no contexto local;", "Dar a conhecer aos participantes sobre ciência de dados;", "Explorar a criação de modelos e exploração de dados."],
  }
];

const eventOrganizers = [
  {
    id: "410544b2-4001-4271-9855-cec4b6a6442b",
    eventId: "410544b2-4001-4271-9875-fec4b6a6442b",
    organizerId: "410544b2-4001-4271-9855-fec4b6a6442a",
  },
];

const eventPartners = [
  {
    id: "410544b2-4001-4271-9855-eec4b6a6442b",
    eventId: "410544b2-4001-4271-9875-fec4b6a6442b",
    partnerId: "410544b2-4001-4271-9855-fec4b6a6442c",
  },
];

const eventSpeakers = [
  {
    id: "410544b2-4001-4276-9855-cec4b6a6442b",
    eventId: "410544b2-4001-4271-9875-fec4b6a6442b",
    speakerId: "410544b2-4001-4271-9855-fec4b6a6442b",
  },
];

async function seed() {
  try {
    await prisma.$connect();

    // Seed Organizers
    for (const organizer of organizers) {
      await prisma.organizer.create({
        data: organizer,
      });
    }

    // Seed Partners
    for (const partner of partners) {
      await prisma.partner.create({
        data: partner,
      });
    }

    // Seed Users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, SALT);
      await prisma.user.create({
        data: { ...user, password: hashedPassword },
      });
    }

    // Seed Events
    for (const event of events) {
      await prisma.event.create({
        data: event,
      });
    }

    // Seed EventOrganizers
    for (const eventOrganizer of eventOrganizers) {
      await prisma.eventOrganizer.create({
        data: eventOrganizer,
      });
    }

    // Seed EventPartners
    for (const eventPartner of eventPartners) {
      await prisma.eventPartner.create({
        data: eventPartner,
      });
    }

    // Seed EventSpeakers
    for (const eventSpeaker of eventSpeakers) {
      await prisma.eventSpeaker.create({
        data: eventSpeaker,
      });
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Failed to seed database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
