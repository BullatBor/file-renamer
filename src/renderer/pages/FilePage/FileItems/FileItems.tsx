import Item from '../../../components/Item/Item'
import { useDrop } from 'react-dnd'

const mockFiles = [
    { id: 1, name: 'Capybara.png', fileSize: '10MB' },
    { id: 2, name: 'Elephant.jpg', fileSize: '5MB' },
    { id: 3, name: 'Giraffe.gif', fileSize: '2MB' },
]

const FileItems = ({ onDrop }: any) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'file',
        drop: (item: any) => onDrop(item.files),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    return (
        <div
            ref={drop}
            style={{
                border: `2px dashed ${isOver ? 'green' : 'gray'}`,
                padding: '10px',
                margin: '10px',
                minHeight: '100px',
            }}
        >
            Drop files here
        </div>
    )
}

/* {' '}
 * {mockFiles.map((file) => (
 *     <Item type="file" key={file.id} name={file.name} description={file.fileSize} />
 * ))} */

export default FileItems
