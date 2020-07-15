#/usr/bin
version="1.0.0";
imageName="test_sub_upms";
containerName="test_sub_upms";
port="2000"

echo "--> docker build"
cd ..
cd ../dist
sudo docker build -t "$imageName":"$version" .
sudo docker rm -f "$containerName" || echo 'continue'
sudo docker run -d -p "$port":9527 --privileged --restart=always --name "$containerName" "$imageName":"$version"