#/usr/bin
branch="v1.0.0"
time=$(date "+%Y-%m-%d %H:%M:%S")

echo "--> build···"
cd ..
npm run build

echo "--> copy files···"
cp -rf Dockerfile ecosystem.config.js server/* ./dist
echo "--> install node dependencies···"
# 太慢了 install 放在本地
cd ./dist
yarn install
cd ..

echo "--> push···"
git add .
git commit -m "sub-upms 测试环境提交：$time"
# git push  -u origin "$branch"