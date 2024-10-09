import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#3C3D37',
  border: '2px solid #000',

  p: 4,
  borderRadius: '16px',
};

const EditProductModal = ({
  product,
  setEditProduct,
  inventory,
  setInventory,
}) => {
  console.log(product);
  console.log(inventory);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [value, setValue] = useState('');

  const [productName, SetproductName] = useState('');

 
  useEffect(() => {
    if (product) {
      setCategory(product.category);
      setPrice(product.price);
      setQuantity(product.quantity);
      setValue(product.value);
      SetproductName(product.name);
    }
  }, [product]);

  const handleClose = () => {
    setEditProduct(null); 
  };

  const handleSave = () => {
    const newPrice = price; 
    const newQuantity = quantity; 
    const newValue = newPrice * newQuantity; 

    const updatedInventory = inventory.map((item) =>
      item.name === product.name
        ? {
            ...item,
            category,
            price: newPrice, 
            quantity: newQuantity,
            value: newValue,
          }
        : item
    );

    setInventory(updatedInventory);
    handleClose();
  };

  return (
    <Modal
      className="rounded-md"
      open={Boolean(product)} 
      onClose={handleClose}
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <p className="text-3xl font-bold">Edit Product</p>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <p className="text-xl">{productName}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full bg-[#3C3D37]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full bg-[#3C3D37]"
            />
          </div>
        </div>

      
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full bg-[#3C3D37]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)} 
              className="border border-gray-300 rounded-md p-2 w-full bg-[#3C3D37]"
            />
          </div>
        </div>


        <div className="flex justify-end">
          <button className="mr-5" onClick={handleClose}>
            Cancel
          </button>
          <button className="bg-[#181C14] text-lg    text-white rounded-lg px-2" onClick={handleSave}>
            Save
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
