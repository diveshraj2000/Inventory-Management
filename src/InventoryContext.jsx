import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
export const InventoryContext = createContext();
export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabledItems, setDisabledItems] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
        const updatedItems = response.data.map(item => ({
          ...item,
          value: item.value.replace('$', ''),
          price: item.price.replace('$', ''),
        }));

        setInventory(updatedItems);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
if (loading){
    
    return <div className='flex flex-col items-center justify-center h-screen'><BeatLoader color='white' /></div>
}
  const handleDisable = (name) => {
    console.log(name)
    setDisabledItems((prev) => {
      const updated = new Set(prev);
      if (updated.has(name)) {
        updated.delete(name);
      } else {
        updated.add(name); 
      }
      return updated;
    });
  };

  return (
    <InventoryContext.Provider value={{ inventory, setInventory, loading, disabledItems, handleDisable }}>
      {children}
    </InventoryContext.Provider>
  );
};
