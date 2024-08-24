import { PresentationIcon } from 'lucide-react'
export const routes = {
  events: {
    label: 'Eventos',
    path: '/',
    requiresAuth: false,
    icon: PresentationIcon,
  },
  community: { label: 'Comunidade', path: '/community', requiresAuth: false },
  reservations: {
    label: 'Reservas',
    path: '/reservations',
    requiresAuth: true,
  },
  settings: { label: 'Definições', path: '/settings', requiresAuth: true },
  stats: { label: 'Estatísticas', path: '/stats', requiresAuth: true },
  members: { label: 'Membros', path: '/members', requiresAuth: true },
  participants: {
    label: 'Participantes',
    path: '/participants',
    requiresAuth: true,
  },
  partners: { label: 'Parceiros', path: '/partners', requiresAuth: true },
}
