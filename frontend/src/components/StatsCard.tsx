'use client';

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Assessment,
  Article,
} from '@mui/icons-material';
import { BlogStats } from '@/types';

interface StatsCardProps {
  stats: BlogStats;
}

const StatsCard = ({ stats }: StatsCardProps) => {
  const theme = useTheme();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const netProfit = stats.totalProfit - stats.totalLoss;
  const isProfit = netProfit >= 0;

  const statItems = [
    {
      label: '総投稿数',
      value: stats.totalPosts,
      suffix: '件',
      icon: <Article />,
      color: theme.palette.primary.main,
    },
    {
      label: '総利益',
      value: formatCurrency(stats.totalProfit),
      suffix: '',
      icon: <TrendingUp />,
      color: theme.palette.success.main,
    },
    {
      label: '総損失',
      value: formatCurrency(stats.totalLoss),
      suffix: '',
      icon: <TrendingDown />,
      color: theme.palette.error.main,
    },
    {
      label: '勝率',
      value: stats.winRate,
      suffix: '%',
      icon: <Assessment />,
      color: stats.winRate >= 60 ? theme.palette.success.main : 
             stats.winRate >= 40 ? theme.palette.warning.main : 
             theme.palette.error.main,
    },
  ];

  return (
    <Card 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          📊 投資統計サマリー
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {statItems.map((item, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 0.5,
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  {item.value}{item.suffix}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.8,
                    fontSize: '0.75rem'
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Chip
            label={`純損益: ${formatCurrency(netProfit)}`}
            sx={{
              backgroundColor: isProfit ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
              color: isProfit ? '#4caf50' : '#f44336',
              fontWeight: 600,
              border: `1px solid ${isProfit ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'}`,
              '& .MuiChip-label': {
                px: 2,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard; 