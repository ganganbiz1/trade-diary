'use client';

import { 
  Box, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';
import { BlogPost } from '@/types';

export default function ArticlesPage() {
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; articleId: string | null }>({
    open: false,
    articleId: null
  });

  // TODO: 実際にはAPIから取得
  const articles: BlogPost[] = [
    {
      id: '1',
      title: 'NVIDIA株の投資記録',
      content: '...',
      publishedAt: '2024-01-15',
      tags: ['株式', 'テック'],
      author: 'トレーダー田中',
      summary: 'NVIDIA株への投資実績と分析',
      readTime: 5,
      profitLoss: 25000,
      investment: {
        amount: 100000,
        currency: 'JPY',
        type: 'stock',
        symbol: 'NVDA'
      }
    },
    {
      id: '2',
      title: 'ビットコインの短期取引結果',
      content: '...',
      publishedAt: '2024-01-14',
      tags: ['仮想通貨', '短期'],
      author: 'トレーダー田中',
      summary: 'ビットコインの短期取引記録',
      readTime: 3,
      profitLoss: -5000,
      investment: {
        amount: 50000,
        currency: 'JPY',
        type: 'crypto',
        symbol: 'BTC'
      }
    },
    {
      id: '3',
      title: '日本株ポートフォリオ見直し',
      content: '...',
      publishedAt: '2024-01-13',
      tags: ['株式', '日本'],
      author: 'トレーダー田中',
      summary: '日本株ポートフォリオの見直し記録',
      readTime: 8,
      profitLoss: 15000,
      investment: {
        amount: 200000,
        currency: 'JPY',
        type: 'stock'
      }
    }
  ];

  const handleDeleteClick = (articleId: string) => {
    setDeleteDialog({ open: true, articleId });
  };

  const handleDeleteConfirm = () => {
    // TODO: 実際の削除処理
    console.log('削除:', deleteDialog.articleId);
    setDeleteDialog({ open: false, articleId: null });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, articleId: null });
  };

  return (
    <AdminLayout>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            記事一覧
          </Typography>
          <Button
            variant="contained"
            component={Link}
            href="/articles/new"
            startIcon={<Add />}
          >
            新規記事作成
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>タイトル</TableCell>
                <TableCell>公開日</TableCell>
                <TableCell>タグ</TableCell>
                <TableCell>損益</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <Typography variant="body1">{article.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {article.summary}
                    </Typography>
                  </TableCell>
                  <TableCell>{article.publishedAt}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {article.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {article.profitLoss && (
                      <Typography 
                        color={article.profitLoss > 0 ? 'success.main' : 'error.main'}
                        fontWeight="bold"
                      >
                        {article.profitLoss > 0 ? '+' : ''}¥{article.profitLoss.toLocaleString()}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        color="info"
                        component={Link}
                        href={`/articles/${article.id}`}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="primary"
                        component={Link}
                        href={`/articles/${article.id}/edit`}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteClick(article.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 削除確認ダイアログ */}
        <Dialog open={deleteDialog.open} onClose={handleDeleteCancel}>
          <DialogTitle>記事を削除しますか？</DialogTitle>
          <DialogContent>
            この操作は取り消せません。本当に削除してよろしいですか？
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>キャンセル</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              削除
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
} 