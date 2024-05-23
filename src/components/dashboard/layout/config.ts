import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart' },
  { key: 'gym-list', title: 'Gym List', href: paths.dashboard.gym, icon: 'users' }
] satisfies NavItemConfig[];
