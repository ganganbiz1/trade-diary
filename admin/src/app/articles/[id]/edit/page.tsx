'use client';

import { 
  Box, 
  Button, 
  TextField, 
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { Save, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { useState, useEffect } from 'react';
import { BlogPost } from '@/types';
import { useParams } from 'next/navigation';

export default function EditArticlePage() {
  const params = useParams();
  const articleId = params.id as string;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    tags: '',
    profitLoss: '',
    investmentAmount: '',
    investmentType: 'stock',
    investmentSymbol: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 実際にはAPIから記事データを取得
    const mockArticle = {
      id: articleId,
      title: 'NVIDIA株の投資記録',
      content: 'NVIDIA株への投資について詳しく記録します...',
      summary: 'NVIDIA株への投資実績と分析',
      tags: ['株式', 'テック'],
      profitLoss: 25000,
      investment: {
        amount: 100000,
        currency: 'JPY',
        type: 'stock',
        symbol: 'NVDA'
      }
    };

    setFormData({
      title: mockArticle.title,
      content: mockArticle.content,
      summary: mockArticle.summary,
      tags: mockArticle.tags.join(', '),
      profitLoss: mockArticle.profitLoss?.toString() || '',
      investmentAmount: mockArticle.investment?.amount.toString() || '',
      investmentType: mockArticle.investment?.type || 'stock',
      investmentSymbol: mockArticle.investment?.symbol || ''
    });
    setLoading(false);
  }, [articleId]);

  const handleInputChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // TODO: 実際にはAPIに送信
    const updatedArticle = {
      id: articleId,
      title: formData.title,
      content: formData.content,
      summary: formData.summary,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      profitLoss: formData.profitLoss ? parseInt(formData.profitLoss) : undefined,
      investment: formData.investmentAmount ? {
        amount: parseInt(formData.investmentAmount),
        currency: 'JPY',
        type: formData.investmentType,
        symbol: formData.investmentSymbol || undefined
      } : undefined
    };

    console.log('記事更新:', updatedArticle);
    setShowSuccess(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <Typography>読み込み中...</Typography>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            component={Link}
            href="/articles"
            startIcon={<ArrowBack />}
            sx={{ mr: 2 }}
          >
            戻る
          </Button>
          <Typography variant="h4">
            記事編集
          </Typography>
        </Box>

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="タイトル"
                  value={formData.title}
                  onChange={handleInputChange('title')}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="概要"
                  value={formData.summary}
                  onChange={handleInputChange('summary')}
                  multiline
                  rows={2}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="本文"
                  value={formData.content}
                  onChange={handleInputChange('content')}
                  multiline
                  rows={10}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="タグ（カンマ区切り）"
                  value={formData.tags}
                  onChange={handleInputChange('tags')}
                  placeholder="株式, テック, 短期"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="損益（円）"
                  type="number"
                  value={formData.profitLoss}
                  onChange={handleInputChange('profitLoss')}
                  placeholder="25000"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="投資金額（円）"
                  type="number"
                  value={formData.investmentAmount}
                  onChange={handleInputChange('investmentAmount')}
                  placeholder="100000"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>投資種類</InputLabel>
                  <Select
                    value={formData.investmentType}
                    onChange={handleInputChange('investmentType')}
                    label="投資種類"
                  >
                    <MenuItem value="stock">株式</MenuItem>
                    <MenuItem value="crypto">仮想通貨</MenuItem>
                    <MenuItem value="forex">FX</MenuItem>
                    <MenuItem value="commodity">商品</MenuItem>
                    <MenuItem value="real_estate">不動産</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="銘柄コード"
                  value={formData.investmentSymbol}
                  onChange={handleInputChange('investmentSymbol')}
                  placeholder="NVDA, BTC, etc."
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    component={Link}
                    href="/articles"
                    variant="outlined"
                  >
                    キャンセル
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                  >
                    記事を更新
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert severity="success" onClose={() => setShowSuccess(false)}>
            記事が更新されました！
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
} 