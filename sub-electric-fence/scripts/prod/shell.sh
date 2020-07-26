#/usr/bin
version="1.0.11";
imageName="release_fch-h5-spa";

echo "--> docker build"
cd ..
cd ../dist
# sudo docker build -t web/"$imageName":"$version" .
# sudo docker tag "$imageName":"$version" docker.local61:5000/web/"$imageName":"$version"
# sudo docker push docker.local61:5000/web/"$imageName":"$version"
# sudo docker rmi docker.local61:5000/web/"$imageName":"$version"
sudo docker build -t web/"$imageName":"$version" .
sudo docker tag web/"$imageName":"$version" docker.local61:5000/web/"$imageName":"$version"
sudo docker push docker.local61:5000/web/"$imageName":"$version"
sudo docker rmi web/"$imageName":"$version"