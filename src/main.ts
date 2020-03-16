import { app, BrowserWindow, Tray, Menu } from "electron";
import * as path from "path";

let mainWindow: Electron.BrowserWindow | undefined;
let tray: Tray | undefined;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 320,
    width: 350,
    skipTaskbar: true,
    hasShadow: false,
    transparent: true,
    resizable: app.isPackaged ? false : true,
    frame: false,
    focusable: true,
    alwaysOnTop: true
  });
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  tray = new Tray(path.join(__dirname, "../favicon.ico"));
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Exit",
        click: () => app.quit()
      }
    ])
  );

  tray.on("click", () => {
    mainWindow?.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});
