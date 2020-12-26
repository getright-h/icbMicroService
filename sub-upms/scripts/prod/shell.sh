#/usr/bin
version="1.0.0";
imageName="sub-device__release";
cd ../..
# yarn
# yarn build-dev

echo "--> copy files···"
# cp -rf Dockerfile ecosystem.config.js server/* ./dist
echo "--> install node dependencies···"
echo "--> docker build"
cd dist
yarn install
# sudo docker build -t web/"$imageName":"$version" .
# sudo docker tag "$imageName":"$version" docker.local61:5000/web/"$imageName":"$version"
# sudo docker push docker.local61:5000/web/"$imageName":"$version"
# sudo docker rmi docker.local61:5000/web/"$imageName":"$version"
sudo docker build -t web/"$imageName":"$version" .
sudo docker tag web/"$imageName":"$version" docker.local61:5000/web/"$imageName":"$version"
sudo docker push docker.local61:5000/web/"$imageName":"$version"
sudo docker rmi web/"$imageName":"$version"