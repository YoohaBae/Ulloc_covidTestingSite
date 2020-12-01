const fs = require("fs");
const express = require("express");
const app = express();
const url = require("url");
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const bodyParser = require("body-parser");
const sync_mysql = require("sync-mysql");
const connection = new sync_mysql({
  host: "localhost",
  port: 3306,
  user: "ulloc_user",
  password: "Iamroot22",
  database: "ulloc_covidtestingdb",
});
const con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "ulloc_user",
  password: "Iamroot22",
  database: "ulloc_covidtestingdb",
});

app.get("/", (req, res) => {
  writeMainPage(req, res);
});

app.get("/labtech/", (req, res) => {
  writeLoginPage(req, res);
});

app.get("/employee", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/employeeLoginPage.html"));
});

app.get("/employee/results", (req, res) => {
  writeEmployeeResults(req, res);
});

app.get("/labtech/testCollection", (req, res) => {
  writeTestCollection(req, res);
});

app.get("/labtech/labHome", (req, res) => {
  writeLabHome(req, res);
});

app.get("/labtech/poolMapping", (req, res) => {
  writePoolMapping(req, res);
});

app.get("/labtech/wellTesting", (req, res) => {
  writeWellTesting(req, res);
});

app.get("/labtech/testCollection/add", (req, res) => {
  writeBarcode(req, res);
});

app.get("/labtech/testCollection/delete", (req, res) => {
  eraseBarcode(req, res);
});

app.get("/labtech/poolMapping/add", (req, res) => {
  writeTestBarcodes(req, res);
});

app.get("/labtech/poolMapping/edit", (req, res) => {
  editTestBarcodes(req, res);
});

app.get("/labtech/poolMapping/delete", (req, res) => {
  deleteTestBarcodes(req, res);
});

app.get("/labtech/poolMapping/editmode", (req, res) => {
  editmode_TestBarcodes(req, res);
});

app.get("/labtech/wellTesting/add", (req, res) => {
  writeWellBarcodes(req, res);
});

app.get("/labtech/wellTesting/edit", (req, res) => {
  editWellBarcodes(req, res);
});

app.get("/labtech/wellTesting/editmode", (req, res) => {
  editmode_WellBarcodes(req, res);
});

app.get("/labtech/wellTesting/delete", (req, res) => {
  deleteWellBarcodes(req, res);
});

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function writeMainPage(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  let html = `<!DOCTYPE html>
    <html><!DOCTYPE html>
    <head>
        <style>
    
        </style>
    </head>
    
    <body>
        <button onclick="location.href='/labtech'">Lab Tech Login Page</button>
        <button onclick="location.href='/employee'">Employee Login Page</button>
    </body>
    </html>`;
  res.write(html);
  res.end();
}

function writeLoginPage(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  let html = `<!DOCTYPE html>
    <html>
    
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            h2 {
                text-align: center;
            }
    
            body {
                font-family: Arial, Helvetica, sans-serif;
            }
    
            /* Full-width input fields */
            input[type=text],
            input[type=password] {
                width: 20%;
                padding: 12px 20px;
                margin: 8px 0;
                border: 4px solid #000000;
                box-sizing: border-box;
                align-items: center;
            }
    
            /* Set a style for all buttons */
            button {
                background-color: white;
                color: black;
                padding: 14px 20px;
                margin: 8px 0;
                border: 4px solid #000000;
                cursor: pointer;
                font-style: bold;
            }
        </style>
    </head>
    
    <body>
        <h2>Login Page</h2>
        <div class="container" align="center">
            <label for="uname" style="font-size: 20px;"><b>&emsp;Email: &emsp;&emsp;</b></label>
            <input type="text" id="email" name="uname" required><br>
    
            <label for="psw" style="font-size: 20px;"><b>Password: &emsp;</b></label>
            <input type="password" id="password" name="psw" required><br>
    
            <button type="button" onclick= "onLoginCollectorClick()"><b>Login Collector</b></button>
            <button type="button" onclick="onLabLoginClick()"><b>Lab Login</b></button>
        </div>
        <script>
            function onLoginCollectorClick() {
                location.href = '/labtech/testCollection?email=' + document.querySelector("#email").value + '&password=' + document.querySelector("#password").value;
            }
            function onLabLoginClick() {
                location.href = '/labtech/labHome?email=' + document.querySelector("#email").value + '&password=' + document.querySelector("#password").value;
            }
        </script>

    </body>
    
    </html>
    `;
  res.write(html);
  res.end();
}

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/auth", function (req, res) {
  var user = req.body.email;
  console.log(user);
  var pw = req.body.password;
  console.log(pw);
  if (user && pw) {
    let table = connection.query(
      "SELECT * FROM employee WHERE email = ? AND passcode = ?",
      [user, pw]
    );
    if (table.length > 0) {
      res.redirect("/employee/results");
    } else {
      res.write(`
                <script>
                alert("wrong email or password");
                location.href="/employee";
                </script>
              `);
    }
    res.end();
  }
  res.end();
});

function writeEmployeeResults(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let html = `<!DOCTYPE html>
  <html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
          h2 {
              text-align: center;
          }
  
          body {
              font-family: Arial, Helvetica, sans-serif;
          }
      </style>
  </head>
  
  <body>
      <h3 style="text-align: center;">Employee Home</h3>
      <div class="container" align="center">
          <table>
              <tr>
                  <td>Collection Date</td>
                  <td>Result</td>
              </tr>`;
  let query = url.parse(req.url, true).query;
  let email = query.email ? query.email : "";
  let employeedb = con.query(
    "SELECT employeeID, email FROM employee WHERE email = ?",
    [email]
  );
  let employeeID = employeedb[0].employeeID;
  console.log(employeeID);
  let employeetestdb = con.query(
    "SELECT testBarcode, employeeID, collectionTime FROM employeetest WHERE employeeID = ?",
    [employeeID]
  );
  for (i = 0; i < employeetestdb.length; i++) {
    let testBarcode = employeetestdb[i].testBarcode;
    console.log(testBarcode);
    let collectionTime = employeetestdb[i].collectionTime;
    console.log(collectionTime);
    let poolmapdb = con.query(
      "SELECT testBarcode, poolBarcode FROM poolmap WHERE testBarcode = ?",
      [testBarcode]
    );
    let poolBarcode = poolmapdb[0].poolBarcode;
    console.log(poolBarcode);
    let welltestingdb = con.query(
      "SELECT poolBarcode, result FROM welltesting WHERE poolBarcode = ?",
      [poolBarcode]
    );
    let result = welltestingdb[0].result;
    console.log(result);
    html +=
      `
    <tr>
      <td>` +
      collectionTime +
      `</td>
      <td>` +
      result +
      `</td>
    </tr>`;
  }
  res.write(html + `\n\n</table></body>\n</html>`);
  res.end();
}

function writeTestCollection(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  let email = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  con.connect(function (err) {
    con.query(
      `SELECT * FROM labemployee WHERE labID LIKE '${email}' and password LIKE '${password}'`,
      function (err, result, fields) {
        // console.log(result);
        if (err || result.length == 0) {
          console.log("ERROR", err);
          res.write(`
                <script>
                alert("wrong email or password");
                location.href="/labtech";
                </script>
              `);
          res.end();
        } else {
          console.log(result);

          let head = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <script>
                    function deleteBarcode() {
                        const urlParams = new URLSearchParams(window.location.search);
                        const email = urlParams.get('email');
                        const password = urlParams.get('password');
                        for (let i = 0; i < document.getElementsByClassName("barcode-container").length; i++) {
                            let employeeCheck = document.querySelector("#employee_check-" + i).checked;
                            let employeeID = document.querySelector("#employee_ID-" + i).innerHTML;
                            let testBarcode = document.querySelector("#test_barcode-" + i).innerHTML;
                            console.log('employee_check', employeeCheck);
                            if (employeeCheck) {
                                var xmlHttp = new XMLHttpRequest();
                                let targetUrl = "/labtech/testCollection/delete?email=" + email + "&password=" + password + "&employee=" + employeeID + "&testBarcode=" + testBarcode;
                                xmlHttp.open( "GET", targetUrl, true ); // false for synchronous request;
                                xmlHttp.send( null );
                            }

                        }
                        //location.href = targetUrl;
                        location.href = "/labtech/testCollection?email=" + email + "&password=" + password;
                    };

                    function addBarcode() {
                        let employeeID = document.querySelector("#employee_ID").value;
                        let testBarcode = document.querySelector("#test_barcode").value;
                        var xmlHttp = new XMLHttpRequest();
                        const urlParams = new URLSearchParams(window.location.search);
                        const email = urlParams.get('email');
                        const password = urlParams.get('password');
                        let targetUrl = "/labtech/testCollection/add?email=" + email + "&password=" + password + "&employee=" + employeeID + "&testBarcode=" + testBarcode;
                        xmlHttp.open( "GET", targetUrl, false ); // false for synchronous request;
                        location.href = targetUrl;
                    };
                </script>
        </head>
        <body>
        <h3>Test Collection</h3>
                Employee ID: <input type="text" id = "employee_ID" name="employee_ID" size="20">
                <br>
                Test barcode: <input type="text" id = "test_barcode" name="test_barcode" size="20">
                <br>
                <button onclick="addBarcode()">Add</button>
                <table>
                    <tr>
                        <th>Employee ID</th>
                        <th>Test Barcode</th>
                    </tr>`;
          res.write(head);
          let sql2 = `SELECT * FROM employeetest`;
          con.query(sql2, function (err, result) {
            if (err) throw err;
            let body = "";
            for (let i = 0; i < result.length; i++) {
              let item = result[i];
              body += `<tr class="barcode-container">
                    <td>
                        <input type="checkbox" id="employee_check-${i}">
                        <span id="employee_ID-${i}">${item.employeeID}</span>
                    </td>
                    <td id="test_barcode-${i}">${item.testBarcode}</td>
                </tr>`;
            }
            res.write(body);

            let tail = `</table>
                <button onclick="deleteBarcode()">Delete</button>
                </body>
                </html>
                `;
            res.write(tail);
            res.end();
          });
        }
      }
    );
  });
}

function writeLabHome(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  let email = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  con.connect(function (err) {
    con.query(
      `SELECT * FROM labemployee WHERE labID LIKE '${email}' and password LIKE '${password}'`,
      function (err, result, fields) {
        // console.log(result);
        if (err || result.length == 0) {
          console.log("ERROR", err);
          res.write(`
                <script>
                alert("wrong email or password");
                location.href="/labtech";
                </script>
              `);
          res.end();
        } else {
          console.log(result);

          let html = `
          <html>
    <style>
    
    </style>
    
    <body>
        <h1>
            Lab Home
        </h1>
        <button onclick="onPoolMappingClick()"><b>Pool Mapping</b></button>
        <button onclick="onWellTestingClick()"><b>Well Testing</b></button>
    </body>
    
    </html>
    <script>
            function onPoolMappingClick() {
                const urlParams = new URLSearchParams(window.location.search);
                const email = urlParams.get('email');
                const password = urlParams.get('password');
                location.href = "/labtech/poolMapping?email=" + email + "&password=" + password;
            }
            function onWellTestingClick() {
                const urlParams = new URLSearchParams(window.location.search);
                const email = urlParams.get('email');
                const password = urlParams.get('password');
                location.href = "/labtech/wellTesting?email=" + email + "&password=" + password;
            }
    </script>
    `;
          res.write(html);
          res.end();
        }
      }
    );
  });
}

function writeEmployeeResults(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let html = `<!DOCTYPE html>
  <html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
          h2 {
              text-align: center;
          }
  
          body {
              font-family: Arial, Helvetica, sans-serif;
          }
      </style>
  </head>
  
  <body>
      <h3 style="text-align: center;">Employee Home</h3>
      <div class="container" align="center">
          <table>
              <tr>
                  <td>Collection Date</td>
                  <td>Result</td>
              </tr>`;
  let query = url.parse(req.url, true).query;
  let email = query.email ? query.email : "";
  let employeedb = connection.query(
    "SELECT employeeID, email FROM employee WHERE email = ?",
    [email]
  );
  let employeeID = employeedb[0].employeeID;
  console.log(employeeID);
  let employeetestdb = connection.query(
    "SELECT testBarcode, employeeID, collectionTime FROM employeetest WHERE employeeID = ?",
    [employeeID]
  );
  for (i = 0; i < employeetestdb.length; i++) {
    let testBarcode = employeetestdb[i].testBarcode;
    console.log(testBarcode);
    let collectionTime = employeetestdb[i].collectionTime;
    console.log(collectionTime);
    let poolmapdb = connection.query(
      "SELECT testBarcode, poolBarcode FROM poolmap WHERE testBarcode = ?",
      [testBarcode]
    );
    let poolBarcode = poolmapdb[0].poolBarcode;
    console.log(poolBarcode);
    let welltestingdb = connection.query(
      "SELECT poolBarcode, result FROM welltesting WHERE poolBarcode = ?",
      [poolBarcode]
    );
    let result = welltestingdb[0].result;
    console.log(result);
    html +=
      `
    <tr>
      <td>` +
      collectionTime +
      `</td>
      <td>` +
      result +
      `</td>
    </tr>`;
  }
  res.write(html + `\n\n</table></body>\n</html>`);
  res.end();
}

function writePoolMapping(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  con.connect(function (err) {
    let head = `<html>
    <body>
        <h1>
            Pool Mapping
        </h1>
        <b>Pool Barcode: </b>
        <input type="text" name="search" value="" id="poolBarcode">
        <br>
        <b>Test Barcodes: </b>
        <table id='pool'>
            <tr>
                <td>
                    <input type="text" name="code" value="">
                </td>
                <td>
                    <button type='button' onclick='delete(this);' class='btn btn-default'>Delete</button>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="text" name="code" value="">
                </td>
                <td>
                    <button type='button' onclick='delete(this);' class='btn btn-default'>Delete</button>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="text" name="code" value="">
                </td>
                <td>
                    <button type='button' onclick='delete(this);' class='btn btn-default'>Delete</button>
                </td>
            </tr>
        </table>
        <button onclick="onAddMoreRowsClick()">Add more rows</button><br><br>
        <button onclick="onSubmitPoolClick()">Submit Pool</button>
        <br>
        <br>
        <table id='existingPools'>
            <tr>
                <td>
                </td>
                <td>
                    Test Barcodes
                </td>
            </tr>`;
    res.write(head);
    let sql = `SELECT * FROM pool`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      let body = "";
      for (let i = 0; i < result.length; i++) {
        let item = result[i];
        body += `
          <tr class="pool-container">
              <td>
                  <input type="checkbox" id="pool_check-${i}">
                  <span id="pool_barcode-${i}">${item.poolBarcode}</span>
              </td>
              <td>
              </td>
          </tr>
              `;
      }
      res.write(body);
      let tail = `
                </table>
                <button onclick="onEditPoolClick()">Edit Pool</button>
                <button onclick="onDeletePoolClick()">Delete Pool</button>
            </body>
            <script>
                var index, table = document.getElementById('pool');
                for (var i = 0; i < table.rows.length; i++) {
                    table.rows[i].cells[1].onclick = function () {
                        index = this.parentElement.rowIndex;
                        table.deleteRow(index);
                        console.log(index);
                    };
                };
                function onAddMoreRowsClick() {
                    document.getElementById("pool").insertRow(-1).innerHTML = '<tr><td><input type="text" name="code" value=""></td><td><button type="button" onclick = "delete(this);" class="btn btn-default">Delete</button></td></tr>';
                };
                function onSubmitPoolClick() {
                    var poolBarcode = document.querySelector("#poolBarcode").value;
                    console.log(poolBarcode);
                    var poolBarcodeTable = document.getElementById("pool");
                    var rowLength = poolBarcodeTable.rows.length;
                    var testBarcodes = "";
                    for (i = 0; i < rowLength; i++) {
                        var poolBarcodeTableCells = poolBarcodeTable.rows.item(i).cells;
                        var testBarcodeCell = poolBarcodeTableCells[0].getElementsByTagName('input')[0].value;
                        console.log(testBarcodeCell);
                        testBarcodes += testBarcodeCell + "_";
                    }
                    var xmlHttp = new XMLHttpRequest();
                    const urlParams = new URLSearchParams(window.location.search);
                    const email = urlParams.get('email');
                    const password = urlParams.get('password');
                    let targetUrl = "/labtech/poolMapping/add?email=" + email + "&password=" + password + "&poolBarcode=" + poolBarcode + "&testBarcodes=" + testBarcodes;
                    xmlHttp.open( "GET", targetUrl, false ); // false for synchronous request;
                    location.href = targetUrl;
                };
                function onEditPoolClick() {
                    const urlParams = new URLSearchParams(window.location.search);
                    const email = urlParams.get('email');
                    const password = urlParams.get('password');
                    let poolCheck;
                    let poolBarcode;
                    let testBarcodes = "";
                    let result;
                    for (let i = 0; i < document.getElementsByClassName("pool-container").length; i++) {
                      poolCheck = document.querySelector("#pool_check-"+i.toString()).checked;
                      console.log(poolCheck);
                      if(poolCheck) {
                        poolBarcode = document.querySelector("#pool_barcode-" + i.toString()).innerHTML;
                        testBarcodes = document.querySelector("#test_barcodes-" + i.toString()).innerHTML;
                      }
                    }
                    let targetUrl = "/labtech/wellTesting/editmode?email=" + email + "&password=" + password + "&poolBarcode=" + wellBarcode + "&testBarcodes=" + testBarcodes;
                    location.href = targetUrl;
                };
                function onDeletePoolClick() {
                    const urlParams = new URLSearchParams(window.location.search);
                    const email = urlParams.get('email');
                    const password = urlParams.get('password');
                    for (let i = 0; i < document.getElementsByClassName("pool-container").length; i++) {
                        let poolCheck = document.querySelector("#pool_check-" + i).checked;
                        let poolBarcode = document.querySelector("#pool_barcode-" + i).innerHTML;
                        console.log(poolCheck);
                        if(poolCheck) {
                            var xmlHttp = new XMLHttpRequest();
                            let targetUrl = "/labtech/poolMapping/delete?email=" + email + "&password=" + password + "&poolBarcode=" + poolBarcode;
                            xmlHttp.open( "GET", targetUrl, true);
                            xmlHttp.send(null);
                        }
                    }
                    location.href = "/labtech/poolMapping?email=" + email + "&password=" + password;
                };
            </script>
            </html>`;
      res.write(tail);
      res.end();
    });
  });
}

function writeWellTesting(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  con.connect(function (err) {
    let head = `<!DOCTYPE html>
    <html>
    <head>
    <script>
    function onWellTestingAddClick() {
        let wellBarcode = document.querySelector("#wellTesting_inputWellBarcode").value;
        let poolBarcode = document.querySelector("#wellTesting_inputPoolBarcode").value;
        let result = document.querySelector("#wellTesting_inputResult").value;
        var xmlHttp = new XMLHttpRequest();
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        const password = urlParams.get('password');
        let targetUrl = "/labtech/wellTesting/add?email=" + email + "&password=" + password + "&wellBarcode=" + wellBarcode + "&poolBarcode=" + poolBarcode + "&result=" + result;
        xmlHttp.open( "GET", targetUrl, false);
        location.href = targetUrl;
    };
    function onWellTestingEditPoolClick() {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        const password = urlParams.get('password');
        let poolcheck;
        let poolBarcode;
        let wellBarcode;
        let result;
        for (let i = 0; i < document.getElementsByClassName("well-container").length; i++) {
          poolCheck = document.querySelector("#well_check-"+i.toString()).checked;
          console.log(poolCheck);
          if(poolCheck) {
            poolBarcode = document.querySelector("#wellTesting_poolBarcode-" + i.toString()).innerHTML;
            wellBarcode = document.querySelector("#wellTesting_wellBarcode-" + i.toString()).innerHTML;
            result = document.querySelector("#wellTesting_result-" + i.toString()).innerHTML;
          }
        }
        let targetUrl = "/labtech/wellTesting/editmode?email=" + email + "&password=" + password + "&wellBarcode=" + wellBarcode + "&poolBarcode=" + poolBarcode;
        location.href = targetUrl;
    };
    function onWellTestingDeletePoolClick() {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        const password = urlParams.get('password');
        for (let i = 0; i < document.getElementsByClassName("well-container").length; i++) {
          let poolCheck = document.querySelector("#well_check-" + i.toString()).checked;
          let poolBarcode = document.querySelector("#wellTesting_poolBarcode-" + i.toString()).innerHTML;
          let wellBarcode = document.querySelector("#wellTesting_wellBarcode-" + i.toString()).innerHTML;
          let result = document.querySelector("#wellTesting_result-" + i.toString()).innerHTML;
            console.log(poolCheck);
            if(poolCheck) {
                var xmlHttp = new XMLHttpRequest();
                let targetUrl = "/labtech/wellTesting/delete?email=" + email + "&password=" + password + "&wellBarcode=" + wellBarcode + "&poolBarcode=" + poolBarcode;
                xmlHttp.open( "GET", targetUrl, true);
                xmlHttp.send(null);
            }
        }
        location.href = "/labtech/wellTesting?email=" + email + "&password=" + password;
    };
</script>
</head>
    <body>
        <h1> Well Testing </h1>
        <b>Well Barcode: </b>
        <input type="text" value="" id="wellTesting_inputWellBarcode"><br><br>
        <b>Pool Barcode: </b>
        <input type="text" value="" id="wellTesting_inputPoolBarcode"><br><br>
        <b>Result: </b>

        <select name="filter" id="wellTesting_inputResult">
            <option>In progress</option>
            <option>Negative</option>
            <option>Positive</option>>
        </select>
        <br>
        <button onclick="onWellTestingAddClick()">Add</button>
        <br>
        <table id="wellTable">
            <tr>
                <td>Well Barcode</td>
                <td>Pool Barcode</td>
                <td>Result</td>
            </tr>`;
    res.write(head);
    let sql = `SELECT * FROM welltesting`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      let body = "";
      for (let i = 0; i < result.length; i++) {
        let item = result[i];
        body += `
                <tr class="well-container">
                    <td>
                        <input type="checkbox" id="well_check-${i}">
                        <span id="wellTesting_wellBarcode-${i}">${item.wellBarcode}</span>
                    </td>
                    <td>
                        <span id="wellTesting_poolBarcode-${i}">${item.poolBarcode}</span>
                    </td>
                    <td>
                        <span id="wellTesting_result-${i}">${item.result}</span>
                    </td>
                        `;
      }
      res.write(body);
      let tail = `
        </table>
        <button onclick="onWellTestingEditPoolClick()">Edit Pool</button>
        <button onclick="onWellTestingDeletePoolClick()">Delete Pool</button>
    </body>
    </html>`;
      res.write(tail);
      res.end();
    });
  });
}

function writeBarcode(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  let employee = query.employee ? query.employee : "";
  let testBarcode = query.testBarcode ? query.testBarcode : "";
  console.log(testBarcode);
  let labID = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  let currentTime = `SELECT GETDATE()`;
  console.log(currentTime);
  let sql = `INSERT INTO employeetest(testBarcode, employeeID, collectionTime, collectedBy) VALUES('${testBarcode}', '${employee}', '${currentTime}', '${labID}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.write(`
  <script>
  location.href="/labtech/testCollection?email="+ '${labID}' + "&password=" + '${password}';
  </script>`);
  res.end();
}

function eraseBarcode(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  console.log("inputted queries", req.query);
  let query = url.parse(req.url, true).query;
  let employee = query.employee ? query.employee : "";
  let testBarcode = query.testBarcode ? query.testBarcode : "";
  let labID = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  let sql = `DELETE FROM employeetest WHERE testBarcode='${testBarcode}' AND employeeID='${employee}' AND collectedBy='${labID}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted", result);
    console.log(sql);
    console.log("--------");
  });
  res.write(`
    <script>
    location.href="/labtech/testCollection?email="+ '${labID}' + "&password=" + '${password}';
    </script>`);
  res.end();
}

function writeTestBarcodes(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  let email = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  let poolBarcode = query.poolBarcode ? query.poolBarcode : "";
  let testBarcodes = query.testBarcodes ? query.testBarcodes : "";
  let testBarcodeArray = testBarcodes.split("_");
  console.log(testBarcodeArray);
  let sql = `INSERT INTO pool(poolBarcode) VALUES('${poolBarcode}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("pool added");
  });

  for (let i = 0; i < testBarcodeArray.length; i++) {
    if (testBarcodeArray[i] != "") {
      let sql = `INSERT INTO poolmap(testBarcode, poolBarcode) VALUES('${testBarcodeArray[i]}', '${poolBarcode}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("pool and testBarcode added", result);
        console.log(sql);
        console.log("_________________");
      });
    } else {
    }
  }
  res.write(`
        <script>
            location.href="/labtech/poolMapping?email=" + '${email}' + "&password=" + '${password}';
        </script>
        `);
  res.end();
}

function editTestBarcodes(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  let email = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  let poolBarcode = query.poolBarcode ? query.poolBarcode : "";
  let testBarcodes = query.testBarcodes ? query.testBarcodes : "";
  let testBarcodeArray = testBarcodes.split("_");
  let sql = `UPDATE welltesting SET  FROM poolmap(testBarcode, poolBarcode) WHERE poolBarcode='${poolBarcode}' AND testBarcode='${testBarcode}'`;
  let sql2 = `SELECT poolmap(testBarcode, poolBarcode) WHERE poolBarcode='${poolBarcode}' AND testBarcode='${testBarcode}'`;
  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log(result);
    console.log(sql);
    res.write(`
    <script>
      location.href = "/labtech/poolMapping?email="+ '${email}' + "&password=" + '${password}';
      function changeInnerValue() {
        document.getElementById("poolBarcode").value = ${poolBarcode};
        var rows = document.getElementsByClassName("btn btn-default");
        for(let i = 0; i < testBarcodeArray.length; i++) {
          rows[i].innerHTML = testBarcodeArray[i];
        }
      };
      changeInnerValue();
    </script>`);
  });
}

function editmode_TestBarcodes(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  console.log("arrived to editmode");
  let email = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  let poolBarcode = query.poolBarcode ? query.poolBarcode : "";
  let testBarcodes = query.testBarcodes ? query.testBarcodes : "";
  let testBarcodeArray = testBarcodes.split(",");
  let head = `
  <html>
  <script>
    function editDB(){
      let wellBarcode = document.querySelector("#wellTesting_inputWellBarcode").value;
      let poolBarcode = document.querySelector("#wellTesting_inputPoolBarcode").value;
      let result = document.querySelector("#wellTesting_inputResult").value;
      var xmlHttp = new XMLHttpRequest();
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get('email');
      const password = urlParams.get('password');
      let targetUrl = "/labtech/wellTesting/edit?email=" + email + "&password=" + password + "&wellBarcode=" + wellBarcode + "&poolBarcode=" + poolBarcode + "&result=" + result;
      xmlHttp.open( "GET", targetUrl, false);
      location.href = targetUrl;
    };
  </script>
  <body>
  <h1>
            Pool Mapping
        </h1>
        <b>Pool Barcode: </b>
        <input type="text" name="search" value="'${poolBarcode}'" id="poolBarcode">
        <br>
        <b>Test Barcodes: </b>
        <table id='pool'>
        `;
  let body = "";
  for (let i = 0; i < testBarcodeArray.length; i++) {
    body += `
      <tr>
        <td>
          <input type="text" name="code" value="'${testBarcodeArray[i]}'">
        </td>
        <td>
          <button type='button' onclick='delete(this);' class='btn btn-default'>Delete</button>
        </td>
      </tr>`;
  }

  let tail = `
        </table>
        <button onclick="onAddMoreRowsClick()">Add more rows</button><br><br>
        <button onclick="onSubmitPoolClick()">Submit Pool</button>
        <br>
        <br>
        <table id='existingPools'>
            <tr>
                <td>
                </td>
                <td>
                    Test Barcodes
                </td>
            </tr>
                </table>
                <button onclick="onEditPoolClick()">Edit Pool</button>
                <button onclick="onDeletePoolClick()">Delete Pool</button>
            </body></html>
            `;
  res.write(head + body + tail);
  res.end();
}

function deleteTestBarcodes(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  let email = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  let poolBarcode = query.poolBarcode ? query.poolBarcode : "";
  let testBarcodes = query.testBarcodes ? query.testBarcodes : "";
  let testBarcodeArray = testBarcodes.split("_");
  let sql = `DELETE FROM pool WHERE poolBarcode='${poolBarcode}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    console.log(sql);
  });
  res.write(`
    <script>
    location.href="/labtech/testCollection?email="+ '${email}' + "&password=" + '${password}';
    </script>
  `);
  res.end();
}

function editWellBarcodes(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  let email = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  let poolBarcode = query.poolBarcode ? query.poolBarcode : "";
  let wellBarcode = query.wellBarcode ? query.wellBarcode : "";
  let result = query.result ? query.result : "";
  let sql =
    `UPDATE welltesting SET result = "` +
    result +
    `" WHERE poolBarcode = ` +
    poolBarcode +
    `;`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("well updated");
  });
  let sql2 =
    `UPDATE welltesting SET  testingEndTime = NOW() WHERE poolBarcode = ` +
    poolBarcode +
    `;`;
  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("well updated");
  });
  res.write(
    `<script>location.href="/labtech/wellTesting?email=` +
      email +
      `&password=` +
      password +
      `";</script>`
  );
  res.end();
}

function deleteWellBarcodes(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  let email = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  let wellBarcode = query.wellBarcode ? query.wellBarcode : "";
  let poolBarcode = query.poolBarcode ? query.poolBarcode : "";
  let sql = `DELETE FROM wellTesting WHERE poolBarcode='${poolBarcode}' AND wellBarcode='${wellBarcode}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    console.log(sql);
  });
  res.write(
    `<script>location.href="/labtech/wellTesting?email=` +
      email +
      `&password=` +
      password +
      `";</script>`
  );
  res.end();
}

function writeWellBarcodes(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  let email = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  let wellBarcode = query.wellBarcode ? query.wellBarcode : "";
  let poolBarcode = query.poolBarcode ? query.poolBarcode : "";
  let result = query.result ? query.result : "";
  let sql = `INSERT INTO well(wellBarcode) VALUES('${wellBarcode}')`;
  con.query(sql, function (err, resut) {
    if (err) throw err;
    console.log("well barcode inserted into well");
  });
  //what is testingStartTime and testingEndTime
  //temporary
  let sql2 = `INSERT INTO wellTesting(poolBarcode, wellBarcode, testingStartTime, testingEndTime, result) VALUES('${poolBarcode}', '${wellBarcode}', NOW(), NOW(), '${result}')`;
  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("everything inserted into wellTesting");
    console.log(sql);
  });
  res.write(
    `<script>location.href="/labtech/wellTesting?email=` +
      email +
      `&password=` +
      password +
      `";</script>`
  );
  res.end();
}

function editmode_WellBarcodes(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let query = url.parse(req.url, true).query;
  console.log("arrived to editmode");
  let email = query.email ? query.email : "";
  let password = query.password ? query.password : "";
  let poolBarcode = query.poolBarcode ? query.poolBarcode : "";
  let wellBarcode = query.wellBarcode ? query.wellBarcode : ""; //이렇게 받아왔고,
  let html =
    `
  <html>
  <script>
    function editDB(){
      let wellBarcode = document.querySelector("#wellTesting_inputWellBarcode").value;
      let poolBarcode = document.querySelector("#wellTesting_inputPoolBarcode").value;
      let result = document.querySelector("#wellTesting_inputResult").value;
      var xmlHttp = new XMLHttpRequest();
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get('email');
      const password = urlParams.get('password');
      let targetUrl = "/labtech/wellTesting/edit?email=" + email + "&password=" + password + "&wellBarcode=" + wellBarcode + "&poolBarcode=" + poolBarcode + "&result=" + result;
      xmlHttp.open( "GET", targetUrl, false);
      location.href = targetUrl;
    };
  </script>
  <body>
  <h1> Well Testing </h1>
  <b>Well Barcode: </b>
  <input type="text" value="` +
    wellBarcode +
    `" id="wellTesting_inputWellBarcode"><br><br>
  <b>Pool Barcode: </b>
  <input type="text" value="` +
    poolBarcode +
    `" id="wellTesting_inputPoolBarcode"><br><br>
  <b>Result: </b>
  <select name="filter" id="wellTesting_inputResult">
      <option>In progress</option>
      <option>Negative</option>
      <option>Positive</option>>
  </select>
  <br>
  <button onclick = "editDB()">Add</button>
  <br>
  <table id="wellTable">
      <tr>
          <td>Well Barcode</td>
          <td>Pool Barcode</td>
          <td>Result</td>
      </tr>
    `;
  let sql = `SELECT * FROM welltesting`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
      let item = result[i];
      html += `
                <tr class="well-container">
                    <td>
                        <input type="checkbox" id="well_check-${i}">
                        <span id="wellTesting_wellBarcode-${i}">${item.wellBarcode}</span>
                    </td>
                    <td>
                        <span id="wellTesting_poolBarcode-${i}">${item.poolBarcode}</span>
                    </td>
                    <td>
                        <span id="wellTesting_result-${i}">${item.result}</span>
                    </td>
                        `;
    }
    html += `
        </table>
        <button>Edit Pool</button>
        <button>Delete Pool</button>
    </body>
    </html>`;
    res.write(html);
    res.end();
  });
}