import React, { useContext } from 'react';
import { MdDelete, MdEdit, MdVisibilityOff, MdVisibility } from 'react-icons/md';
import { InventoryContext } from './../InventoryContext';
import EditProductModal from './EditProductModal';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Typography
} from '@mui/material';

const InventoryTable = ({ role }) => {
  const { inventory, setInventory, disabledItems, handleDisable, loading } = useContext(InventoryContext);
  const [editProduct, setEditProduct] = React.useState(null);

  const handleEdit = (product) => {
    setEditProduct(product); 
  };

  const handleDelete = (name) => {
    const newInventory = inventory.filter(item => item.name !== name);
    setInventory(newInventory);
  };

  return (
<>
<TableContainer component={Paper}   sx={{
          backgroundColor: 'rgb(34, 34, 34)',
          boxShadow: 'none',
        }}
>
        <Table aria-label="inventory table" sx={{ color: 'white' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}><Typography variant="subtitle1">Name</Typography></TableCell>
              <TableCell sx={{ color: 'white' }}><Typography variant="subtitle1">Price</Typography></TableCell>
              <TableCell sx={{ color: 'white' }}><Typography variant="subtitle1">Quantity</Typography></TableCell>
              <TableCell sx={{ color: 'white' }}><Typography variant="subtitle1">Value</Typography></TableCell>
              <TableCell sx={{ color: 'white' }}><Typography variant="subtitle1">Category</Typography></TableCell>
              <TableCell sx={{ color: 'white' }}><Typography variant="subtitle1">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => {
              const isDisabled = disabledItems.has(item.name);

              return (
                <TableRow
                  key={item.name}
                  sx={{
                    opacity: isDisabled ? 0.5 : 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    },
                  }}
                >
                  <TableCell sx={{ color: 'white' }}>{item.name}</TableCell>
                  <TableCell sx={{ color: 'white' }}>${item.price}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{item.quantity}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{item.value}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{item.category}</TableCell>
                  <TableCell>
                    <IconButton
                     sx={{ color: 'white' }}
                      onClick={() => handleEdit(item)}
                      disabled={isDisabled || role === 'user'}
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                    sx={{ color: 'white' }}
                      onClick={() => handleDisable(item.name)}
                      disabled={role === 'user'}
                    >
                      {isDisabled ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                    <IconButton
                     sx={{ color: 'white' }}
                      onClick={() => handleDelete(item.name)}
                      disabled={role === 'user'} 
                    >
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
          <EditProductModal 
          product={editProduct} 
          setEditProduct={setEditProduct} 
          inventory={inventory} 
          setInventory={setInventory} 
        />
</>
  );
};

export default InventoryTable;
