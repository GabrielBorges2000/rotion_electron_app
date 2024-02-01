import { BrowserWindow, Menu, Tray } from 'electron'

import { join } from 'node:path'
const icon = join(__dirname, '../../resources/rotionTemplate.png')

export function createTray(window: BrowserWindow) {
  // const icon = nativeImage.createFromPath(
  //   resolve(__dirname, 'rotionTemplate.png'),
  // )
  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Criar novo documento',
      click: () => {
        window.webContents.send('new-document')
      },
    },
    // { type: 'separator' },
    // { label: 'Documentos recentes', enabled: false },
    // {
    //   label: 'Discover',
    //   accelerator: 'CommandOrControl+1', // accelerator é tecla de atalho que vai ativar uma função na minha aplicação
    //   acceleratorWorksWhenHidden: false, // acceleratorWorksWhenHidden serve para dizer se o accelerator vai ser global ou só quando aberto o menu
    // },
    // {
    //   label: 'Rocketseat',
    //   accelerator: 'CommandOrControl+2',
    //   acceleratorWorksWhenHidden: false,
    // },
    // {
    //   label: 'Ignite',
    //   accelerator: 'CommandOrControl+3',
    //   acceleratorWorksWhenHidden: false,
    // },
    { type: 'separator' },
    { label: 'Sair do Rotion', role: 'quit' },
  ])

  tray.setContextMenu(menu)
}
