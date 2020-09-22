# UrlStatusChecker
UrlStatusChecker is a command-line tool written in Node.js for check all the URL's status inside your local file.
The current version 0.0.1. <br>
If the url is good with the status code 200, it prints "GOOD" in green. <br>
If the url is bad with the status code 400 or 404, it prints "BAD" in Red. <br>
If the url is redirect with the status code 301, 307, 308 , it prints "Redirect" in Blue. <br>
If the url is broken or no response, it prints "Broken / No response" in White. <br>
Else, it prints "UNKNOWN" in grey.
# How do I install this?
Run the command using "npm i -g https://github.com/tianlangwu/urlStatusChecker"<br>
Or download the files, then "run npm install -g pathName". For example: "npm install -g C:\Seneca\OSD600\Release0.1" <br>
Or "cd" to the path directory then run npm link / npm install -g<br>
Uninstall the tool using npm uninstall command, for example: npm uninstall https://github.com/tianlangwu/urlStatusChecker.
# How do I run it?
Run the command using "urlstatuschecker filename".<br>
For example: urlstatuschecker test1.html
# IMPORTANT!
Make sure your the file you are checking is in your current directory.
# Available command options
-v / -version: Show the Current version of urlStatusChecker.<br>
-u: Check the url status directly. For example: urlstatuschecker -u http://www.google.com.
