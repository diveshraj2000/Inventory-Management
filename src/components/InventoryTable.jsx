import React, { useContext } from 'react';
import { MdDelete, MdEdit, MdVisibilityOff, MdVisibility } from 'react-icons/md';
import { InventoryContext } from './../InventoryContext';
import EditProductModal from './EditProductModal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';

const InventoryTable = ({ role }) => {
  const { inventory, setInventory, disabledItems, handleDisable } = useContext(InventoryContext);
  const [editProduct, setEditProduct] = React.useState(null);

  const handleEdit = (product) => setEditProduct(product);
  const handleDelete = (name) => setInventory(inventory.filter(item => item.name !== name));

  const commonCellStyles = { color: 'white' };
  const commonIconStyles = { color: 'white' };

  const renderIconButton = (Icon, onClick, disabled = false, isVisibilityToggle = false) => (
    <IconButton sx={commonIconStyles} onClick={onClick} disabled={disabled}>
      {isVisibilityToggle && disabled ? <MdVisibilityOff /> : <Icon />}
    </IconButton>
  );

  return (
    <>
      <TableContainer component={Paper} sx={{ backgroundColor: 'rgb(34, 34, 34)', boxShadow: 'none' }}>
        <Table aria-label="inventory table" sx={commonCellStyles}>
          <TableHead>
            <TableRow>
              {['Name', 'Price', 'Quantity', 'Value', 'Category', 'Actions'].map((heading) => (
                <TableCell key={heading} sx={commonCellStyles}>
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map(({ name, price, quantity, value, category }) => {
              const isDisabled = disabledItems.has(name);

              return (
                <TableRow
                  key={name}
                  sx={{
                    opacity: isDisabled ? 0.5 : 1,
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                  }}
                >
                  <TableCell sx={commonCellStyles}>{name}</TableCell>
                  <TableCell sx={commonCellStyles}>${price}</TableCell>
                  <TableCell sx={commonCellStyles}>{quantity}</TableCell>
                  <TableCell sx={commonCellStyles}>${value}</TableCell>
                  <TableCell sx={commonCellStyles}>{category}</TableCell>
                  <TableCell>
                    {renderIconButton(MdEdit, () => handleEdit({ name, price, quantity, value, category }), isDisabled || role === 'user')}
                    {renderIconButton(MdVisibility, () => handleDisable(name), role === 'user', true)}
                    {renderIconButton(MdDelete, () => handleDelete(name), role === 'user')}
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
