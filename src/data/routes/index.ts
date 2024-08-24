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
  stats: {
    label: 'Estatísticas',
    path: '/stats',
    requiresAuth: true,
    icon: TrendingUp,
  },
  members: {
    label: 'Membros',
    path: '/members',
    requiresAuth: true,
    icon: UsersIcon,
  },
  participants: {
    label: 'Participantes',
    path: '/participants',
    requiresAuth: true,
    icon: BookUser,
  },
  partners: {
    label: 'Parceiros',
    path: '/partners',
    requiresAuth: true,
    icon: Handshake,
  },
}
