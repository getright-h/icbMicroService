#/usr/bin
version="1.0.0";
imageName="test_sub_upms";
containerName="test_sub_upms";
port="2099"

cd ../..
yarn
yarn build-dev

echo "--> copy files···"
cp -rf Dockerfile ecosystem.config.js server/* ./dist
echo "--> install node dependencies···"
echo "--> docker build"
cd dist
yarn install
sudo docker build -t "$imageName":"$version" .
sudo docker rm -f "$containerName" || echo 'continue'
sudo docker run -d -p "$port":9527 --privileged --restart=always --name "$containerName" "$imageName":"$version"