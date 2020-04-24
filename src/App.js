import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

const menuItems = [
  'Home', 
  'Support',
  'Messages',
  'Browse'
]

const dropImageAspectRatio = 190.49475/59.402695;

function App() {
  const [dropPosition, setDropPosition] = useState({left: 0, top: 0});
 
  const [hoveredItem, setHoveredItem] = useState(null);
  useEffect(() => {
      let dropRect = document.getElementById('drop').getBoundingClientRect();
      let navRect = document.querySelector('nav').getBoundingClientRect();
    if(hoveredItem) {
      let linkRect = document.getElementById(hoveredItem).getBoundingClientRect();
      
      setDropPosition({
        left: ((linkRect.left+linkRect.right)-dropRect.width)/2,
        top: navRect.bottom-4
      });
    } else {
      setDropPosition({
        left: dropPosition.left,
        top: (navRect.bottom-(dropRect.width/dropImageAspectRatio)/3)-4
      })
    }
  
  }, [hoveredItem])

  return (
    <div className="App">
      <header className="nav">
        <nav>
          <h1 className='nav-header'>Canary</h1>
          <img 
            id='drop' 
            style={{left: `${dropPosition.left}px`, top: `${dropPosition.top}px`}} 
            className={hoveredItem && 'active'}
            src="../menudrop.svg"
          />
          {
            menuItems.map(item => (
            <Link 
              className='nav-link' 
              key={item} 
              id={item}
              onMouseEnter={ () => setHoveredItem(item) }
              onMouseLeave={ () => setHoveredItem(null) }
              >
                {item}
            </Link>
            ))
          }
        </nav>     
      </header>

    </div>
  );
}

export default App;
