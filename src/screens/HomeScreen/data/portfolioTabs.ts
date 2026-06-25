import { CategoryTab } from '../../../components/CategoryTabs';
import { PortfolioTabId } from '../../../types';

export const portfolioTabs: CategoryTab[] = [
  {
    id: 'favorites',
    label: 'Избранное',
    icon: 'star-outline',
  },
  {
    id: 'actual',
    label: 'Актуальное',
    icon: 'trending-up-outline',
  },
  {
    id: 'growth-decline',
    label: 'Рост / Падение',
    icon: 'swap-vertical-outline',
  },
  {
    id: 'momentum',
    label: 'Импульс',
    icon: 'flash-outline',
  },
];

export type { PortfolioTabId };
