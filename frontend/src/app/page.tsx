'use client';

import {
  Container,
  Typography,
  Box,
  Button,
  Fab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Add, Create } from '@mui/icons-material';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import BlogPostCard from '@/components/BlogPostCard';
import { mockBlogPosts, mockStats } from '@/data/mockData';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePostClick = (postId: string) => {
    console.log('Post clicked:', postId);
    // TODO: Navigate to post detail page
  };

  const handleNewPost = () => {
    console.log('New post clicked');
    // TODO: Navigate to new post page
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2 30%, #dc004e 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            投資の学びを記録する
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            毎回の投資経験から学んだことを記録し、より良い投資判断につなげる
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Create />}
            onClick={handleNewPost}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
              background: 'linear-gradient(45deg, #1976d2 30%, #dc004e 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0 30%, #9a0036 90%)',
              },
            }}
          >
            新しい投稿を作成
          </Button>
        </Box>

        {/* Stats Section */}
        <Box sx={{ mb: 6 }}>
          <StatsCard stats={mockStats} />
        </Box>

        {/* Blog Posts Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600, 
              mb: 1,
              color: 'text.primary',
            }}
          >
            最新の投資記録
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4 }}
          >
            最近の投資活動と学んだポイントを確認しましょう
          </Typography>
        </Box>

        {/* Blog Posts Grid */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
            mb: 6,
          }}
        >
          {mockBlogPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              onClick={() => handlePostClick(post.id)}
            />
          ))}
        </Box>

        {/* Load More Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
            }}
          >
            もっと見る
          </Button>
        </Box>
      </Container>

      {/* Floating Action Button */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleNewPost}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(45deg, #1976d2 30%, #dc004e 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1565c0 30%, #9a0036 90%)',
            },
          }}
        >
          <Add />
        </Fab>
      )}
    </Box>
  );
}
