import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineShoppingCartCheckout, MdCategory } from 'react-icons/md';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { InventoryContext } from './../InventoryContext';
const TopWidgets = () => {
  const { inventory, disabledItems } = useContext(InventoryContext); 
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [categories, setCategories] = useState(0);

  useEffect(() => {
    const activeInventory = inventory.filter(item => !disabledItems.has(item.name));

    setTotalProducts(activeInventory.length);

    setTotalValue(
      activeInventory.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('$', '')) || 0;
        const quantity = item.quantity;
        return acc + price * quantity;
      }, 0)
    );

    setOutOfStock(activeInventory.filter(item => item.quantity === 0).length);

    setCategories([...new Set(activeInventory.map(item => item.category))].length);
  }, [inventory, disabledItems]);



  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="flex flex-row bg-[#243325] p-4 rounded-lg shadow text-white ">
        <div className="ml-4">
          <MdOutlineShoppingCartCheckout size={35} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Total Products</h2>
          <p className="text-3xl  ">{totalProducts}</p>
        </div>
      </div>

      <div className="flex flex-row bg-[#243325] p-4 rounded-lg shadow text-white ">
        <div className="ml-4">
          <RiMoneyDollarCircleLine size={35} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Total Store Value</h2>
          <p className="text-3xl">{totalValue}</p>
        </div>
      </div>

      <div className="flex flex-row bg-[#243325] p-4 rounded-lg shadow text-white ">
        <div className="ml-4"></div>
        <div>
          <h2 className="text-xl font-bold">Out of Stock</h2>
          <p className="text-3xl">{outOfStock}</p>
        </div>
      </div>

      <div className="flex flex-row bg-[#243325] p-4 rounded-lg shadow text-white ">
        <div className="ml-4">
          <MdCategory size={35} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Categories</h2>
          <p className="text-3xl">{categories}</p>
        </div>
      </div>
    </div>
  );
};

export default TopWidgets;
