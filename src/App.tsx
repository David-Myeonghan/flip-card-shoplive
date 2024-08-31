import React from 'react';
import Swipe from './Swipe';

const FIRST_COLOR_LIST = ['red', 'orange', 'green', 'blue'];
const SECOND_COLOR_LIST = ['indigo', 'purple'];

function App() {
  return (
    <div>
      <Swipe style={{ width: '380px', height: '60px', backgroundColor: 'red' }} colorList={FIRST_COLOR_LIST} />
    </div>
  );
}

export default App;
