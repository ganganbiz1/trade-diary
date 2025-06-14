import { BlogPost, BlogStats } from '@/types';

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'テスラ株への投資判断について',
    content: 'テスラ株の長期的な成長性について分析した結果、今回の投資判断に至りました。電気自動車市場の拡大と同社の技術革新を考慮し...',
    publishedAt: '2024-01-15T10:00:00Z',
    tags: ['株式', 'テスラ', 'EV', 'アメリカ株'],
    author: 'トレーダー田中',
    summary: 'テスラ株への投資理由と今後の展望について詳しく解説します。市場分析と企業財務の観点から投資判断を行いました。',
    readTime: 8,
    profitLoss: 15000,
    investment: {
      amount: 100000,
      currency: 'JPY',
      type: 'stock',
      symbol: 'TSLA'
    }
  },
  {
    id: '2',
    title: 'ビットコイン投資で学んだリスク管理の重要性',
    content: '仮想通貨投資において最も重要なのはリスク管理です。今回の取引で学んだポイントを共有します...',
    publishedAt: '2024-01-12T14:30:00Z',
    tags: ['仮想通貨', 'ビットコイン', 'リスク管理'],
    author: 'トレーダー田中',
    summary: 'ビットコイン投資で経験した損失から学んだリスク管理の教訓を具体的に解説します。',
    readTime: 6,
    profitLoss: -8000,
    investment: {
      amount: 50000,
      currency: 'JPY',
      type: 'crypto',
      symbol: 'BTC'
    }
  },
  {
    id: '3',
    title: '日経225先物取引の戦略と結果',
    content: '日経225先物での短期トレード戦略について詳しく解説します。テクニカル分析を基にしたエントリータイミング...',
    publishedAt: '2024-01-10T09:15:00Z',
    tags: ['先物', '日経225', 'テクニカル分析'],
    author: 'トレーダー田中',
    summary: '日経225先物取引での具体的な戦略とその結果について詳細に報告します。',
    readTime: 12,
    profitLoss: 25000,
    investment: {
      amount: 200000,
      currency: 'JPY',
      type: 'stock',
      symbol: 'NK225'
    }
  },
  {
    id: '4',
    title: 'REIT投資による分散投資戦略',
    content: '不動産投資信託（REIT）を活用した分散投資戦略について説明します。リスクを抑えながら安定した収益を目指す...',
    publishedAt: '2024-01-08T16:45:00Z',
    tags: ['REIT', '不動産', '分散投資', '長期投資'],
    author: 'トレーダー田中',
    summary: 'REIT投資による分散投資戦略と長期的な資産形成について詳しく解説します。',
    readTime: 10,
    profitLoss: 12000,
    investment: {
      amount: 150000,
      currency: 'JPY',
      type: 'real_estate',
      symbol: 'J-REIT'
    }
  },
  {
    id: '5',
    title: '米ドル/円トレードでの損切りタイミング',
    content: 'FX取引において損切りのタイミングは非常に重要です。今回の米ドル/円取引での判断について...',
    publishedAt: '2024-01-05T11:20:00Z',
    tags: ['FX', '米ドル円', '損切り', 'リスク管理'],
    author: 'トレーダー田中',
    summary: 'FX取引での適切な損切りタイミングについて、実際の取引例を交えて解説します。',
    readTime: 7,
    profitLoss: -5000,
    investment: {
      amount: 80000,
      currency: 'JPY',
      type: 'forex',
      symbol: 'USDJPY'
    }
  }
];

export const mockStats: BlogStats = {
  totalPosts: mockBlogPosts.length,
  totalProfit: mockBlogPosts.reduce((sum, post) => sum + (post.profitLoss && post.profitLoss > 0 ? post.profitLoss : 0), 0),
  totalLoss: Math.abs(mockBlogPosts.reduce((sum, post) => sum + (post.profitLoss && post.profitLoss < 0 ? post.profitLoss : 0), 0)),
  winRate: Math.round((mockBlogPosts.filter(post => post.profitLoss && post.profitLoss > 0).length / mockBlogPosts.length) * 100)
}; 