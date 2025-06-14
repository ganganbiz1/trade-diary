'use client';

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Schedule,
  Person,
  TrendingUp,
  TrendingDown,
  ArrowForward,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BlogPost } from '@/types';

dayjs.extend(relativeTime);
dayjs.locale('ja');

interface BlogPostCardProps {
  post: BlogPost;
  onClick?: () => void;
}

const BlogPostCard = ({ post, onClick }: BlogPostCardProps) => {
  const theme = useTheme();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInvestmentTypeLabel = (type: string) => {
    const typeLabels: { [key: string]: string } = {
      stock: '株式',
      crypto: '仮想通貨',
      forex: 'FX',
      commodity: '商品',
      real_estate: '不動産',
    };
    return typeLabels[type] || type;
  };

  const getInvestmentTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      stock: theme.palette.primary.main,
      crypto: '#f7931a',
      forex: '#4caf50',
      commodity: '#ff9800',
      real_estate: '#795548',
    };
    return typeColors[type] || theme.palette.grey[500];
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                lineHeight: 1.3,
                display: '-webkit-box',
                '-webkit-line-clamp': 2,
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.title}
            </Typography>
            {post.profitLoss !== undefined && (
              <Chip
                icon={post.profitLoss >= 0 ? <TrendingUp /> : <TrendingDown />}
                label={formatCurrency(post.profitLoss)}
                size="small"
                sx={{
                  backgroundColor: post.profitLoss >= 0 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                  color: post.profitLoss >= 0 ? theme.palette.success.main : theme.palette.error.main,
                  border: `1px solid ${post.profitLoss >= 0 ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
                  ml: 1,
                  flexShrink: 0,
                }}
              />
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {post.author}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {dayjs(post.publishedAt).fromNow()}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Summary */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            '-webkit-line-clamp': 3,
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
          }}
        >
          {post.summary}
        </Typography>

        {/* Investment Info */}
        {post.investment && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Chip
                label={getInvestmentTypeLabel(post.investment.type)}
                size="small"
                sx={{
                  backgroundColor: getInvestmentTypeColor(post.investment.type) + '20',
                  color: getInvestmentTypeColor(post.investment.type),
                  fontWeight: 600,
                }}
              />
              {post.investment.symbol && (
                <Chip
                  label={post.investment.symbol}
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Box>
            <Typography variant="caption" color="text.secondary">
              投資額: {formatCurrency(post.investment.amount)}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {post.tags.slice(0, 3).map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ 
                fontSize: '0.75rem',
                height: 24,
              }}
            />
          ))}
          {post.tags.length > 3 && (
            <Chip
              label={`+${post.tags.length - 3}`}
              size="small"
              variant="outlined"
              sx={{ 
                fontSize: '0.75rem',
                height: 24,
                color: 'text.secondary',
              }}
            />
          )}
        </Box>

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            読了時間: {post.readTime}分
          </Typography>
          {onClick && (
            <Button
              size="small"
              endIcon={<ArrowForward />}
              sx={{ 
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              読む
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard; 