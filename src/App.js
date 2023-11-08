import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [quote, setquote] = useState('');
  const [author, setauthor] = useState('');
  const [bubbleColor, setBubbleColor] = useState('rgba(255, 255, 255, 0.7)');

  const GenQuote = () => {
    axios.get('https://api.quotable.io/random/').then(res => {
      setquote(res.data.content);
      setauthor(res.data.author);
      setBubbleColor(`hsla(${Math.random() * 360}, 100%, 50%, 0.7)`);
      console.log(res)

    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      createBubble();
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const createBubble = () => {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.width = `${Math.random() * (80 - 20) + 20}px`;
    bubble.style.height = bubble.style.width;
    bubble.style.animation = `rise ${Math.random() * (15 - 8) + 8}s linear infinite`;

    document.querySelector('.App').appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 15000);
  };

  return (
    <div className="App">
      <h1>QUOTABLE</h1>
      <div className="quote-container">
        <div className='container'>
          <p className="quote">{quote}</p>
          <h5 className="author">{author}</h5>
        </div>
      </div>
    
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <button onClick={GenQuote}>Generate Quote</button>
      <div className='footer'>&copy; 2023 Carey Okal <br/><br/>I used the "Quotable" API, a free and open-source service that provides a collection of famous quotes without requiring authentication.</div>
    </div>
  );
}
