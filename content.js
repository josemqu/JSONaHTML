function armarTabla(obj) {
  var cols = [];
  var table = document.createElement("table");

  if (obj instanceof Array) {
    console.log(obj);
    var cols = [];
    // var table = document.createElement("table");

    for (var i = 0; i < obj.length; i++) {
      for (var k in obj[i]) {
        if (cols.indexOf(k) === -1) {

          // Push all keys to the array 
          cols.push(k);
        }
      }
    }

    // Create a table element 
    // var table = document.createElement("table");

    // Create table row tr element of a table
    table.id = "datos";
    var tr = table.insertRow(-1);

    for (var i = 0; i < cols.length; i++) {

      // Create the table header th element
      var theader = document.createElement("th");
      theader.innerHTML = cols[i];

      // Append columnName to the table row
      tr.appendChild(theader);
    }

    // Adding the data to the table
    for (var i = 0; i < obj.length; i++) {

      // Create a new row 
      trow = table.insertRow(-1);
      for (var j = 0; j < cols.length; j++) {
        var cell = trow.insertCell(-1);

        // Inserting the cell at particular place
        cell.innerHTML = obj[i][cols[j]];
      }
    }

    // Add the newely created table containing json data
    // var el = document.getElementById("res");


    // el.innerHTML = "";
    // el.appendChild(table);

  } else if (obj instanceof Object) {
    // console.log(obj);
    var prop = Object.keys(obj);

    for (var k = 0; k < prop.length; k++) {
      // if (cols.indexOf(k) === -1) {

      // Push all keys to the array
      cols.push(prop[k]);
      // }
    }
    // Create a table element 
    // var table = document.createElement("table");

    // Create table row tr element of a table
    var tr = table.insertRow(-1);

    for (var i = 0; i < cols.length; i++) {

      // Create the table header th element
      var theader = document.createElement("th");
      theader.innerHTML = cols[i];

      // Append columnName to the table row
      tr.appendChild(theader);
    }

    var tr = table.insertRow(-1);

    for (var i = 0; i < cols.length; i++) {

      // Create the table header th element
      var td = document.createElement("td");
      td.appendChild(armarTabla(obj[cols[i]]));

      // Append columnName to the table row
      tr.appendChild(td);
    }

  } else if (obj) {
    // Adding the data to the table
    // Create a new row 
    // console.log(obj);
    trow = table.insertRow(-1);
    var cell = trow.insertCell(-1);
    // Inserting the cell at particular place
    cell.innerHTML = obj;
  }

  return table
}

function load() {
  var child, data;
  if (document.body && (document.body.childNodes[0] && document.body.childNodes[0].tagName == "PRE" || document.body.children.length == 0)) {
    var child = document.body.children.length ? document.body.childNodes[0] : document.body;
    var data = child.innerText;
    var json = JSON.parse(data);
    var table = armarTabla(json);

    content = '<link rel="stylesheet" type="text/css" href="' + chrome.runtime.getURL("style.css") + '">';
    document.body.innerHTML = content;

    document.body.appendChild(table);

    var boton1 = document.createElement("a");
    document.body.prepend(boton1);
    boton1.innerText = "CSV";
    boton1.id = "btnCSV";
    boton1.href = "#";
    boton1.onclick = descargarCSV();

    var boton2 = document.createElement("a");
    document.body.prepend(boton2);
    boton2.innerText = "XLSX";
    boton2.id = "btnXLSX";
    boton2.href = "#";
    boton2.onclick = descargarXLSX();

    // var iframe = document.createElement("iframe");
    // document.body.prepend(iframe);
    // iframe.id = "txtArea1";
    // iframe.style = "display:none";

  }
}

//-------EXPORTAR TABLA A CSV--------------------------------------------------------------------------
function exportTableToCSV() {
  var csv = [];
  var rows = document.querySelectorAll("#datos > tbody > tr");
  for (var i = 0; i < rows.length; i++) {
    var row = [], cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++) {
      row.push(cols[j].innerText);
    };
    row = row.join(";");
    csv.push(row);
  };
  csv = csv.join('\n');
  // console.log(csv);
  return csv
}

function descargarCSV() {
  //-------BAJAR TABLA A CSV--------------------------------------------------------------------------
  var csvLink = document.querySelector('#btnCSV'),
    csvBlob = new Blob([exportTableToCSV()], { type: "text/csv" }),
    csvName = 'tabla.csv',
    csvUrl = window.URL.createObjectURL(csvBlob);
  csvLink.setAttribute('href', csvUrl);
  csvLink.setAttribute('download', csvName);
};

//-------EXPORTAR TABLA A XLSX--------------------------------------------------------------------------

function exportTableToXLSX(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

function descargarXLSX() {
  var wbout = XLSX.utils.table_to_book(document.getElementById('datos'), { sheet: "Sheet JS" });
  // var xlsxBlob = (new Blob([exportTableToXLSX(wbout)], { type: "application/octet-stream" }), 'test.xlsx');


  // var xlsxLink = document.querySelector('#btnXLSX');
  var xlsxBlob = new Blob([exportTableToXLSX(wbout)], { type: "application/octet-stream" });
  //   xlsxName = 'tabla.xlsx',
  //   xlsxUrl = window.URL.createObjectURL(xlsxBlob);
  // xlsxLink.setAttribute('href', xlsxUrl);
  // xlsxLink.setAttribute('download', xlsxName);



  saveAs(xlsxBlob, 'tabla.xlsx');
}

// $("#btnXLSX").click(function () {
//   var wbout = XLSX.utils.table_to_book(document.getElementById('datos'), { sheet: "Sheet JS" });
//  saveAs(new Blob([exportTableToXLSX(wbout)], { type: "application/octet-stream" }), 'test.xlsx');
// });

//-------EXPORTAR TABLA A XLS--------------------------------------------------------------------------
// function fnExcelReport() {
//   var tab_text = "<table id='datos'><tbody><tr>";
//   var textRange; var j = 0;
//   tab = document.getElementById('datos'); // id of table

//   for (j = 0; j < tab.rows.length; j++) {
//     tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
//     //tab_text=tab_text+"</tr>";
//   }

//   tab_text = tab_text + "</table>";
//   tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
//   tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
//   tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

//   var ua = window.navigator.userAgent;
//   var msie = ua.indexOf("MSIE ");

//   if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
//   {
//     txtArea1.document.open("txt/html", "replace");
//     txtArea1.document.write(tab_text);
//     txtArea1.document.close();
//     txtArea1.focus();
//     sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
//   }
//   else                 //other browser not tested on IE 11
//     sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

//   return (sa);
// }

load();