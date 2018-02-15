var http = require('http')
const { exec } = require('child_process')

//create a server object:
http.createServer(function (req, res) {
	html = "<html><head></head><body>"
	if (req.url.indexOf ('/send.html') == 0 ) {
		unsanitized_command = req.url.split("=")[1]

		exec('./wircmd -i 192.168.2.91 -c 3 -b "' + unsanitized_command + '"', (error, stdout, stderr) => {
			if (error) {
				html += `exec error: ${error}`;
				return;
			}
			html += `stdout: ${stdout}`;
			html += `stderr: ${stderr}`;

			res.write(html); //write a response to the client
			res.end(); //end the response
		});
	} else {
		html += "<table><tr>"
		html += "<td colspan='2'><input type='text' id='buffer' /></td>"
		html += "<td><input type='button' value='send' onclick='send(document.getElementById(\"buffer\").value); document,getElementById(\"buffer\").value=\"\"' /><input type='button' value='clear' onclick='document.getElementById(\"buffer\").value=\"\"' /></td>"
		html += "</tr><tr>"
		html += "<td onclick='buffer(\"volup\")'>vol+</td>"
		html += "<td onclick='buffer(\"up\")'>^</td>"
		html += "<td onclick='buffer(\"pgup\")'>pgup</td>"
		html += "</tr><tr>"
		html += "<td onclick='buffer(\"left\")'>&lt;</td>"
		html += "<td onclick='buffer(\"select\")'>Select</td>"
		html += "<td onclick='buffer(\"right\")'>&gt;</td>"
		html += "</tr><tr>"
		html += "<td onclick='buffer(\"voldn\")'>vol-</td>"
		html += "<td onclick='buffer(\"down\")'>v</td>"
		html += "<td onclick='buffer(\"pgdn\")'>pgdn</td>"
		html += "</tr><tr>"
		html += "<td onclick='buffer(\"guide\")'>guide</td>"
		html += "<td onclick='buffer(\"info\")'>info</td>"
		html += "<td onclick='buffer(\"cancel\")'>cancel</td>"
		html += "</tr><tr>"
		html += "<td onclick='buffer(\"skpbk\")'>skip back</td>"
		html += "<td onclick='buffer(\"pvr\")'>pvr</td>"
		html += "<td onclick='buffer(\"skpfw\")'>skip forward</td>"
		html += "</tr><tr>"
		html += "<td onclick='buffer(\"rw\")'>rw</td>"
		html += "<td onclick='buffer(\"pause\")'>pause</td>"
		html += "<td onclick='buffer(\"ff\")'>ff</td>"
		html += "</tr><tr>"
		html += "<td onclick='buffer(\"stop\")'>stop</td>"
		html += "<td onclick='buffer(\"record\")'>record</td>"
		html += "<td onclick='buffer(\"play\")'>Play</td>"
		html += "</tr><tr>"
		html += "<td onclick='buffer(\"1\")'>1</td>"
		html += "<td onclick='buffer(\"2\")'>2</td>"
		html += "<td onclick='buffer(\"3\")'>3</td>"
		html += "</tr><tr>"
		html += "<td onclick='buffer(\"4\")'>4</td>"
		html += "<td onclick='buffer(\"5\")'>5</td>"
		html += "<td onclick='buffer(\"6\")'>6</td>"
		html += "</tr><tr>"
		html += "<td onclick='buffer(\"7\")'>7</td>"
		html += "<td onclick='buffer(\"8\")'>8</td>"
		html += "<td onclick='buffer(\"9\")'>9</td>"
		html += "</tr><tr>"
		html += "<td></td>"
		html += "<td onclick='buffer(\"0\")'>0</td>"
		html += "<td></td>"
		html += "</tr></table>"
		html += "<script>var xhttp = new XMLHttpRequest();"
		html += "function send (button) {"
		html += "xhttp.open('POST', 'send.html?button=' + button, true);"
		html += "xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');"
		html += "xhttp.send();"
		html += "}"
		html += "function buffer (button) {"
		html += "if (document.getElementById('buffer').value.length > 0) {"
		html += "document.getElementById('buffer').value += ','"
		html += "}"
		html += "document.getElementById('buffer').value += button"
		html += "}"
		html += "</script>"

		res.write(html); //write a response to the client
		res.end(); //end the response
    }
}).listen(8080); //the server object listens on port 8080