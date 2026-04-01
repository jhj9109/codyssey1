# 1. 현재 위치 확인
pwd

# 2. 실습용 디렉토리 생성 및 이동
mkdir -p test
cd test
pwd

# 3. 빈 파일 생성 및 목록 확인 (숨김 파일 포함)
touch origin .hide
ls -al

# 5. 파일 이동(이름 변경)
mv copied renamed
ls -al

# 6. 파일 삭제
rm origin

# 7. 파일 생성 및 내용 확인
echo "hello-world" > file.txt
cat file.txt

# 8. 최종 파일 리스트
ls -la