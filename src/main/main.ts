import { app, BrowserWindow, globalShortcut, ipcMain, Menu } from 'electron'
import path from 'path'
import { handleFileOpen } from './filesystem/FileSystem'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 670,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      devTools: true,
    },
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          label: 'Increment',
          click: () => win.webContents.send('update-counter', 1),
        },
        {
          label: 'Decrement',
          click: () => win.webContents.send('update-counter', -1),
        },
        {
          label: 'DevTools',
          click: () => win.webContents.openDevTools(),
        },
      ],
    },
  ])

  Menu.setApplicationMenu(menu)

  win.on('ready-to-show', () => win.webContents.openDevTools())
  win.loadFile(path.resolve(__dirname, 'index.html'))

  // Enable drag and drop functionality
  win.webContents.on('will-navigate', (event, url) => {
    event.preventDefault()
    win.loadURL(url)
  })

  // Handle dropped files
  win.webContents.on('did-finish-load', () => {
    // win.webContents.setDraggable(true)
    win.webContents.executeJavaScript(`
      document.addEventListener('drop', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const files = Array.from(event.dataTransfer.files).map((file) => file.path);

        window.postMessage({ type: 'FILES_DROPPED', files }, '*');
      });

      document.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
    `)
  })
}

app.whenReady().then(() => {
  createWindow()

  ipcMain.on('counter-value', (_event, value) => {
    console.log(value)
  })

  ipcMain.handle('dialog:open', handleFileOpen)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  globalShortcut.register('CmdOrCtrl+Q', () => {
    app.quit()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
