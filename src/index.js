const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const fs = require('fs')
const url = require('url')

const os = require('os')
const platform = os.platform()
const isWindows = /^win/.test(platform)
const isMac = /^darwin/.test(platform)

// --------------------------------------------------

// const packagejson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'))
// const channel = /^yuubari/i.test(packagejson.description) ? 'yuubari' : 'stable'

const isDist = fs.existsSync(path.resolve(__dirname, 'index.html'))
const pathApp = isDist
    ? path.resolve(__dirname)
    : path.join(__dirname, '../dist-app/')
const pathAssets = path.join(pathApp, 'assets')

// --------------------------------------------------

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const getAppIcon = () => {
    if (isWindows)
        return path.join(pathAssets, `appicon.ico`)
    if (isMac)
        return path.join(pathAssets, `appicon.icns`)
    return path.join(pathAssets, `appicon.png`)
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 480,
        minHeight: 480,
        center: true,

        icon: getAppIcon(),

        backgroundColor: '#263238'
    })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(pathApp, '/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // disable menubar for Windows / Linux
    if (isDist)
        mainWindow.setMenu(null)

    // Open the DevTools.
    if (!isDist) {
        mainWindow.webContents.openDevTools()
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    global.__path_pics = isDist ? 'pics/' : '../pics/'
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
