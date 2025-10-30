import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { Box } from '@mui/material';

// Root component - orchestrates the layout structure
function App() {
  return (
    <Box className="min-h-screen flex flex-col">
      <Header />
      <Main />
      <Footer />
    </Box>
  );
}

export default App
