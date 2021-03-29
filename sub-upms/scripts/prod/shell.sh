#/usr/bin
version="1.0.0";
imageName="risk_upms_manage";
cd ../..
# yarn
# yarn build-dev
echo "--> clean cache"
sudo  yarn cache clean
sudo rm -rf node_modules
echo "--> yarn  install && build"
sudo yarn install && sudo yarn fch:build

echo "--> copy files···"
sudo cp -rf Dockerfile  ./dist

echo "--> docker build"
cd ./dist
ls
# sudo docker build -t web/"$imageName":"$version" .
# sudo docker tag "$imageName":"$version" docker.local61:5000/web/"$imageName":"$version"
# sudo docker push docker.local61:5000/web/"$imageName":"$version"
# sudo docker rmi docker.local61:5000/web/"$imageName":"$version"
sudo docker build -t web/"$imageName":"$version" .
sudo docker tag web/"$imageName":"$version" docker.local61:5000/web/"$imageName":"$version"
sudo docker push docker.local61:5000/web/"$imageName":"$version"
sudo docker rmi web/"$imageName":"$version"