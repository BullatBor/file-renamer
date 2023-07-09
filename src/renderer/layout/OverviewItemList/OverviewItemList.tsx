import { useLocation } from 'react-router-dom'
import styles from './OverviewItemList.module.css'
import FileItems from '../../pages/FilePage/FileItems/FileItems'
import NamingItems from '../../pages/NamingPage/NamingItems/NamingItems'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const OverviewItemList = () => {
    const location = useLocation()
    const handleDrop = (files: any) => {
        // @ts-ignore
        inputRef.current.click()
        // Handle dropped files here
        console.log(files)
    }

    return (
        <div className={styles.OverviewItemList}>
            {location.pathname === '/files' ? <FileItems onDrop={handleDrop} /> : <NamingItems />}
        </div>
    )
}

export default OverviewItemList
