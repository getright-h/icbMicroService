@echo off
chcp 65001
set d=%date:~0,10%
set t=%time:~0,8%
echo %d% %t%
start cmd /c cd ../.. &
yarn build  & (for %%i in (Dockerfile ecosystem.config.js server) do (
xcopy %%i dist /y
)) && cd dist & yarn install & cd ../ & git add . & git commit -m "【prod】正式环境提交：%d%%t%"
taskkill /f /im cmd.exe
exit