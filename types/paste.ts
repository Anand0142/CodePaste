export type Paste = {
  id: string;
  content: string;
  createdAt: number;
  expiresAt: number | null;
  maxViews: number | null;
  views: number;
};
