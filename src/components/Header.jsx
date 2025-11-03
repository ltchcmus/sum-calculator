import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';

// Header component - hiển thị tiêu đề app với hiệu ứng glassmorphism
function Header() {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        // Glassmorphism effect: nền mờ + blur
        background: 'rgba(102, 126, 234, 0.1)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
      }}
    >
      <Toolbar className="flex justify-center items-center py-3">
        <Box 
          className="flex items-center gap-4"
          sx={{
            // Animation trượt từ trên xuống khi load trang
            animation: 'headerSlide 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            '@keyframes headerSlide': {
              '0%': { 
                opacity: 0,
                transform: 'translateY(-30px)'
              },
              '100%': { 
                opacity: 1,
                transform: 'translateY(0)'
              }
            }
          }}
        >
          {/* Icon máy tính với animation xoay nhẹ */}
          <CalculateIcon 
            sx={{ 
              fontSize: 48,
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '12px',
              padding: '8px',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              // Animation xoay qua lại
              animation: 'iconRotate 4s linear infinite',
              '@keyframes iconRotate': {
                '0%, 100%': { transform: 'rotate(0deg)' },
                '25%': { transform: 'rotate(-10deg)' },
                '50%': { transform: 'rotate(0deg)' },
                '75%': { transform: 'rotate(10deg)' }
              }
            }} 
          />
          {/* Tiêu đề với gradient text effect */}
          <Typography 
            variant="h3" 
            component="h1" 
            className="font-bold tracking-wide"
            sx={{
              // Gradient màu cho text
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 20px rgba(102, 126, 234, 0.3)',
              letterSpacing: '0.05em',
              userSelect: 'none' // không cho bôi đen text
            }}
          >
            Sum Calculator
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
