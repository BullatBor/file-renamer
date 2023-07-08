const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:open'),
  onUpdateCounter: (callback: any) => ipcRenderer.on('update-counter', callback),
  startDrag: (fileName: any) => { // TODO: Need for types
    ipcRenderer.send('ondragstart', fileName)
  }
})
