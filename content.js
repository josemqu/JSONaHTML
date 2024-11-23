// function that returns if the color is dark or light
function isDark() {
  //return true based in color theme preferred
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function objectToTable(obj) {
  var cols = Object.keys(obj);
  var vals = Object.values(obj);
  var rows = "";

  rows += `<tr> ${cols.map((elm) => `<th>${elm}</th>`).join("")}</tr>`;
  // rows += `<tr> ${vals.map(elm => `<td>${(elm instanceof Array) ? '<table class="inner">' + objectArrayToTable(elm) + '</table>' : elm}</td>`).join('')}</tr>`;
  rows += `<tr> ${vals
    .map(
      (elm) =>
        `<td>${
          elm instanceof Array
            ? '<table class="inner">' + objectArrayToTable(elm) + "</table>"
            : elm instanceof Object
            ? '<table class="inner">' + objectToTable(elm) + "</table>"
            : elm
        }</td>`
    )
    .join("")}</tr>`;

  return rows;
}

function objectArrayToTable(arr) {
  var cols = [];
  var rows = "<tr>";
  for (var i = 0; i < arr.length; i++) {
    for (var k in arr[i]) {
      if (cols.indexOf(k) === -1) {
        cols.push(k);
      }
    }
  }
  for (j = 0; j < cols.length; j++) {
    rows += `<th> ${cols[j]}</th>`;
  }
  rows += `</tr>`;

  for (i = 0; i < arr.length; i++) {
    rows += `<tr>`;
    for (j = 0; j < cols.length; j++) {
      rows += `<td>${
        arr[i][cols[j]] instanceof Object
          ? '<table class="inner">' +
            objectToTable(arr[i][cols[j]]) +
            "</table>"
          : arr[i][cols[j]]
      }</td>`;
    }
    rows += `</tr>`;
  }
  return rows;
}

function JsonToHTML(el) {
  var table = document.createElement("table");
  if (el instanceof Array) {
    for (var i = 0; i < el.length; i++) {
      if (el[i] instanceof Object) {
        table.innerHTML = objectArrayToTable(el);
      } else {
        // table.innerHTML = objectToTable(el[i]);
      }
    }
  } else if (el instanceof Object) {
    table.innerHTML = objectToTable(el);
  }
  // console.log(table);
  return table;
}

let table;
let div;
let data = load();
let json;
if (data) json = JSON.parse(data);

var boton1 = document.createElement("a");
document.body.prepend(boton1);
boton1.innerText = "CSV";
boton1.id = "btnCSV";
boton1.href = "#";
boton1.onclick = descargarCSV();
boton1.setAttribute("class", "disable");

var boton2 = document.createElement("a");
document.body.prepend(boton2);
boton2.innerText = "XLSX";
boton2.id = "btnXLSX";
boton2.href = "#";
boton2.addEventListener("click", descargarXLSX, true);
boton2.setAttribute("class", "disable");

var boton3 = document.createElement("a");
document.body.prepend(boton3);
boton3.innerText = "Tabla";
boton3.id = "btnHTML";
boton3.href = "#";
boton3.addEventListener("click", mostrarTabla, true);

var boton4 = document.createElement("a");
document.body.prepend(boton4);
boton4.innerText = "JSON";
boton4.id = "btnJSON";
boton4.href = "#";
boton4.addEventListener("click", mostrarJson, true);

var boton5 = document.createElement("a");
document.body.prepend(boton5);
boton5.innerText = "RAW";
boton5.id = "btnRAW";
boton5.href = "#";
boton5.addEventListener("click", mostrarRaw, true);
boton5.setAttribute("class", "selected");

function load() {
  console.log("load");
  // detect if the color is dark or light
  var dark = isDark();
  console.log(dark ? "dark" : "light");
  var child;
  if (
    document.body &&
    ((document.body.childNodes[0] &&
      document.body.childNodes[0].tagName == "PRE") ||
      document.body.children.length == 0)
  ) {
    var child = document.body.children.length
      ? document.body.childNodes[0]
      : document.body;
    var data = child.innerText;
    var json = JSON.parse(data);

    // pre.id = 'preJSON';
    // pre.innerHTML = data;
    table = JsonToHTML(json);
    table.id = "tablaHTML";

    content =
      '<link rel="stylesheet" type="text/css" href="' +
      chrome.runtime.getURL("style.css") +
      '">';
    document.body.innerHTML = content;
    // let pre = document.createElement('pre');
    // document.body.appendChild(pre).innerHTML = data;
    div = document.createElement("div");
    div.id = "contenedor";
    document.body.appendChild(div).innerText = data;
  }
  document.body.classList.add(dark ? "dark-mode" : "light-mode");
  return data;
}

function mostrarTabla() {
  var pre = document.querySelector("pre");
  var cont = document.querySelector("#contenedor");
  if (pre) {
    pre.remove();
  }
  if (cont) {
    cont.remove();
  }
  table.remove();
  document.body.appendChild(table);
  document.getElementById("btnXLSX").classList.remove("disable");
  document.getElementById("btnCSV").classList.remove("disable");
  document.getElementById("btnHTML").setAttribute("class", "selected");
  document.getElementById("btnRAW").classList.remove("selected");
  document.getElementById("btnJSON").classList.remove("selected");
}

function mostrarJson() {
  tabla = document.querySelector("#tablaHTML");
  var pre = document.querySelector("pre");
  var cont = document.querySelector("#contenedor");
  if (tabla) {
    tabla.remove();
  }
  if (cont) {
    cont.remove();
  }
  if (pre) {
    pre.innerHTML = JSON.stringify(json, null, 2);
  } else {
    var pre = document.createElement("pre");
    pre.innerText = JSON.stringify(json, null, 2);
    document.body.appendChild(pre);
  }
  document.getElementById("btnXLSX").setAttribute("class", "disable");
  document.getElementById("btnCSV").setAttribute("class", "disable");
  document.getElementById("btnJSON").setAttribute("class", "selected");
  document.getElementById("btnRAW").classList.remove("selected");
  document.getElementById("btnHTML").classList.remove("selected");
}

function mostrarRaw() {
  tabla = document.querySelector("#tablaHTML");
  var pre = document.querySelector("pre");
  var cont = document.querySelector("#contenedor");
  if (tabla) {
    tabla.remove();
  }
  if (pre) {
    pre.remove();
  }
  if (cont) {
    cont.innerHTML = data;
  } else {
    var cont = document.createElement("div");
    cont.id = "contenedor";
    cont.innerText = data;
    document.body.appendChild(cont).innerHTML = data;
  }
  document.getElementById("btnXLSX").setAttribute("class", "disable");
  document.getElementById("btnCSV").setAttribute("class", "disable");
  document.getElementById("btnRAW").setAttribute("class", "selected");
  document.getElementById("btnJSON").classList.remove("selected");
  document.getElementById("btnHTML").classList.remove("selected");
}

//-------EXPORTAR TABLA A CSV--------------------------------------------------------------------------
function exportTableToCSV() {
  var csv = [];
  var rows = document.querySelectorAll("#tablaHTML > tbody > tr");
  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++) {
      row.push(cols[j].innerText);
    }
    row = row.join(";");
    csv.push(row);
  }
  csv = csv.join("\n");
  return csv;
}

//-------BAJAR TABLA A CSV--------------------------------------------------------------------------
function descargarCSV() {
  var csvLink = document.querySelector("#btnCSV"),
    csvBlob = new Blob([exportTableToCSV()], { type: "text/csv" }),
    csvName = "tabla.csv",
    csvUrl = window.URL.createObjectURL(csvBlob);
  csvLink.setAttribute("href", csvUrl);
  csvLink.setAttribute("download", csvName);
}

//-------EXPORTAR TABLA A XLSX--------------------------------------------------------------------------
function descargarXLSX(type, fn, dl) {
  type = "xlsx";
  var elt = document.getElementById("tablaHTML");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "tabla." + (type || "xlsx"));
}

load();
