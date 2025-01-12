//import React from 'react';
import './App.css';
import IncomeStatementTable from './components/IcomeStatement/incomestatement';

function App() {
  return (
    <div className="App" >
        <h1 className='font-mono text-[18px] sm:text-[32px]'>
          Financial data sharing app
        </h1>
        <IncomeStatementTable/>
      
    </div>
  );
}

export default App;
