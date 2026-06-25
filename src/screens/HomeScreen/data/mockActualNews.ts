import { ActualNewsItem } from '../../../types/actualNews';

export const mockActualNews: ActualNewsItem[] = [
  {
    id: '1',
    variant: 'article',
    title: 'Как бизнесу инвестировать капитал: обзор возможностей',
    dismissible: true,
  },
  {
    id: '2',
    variant: 'idea',
    subtitle: 'Идея покупать',
    title: 'Эталон Груп',
    highlight: '311,35% Потенциал',
  },
  {
    id: '3',
    variant: 'article',
    title: 'Обзор рынка облигаций: что важно знать инвестору',
    dismissible: true,
  },
  {
    id: '4',
    variant: 'idea',
    subtitle: 'Идея покупать',
    title: 'Сбербанк',
    highlight: '+18,4% Потенциал',
  },
];
