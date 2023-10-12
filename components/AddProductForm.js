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
        style={{marginBottom:"10px"}}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ürün adı"
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Fiyat"
      />
      <button type="submit" style={{marginTop:"5px",borderRadius:"8px"}}>Ekle</button>
      <p className='text-muted'>*Mobil Cihazlarda ürün ekledikten sonra sürükle bırak ile kullanıcı görseli üzerine bırakabilirsiniz.</p>
    </form>
  );
}
