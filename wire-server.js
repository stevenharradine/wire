/*
 * wire-server.js
 * © 2018 Steven Harradine
 */
var http = require('http')
const { exec } = require('child_process')

var script  = "<script>var xhttp = new XMLHttpRequest();"
	script += "function send (button) {"
	script += "xhttp.open('POST', 'send.html?button=' + button, true);"
	script += "xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');"
	script += "xhttp.send();"
	script += "}"
	script += "function buffer (button) {"
	script += "if (document.getElementById('buffer').value.length > 0) {"
	script += "document.getElementById('buffer').value += ','"
	script += "}"
	script += "document.getElementById('buffer').value += button"
	script += "}"
	script += "</script>"

//create a server object:
http.createServer(function (req, res) {
	html = "<html><head><meta name='viewport' content='width=device-width, initial-scale=1'></head><body>"
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
	} else if (req.url.indexOf ('/channels.html') == 0 ) {
		html += "<style>"
		html += "ul { list-style: none; }"
		html += "ul li {height: 50px;vertical-align: middle;}"
		html += "ul img {max-height: 50px;width: 50px;cursor: pointer;}"
		html += "</style>"
		html += "<h2>News</h2>"
		html += "<ul>"
		html += "<li onclick='send(\"1,5,7,8\")'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/320px-CNN.svg.png' alt='CNN' /></li>"
		html += "<li onclick='send(\"1,5,6,2\")'><img src='https://upload.wikimedia.org/wikipedia/en/9/9e/CTV_News_Channel_2011.svg' alt='CTV News Channel' /></li>"
		html += "<li onclick='send(\"1,5,6,6\")'><img src='https://upload.wikimedia.org/wikipedia/commons/b/b8/CP24_Channel.png' alt='CP24' /></li>"
		html += "<li onclick='send(\"1,5,6,4\")'><img src='https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/CBC_News_Network.svg/231px-CBC_News_Network.svg.png' alt='CBC News Network' /></li>"
		html += "</ul>"
		html += "<h2>Other</h2>"
		html += "<ul>"
		html += "<li onclick='send(\"1,6,0,2\")'><img src='https://cf-media.press.discovery.com/ugc/logos/2009/08/22/DSC_pos.png' alt='Discovery' /></li>"
		html += "<li onclick='send(\"1,6,0,5\")'><img src='http://c-7npsfqifvt34x24wjhofuufx2ex78jljbx2eopdppljfx2eofu.g00.wikia.com/g00/3_c-7mphpt.x78jljb.dpn_/c-7NPSFQIFVT34x24iuuqtx3ax2fx2fwjhofuuf.x78jljb.opdppljf.ofux2fmphpqfejbx2fjnbhftx2f8x2f83x2fIjtupsz_mphp_3119.qohx2fsfwjtjpox2fmbuftux3fdcx3d31102228233551_$/$/$/$/$/$/$/$?i10c.ua=1' alt='History' /></li>"
		html += "<li onclick='send(\"1,6,7,0\")'><img src='https://vignette.wikia.nocookie.net/logopedia/images/1/19/Much_2013.svg/revision/latest/scale-to-width-down/1000?cb=20170704141530' alt='MuchMusic' /></li>"
		html += "<li onclick='send(\"1,7,4,0\")'><img src='https://upload.wikimedia.org/wikipedia/fr/thumb/5/50/Comedy_Network_2011.svg/320px-Comedy_Network_2011.svg.png' alt='Comedy' /></li>"
		html += "</ul>"
		html += "<h2>Networks (East)</h2>"
		html += "<ul>"
		html += "<li onclick='send(\"1,0,5,0\")'><img src='https://upload.wikimedia.org/wikipedia/commons/e/e6/CBC_Television_2009.svg' alt='CBC' /></li>"
		html += "<li onclick='send(\"1,0,5,2\")'><img src='https://upload.wikimedia.org/wikipedia/commons/9/9c/Global_Television_Network_Logo.svg' alt='Global' /></li>"
		html += "<li onclick='send(\"1,0,5,1\")'><img src='https://upload.wikimedia.org/wikipedia/commons/7/77/CTV_logo_%281%29.svg' alt='CTV' /></li>"
		html += "<li onclick='send(\"1,2,0,1\")'><img src='https://vignette.wikia.nocookie.net/logopedia/images/a/a2/Abc-logo_120510210044.svg/revision/latest?cb=20160713051953' alt='ABC' /></li>"
		html += "<li onclick='send(\"1,2,0,0\")'><img src='https://upload.wikimedia.org/wikipedia/commons/3/3f/NBC_logo.svg' alt='NBC' /></li>"
		html += "<li onclick='send(\"1,2,0,3\")'><img src='https://upload.wikimedia.org/wikipedia/commons/2/25/FOX_wordmark.svg' alt='FOX' /></li>"
		html += "<li onclick='send(\"1,2,0,2\")'><img src='http://5io0615vq7k4e1k1l12k8b3r.wpengine.netdna-cdn.com/wp-content/uploads/2013/03/cbs-logo.png' alt='CBS' /></li>"
		html += "<li onclick='send(\"1,2,0,4\")'><img src='https://vignette.wikia.nocookie.net/logopedia/images/4/46/Pbs-logo.jpg/revision/latest?cb=20130907212318' alt='PBS' /></li>"
		html += "</ul>"
		html += script

		res.write(html); //write a response to the client
		res.end(); //end the response
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
		html += script

		res.write(html); //write a response to the client
		res.end(); //end the response
    }
}).listen(8080); //the server object listens on port 8080