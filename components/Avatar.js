import NextImage from 'next/image';
import { useDrop } from 'react-dnd';

export default  function Avatar({ onDrop,name }) {
    const [, ref] = useDrop({
        accept: 'PRODUCT',
        drop: (item) => onDrop(item)
    });
    const avatarUrl = "/avatar.png";


    return <div ref={ref}>
        <NextImage src={avatarUrl} width={100} height={100} alt={name} />
    </div>;
}
