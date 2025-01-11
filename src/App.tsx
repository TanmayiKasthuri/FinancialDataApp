//import React from 'react';
import './App.css';
import IncomeStatementTable from './components/IcomeStatement/incomestatement';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header> */}
        <h1>
          Financial data sharing app
        </h1>
        <IncomeStatementTable/>
      
    </div>
  );
}

export default App;
