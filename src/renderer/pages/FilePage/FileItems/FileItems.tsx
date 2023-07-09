import Item from '../../../components/Item/Item'
import { useState, useRef } from 'react'

const mockFiles = [
    { id: 1, name: 'Capybara.png', fileSize: '10MB' },
    { id: 2, name: 'Elephant.jpg', fileSize: '5MB' },
    { id: 3, name: 'Giraffe.gif', fileSize: '2MB' },
]

function handleFile(files: any) {
    alert('Number of files: ' + files.length)
}

const FileItems = ({ onButtonClick }: any) => {
    // drag state
    const [dragActive, setDragActive] = useState(false)
    // ref
    const inputRef = useRef(null)

    // handle drag events
    const handleDrag = function (e: any) {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    // triggers when file is dropped
    const handleDrop = function (e: any) {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files)
        }
    }

    // triggers when file is selected with click
    const handleChange = function (e: any) {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files)
        }
    }

    return (
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input
                ref={inputRef}
                type="file"
                id="input-file-upload"
                multiple={true}
                onChange={handleChange}
            />
            <label
                id="label-file-upload"
                htmlFor="input-file-upload"
                className={dragActive ? 'drag-active' : ''}
            >
                <div>
                    <p>Drag and drop your file here or</p>
                    <button className="upload-button" onClick={onButtonClick}>
                        Upload a file
                    </button>
                </div>
            </label>
            {dragActive && (
                <div
                    id="drag-file-element"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    style={{ height: '100px', width: '100px', backgroundColor: 'purple' }}
                ></div>
            )}
        </form>
    )
}

/* {' '}
 * {mockFiles.map((file) => (
 *     <Item type="file" key={file.id} name={file.name} description={file.fileSize} />
 * ))} */

export default FileItems
