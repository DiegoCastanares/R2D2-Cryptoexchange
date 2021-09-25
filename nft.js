//Declaramos la url del archivo JSON local
const URLJSON = "./nft.json";

//Escuchamos el evento click del botón agregado
$(document).ready(function () {
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      let productos = respuesta;
      for (const producto of productos) {
        $("#productos").append(` 
        <div class="g-col-3 mx-1"  style="width: 18rem">
          <img id="imagenNft${producto.id}" src="${
          producto.thumbnailUrl
        }" class="img-nft card-img-top" alt="...">
            <h5 class="card-title col-12">${producto.title}</h5>
            <p class="precio col-12" value="${parseInt(
              producto.precio
            )}">  Precio: $ ${producto.precio}</p> 
            <button id="btn${
              producto.id
            }" class="btn btn-dark my-2 col-12">Comprar</button></div>
        </div>`);

        var saldoParaCompra = parseFloat(sessionStorage.actualR2D2);

        if (sessionStorage.actualR2D2 > 0) {
          $("#saldoInicial").html(
            `<h2 id="nuevoSaldo">Tu saldo es ${sessionStorage.actualR2D2} R2D2 Coin</h2>  `
          );
        } else {
          $("#saldoInicial").html("<h2>No tenes saldo para comprar NFT</h2>");
        }

        $(`#btn${producto.id}`).click(function (e) {
          if (saldoParaCompra >= producto.precio) {
            agregarAlCarrito();
            $(e.target).parent().slideUp("slow");
          } else {
            alert("Tu saldo es insuficiente");
          }
        });

        $(`#imagenNft${producto.id}`).click(function (e) {
          $("#productoModal").modal("show");
          $("#productoModalText").html(`${producto.title}
      <img src="${producto.thumbnailUrl}" width="100%" heigth="100%" ></img>
      <p class="precio col-12" 
      )}">  Precio: $ ${producto.precio} R2D2</p>
    `);
          $("#closeProductoModal").click(function () {
            $("#productoModal").modal("hide");
          });
        });

        var carrito = [];

        const agregarAlCarrito = (e) => {
          carrito.push(producto.precio);

          function sumar_array(carrito) {
            var suma = 0;

            carrito.forEach(function (numero) {
              suma += numero;
            });

            return suma;
          }

          var suma = sumar_array(carrito);

          saldoParaCompra = saldoParaCompra - producto.precio;
          sessionStorage.actualR2D2 = saldoParaCompra;

          $("#productoCompradoModal").modal("show");
          $("#productoCompradoModalText")
            .append(`<p>Compraste ${producto.title}</p>
          <img src="${producto.thumbnailUrl}" width="20%" heigth="20%" ></img> 
          <p class="fs-6 text">Por un valor de  ${producto.precio}</p>`);
          $("#sumaCompra").html(`El total de tu compra es ${suma} R2D2`);

          $("#closeProductoCompradoModal").click(function () {
            $("#saldoInicial").remove();
            $("#muestraSaldo").html(
              `<h2 id="nuevoSaldo">Tu saldo es ${sessionStorage.actualR2D2} R2D2 Coin</h2>  `
            );
            $("#productoModal").modal("hide");
          });
        };
      }
    }
  });
});
