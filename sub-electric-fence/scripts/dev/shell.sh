#/usr/bin
version="1.0.0";
imageName="test_sub-electric-fence";
containerName="test_sub-electric-fence";
port="2100"

cd ../..
# yarn
# yarn build-dev

echo "--> copy files···"
cp -rf Dockerfile ecosystem.config.js server/* ./dist
echo "--> install node dependencies···"
echo "--> docker build"
cd dist
yarn install
sudo docker build -t "$imageName":"$version" .
sudo docker rm -f "$containerName" || echo 'continue'
sudo docker run -d -p "$port":9527 --privileged --restart=always --name "$containerName" "$imageName":"$version"