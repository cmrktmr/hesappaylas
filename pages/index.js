import { useState } from 'react';
import AddProductForm from '../components/AddProductForm';
import Avatar from '../components/Avatar';
import Product from '../components/Product';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [avatarCount, setAvatarCount] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [avatarProducts, setAvatarProducts] = useState([]);
  
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const { register, handleSubmit } = useForm();
  
  const onCountSubmit = (data) => {
    setAvatarCount(data.count);
    setAvatarProducts(Array(Number(data.count)).fill([]));
    setShowForm(true);
  };

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleProductDrop = (avatarIndex, product) => {
    setAvatarProducts(prev => {
      const newAvatars = [...prev];
      newAvatars[avatarIndex] = [...newAvatars[avatarIndex], product];
      return newAvatars;
    });
  };

  return (
    <div className="container mt-5">
      <h1>Hesabı Paylaşmaya Başla</h1>
      {!showForm ? (
        <form onSubmit={handleSubmit(onCountSubmit)}>
          <input type="number" placeholder="Kişi sayısı" {...register("count")} />
          <Button type="submit">Başla</Button>
        </form>
      ) : (
        <>
          <AddProductForm onAdd={handleAddProduct} />
          <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
        <div className="my-4">
          {products.map((product, index) => (
            <Product key={index} name={product.name} price={product.price} />
          ))}
        </div>

        <div className="row">
          {Array.from({ length: avatarCount }).map((_, avatarIndex) => (
            <div className="col-6" key={`avatar-column-${avatarIndex}`}>
              <Avatar key={`avatar${avatarIndex}`} name={`avatar${avatarIndex}`} onDrop={(product) => handleProductDrop(avatarIndex, product)} />

              <div>
                <h4>Avatar {avatarIndex + 1} Ürünleri</h4>
                <ul>
                  {avatarProducts[avatarIndex].map((product, productIndex) => (
                    <li key={productIndex}>{product.name} - {product.price} TL</li>                
                  ))}
                </ul>
              </div>
            </div>
          ))}
          </div>
          </DndProvider>
        </>
      )}
    </div>
  );
}
