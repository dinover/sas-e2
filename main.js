// main.js

const { app, BrowserWindow } = require("electron");
const path = require("path");
const server = require("./src/server");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL(`file://${__dirname}/dist/index.html`);
}

app.whenReady().then(() => {
  // Obtén el directorio userData de la aplicación
  const userDataPath = app.getPath("userData");

  // Crea el directorio si no existe
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }

  // Define la ruta de la base de datos SQLite en el directorio userData
  const dbPath = path.join(userDataPath, "helper.db");

  // Verifica si la base de datos ya existe
  if (fs.existsSync(dbPath)) {
    // Realiza aquí cualquier lógica adicional necesaria
    console.log("La base de datos ya existe en:", dbPath);
  } else {
    console.log("No se encontró la base de datos en:", dbPath);
  }

  // Pasa la ruta de la base de datos a tu servidor
  server.start(dbPath);

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
