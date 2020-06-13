function GFG_FUN(obj) {
  var cols = [];
  var table = document.createElement("table");

  if (obj instanceof Array) {

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
    var el = document.getElementById("res");


    // el.innerHTML = "";
    // el.appendChild(table);

  } else if (obj instanceof Object) {
    console.log(obj);
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
      td.appendChild(GFG_FUN(obj[cols[i]]));

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
    // console.log(json);
    var table = GFG_FUN(json);
    content = '<link rel="stylesheet" type="text/css" href="' + chrome.runtime.getURL("style.css") + '">';
    document.body.innerHTML = content;
    document.body.appendChild(table);
  }
}

load();