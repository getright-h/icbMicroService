#/usr/bin
# 当前镜像版本号
version="1.0.0";
# 镜像名
imageName="test_sub_upms";
containerName="test_sub_upms";
# jenkins服务器开放的的前端访问端口
port="2099";
# 镜像中server暴露的端口号
exposePort="9527";

echo "--> yarn install"
cd ../..
sudo lerna bootstrap && sudo yarn fch:build-dev

echo "--> copy files shell.dev.sh"
sudo cp -rf Dockerfile ./dist
cd ./dist

echo "--> docker build"
sudo docker build -t "$imageName":"$version" .
sudo docker rm -f "$containerName" || echo 'continue'
sudo docker run -d -p "$port":"$exposePort" --privileged --restart=always --name "$containerName" "$imageName":"$version"