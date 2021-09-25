$(document).ready(function (e) {
  $.get(URLGET, function (respuesta, estado) {
    if (estado === "success") {
      let misDatos = respuesta;
      for (const dato of misDatos) {
        $("#table").append(`
  <tbody>
    <tr>
      <th scope="row">${dato.name}</th>
      <td>${dato.symbol}</td>
      <td> $ ${dato.current_price}</td>
      <td><img src="${dato.image} heigth="15%" width="15%" /></td>
    </tr>
  </tbody>
</table>`);
      }

      const bitcoin = misDatos[0];
      sessionStorage.bitcoin;
      sessionStorage.bitcoinPrice = bitcoin.current_price;

      const ethereum = misDatos[1];
      sessionStorage.ethereum;
      sessionStorage.etherPrice = ethereum.current_price;

      const cardano = misDatos[2];
      sessionStorage.cardano;
      sessionStorage.adaPrice = cardano.current_price;

      const binance = misDatos[3];
      sessionStorage.binance;
      sessionStorage.bnbPrice = binance.current_price;
    }
  });
});
const URLGET =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Ccardano%2Cbinancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false";

var priceR2D2 = 0.25;

let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
  e.preventDefault();
  habilitarSwap();
}

const habilitarSwap = () => {
  var bitcoinPrice = parseFloat(sessionStorage.bitcoinPrice).toFixed(2);
  var etherPrice = parseFloat(sessionStorage.etherPrice).toFixed(2);
  var adaPrice = parseFloat(sessionStorage.adaPrice).toFixed(2);
  var bnbPrice = parseFloat(sessionStorage.bnbPrice).toFixed(2);

  var actualName = document.getElementById("name").value;
  var actualAmount = document.getElementById("amount").value;

  if (actualName == "BTC") {
    var actualPrice = bitcoinPrice;
  } else if (actualName == "ETH") {
    actualPrice = etherPrice;
  } else if (actualName == "ADA") {
    actualPrice = adaPrice;
  } else {
    actualPrice = bnbPrice;
  }

  var actualBudget = actualAmount * actualPrice;
  var actualR2D2 = actualBudget / priceR2D2;
  sessionStorage.actualR2D2 = actualR2D2;

  if (actualAmount > 0) {
    $("#mensaje").html(
      `<h3 id="texto" class="p-style"> Podes cambiar hasta <b>${actualBudget.toFixed(
        2
      )}</b> Dolares en ${actualName} por <b>${actualR2D2.toFixed(
        2
      )}</b> R2D2 Coin</h3>
      <div class="row justify-content-evenly ">
         <button id="btnAceptar" class="btn btn-primary btn-style col-4">Aceptar</button>
         <button id="btnRechazar" class="btn btn-secondary btn-style col-4">Rechazar</button>
    </div>`
    );
  } else {
    alert("Por favor ingresa una cantidad valida de monedas");
  }

  const btnAceptar = document.querySelector("#btnAceptar");
  btnAceptar.addEventListener("click", () => {
    $("#miModal").modal("show");
    $("#modalText").append(
      `Cambio realizado. Tu saldo actual es de ${actualR2D2.toFixed(
        2
      )}  R2D2 Coin`
    );
    $("#closeModal").click(function () {
      $("#miModal").modal("hide");
      segundoPaso();
      $("#mensaje").remove();
      $("#subformulario").remove();
      $("#formulario").html(
        `<h2 id="saldo">Tu saldo es ${actualR2D2.toFixed(2)} R2D2 Coin</h2>  `
      );
    });

    actualName = "";
    actualAmount = "";
    actualPrice = "";
  });

  const btnRechazar = document.querySelector("#btnRechazar");
  btnRechazar.addEventListener("click", () => {
    $("#mensaje").remove();
    actualName = "";
    actualAmount = "";
    actualPrice = "";
    $("#formulario").html(
      `<h3 id="despedida">Gracias por tu visita! pasa por nuestro <a href="./nft.html">Market de NFT</a></h3>`
    );
  });
};

const btnVerSaldo = document.getElementById("#verSaldo");
verSaldo.addEventListener("click", () => {
  if (sessionStorage.actualR2D2 > 0) {
    $("#formulario").html(
      `<h2 id="saldo">Tu saldo es ${sessionStorage.actualR2D2} R2D2 Coin</h2>  `
    );
    $("#mensaje").remove();
    segundoPaso();
  } else {
    $("#saldoModal").modal("show");
    $("#saldoModalText").append(
      `<img class="col-4"src="https://img.icons8.com/color/96/000000/r2-d2.png" width="10%" heigth="10%" ></img>
      <p class="col-8"> No tenes R2D2 Coin disponibles, compralos y accede a invertirlos o compra tu NFT favorito </p>`
    );
    $("#closeSaldoModal").click(function () {
      $("#saldoModal").modal("hide");
      $("#saldoModalText").empty();
    });
  }
});

const segundoPaso = () => {
  $("#segundoPaso").html(
    `<div class="p-style">
    <h3>Que te gustaria hacer con tus R2D2? </h3>
    </div>
      <div class="row justify-content-evenly">
      <button id="btnInvertir" class="btn btn-primary btn-style col-4 ">Invertirlos</button>
      <a href="./nft.html" class="btn btn-secondary btn-style col-4" role="button">Comprar NFT</a>
  </div>
`
  );
  $("#btnInvertir").click(function () {
    interes();
    $("#segundoPaso").remove();
  });
};

/***
 * interes compuesto
 */
function interes() {
  function interesCompuesto(capitalInicial, interesAnual, compound, tiempo) {
    return (
      capitalInicial * (1 + interesAnual / compound) ** (compound * tiempo)
    );
  }

  function gananciaNeta(interesCompuesto, capitalInicial) {
    return interesCompuesto - capitalInicial;
  }

  function mostrar() {
    $("#swap").append(`
    <p class="col-12 text-center  fs-4 container mt-3">Por favor indica la cantidad y hasta que fecha te gustaria invertir tus R2D2Coin</p>
    <div class="row col-12 container justify-content-center">
    <form action="#" method="get">
	<input class="col-12" type="range" id="montoInvertir" name="montoInvertir" min="0.1" max="${sessionStorage.actualR2D2}" step="0.1"/>
</form>
<span class="col-2 text-center fs-4 text-light bg-primary mt-0  rounded" id="salida"></span><br/>
    <input class="col-4"  id="time" type="date" placeholder="tiempo de inversion" />
    <button id="btnCalcularTiempo" class="btn btn-primary btn-style col-5 mt-0 mx-3">Calcular</button>
    </div>
    `);

    var montoInvertir = document.getElementById("montoInvertir");
    var salida = document.getElementById("salida");

    salida.textContent = montoInvertir.value;

    montoInvertir.oninput = function () {
      salida.textContent = montoInvertir.value;
    };
    sessionStorage.montoInvertir = montoInvertir.value;

    let hoy = new Date();

    $(`#btnCalcularTiempo`).on("click", function () {
      tiempo = document.getElementById("time").value;
      sessionStorage.tiempo = tiempo;

      var fechaInicio = hoy.getTime();
      var fechaFin = new Date(sessionStorage.tiempo).getTime();
      var diff = fechaFin - fechaInicio;
      var fechaFinal = diff / (1000 * 60 * 60 * 24);

      sessionStorage.fechaFinal = fechaFinal;

      capitalInicial = montoInvertir.value;
      interesAnual = 90 / 100;
      compound = fechaFinal;
      tiempo = fechaFinal * 0.00273973;

      if (fechaFinal <= 0 || isNaN(fechaFinal)) {
        alert("Ingresa una fecha valida");
      } else {
        $("#inversionModal").modal("show");
        $("#inversionModalText").append(
          `
          <div class="row  container justify-content-evenly">
          <p>Tu inversion de ${capitalInicial} R2D2 Coin con un APR de ${
            interesAnual * 100
          } % te dara un monto total de ${interesCompuesto(
            capitalInicial,
            interesAnual,
            compound,
            tiempo
          ).toFixed(2)} y tus depositos quedaran bloqueados hasta el ${
            sessionStorage.tiempo
          }</p>
      <button id="btnConfirmar" class="btn btn-primary btn-style col-4">Aceptar</button>
     <button id="btnDeclinar" class="btn btn-secondary btn-style col-4">Rechazar</button>
     <a href="./nft.html" class="btn btn-dark btn-style col-4" role="button">NFT Market</a>
     </div>
        `
        );
      }

      $(`#btnConfirmar`).on("click", function () {
        $("#inversionModal").modal("hide");
        $("#swap").remove();
        $("#saldo").remove();
        $("#formulario").html(
          `<h4> Gracias por tu confianza, el total de tus fondos se liberaran el ${
            sessionStorage.tiempo
          } por un total de ${interesCompuesto(
            capitalInicial,
            interesAnual,
            compound,
            tiempo
          ).toFixed(2)}</h4>`
        );

        sessionStorage.actualR2D2 =
          parseFloat(sessionStorage.actualR2D2) -
          parseFloat(sessionStorage.montoInvertir);
      });

      $(`#btnDeclinar`).on("click", function () {
        $("#inversionModal").modal("hide");
        $("#inversionModalText").empty();
        $("#saldo").remove();
        $("#formulario").html(
          `<h3 id="despedida">Gracias por tu visita! pasa por nuestro <a href="./nft.html">Market de NFT</a></h3>`
        );
      });

      $("#closeInversionModal").click(function () {
        $("#inversionModal").modal("hide");
        $("#inversionModalText").empty();
      });
    });
  }

  capitalInicial = (sessionStorage.price * sessionStorage.amount) / priceR2D2;
  interesAnual = 90 / 100;
  compound = sessionStorage.fechaFinal;
  tiempo = sessionStorage.diasDeInversion;

  mostrar(
    gananciaNeta(
      interesCompuesto(capitalInicial, interesAnual, compound, tiempo),
      capitalInicial
    ).toFixed(2)
  );
}
