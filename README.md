# UrlStatusChecker
UrlStatusChecker is a command-line tool written in Node.js to check all the URL's status inside your local file.
The current version is 0.1. <br>
If the URL is good with the status code 200, it prints "GOOD" in green. <br>
If the URL is bad with the status code 400 or 404, it prints "BAD" in Red. <br>
If the URL is redirect with the status code 301, 307, 308 , it prints "Redirect" in Blue. <br>
If the RUL is broken or no response, it prints "Broken / No response" in White. <br>
Else, it prints "UNKNOWN" in grey.
# How do I install this?
Run the command using 
```bash
npm i -g https://github.com/tianlangwu/urlStatusChecker
```
Or download the files, then "run npm install -g pathName"
```bash
npm install -g C:\Seneca\OSD600\Release0.1
```
After downloan, yo can also "cd" to the path directory then run npm link / npm install -g<br>
# How do I run it?
Run the command using "urlstatuschecker Path\filename".<br>
```bash
urlstatuschecker C:\Seneca\OSD600\Release0.1\test1.html
```
For multiple file
```bash 
urlstatuschecker C:\Seneca\OSD600\Release0.1\test1.html test3.html
```
#  Features
1. URLs printed in colors depending on their status.<br>
2. Support command line args (e.g., --version).
3. Won't crash when accessing a bad URL or timeouts. 
4. Allow passing multiple file paths
# Available command args
-v / -version: Show the Current version of urlStatusChecker.<br>
-u: Check the url status directly
-good: only good URLs to get displayed
-bad：only bad URLs to get displayed
--json/-j: output JSON file in format of [ { "url": 'https://www.google.com', "status": 200 }, { "url": 'https://bad-link.com', "status": 404 } ]
-i/--ignore: allows specifying two files, first file should contain the links to be ignored if they are contained in the second file.
```bash
urlstatuschecker -u http://www.google.com
```
