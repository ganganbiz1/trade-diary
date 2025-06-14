'use client';

import { 
  Box, 
  Button, 
  Typography,
  Paper,
  Chip,
  Divider
} from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { useState, useEffect } from 'react';
import { BlogPost } from '@/types';
import { useParams } from 'next/navigation';

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.id as string;
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 実際にはAPIから記事データを取得
    const mockArticle: BlogPost = {
      id: articleId,
      title: 'NVIDIA株の投資記録',
      content: `# NVIDIA株への投資について

## 投資の背景
AI技術の発展に伴い、NVIDIA株への投資を決定しました。

## 分析結果
- 財務状況が良好
- AI市場の成長性
- 技術的優位性

## 投資結果
今回の投資では+25,000円の利益を得ることができました。`,
      summary: 'NVIDIA株への投資実績と分析',
      tags: ['株式', 'テック', 'AI'],
      author: 'トレーダー田中',
      publishedAt: '2024-01-15',
      readTime: 5,
      profitLoss: 25000,
      investment: {
        amount: 100000,
        currency: 'JPY',
        type: 'stock',
        symbol: 'NVDA'
      }
    };

    setArticle(mockArticle);
    setLoading(false);
  }, [articleId]);

  if (loading) {
    return (
      <AdminLayout>
        <Typography>読み込み中...</Typography>
      </AdminLayout>
    );
  }

  if (!article) {
    return (
      <AdminLayout>
        <Typography>記事が見つかりません</Typography>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Button
            component={Link}
            href="/articles"
            startIcon={<ArrowBack />}
          >
            記事一覧に戻る
          </Button>
          <Button
            component={Link}
            href={`/articles/${article.id}/edit`}
            variant="contained"
            startIcon={<Edit />}
          >
            編集
          </Button>
        </Box>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            {article.title}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="textSecondary">
              公開日: {article.publishedAt} | 読了時間: {article.readTime}分 | 著者: {article.author}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            {article.tags.map((tag) => (
              <Chip key={tag} label={tag} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>

          <Typography variant="h6" gutterBottom>
            概要
          </Typography>
          <Typography paragraph>
            {article.summary}
          </Typography>

          {article.investment && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                投資情報
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography><strong>投資種類:</strong> {
                  article.investment.type === 'stock' ? '株式' :
                  article.investment.type === 'crypto' ? '仮想通貨' :
                  article.investment.type === 'forex' ? 'FX' :
                  article.investment.type === 'commodity' ? '商品' : '不動産'
                }</Typography>
                <Typography><strong>投資金額:</strong> ¥{article.investment.amount.toLocaleString()}</Typography>
                {article.investment.symbol && (
                  <Typography><strong>銘柄コード:</strong> {article.investment.symbol}</Typography>
                )}
              </Box>
            </>
          )}

          {article.profitLoss && (
            <>
              <Typography variant="h6" gutterBottom>
                損益
              </Typography>
              <Typography 
                variant="h5" 
                color={article.profitLoss > 0 ? 'success.main' : 'error.main'}
                fontWeight="bold"
                gutterBottom
              >
                {article.profitLoss > 0 ? '+' : ''}¥{article.profitLoss.toLocaleString()}
              </Typography>
            </>
          )}

          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            本文
          </Typography>
          <Box sx={{ whiteSpace: 'pre-wrap' }}>
            <Typography>{article.content}</Typography>
          </Box>
        </Paper>
      </Box>
    </AdminLayout>
  );
} 