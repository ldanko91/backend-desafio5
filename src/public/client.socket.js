const socket = io();

const messageForm = document.getElementById("messageForm");
const usernameInput = document.getElementById("usernameInput");
const messageInput = document.getElementById("messageInput");
const messagesPool = document.getElementById("messagesPool");
let today = new Date();
let timeMsg = today.toLocaleString();

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Agarramos el valor del mensaje y del username
  const message = messageInput.value;
  const username = usernameInput.value;

  // Emitimos el evento DESDE EL CLIENTE "client:message" mandandole al servidor la informacion del mensaje
  socket.emit("client:message", { username, message });
});

// Nos ponemos a escuchar el evento "server:message"
socket.on("server:messages", (messages) => {
  // Vaciamos el messagesPool para que los mensajes no se dupliquen
  messagesPool.innerHTML = "";

  // Iteramos sobre el arreglo de mensajes que nos llega y por aca uno le insertamos in li al messagesPool
  messages.forEach((message) => {
    messagesPool.innerHTML += `<li><p style="color:blue;font-weigth:bolder">${message.username}:</p>
    <p style="color:brown">${timeMsg}</p>
    <p style="color:green">${message.message}</p></li>`;
  });
});

const newProdForm = document.getElementById("newProdForm");
const newProdNameInput = document.getElementById("newProdNameInput");
const newProdPriceInput = document.getElementById("newProdPriceInput");
const productosPool = document.getElementById("productosPool");

newProdForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Agarramos el valor del nombre y del precio
  const nombreNuevoProd = newProdNameInput.value;
  const precioNuevoProd = newProdPriceInput.value;

  // Emitimos el evento DESDE EL CLIENTE "client:nuevoProducto" mandandole al servidor la informacion del nuevo producto
  socket.emit("client:productoNuevo", { nombreNuevoProd, precioNuevoProd });
});

// Nos ponemos a escuchar el evento "server:producto"
socket.on("server:productos", (productos) => {
  // Vaciamos el messagesPool para que los mensajes no se dupliquen
  productosPool.innerHTML = "";

  // Iteramos sobre el arreglo de mensajes que nos llega y por aca uno le insertamos in li al messagesPool
  productos.forEach((producto) => {
    productosPool.innerHTML += `<tr><td>${producto.nombreNuevoProd}</td><td>$ ${producto.precioNuevoProd}</td></tr>`;
  });
});
