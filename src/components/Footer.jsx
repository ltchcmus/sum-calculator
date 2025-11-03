import { Box, Typography, Link } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Footer component - hiển thị thông tin copyright và links
function Footer() {
  return (
    <Box 
      component="footer" 
      className="text-white py-8 mt-auto"
      sx={{
        // Glassmorphism effect cho footer
        background: 'rgba(31, 41, 55, 0.6)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 -8px 32px 0 rgba(31, 38, 135, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="flex flex-col items-center gap-3 px-4">
        {/* Text "Made with ❤️" với animation fade in */}
        <Typography 
          variant="body1" 
          className="flex items-center gap-2"
          sx={{ 
            userSelect: 'none',
            // Animation trượt từ dưới lên
            animation: 'fadeInUp 0.8s ease-out',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          Made with 
          {/* Icon trái tim với animation đập */}
          <FavoriteIcon 
            sx={{ 
              color: '#f093fb', 
              fontSize: 22,
              // Animation đập như trái tim thật
              animation: 'heartBeat 1.5s ease-in-out infinite',
              '@keyframes heartBeat': {
                '0%, 100%': { transform: 'scale(1)' },
                '25%': { transform: 'scale(1.2)' },
                '50%': { transform: 'scale(1)' }
              }
            }} 
          /> 
          by Le Thanh Cong
        </Typography>
        {/* Copyright text với năm tự động */}
        <Typography 
          variant="body2" 
          sx={{ 
            userSelect: 'none',
            color: 'rgba(255, 255, 255, 0.7)'
          }}
        >
          © {new Date().getFullYear()} Sum Calculator. All rights reserved.
        </Typography>
        {/* Navigation links với hover effect */}
        <div className="flex gap-6 mt-2">
          <Link 
            href="#" 
            underline="hover"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.3s ease',
              // Hover: đổi màu, nhảy lên, phát sáng
              '&:hover': {
                color: '#f093fb',
                transform: 'translateY(-2px)',
                textShadow: '0 4px 12px rgba(240, 147, 251, 0.5)'
              }
            }}
          >
            About
          </Link>
          <Link 
            href="#" 
            underline="hover"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#f093fb',
                transform: 'translateY(-2px)',
                textShadow: '0 4px 12px rgba(240, 147, 251, 0.5)'
              }
            }}
          >
            Contact
          </Link>
          <Link 
            href="#" 
            underline="hover"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#f093fb',
                transform: 'translateY(-2px)',
                textShadow: '0 4px 12px rgba(240, 147, 251, 0.5)'
              }
            }}
          >
            Privacy
          </Link>
        </div>
      </div>
    </Box>
  );
}

export default Footer;
