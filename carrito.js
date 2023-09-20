

// Inicializar el carrito de compras
const carrito = [];

// Listado de productos
const productos = [
    { nombre: "Harina", precio: 1080, stock: 5 },
    { nombre: "Avena", precio: 980, stock: 20 },
    { nombre: "Pasta de Maní", precio: 1800, stock: 10 },
    { nombre: "Pasas de uva", precio: 290, stock: 15 },
    { nombre: "Granola", precio: 370, stock: 3 },
    ];

// Función para agregar un producto al carrito
function agregarAlCarrito(index) {
const producto = productos[index];
const productoEnCarrito = carrito.find(item => item.producto === producto);

    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad < producto.stock) {
        productoEnCarrito.cantidad++; 
        } else {
            alert("¡No hay suficiente stock disponible!");
        }
    } else {
        if (producto.stock > 0) {
        carrito.push({ producto, cantidad: 1 });
        } else {
            alert("¡El producto está agotado!");
        }
    }

    mostrarCarrito();
    
}

// Función para eliminar una unidad de un producto del carrito
function eliminarUnidadDelCarrito(producto) {
    const productoEnCarrito = carrito.find(item => item.producto === producto);

    if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad--;
    // Si solo queda una unidad del producto, lo elimino del carrito
    } else if (productoEnCarrito && productoEnCarrito.cantidad === 1) {
        const indiceProducto = carrito.indexOf(productoEnCarrito);
        carrito.splice(indiceProducto, 1);
    }

    mostrarCarrito();
    }

// Función para que muestre el carrito con subtotales y total
function mostrarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = "";

    carrito.forEach(item => {
        const subtotal = item.producto.precio * item.cantidad;
        const itemDiv = document.createElement("div");
        const nombreProducto = `${item.producto.nombre} x${item.cantidad}: $${subtotal.toFixed(2)}`;
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar Unidad";
        botonEliminar.addEventListener("click", () => {
        eliminarUnidadDelCarrito(item.producto);
        });
        itemDiv.appendChild(document.createTextNode(nombreProducto));
        itemDiv.appendChild(botonEliminar);
        carritoDiv.appendChild(itemDiv);
    });

    const total = carrito.reduce(
        (acumulador, item) => acumulador + item.producto.precio * item.cantidad, 0
    );

    const totalDiv = document.createElement("div");
    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    carritoDiv.appendChild(totalDiv);
}