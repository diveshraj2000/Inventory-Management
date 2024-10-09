import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineShoppingCartCheckout, MdCategory } from 'react-icons/md';
import { IoIosCloseCircleOutline } from "react-icons/io";

import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { InventoryContext } from './../InventoryContext';
import Widget from './Widget';
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
        return acc + price * item.quantity;
      }, 0)
    );

    setOutOfStock(activeInventory.filter(item => item.quantity === 0).length);
    setCategories(new Set(activeInventory.map(item => item.category)).size);
  }, [inventory, disabledItems]);

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <Widget icon={MdOutlineShoppingCartCheckout} title="Total Products" value={totalProducts} />
      <Widget icon={RiMoneyDollarCircleLine} title="Total Store Value" value={totalValue} />
      <Widget icon={MdCategory} title="Categories" value={categories} />
      <Widget icon={IoIosCloseCircleOutline} title="Out of Stock" value={outOfStock} />
    </div>
  );
};

export default TopWidgets;
