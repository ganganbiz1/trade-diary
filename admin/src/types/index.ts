export interface BlogPost {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  tags: string[];
  author: string;
  summary: string;
  readTime: number; // minutes
  profitLoss?: number; // 損益
  investment?: {
    amount: number;
    currency: string;
    type: 'stock' | 'crypto' | 'forex' | 'commodity' | 'real_estate';
    symbol?: string; // 銘柄コード
  };
}

export interface BlogStats {
  totalPosts: number;
  totalProfit: number;
  totalLoss: number;
  winRate: number;
} 