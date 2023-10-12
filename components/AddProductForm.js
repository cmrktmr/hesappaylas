import { useState } from 'react';

export default function AddProductForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, price: parseFloat(price) });
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ürün adı"
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Fiyat"
      />
      <button type="submit">Ekle</button>
    </form>
  );
}
