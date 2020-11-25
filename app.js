const fs = require("fs");
const express = require('express');
const app = express();
const url = require('url');
const path = require('path');


app.get("/", (req, res) => {
    writeMainPage(req, res);
})

app.get('/labtech', (req, res) => {
    writeLoginPage(req, res);
})

app.get('/employee', (req, res) => {
    writeEmployeeLoginPage(req, res);
})

app.get('/employee/results', (req, res) => {
    writeEmployeeResults(req, res);
})

app.get('/labtech/testCollection', (req, res) => {
    writeTestCollection(req, res);
})

app.get('/labtech/labHome', (req, res) => {
    writeLabHome(req, res);
})

app.get('/labtech/poolMapping', (req, res) => {
    writePoolMapping(req, res);
})

app.get('/labtech/wellTesting', (req, res) => {
    writeWellTesting(req, res);
})

port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function writeMainPage(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
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
    </html>`
    res.write(html);
    res.end();
}
function writeLoginPage(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    let query = url.parse(req.url, true).query;
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            h2{
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
        <div class="container" align = "center">
            <label for="uname" style="font-size: 20px;"><b>&emsp;Email: &emsp;&emsp;</b></label>
            <input type="text" name="uname" required><br>
    
            <label for="psw" style="font-size: 20px;"><b>Password: &emsp;</b></label>
            <input type="password" name="psw" required><br>
    
            <button type="button"><b>Login Collector</b></button>
            <button type="button"><b>Lab Login</b></button>
        </div>
    </body>
    </html>
    `
    res.write(html);
    res.end();
}

function writeEmployeeLoginPage(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
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
        <h2>Employee Login Page for Results</h2>
        <div class="container" align="center">
            <label for="uname" style="font-size: 20px;"><b>&emsp;Email: &emsp;&emsp;</b></label>
            <input type="text" name="uname" required><br>
    
            <label for="psw" style="font-size: 20px;"><b>Password: &emsp;</b></label>
            <input type="password" name="psw" required><br>
    
            <button type="button"><b>Login</b></button>
        </div>
    </body>    
    `
    res.write(html);
    res.end();
}

function writeTestCollection(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    let query = url.parse(req.url, true).query;
    let html = `<h3>Test Collection</h3>

    Employee ID: <input type="text" name="employee_ID" size="20">
    <br>
    Test barcode: <input type="text" name="test_barcode" size="20">
    <br>
    <button>Add</button>
    <table>
        <tr>
            <th>Employee ID</th>
            <th>Test Barcode</th>
        </tr>
        <tr>
            <td><input type="checkbox"> 111</td>
        <td>123</td>
        </tr>
    </table>
    <button>Delete</button>`
    res.write(html);
    res.end();
}

function writeLabHome(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    let query = url.parse(req.url, true).query;
    let html = `<html>
    <style>
    
    </style>
    
    <body>
        <h1>
            Lab Home
        </h1>
        <button onclick="location.href='/labtech/poolmapping'"><b>Pool Mapping</b></button>
        <button onclick="location.href='/labtech/welltesting'"><b>Well Testing</b></button>
    </body>
    
    </html>`
    res.write(html);
    res.end();
}

function writeEmployeeResults(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    let query = url.parse(req.url, true).query;
    let html = ``
    res.write(html);
    res.end();
}

function writePoolMapping(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    let query = url.parse(req.url, true).query;
    let html = `<html>
    <style>
    
    </style>
    
    <body>
        <h1>
            Pool Mapping
        </h1>
        <b>Pool Barcode: </b>
        <input type="text" name="search" value="">
        <br>
        <b>Test Barcodes: </b>
        <table id='pool'>
            <tr>
                <td>
                    <input type="text" name="code" value="">
                </td>
                <td>
                    <button type='button' onclick=delete class='btn btn-default'>Delete</button>
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
        <button>Add more rows</button><br><br>
        <button>Submit Pool</button>
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
            <tr>
                <td>
                    <label><input type="checkbox">111</label>
                </td>
                <td>
                    123, 456, 789
                </td>
            </tr>
            <tr>
                <td>
                    <label><input type="checkbox">222</label>
                </td>
                <td>
                    876, 873
                </td>
            </tr>
            <tr>
                <td>
                    <label><input type="checkbox">333</label>
                </td>
                <td>
                    734, 112
                </td>
            </tr>
        </table>
        <button>Edit Pool</button>
        <button>Delete Pool</button>
    </body>
    <script>
        var index, table = document.getElementById('pool');
        for (var i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[1].onclick = function () {
                index = this.parentElement.rowIndex;
                table.deleteRow(index);
                console.log(index);
            };
        }
    </script>
    
    </html>`
    res.write(html);
    res.end();
}
function writeWellTesting(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    let query = url.parse(req.url, true).query;
    let html = `<html>

    <body>
        <h1> Well Testing </h1>
        <b>Well Barcode: </b>
        <input type="text" value=""><br><br>
        <b>Pool Barcode: </b>
        <input type="text" value=""><br><br>
        <form method="get">
            <b>Result: </b>
            <input type="text" name="progess" value="">
            <select name="filter">
                <option>In progress</option>
                <option>Negative</option>
                <option>Positive</option>>
            </select>
            <br>
            <input type="submit" value="Add">
            <br>
        </form>
        <table id="welltable">
            <tr>
                <td>Well Barcode</td>
                <td>Poll Barcode</td>
                <td>Result</td>
            </tr>
            <tr>
                <td>
                    <label><input type="checkbox">111</label>
                </td>
                <td>
                    123
                </td>
                <td>
                    In progress
                </td>
            </tr>
            <tr>
                <td>
                    <label><input type="checkbox">222</label>
                </td>
                <td>
                    456
                </td>
                <td>
                    In progress
                </td>
            </tr>
            <tr>
                <td>
                    <label><input type="checkbox">333</label>
                </td>
                <td>
                    789
                </td>
                <td>
                    Negative
                </td>
            </tr>
        </table>
        <button>Edit Pool</button>
        <button>Delete Pool</button>
    </body>
    
    </html>`
    res.write(html);
    res.end();
}