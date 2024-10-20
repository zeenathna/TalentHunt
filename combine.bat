@echo off
set outputFile=combined.txt
if exist %outputFile% del %outputFile%

rem echo C:\project\TalentHunt\backend\server.js >> %outputFile%
rem type "C:\project\TalentHunt\backend\server.js" >> %outputFile%

echo C:\project\TalentHunt\frontend\src\App.js >> %outputFile%
type "C:\project\TalentHunt\frontend\src\App.js" >> %outputFile%

echo C:\project\TalentHunt\frontend\src\App.css >> %outputFile%
type "C:\project\TalentHunt\frontend\src\App.css" >> %outputFile%

echo C:\project\TalentHunt\frontend\src\components\Header.js >> %outputFile%
type "C:\project\TalentHunt\frontend\src\components\Header.js" >> %outputFile%

echo C:\project\TalentHunt\frontend\src\components\Header.css >> %outputFile%
type "C:\project\TalentHunt\frontend\src\components\Header.css" >> %outputFile%

echo Combined contents into %outputFile%
