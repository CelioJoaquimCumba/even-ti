import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { Event, Organizer, Partner, User, EventOrganizer, EventPartner, EventSpeaker } from '../api/type';

const SALT = 10

const organizers: Organizer[] = [
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
const partners: Partner[] = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442c',
        name: 'MozDevz-partner',
        image: 'https://via.placeholder.com/150',
    },
];

const users: User[] = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'Celio Cumba',
    email: 'celio.joaquim.cumba@gmail.com',
    password: 'Password123.',
  },
];

const events: Event[] = [
    {
    tickets: 10,
    id: "410544b2-4001-4271-9875-fec4b6a6442b",
    community: "MozDevz",
    location: "Maputo, Incubadora do ...",
    background: "DataWaveBackground.src",
    logo: "DataWaveEvent.src",
    title: "DataWave",
    date: "05 de Junho",
    time: "08:00 - 17:00",
    description: "Data Wave é uma conferência sobre Dados e ramo de Inteligência Artificial que irá contar com painéis, palestras e sessões práticas denominadas codelabs, de modo a garantir que os participantes possam ter uma contextualização sobre a relevância do campo de ciência de dados, entender conceitos básicos e poder criar os seus primeiros modelos.",
    objectives: ["Explorar oportunidades e desafios no ramo de ciência de dados no contexto local;","Dar a conhecer aos participantes sobre ciência de dados;","Explorar a criação de modelos e exploração de dados."  ],
}
]

const EventOrganizers: EventOrganizer[] = [
    {
        id: "410544b2-4001-4271-9855-cec4b6a6442b",
        eventId: "410544b2-4001-4271-9875-fec4b6a6442b",
        organizerId: "410544b2-4001-4271-9855-fec4b6a6442a",
    },
]

const EventPartners: EventPartner[] = [
    {
        id: "410544b2-4001-4271-9855-eec4b6a6442b",
        eventId: "410544b2-4001-4271-9875-fec4b6a6442b",
        partnerId: "410544b2-4001-4271-9855-fec4b6a6442c",
    },
]

const EventSpeakers: EventSpeaker[] = [
    {
        id: "410544b2-4001-4276-9855-cec4b6a6442b",
        eventId: "410544b2-4001-4271-9875-fec4b6a6442b",
        speakerId: "410544b2-4001-4271-9855-fec4b6a6442b",
    },
]

async function seedEventOrganizers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS event_organizers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      event_id UUID NOT NULL,
      organizer_id UUID NOT NULL
    );
  `;
  const insertedEventOrganizers = await Promise.all(
    EventOrganizers.map(async (eventOrganizer) => {
      return client.sql`
        INSERT INTO event_organizers (id, event_id, organizer_id)
        VALUES (${eventOrganizer.id}, ${eventOrganizer.eventId}, ${eventOrganizer.organizerId})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );
  return insertedEventOrganizers;
}

async function seedEvents() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS events (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        community VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        background VARCHAR(255) NOT NULL,
        logo VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        time VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        objectives TEXT NOT NULL,
        tickets INTEGER NOT NULL
      );
    `;
    const insertedEvents = await Promise.all(
      events.map(async (event) => {
        return client.sql`
          INSERT INTO events (id, community, location, background, logo, title, date, time, description, objectives, tickets)
          VALUES (${event.id}, ${event.community}, ${event.location}, ${event.background}, ${event.logo}, ${event.title}, ${event.date}, ${event.time}, ${event.description}, ${JSON.stringify(event.objectives)}, ${event.tickets})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );
    return insertedEvents;
}
const client = await db.connect();

async function seedOrganizers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS organizers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL
    );
  `;

  const insertedOrganizers = await Promise.all(
    organizers.map(async (organizer) => {
      return client.sql`
        INSERT INTO organizers (id, name, image)
        VALUES (${organizer.id}, ${organizer.name}, ${organizer.image})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedOrganizers;
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, SALT);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedPartners() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS partners (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL
    );
  `;

  const insertedPartners = await Promise.all(
    partners.map(async (partner) => {
      return client.sql`
        INSERT INTO partners (id, name, image)
        VALUES (${partner.id}, ${partner.name}, ${partner.image})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedPartners;
}


// async function seedInvoices() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       amount INT NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedInvoices = await Promise.all(
//     invoices.map(
//       (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedInvoices;
// }

// async function seedCustomers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCustomers;
// }

// async function seedRevenue() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedRevenue;
// }

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedOrganizers();
    await seedPartners();
    await seedUsers();
    await seedEvents();
    // await seedInvoices();
    // await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}