import React, { useEffect, useState } from 'react';
import './App.css';

export const Box = ({ id, clickHandlor, styl }) => {
  return (
    <div id={id} className='box' style={styl} onClick={clickHandlor}>{id} </div>
  );
}
// export default Box;

function App() {
  const [boxCount, setBoxCount] = useState(0);
  const [boxArr] = useState([]);
  const [evt, setEvt] = useState(null);
  const [play, setPlay] = useState(false);

  const clickHandlor = (event) => {
    setEvt(event);
  }

  const addBlockHandlor = () => {
    setBoxCount(boxCount + 1);
    boxArr.push(boxCount + 1);
  }

  const deleteBlockHandlor = () => {
    evt?.target.remove();
    setEvt(null);
  }

  console.log(boxArr);

  const keyPress = (event) => {
    let modifier = 5;
    let box = evt.target;
    console.log(box);
    const { style } = box;

    const maxRight = box.parentElement.clientWidth - 100;
    const maxBottom = box.parentElement.clientHeight - 100;

    const funObj = {
      ArrowUp: () => {
        if (parseInt(style.top ? style.top : 0) >= modifier) {
          style.top = `${parseInt(style.top ? style.top : 0) - modifier}px`;
        }
        else {
          style.top = '0px';
        }
      },
      ArrowDown: () => {
        if (parseInt(style.top ? style.top : 0) <= maxBottom - modifier) {
          style.top = `${parseInt(style.top ? style.top : 0) + modifier}px`;
        }
        else {
          style.top = `${maxBottom}px`;
        }
      },
      ArrowLeft: () => {
        if (parseInt(style.left ? style.left : 0) >= modifier) {
          style.left = `${parseInt(style.left ? style.left : 0) - modifier}px`;
        }
        else {
          style.left = '0px';
        }
      },
      ArrowRight: () => {
        if (parseInt(style.left ? style.left : 0) <= maxRight - modifier) {
          style.left = `${parseInt(style.left ? style.left : 0) + modifier}px`;
        }
        else {
          style.left = `${maxRight}px`;
        }
      }
    }
    console.log(funObj[event.key]);
    return funObj[event.key] ? funObj[event.key]() : null;
  }

  useEffect(() => {
    if (play && evt?.target) {
      window.addEventListener('keydown', keyPress);
    }
    return () => { window.removeEventListener('keydown', keyPress) };
  }, [evt, play]);

  let boxes = boxArr.map((ele) => {
    return <Box id={ele} clickHandlor={clickHandlor} key={ele} styl={evt?.target.id == ele ? { zIndex: `${ele}`, boxShadow: '0 0 10px #68f', } : { zIndex: `${ele}` }} />
  });

  return (
    <>

      <div className="App">
        <h1>Movable Box Generator</h1>
        <div className='container'>
          <div className='side'>
            <div className='side__in'>
              <button className={play ? 'pause' : 'play'} onClick={() => setPlay(!play)}>{play ? 'Pause' : 'Play'}</button>
              <p className='desc'>Click here to <b>{play ? 'Stop' : 'Start'}</b></p>
            </div>

            <div className='side__in'>
              <button className='add' onClick={addBlockHandlor}>Add Block</button>
              <button className='delete' onClick={deleteBlockHandlor}>Delete</button>
            </div>
          </div>
          <div className='playground'>
            <div className='background-txt'>Playground</div>
            {boxes}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;