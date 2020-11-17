#!/usr/bin/sh

echo -e "\e[1;32m#### Front -> installing node modules ####\e[0m"
cd sources/front
npm i
echo -e "\e[1;32m#### Back -> installing node modules ####\e[0m"
cd ../back
npm i
cd ../../
echo -e "\e[1;32m#### Docker -> building project ####\e[0m"
sudo docker-compose up