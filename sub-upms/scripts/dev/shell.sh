#/usr/bin
version="1.0.0";
imageName="test_sub_upms";
containerName="test_sub_upms";
port="2099"

echo "--> docker build"
cd ..
cd ../dist
yarn install
sudo docker build -t "$imageName":"$version" .
sudo docker rm -f "$containerName" || echo 'continue'
sudo docker run -d -p "$port":9527 --privileged --restart=always --name "$containerName" "$imageName":"$version"