import { useState } from 'react';
import { Box, Card, CardContent, Button, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EqualsIcon from '@mui/icons-material/DragHandle';
import FloatingLabelInput from './FloatingLabelInput';
import Toast from './Toast';

function Main() {
  // State to manage two input numbers from user
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  
  // State to manage toast notification (error/warning messages)
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('error');
  
  // State to store calculation result
  const [result, setResult] = useState('0');
  
  // Function to check if character is a digit (0-9)
  const isNumber = char =>{
    const reg = /^[0-9]$/;
    return reg.test(char);
  }

  // Handle keydown event during input
  // Only allow digits, '-' sign at start, and control keys
  const handleKeyDown = (e) => {
    const chr = e.key;
    const input = e.target;
    const cursorPosition = input.selectionStart;

    // Allow Ctrl+A (select all), Ctrl+C (copy), Ctrl+V (paste)
    if (e.ctrlKey || e.metaKey) return; 

    // Allow navigation keys (arrows, Backspace, Delete, Tab...)
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (allowedKeys.includes(chr)) return; 

    // Allow '-' only when: input is empty OR cursor at start and no '-' exists
    if (chr === '-') {
      const currentValue = input.value;
      if (currentValue === '' || (cursorPosition === 0 && !currentValue.includes('-'))) {
        return;
      }
      // If condition not met, block and show warning
      e.preventDefault();
      setToastMessage('Dấu "-" chỉ được đặt ở đầu số!');
      setToastSeverity('warning');
      setOpenToast(true);
      return;
    }

    // Block all non-digit characters and show error message
    if (!isNumber(chr)) {
      e.preventDefault();
      setToastMessage('Chỉ được nhập số! Không được nhập ký tự.');
      setToastSeverity('error');
      setOpenToast(true); 
    }
  };

  // Close toast notification when user clicks X or time expires
  const handleCloseToast = () => {
    setOpenToast(false);
  };

  // Function to calculate sum of 2 numbers - supports both negative and positive
  const handleSumCalculate = ()=>{
    // Check if user entered both numbers
    if(firstNumber === "" || secondNumber === "") {
      setToastMessage('Vui lòng nhập đầy đủ cả hai số!');
      setToastSeverity('warning');
      setOpenToast(true);
      return;
    }

    // Extract sign and absolute value of 2 numbers
    const isNegative1 = firstNumber.startsWith('-'); // true if number 1 is negative
    const isNegative2 = secondNumber.startsWith('-'); // true if number 2 is negative
    const absNum1 = isNegative1 ? firstNumber.substring(1) : firstNumber; // get number without sign
    const absNum2 = isNegative2 ? secondNumber.substring(1) : secondNumber;

    // Case 1: Same sign (both positive or both negative)
    // => Add 2 absolute values, keep the sign
    if (isNegative1 === isNegative2) {
      const sum = addTwoPositiveNumbers(absNum1, absNum2);
      setResult(isNegative1 ? '-' + sum : sum);
      return;
    }

    // Case 2: Different signs (1 positive 1 negative)
    // => Subtract absolute values, take sign of larger number
    const comparison = compareNumbers(absNum1, absNum2);
    
    // If 2 numbers equal in absolute value => result = 0
    if (comparison === 0) {
      setResult('0');
      return;
    }

    // If number 1 is larger => result carries sign of number 1
    if (comparison > 0) {
      const diff = subtractTwoPositiveNumbers(absNum1, absNum2);
      setResult(isNegative1 ? '-' + diff : diff);
    } else {
      // If number 2 is larger => result carries sign of number 2
      const diff = subtractTwoPositiveNumbers(absNum2, absNum1);
      setResult(isNegative2 ? '-' + diff : diff);
    }
  }

  // Compare 2 numbers as strings (to support very large numbers)
  const compareNumbers = (num1, num2) => {
    // Compare length first: longer number is larger
    if (num1.length !== num2.length) {
      return num1.length - num2.length;
    }
    // If same length, compare each character in lexicographical order
    return num1.localeCompare(num2);
  }

  // Add 2 positive numbers using digit-by-digit addition from right to left
  const addTwoPositiveNumbers = (num1, num2) => {
    // Reverse strings to calculate from right to left (ones -> tens -> hundreds...)
    const n1 = num1.split("").reverse().join("");
    const n2 = num2.split("").reverse().join("");
    
    const maxLen = Math.max(n1.length, n2.length) + 1; // +1 for final carry case
    const res = new Array(maxLen).fill(0);
    let carry = 0; // variable to store carry

    // Iterate through each position and add
    for (let i = 0; i < maxLen; i++) {
      const digit1 = i < n1.length ? parseInt(n1[i]) : 0; // get digit or 0 if exhausted
      const digit2 = i < n2.length ? parseInt(n2[i]) : 0;
      const sum = digit1 + digit2 + carry; // add 2 digits + carry
      res[i] = sum % 10; // get ones place
      carry = Math.floor(sum / 10); // get carry (tens place)
    }

    // Reverse back and remove leading zeros
    let answer = res.reverse().join("").replace(/^0+/, "");
    return answer === "" ? "0" : answer;
  }

  // Subtract 2 positive numbers using digit-by-digit subtraction (num1 >= num2)
  const subtractTwoPositiveNumbers = (num1, num2) => {
    // Reverse strings to calculate from right to left
    const n1 = num1.split("").reverse().join("");
    const n2 = num2.split("").reverse().join("");
    
    const res = [];
    let borrow = 0; // variable to store borrow

    // Iterate through each position and subtract
    for (let i = 0; i < n1.length; i++) {
      let digit1 = parseInt(n1[i]);
      const digit2 = i < n2.length ? parseInt(n2[i]) : 0;

      digit1 -= borrow; // subtract previously borrowed amount
      
      // If minuend digit is less than subtrahend => need to borrow from left
      if (digit1 < digit2) {
        digit1 += 10; // borrow 10
        borrow = 1; // mark as borrowed
      } else {
        borrow = 0; // no need to borrow
      }

      res.push(digit1 - digit2); // store subtraction result
    }

    // Reverse back and remove leading zeros
    let answer = res.reverse().join("").replace(/^0+/, "");
    return answer === "" ? "0" : answer;
  }


  return (
    <Box
      component="main"
      className="flex-1 flex items-center justify-center py-16 px-6"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientFlow 15s ease infinite',
        minHeight: 'calc(100vh - 200px)',
        position: 'relative',
        overflow: 'hidden',
        // Animation for moving gradient
        '@keyframes gradientFlow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        // Layer 1: Rotating and moving dot pattern
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2px)',
          backgroundSize: '50px 50px',
          animation: 'backgroundMove 30s linear infinite',
          opacity: 0.6
        },
        // Animation for dot pattern: move and rotate 360 degrees
        '@keyframes backgroundMove': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(50px, 50px) rotate(360deg)' }
        },
        // Layer 2: Floating color circles moving like clouds
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(240, 147, 251, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(118, 75, 162, 0.3) 0%, transparent 50%)
          `,
          animation: 'floatingCircles 20s ease-in-out infinite',
          pointerEvents: 'none' // don't block clicks on elements below
        },
        // Animation for circles: move and change size/opacity
        '@keyframes floatingCircles': {
          '0%, 100%': { 
            transform: 'translate(0, 0) scale(1)',
            opacity: 0.6
          },
          '33%': { 
            transform: 'translate(-20px, -30px) scale(1.1)',
            opacity: 0.8
          },
          '66%': { 
            transform: 'translate(20px, 30px) scale(0.9)',
            opacity: 0.7
          }
        }
      }}
    >
      <Card
        elevation={24}
        className="w-full max-w-3xl mb-10"
        sx={{
          borderRadius: 8,
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 60px rgba(102, 126, 234, 0.3)',
          position: 'relative',
          transform: 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          animation: 'cardEntrance 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 48px 0 rgba(31, 38, 135, 0.5), 0 0 80px rgba(102, 126, 234, 0.5)'
          },
          '@keyframes cardEntrance': {
            '0%': { 
              opacity: 0,
              transform: 'translateY(50px) scale(0.9)',
            },
            '100%': { 
              opacity: 1,
              transform: 'translateY(0) scale(1)',
            }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #667eea)',
            backgroundSize: '200% 100%',
            animation: 'gradientShift 3s linear infinite',
            borderRadius: '8px 8px 0 0'
          },
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '100%': { backgroundPosition: '200% 50%' }
          }
        }}
      >
        <CardContent className="p-12">
          {/* Title */}
          <Typography
            variant="h3"
            component="h2"
            className="text-center font-bold"
            sx={{
              marginBottom: '10px',
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              userSelect: 'none',
              textShadow: '0 2px 20px rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.05em',
              animation: 'titleFloat 3s ease-in-out infinite',
              '@keyframes titleFloat': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-5px)' }
              }
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
                  fontSize: 48,
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))',
                  borderRadius: '50%',
                  padding: '12px',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4), 0 0 40px rgba(102, 126, 234, 0.2)',
                  animation: 'iconPulse 2s ease-in-out infinite',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'rotate(180deg) scale(1.1)',
                    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.6), 0 0 60px rgba(102, 126, 234, 0.4)'
                  },
                  '@keyframes iconPulse': {
                    '0%, 100%': { 
                      transform: 'scale(1)',
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4), 0 0 40px rgba(102, 126, 234, 0.2)'
                    },
                    '50%': { 
                      transform: 'scale(1.05)',
                      boxShadow: '0 12px 32px rgba(102, 126, 234, 0.6), 0 0 60px rgba(102, 126, 234, 0.4)'
                    }
                  }
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
                padding: '16px',
                fontSize: '1.25rem',
                fontWeight: '700',
                textTransform: 'none',
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.5), 0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '0',
                  height: '0',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.3)',
                  transform: 'translate(-50%, -50%)',
                  transition: 'width 0.6s, height 0.6s'
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 16px 40px rgba(102, 126, 234, 0.7), 0 8px 20px rgba(0, 0, 0, 0.2)',
                  '&::before': {
                    width: '300px',
                    height: '300px'
                  }
                },
                '&:active': {
                  transform: 'translateY(-2px) scale(0.98)'
                }
              }}
            >
              Sum
            </Button>

            {/* Result Section */}
            <Paper
              elevation={12}
              className="p-10 text-center"
              sx={{
                background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.95) 0%, rgba(245, 87, 108, 0.95) 100%)',
                borderRadius: 5,
                border: '3px solid rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'visible',
                animation: 'resultGlow 3s ease-in-out infinite',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 20px 60px rgba(240, 147, 251, 0.6), 0 0 80px rgba(245, 87, 108, 0.4)'
                },
                '@keyframes resultGlow': {
                  '0%, 100%': { 
                    boxShadow: '0 12px 40px rgba(240, 147, 251, 0.4), 0 0 60px rgba(245, 87, 108, 0.3)'
                  },
                  '50%': { 
                    boxShadow: '0 16px 48px rgba(240, 147, 251, 0.6), 0 0 80px rgba(245, 87, 108, 0.5)'
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                  animation: 'shimmer 3s linear infinite'
                },
                '@keyframes shimmer': {
                  '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
                  '100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' }
                }
              }}
            >
              <Typography
                variant="h6"
                className="text-white font-semibold mb-3"
                sx={{ 
                  userSelect: 'none',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                Result
              </Typography>
              <Typography
                variant="h1"
                className="text-white font-extrabold"
                sx={{
                  textShadow: '0 4px 20px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.3)',
                  userSelect: 'none',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  animation: 'resultPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  wordBreak: 'break-all',
                  padding: '0 10px',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: '10px',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.6)',
                    }
                  },
                  '@keyframes resultPop': {
                    '0%': { 
                      transform: 'scale(0.5)',
                      opacity: 0
                    },
                    '100%': { 
                      transform: 'scale(1)',
                      opacity: 1
                    }
                  }
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
