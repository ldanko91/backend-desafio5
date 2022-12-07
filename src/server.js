import express, { json, urlencoded } from "express";
import { Server as IOServer } from "socket.io";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import routes from "./routes/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const messages = [];
const productos = [];

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: join(__dirname, "/views/layouts/main.hbs"),
    layoutsDir: join(__dirname, "/views/layouts"),
    partialsDir: join(__dirname, "/views/partials"),
  })
);

app.set("view engine", "hbs");
app.set("views", join(__dirname, "/views/partials"));

app.use("/", routes);

const PORT = 8080;

// app.listen(PORT, () => {
//   console.log(`Servidor conectado a puerto: ${PORT}`);
// });

const expressServer = app.listen(PORT, () => {
  console.log(`Servidor SOCKET conectado a puerto: ${PORT}`);
});

const io = new IOServer(expressServer);

io.on("connection", (socket) => {
  console.log(`Se conectó un nuevo cliente con ID: ${socket.id}`);

  // Emitimos los mensajes al cliente que se conecta
  socket.emit("server:messages", messages);

  // Emitimos los productos al cliente que se conecta
  socket.emit("server:productos", productos);

  // Nos ponemos a escuchar los mensajes que manden los clientes
  socket.on("client:message", (messageData) => {
    // Actualizamos nuestro arreglo de mensajes con el mensaje nuevo que llego
    messages.push(messageData);

    // Le emitimos la lista (Array) de mensajes actualizada a TODOS los clientes
    io.emit("server:messages", messages);
  });

  // Nos ponemos a escuchar los productos que manden los clientes
  socket.on("client:productoNuevo", (newProdData) => {
    // Actualizamos nuestro arreglo de productos con el producto nuevo que llego
    productos.push(newProdData);

    // Le emitimos la lista (Array) de mensajes actualizada a TODOS los clientes
    io.emit("server:productos", productos);
  });
});
