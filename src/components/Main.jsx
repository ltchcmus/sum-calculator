import { useState } from 'react';
import { Box, Card, CardContent, Button, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EqualsIcon from '@mui/icons-material/DragHandle';
import FloatingLabelInput from './FloatingLabelInput';
import Toast from './Toast';

function Main() {
  // State management - useState hook for controlled components
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('error');
  const [result, setResult] = useState('0');
  
  // Validate if character is a digit (0-9)
  const isNumber = char =>{
    const reg = /^[0-9]$/;
    return reg.test(char);
  }

  // Event handler: Input validation on keydown
  const handleKeyDown = (e) => {
    const chr = e.key;
    const input = e.target;
    const cursorPosition = input.selectionStart;

    // Allow Ctrl/Cmd shortcuts (Ctrl+A, Ctrl+C, Ctrl+V, etc.)
    if (e.ctrlKey || e.metaKey) {
      return; 
    }

    // Allow control keys (navigation, delete, etc.)
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    
    if (allowedKeys.includes(chr)) {
      return; 
    }

    // Allow negative sign only at the beginning
    if (chr === '-') {
      const currentValue = input.value;
      if (currentValue === '' || (cursorPosition === 0 && !currentValue.includes('-'))) {
        return;
      }
      e.preventDefault();
      setToastMessage('Dấu "-" chỉ được đặt ở đầu số!');
      setToastSeverity('warning');
      setOpenToast(true);
      return;
    }

    // Block non-numeric characters and show error
    if (!isNumber(chr)) {
      e.preventDefault();
      setToastMessage('Chỉ được nhập số! Không được nhập ký tự.');
      setToastSeverity('error');
      setOpenToast(true); 
    }
  };

  // Close toast notification
  const handleCloseToast = () => {
    setOpenToast(false);
  };

  // Event handler: Calculate sum with negative number support
  const handleSumCalculate = ()=>{
    // Validation: Check if both inputs are filled
    if(firstNumber === "" || secondNumber === "") {
      setToastMessage('Vui lòng nhập đầy đủ cả hai số!');
      setToastSeverity('warning');
      setOpenToast(true);
      return;
    }

    // Detect negative signs
    const isNegative1 = firstNumber.startsWith('-');
    const isNegative2 = secondNumber.startsWith('-');

    // Get absolute values
    const absNum1 = isNegative1 ? firstNumber.substring(1) : firstNumber;
    const absNum2 = isNegative2 ? secondNumber.substring(1) : secondNumber;

    // Case 1: Same signs - add absolute values and keep the sign
    if (isNegative1 === isNegative2) {
      const sum = addTwoPositiveNumbers(absNum1, absNum2);
      setResult(isNegative1 ? '-' + sum : sum);
      return;
    }

    // Case 2: Different signs - subtract and apply sign of larger number
    const comparison = compareNumbers(absNum1, absNum2);
    
    if (comparison === 0) {
      setResult('0');
      return;
    }

    if (comparison > 0) {
      const diff = subtractTwoPositiveNumbers(absNum1, absNum2);
      setResult(isNegative1 ? '-' + diff : diff);
    } else {
      const diff = subtractTwoPositiveNumbers(absNum2, absNum1);
      setResult(isNegative2 ? '-' + diff : diff);
    }
  }

  // Helper: Compare two positive numbers (string format)
  const compareNumbers = (num1, num2) => {
    if (num1.length !== num2.length) {
      return num1.length - num2.length;
    }
    return num1.localeCompare(num2);
  }

  // Helper: Add two positive numbers digit-by-digit with carry
  const addTwoPositiveNumbers = (num1, num2) => {
    // Reverse strings for right-to-left processing
    const n1 = num1.split("").reverse().join("");
    const n2 = num2.split("").reverse().join("");
    
    const maxLen = Math.max(n1.length, n2.length) + 1;
    const res = new Array(maxLen).fill(0);

    let carry = 0;

    // Process each digit
    for (let i = 0; i < maxLen; i++) {
      const digit1 = i < n1.length ? parseInt(n1[i]) : 0;
      const digit2 = i < n2.length ? parseInt(n2[i]) : 0;

      const sum = digit1 + digit2 + carry;
      res[i] = sum % 10;
      carry = Math.floor(sum / 10);
    }

    // Remove leading zeros
    let answer = res.reverse().join("").replace(/^0+/, "");
    return answer === "" ? "0" : answer;
  }

  // Helper: Subtract two positive numbers (num1 >= num2) with borrow
  const subtractTwoPositiveNumbers = (num1, num2) => {
    // Reverse strings for right-to-left processing
    const n1 = num1.split("").reverse().join("");
    const n2 = num2.split("").reverse().join("");
    
    const res = [];
    let borrow = 0;

    // Process each digit
    for (let i = 0; i < n1.length; i++) {
      let digit1 = parseInt(n1[i]);
      const digit2 = i < n2.length ? parseInt(n2[i]) : 0;

      digit1 -= borrow;
      
      // Handle borrowing if needed
      if (digit1 < digit2) {
        digit1 += 10;
        borrow = 1;
      } else {
        borrow = 0;
      }

      res.push(digit1 - digit2);
    }

    // Remove leading zeros
    let answer = res.reverse().join("").replace(/^0+/, "");
    return answer === "" ? "0" : answer;
  }


  return (
    <Box
      component="main"
      className="flex-1 flex items-center justify-center py-16 px-6"
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: 'calc(100vh - 200px)'
      }}
    >
      <Card
        elevation={10}
        className="w-full max-w-3xl mb-10"
        sx={{
          borderRadius: 6,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <CardContent className="p-12">
          {/* Title */}
          <Typography
            variant="h4"
            component="h2"
            className="text-center font-bold"
            sx={{
              marginBottom: '10px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              userSelect: 'none'
            }}
          >
            Calculate Sum
          </Typography>

          {/* Input Section */}
          <div>
            {/* First Number */}
            <div style={{ marginBottom: '5px' }}>
              <FloatingLabelInput
                label="First Number"
                placeholder="Enter first number"
                value={firstNumber}
                onChange={(e) => setFirstNumber(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Plus Icon */}
            <div className="flex justify-center" style={{ marginBottom: '5px' }}>
              <AddIcon
                sx={{
                  fontSize: 44,
                  color: '#667eea',
                  background: '#f0f0f0',
                  borderRadius: '50%',
                  padding: '10px'
                }}
              />
            </div>

            {/* Second Number */}
            <div style={{ marginBottom: '5px' }}>
              <FloatingLabelInput
                label="Second Number"
                placeholder="Enter second number"
                value={secondNumber}
                onChange={(e) => setSecondNumber(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Calculate Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<EqualsIcon />}
              onClick={handleSumCalculate}
              sx={{
                marginBottom: '32px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '14px',
                fontSize: '1.125rem',
                fontWeight: '700',
                textTransform: 'none',
                borderRadius: 3,
                boxShadow: '0 6px 18px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  boxShadow: '0 8px 26px rgba(102, 126, 234, 0.6)'
                }
              }}
            >
              Sum
            </Button>

            {/* Result Section */}
            <Paper
              elevation={3}
              className="p-8 text-center"
              sx={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: 4
              }}
            >
              <Typography
                variant="body1"
                className="text-white font-semibold mb-2"
                sx={{ userSelect: 'none' }}
              >
                Result
              </Typography>
              <Typography
                variant="h2"
                className="text-white font-extrabold"
                sx={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  userSelect: 'none',
                  fontSize: { xs: '2rem', md: '2.75rem' }
                }}
              >
                {result}
              </Typography>
            </Paper>
          </div>
        </CardContent>
      </Card>

      {/* Toast Notification */}
      <Toast
        open={openToast}
        onClose={handleCloseToast}
        message={toastMessage}
        severity={toastSeverity}
        duration={3000}
      />
    </Box>
  );
}

export default Main;
