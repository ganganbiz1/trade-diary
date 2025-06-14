'use client';

import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Paper,
  Chip
} from '@mui/material';
import { Article, TrendingUp, TrendingDown, Assessment } from '@mui/icons-material';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';

export default function AdminDashboard() {
  // TODO: 実際にはAPIから取得
  const stats = {
    totalPosts: 24,
    totalProfit: 150000,
    totalLoss: -45000,
    winRate: 68.5
  };

  const recentPosts = [
    { id: '1', title: 'NVIDIA株の投資記録', publishedAt: '2024-01-15', status: 'published' },
    { id: '2', title: 'ビットコインの短期取引結果', publishedAt: '2024-01-14', status: 'draft' },
    { id: '3', title: '日本株ポートフォリオ見直し', publishedAt: '2024-01-13', status: 'published' },
  ];

  return (
    <AdminLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          ダッシュボード
        </Typography>
        
        {/* 統計カード */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          <Card sx={{ minWidth: 200, flex: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    総記事数
                  </Typography>
                  <Typography variant="h5">
                    {stats.totalPosts}
                  </Typography>
                </Box>
                <Article color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ minWidth: 200, flex: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    総利益
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    ¥{stats.totalProfit.toLocaleString()}
                  </Typography>
                </Box>
                <TrendingUp color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ minWidth: 200, flex: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    総損失
                  </Typography>
                  <Typography variant="h5" color="error.main">
                    ¥{Math.abs(stats.totalLoss).toLocaleString()}
                  </Typography>
                </Box>
                <TrendingDown color="error" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ minWidth: 200, flex: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    勝率
                  </Typography>
                  <Typography variant="h5">
                    {stats.winRate}%
                  </Typography>
                </Box>
                <Assessment color="info" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* クイックアクション */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            クイックアクション
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              component={Link} 
              href="/articles/new"
              startIcon={<Article />}
            >
              新規記事作成
            </Button>
            <Button 
              variant="outlined" 
              component={Link} 
              href="/articles"
            >
              記事一覧を見る
            </Button>
          </Box>
        </Paper>

        {/* 最近の記事 */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            最近の記事
          </Typography>
          {recentPosts.map((post) => (
            <Box 
              key={post.id} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                py: 2,
                borderBottom: '1px solid #eee',
                '&:last-child': { borderBottom: 'none' }
              }}
            >
              <Box>
                <Typography variant="body1">{post.title}</Typography>
                <Typography color="textSecondary" variant="body2">
                  {post.publishedAt}
                </Typography>
              </Box>
              <Chip 
                label={post.status === 'published' ? '公開' : '下書き'}
                color={post.status === 'published' ? 'success' : 'default'}
                size="small"
              />
            </Box>
          ))}
        </Paper>
      </Box>
    </AdminLayout>
  );
} 