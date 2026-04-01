mkdir test2
cd test2
touch f1 f2
mkdir d1 d2

chmod -x d2
chmod +x f2

ls -al

cd d1
cd ..
cd d2
./f1
./f2