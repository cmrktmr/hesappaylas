import { useDrag } from 'react-dnd'

export default function Product({ name, price }) {
    const [{ isDragging }, ref] = useDrag({
        type: 'PRODUCT',
        item: { name, price }
    });

    const dragStyles = {
        transition: 'all 0.3s ease',
        boxShadow: isDragging ? '0px 4px 10px rgba(0,0,0,0.5)' : 'none',
        borderColor: isDragging ? '#007BFF' : '#ccc',
        backgroundColor: isDragging ? '#f8f9fa' : 'white',
        borderRadius: '5px',
        border: '2px solid',
        color: isDragging ? '#007BFF' : '#000',
    };

    return (
        <div ref={ref} style={dragStyles}>
            {name} - {price} TL
        </div>
    );
}
