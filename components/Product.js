import { useDrag } from 'react-dnd'

export default function Product({ name, price }) {
    const [, ref] = useDrag({
        type: 'PRODUCT',
        item: { name, price }
    });

    return (
        <div ref={ref}>
            {name} - {price} TL
        </div>
    );
}
