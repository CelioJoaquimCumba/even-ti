import {
  BookUser,
  Handshake,
  PresentationIcon,
  Settings,
  Ticket,
  TrendingUp,
  UsersIcon,
} from 'lucide-react'
export const routes = {
  events: {
    label: 'Eventos',
    path: '/',
    requiresAuth: false,
    icon: PresentationIcon,
  },
  communityEvents: {
    label: 'Eventos',
    path: '/community-management/event',
    requiresAuth: true,
    icon: PresentationIcon,
  },
  community: {
    label: 'Comunidades',
    path: '/community',
    requiresAuth: false,
    icon: UsersIcon,
  },
  reservations: {
    label: 'Reservas',
    path: '/reservations',
    requiresAuth: true,
    icon: Ticket,
  },
  settings: {
    label: 'Definições',
    path: '/settings',
    requiresAuth: true,
    icon: Settings,
  },
  communitySettings: {
    label: 'Definições',
    path: '/community-management/settings',
    requiresAuth: true,
    icon: Settings,
  },
  stats: {
    label: 'Estatísticas',
    path: '/community-management/stats',
    requiresAuth: true,
    icon: TrendingUp,
  },
  members: {
    label: 'Membros',
    path: '/community-management/member',
    requiresAuth: true,
    icon: UsersIcon,
  },
  participants: {
    label: 'Participantes',
    path: '/community-management/participants',
    requiresAuth: true,
    icon: BookUser,
  },
  partners: {
    label: 'Parceiros',
    path: '/community-management/partners',
    requiresAuth: true,
    icon: Handshake,
  },
}
