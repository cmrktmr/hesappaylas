import { useState } from 'react';
import AddProductForm from '../components/AddProductForm';
import Avatar from '../components/Avatar';
import Product from '../components/Product';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'
import { useMemo } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [avatarProducts, setAvatarProducts] = useState({ avatar1: [], avatar2: [] });
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const backendForDND = isTouchDevice ? TouchBackend : HTML5Backend;
console.log(isTouchDevice,"isTouchDevice")
  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleProductDrop = (avatarName, product) => {
    setAvatarProducts(prev => ({
      ...prev,
      [avatarName]: [...prev[avatarName], product]
    }));
  };

  return (
    <div>
      <h1>Hesabı Paylaşmaya Başla</h1>

      <AddProductForm onAdd={handleAddProduct} />
    <DndProvider backend={backendForDND}>

        <div className="products">
          {products.map((product, index) => (
            <Product key={index} name={product.name} price={product.price} />
          ))}
        </div>

        <div className="avatars">
          <Avatar name="avatar1" onDrop={(product) => handleProductDrop('avatar1', product)} />
          <Avatar name="avatar2" onDrop={(product) => handleProductDrop('avatar2', product)} />
        </div>

        <div className="avatar-products">
          <div>
            <h3>Avatar 1 Ürünleri</h3>
            <ul>
              {avatarProducts.avatar1.map((product, index) => (
                <li key={index}>{product.name} - {product.price} TL</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avatar 2 Ürünleri</h3>
            <ul>
              {avatarProducts.avatar2.map((product, index) => (
                <li key={index}>{product.name} - {product.price} TL</li>
              ))}
            </ul>
          </div>
        </div>
      </DndProvider>

    </div>
  );
}
