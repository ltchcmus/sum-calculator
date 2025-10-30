import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';

function Header() {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Toolbar className="flex justify-center items-center py-2">
        <Box className="flex items-center gap-3">
          <CalculateIcon sx={{ fontSize: 40 }} />
          <Typography 
            variant="h4" 
            component="h1" 
            className="font-bold tracking-wide"
          >
            Sum Calculator
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
