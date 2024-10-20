@echo off
set outputFile=combined.txt
if exist %outputFile% del %outputFile%

echo C:\project\TalentHunt\backend\server.js >> %outputFile%
type "C:\project\TalentHunt\backend\server.js" >> %outputFile%

echo C:\project\TalentHunt\frontend\src\App.js >> %outputFile%
type "C:\project\TalentHunt\frontend\src\App.js" >> %outputFile%

echo C:\project\TalentHunt\frontend\src\pages\Home.js >> %outputFile%
type "C:\project\TalentHunt\frontend\src\pages\Home.js" >> %outputFile%

rem echo C:\project\TalentHunt\frontend\src\App.css >> %outputFile%
rem type "C:\project\TalentHunt\frontend\src\App.css" >> %outputFile%

rem echo C:\project\TalentHunt\frontend\src\components\Header.js >> %outputFile%
rem type "C:\project\TalentHunt\frontend\src\components\Header.js" >> %outputFile%

rem echo C:\project\TalentHunt\frontend\src\components\Header.css >> %outputFile%
rem type "C:\project\TalentHunt\frontend\src\components\Header.css" >> %outputFile%

echo Combined contents into %outputFile%
