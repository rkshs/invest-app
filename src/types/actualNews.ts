export type ActualNewsItem = {
  id: string;
  variant: 'article' | 'idea';
  title: string;
  subtitle?: string;
  highlight?: string;
  dismissible?: boolean;
};
