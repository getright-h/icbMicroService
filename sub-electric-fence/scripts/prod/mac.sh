#/usr/bin
branch="master"
devBranch="v1.0.0"
time=$(date "+%Y-%m-%d %H:%M:%S")
# git checkout "$branch"
# git merge "$devBranch"

echo "--> build···"
cd ../..
npm run build

echo "--> copy files···"
cp -rf Dockerfile ecosystem.config.js server/* ./dist
echo "--> install node dependencies···"
# 太慢了 install 放在本地
# cd ./dist
# yarn install
# cd ..

echo "--> push···"
git add .
git commit -m "正式环境提交：$time"
# git push  -u origin "$branch"