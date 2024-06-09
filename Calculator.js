import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInput = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCalculate = () => {
    try {
      const result = evaluateExpression(input);
      setOutput(result);
    } catch (error) {
      setOutput('Error');
    }
  };

  const evaluateExpression = (expression) => {
    try {
      if (expression.includes('^2')) {
        const value = parseFloat(expression.replace('^2', ''));
        return Math.pow(value, 2);
      } else if (expression.includes('√')) {
        const value = parseFloat(expression.replace('√', ''));
        return Math.sqrt(value);
      } else if (expression.includes('%')) {
        const value = parseFloat(expression.replace('%', ''));
        return value / 100;
      } else if (expression.includes('±')) {
        const value = parseFloat(expression.replace('±', ''));
        return value * -1;
      } else {
        return evalBasicExpression(expression);
      }
    } catch (error) {
      throw new Error('Invalid Expression');
    }
  };

  const evalBasicExpression = (expression) => {
    const tokens = expression.split(/([+\-*/])/).filter(token => token.trim());
    if (tokens.length === 0) {
      return '';
    }

    let total = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const value = parseFloat(tokens[i + 1]);
      if (isNaN(value)) {
        throw new Error('Invalid number');
      }
      switch (operator) {
        case '+':
          total += value;
          break;
        case '-':
          total -= value;
          break;
        case '*':
          total *= value;
          break;
        case '/':
          if (value === 0) {
            throw new Error('Division by zero');
          }
          total /= value;
          break;
        default:
          throw new Error('Invalid operator');
      }
    }
    return total;
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="input-wrapper" data-placeholder="Enter text">
          <input type="text" value={input} readOnly />
        </div>
        <div className="input-wrapper" data-placeholder="Total">
          <input type="text" value={output} readOnly />
        </div>
        <div className="buttons">
          <button onClick={() => handleInput('7')}>7</button>
          <button onClick={() => handleInput('8')}>8</button>
          <button onClick={() => handleInput('9')}>9</button>
          <button className="operation" onClick={() => handleInput('+')}>+</button>
          <button onClick={() => handleInput('4')}>4</button>
          <button onClick={() => handleInput('5')}>5</button>
          <button onClick={() => handleInput('6')}>6</button>
          <button className="operation" onClick={() => handleInput('-')}>-</button>
          <button onClick={() => handleInput('1')}>1</button>
          <button onClick={() => handleInput('2')}>2</button>
          <button onClick={() => handleInput('3')}>3</button>
          <button className="operation" onClick={() => handleInput('*')}>*</button>
          <button onClick={() => handleInput('0')}>0</button>
          <button onClick={() => handleInput('.')}>.</button>
          <button className="clear" onClick={handleClear}>C</button>
          <button className="operation" onClick={() => handleInput('/')}>/</button>
          <button className="operation" onClick={handleCalculate}>=</button>
          <button className="operation" onClick={() => handleInput('^2')}>x²</button>
          <button className="operation" onClick={() => handleInput('√')}>√</button>
          <button className="operation" onClick={() => handleInput('%')}>%</button>
          <button className="operation" onClick={() => handleInput('±')}>±</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
