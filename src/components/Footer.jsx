import { Box, Typography, Link } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Footer() {
  return (
    <Box 
      component="footer" 
      className="bg-gray-800 text-white py-6 mt-auto"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="flex flex-col items-center gap-2 px-4">
        <Typography 
          variant="body1" 
          className="flex items-center gap-2"
          sx={{ userSelect: 'none' }}
        >
          Made with <FavoriteIcon sx={{ color: '#e91e63', fontSize: 20 }} /> by Your Name
        </Typography>
        <Typography 
          variant="body2" 
          className="text-gray-400"
          sx={{ userSelect: 'none' }}
        >
          © {new Date().getFullYear()} Sum Calculator. All rights reserved.
        </Typography>
        <div className="flex gap-4 mt-2">
          <Link 
            href="#" 
            underline="hover" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link 
            href="#" 
            underline="hover" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link 
            href="#" 
            underline="hover" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            Privacy
          </Link>
        </div>
      </div>
    </Box>
  );
}

export default Footer;
