import React, { useState } from 'react';
import './App.css';
import TopWidgets from './components/TopWidgets';
import InventoryTable from './components/InventoryTable';
import { InventoryProvider } from './InventoryContext';
import { Switch, FormControlLabel, Typography } from '@mui/material'; 

const App = () => {
  const [role, setRole] = useState('admin'); 

  const toggleRole = (event) => {
    setRole(event.target.checked ? 'admin' : 'user');
  };

  return (
    <InventoryProvider>
      <div className="App">
        <div className="flex  justify-between my-5">
          <span className="text-3xl font-bold">Inventory Stats</span>

          <FormControlLabel
            control={
              <Switch
                checked={role === 'admin'}
                onChange={toggleRole}
                color="primary"
              />
            }
            label={
              <Typography variant="h6">
                {role === 'admin' ? 'Admin' : 'User'}
              </Typography>
            }
          />
        </div>

        <TopWidgets />
        <InventoryTable role={role} />
      </div>
    </InventoryProvider>
  );
};

export default App;
