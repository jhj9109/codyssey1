# 개발 워크스테이션 구축 미션

## 1. 프로젝트 개요
로컬 개발 환경 세팅, Docker 컨테이너 실행, Git 버전 관리를 결합하여 재현 가능한 개발 워크스테이션을 구축합니다.

### 프로젝트 구조
- 루트경로에 너무 많은 파일이 있는것을 막기 위해, images & basic & bonus 폴더를 두었습니다.
- images는 README.md를 구성하기 위한 이미지 파일을 두었습니다.
- basic은 도커파일로 기본이미지를 커스텀하여 실행합니다.
- bonus에서는 yaml로 도커컴포즈로서 3가지 서비스를 구동합니다.
- 루트에는 시현중 도움이 되는 몇가지 sh파일과 깃이그노어 파일이 있습니다.

## 2. 실행 환경
* OS:  macOS  15.7.4 24G517
* Shell: zsh 5.9 (x86_64-apple-darwin24.0)
* Docker: Docker version 28.5.2, build ecc6942
* Git: git version 2.53.0

## 3. 수행 항목 체크리스트
- [O] 4. 터미널
- [O] 5. 권한
- [O] 6-1. Docker
- [O] 6-2. Dockerfile
- [O] 6-3. 포트
- [O] 6-4. 볼륨
- [O] 7-1. Git
- [O] 7-2. GitHub

## 4. 터미널
```bash
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
```

```bash
/Users/jhj91_093395/Documents/codyssey1
/Users/jhj91_093395/Documents/codyssey1/test
total 0
drwxr-xr-x   4 jhj91_093395  jhj91_093395  128 Mar 31 19:07 .
drwxr-xr-x  10 jhj91_093395  jhj91_093395  320 Mar 31 19:07 ..
-rw-r--r--   1 jhj91_093395  jhj91_093395    0 Mar 31 19:07 .hide
-rw-r--r--   1 jhj91_093395  jhj91_093395    0 Mar 31 19:07 origin
mv: rename copied to renamed: No such file or directory
total 0
drwxr-xr-x   4 jhj91_093395  jhj91_093395  128 Mar 31 19:07 .
drwxr-xr-x  10 jhj91_093395  jhj91_093395  320 Mar 31 19:07 ..
-rw-r--r--   1 jhj91_093395  jhj91_093395    0 Mar 31 19:07 .hide
-rw-r--r--   1 jhj91_093395  jhj91_093395    0 Mar 31 19:07 origin
hello-world
total 8
drwxr-xr-x   4 jhj91_093395  jhj91_093395  128 Mar 31 19:07 .
drwxr-xr-x  10 jhj91_093395  jhj91_093395  320 Mar 31 19:07 ..
-rw-r--r--   1 jhj91_093395  jhj91_093395    0 Mar 31 19:07 .hide
-rw-r--r--   1 jhj91_093395  jhj91_093395   12 Mar 31 19:07 file.txt
```

## 5. 권한

```bash
# 1. 테스트용 폴더 생성 및 이동
mkdir test2
cd test2

# 2. 파일 2개, 디렉토리 2개 생성
touch f1 f2
mkdir d1 d2

# 3. 파일 하나와 디렉토리 하나에 권한 수정
chmod -x d2
chmod +x f2

# 4. 권한 체크
ls -al

# 5. 3번에서 권한 수정한것에 따른 영향 확인
cd d1
cd ..
cd d2
./f1
./f2
```

```bash
total 0
drwxr-xr-x  6 jhj91_093395  jhj91_093395  192 Mar 31 18:51 .
drwxr-xr-x  9 jhj91_093395  jhj91_093395  288 Mar 31 18:51 ..
drwxr-xr-x  2 jhj91_093395  jhj91_093395   64 Mar 31 18:51 d1
drw-r--r--  2 jhj91_093395  jhj91_093395   64 Mar 31 18:51 d2
-rw-r--r--  1 jhj91_093395  jhj91_093395    0 Mar 31 18:51 f1
-rwxr-xr-x  1 jhj91_093395  jhj91_093395    0 Mar 31 18:51 f2
2.sh: line 13: cd: d2: Permission denied
2.sh: line 14: ./f1: Permission denied
```

## 6. 도커

### 6-1. Docker 기본

#### --version info 명령어
```bash
$ docker --version
Docker version 28.5.2, build ecc6942
```

```bash
$ docker info
Client:
 Version:    28.5.2
 Context:    orbstack
 Debug Mode: false
 Plugins:
  buildx: Docker Buildx (Docker Inc.)
    Version:  v0.29.1
    Path:     /Users/jhj91_093395/.docker/cli-plugins/docker-buildx
  compose: Docker Compose (Docker Inc.)
    Version:  v2.40.3
    Path:     /Users/jhj91_093395/.docker/cli-plugins/docker-compose

Server:
 Containers: 24
  Running: 0
  Paused: 0
  Stopped: 24
 Images: 14
 Server Version: 28.5.2
 Storage Driver: overlay2
  Backing Filesystem: btrfs
  Supports d_type: true
  Using metacopy: false
  Native Overlay Diff: true
  userxattr: false
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Cgroup Version: 2
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local splunk syslog
 CDI spec directories:
  /etc/cdi
  /var/run/cdi
 Swarm: inactive
 Runtimes: io.containerd.runc.v2 runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 1c4457e00facac03ce1d75f7b6777a7a851e5c41
 runc version: d842d7719497cc3b774fd71620278ac9e17710e0
 init version: de40ad0
 Security Options:
  seccomp
   Profile: builtin
  cgroupns
 Kernel Version: 6.17.8-orbstack-00308-g8f9c941121b1
 Operating System: OrbStack
 OSType: linux
 Architecture: x86_64
 CPUs: 6
 Total Memory: 15.67GiB
 Name: orbstack
 ID: 1de29ace-20f1-479e-bcae-591ec4dec19e
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 Experimental: false
 Insecure Registries:
  ::1/128
  127.0.0.0/8
 Live Restore Enabled: false
 Product License: Community Engine
 Default Address Pools:
   Base: 192.168.97.0/24, Size: 24
   Base: 192.168.107.0/24, Size: 24
   Base: 192.168.117.0/24, Size: 24
   Base: 192.168.147.0/24, Size: 24
   Base: 192.168.148.0/24, Size: 24
   Base: 192.168.155.0/24, Size: 24
   Base: 192.168.156.0/24, Size: 24
   Base: 192.168.158.0/24, Size: 24
   Base: 192.168.163.0/24, Size: 24
   Base: 192.168.164.0/24, Size: 24
   Base: 192.168.165.0/24, Size: 24
   Base: 192.168.166.0/24, Size: 24
   Base: 192.168.167.0/24, Size: 24
   Base: 192.168.171.0/24, Size: 24
   Base: 192.168.172.0/24, Size: 24
   Base: 192.168.181.0/24, Size: 24
   Base: 192.168.183.0/24, Size: 24
   Base: 192.168.186.0/24, Size: 24
   Base: 192.168.207.0/24, Size: 24
   Base: 192.168.214.0/24, Size: 24
   Base: 192.168.215.0/24, Size: 24
   Base: 192.168.216.0/24, Size: 24
   Base: 192.168.223.0/24, Size: 24
   Base: 192.168.227.0/24, Size: 24
   Base: 192.168.228.0/24, Size: 24
   Base: 192.168.229.0/24, Size: 24
   Base: 192.168.237.0/24, Size: 24
   Base: 192.168.239.0/24, Size: 24
   Base: 192.168.242.0/24, Size: 24
   Base: 192.168.247.0/24, Size: 24
   Base: fd07:b51a:cc66:d000::/56, Size: 64

WARNING: DOCKER_INSECURE_NO_IPTABLES_RAW is set
```

#### images 명령어 & 이미지 삭제를 위한 rmi
```bash
$ docker images
```
![docker images 실행](images/docker_images.png)

존재하는 이미지 먼저 삭제
```bash
# 삭제 시도 => 실패
$ docker rmi hello-world
Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container d935d47b1f83 is using its referenced image e2ac70e7319a

# 사용중인 컨테이너 삭제
$ docker rm -f d935d    
d935d

# 삭제 재시도 => 성공
$ docker rmi hello-world
Untagged: hello-world:latest
Untagged: hello-world@sha256:452a468a4bf985040037cb6d5392410206e47db9bf5b7278d281f94d1c2d0931
Deleted: sha256:e2ac70e7319a02c5a477f5825259bd118b94e8b02c279c67afa63adab6d8685b
Deleted: sha256:897b3f2a7c1bc2f3d02432f7892fe31c6272c521ad4d70257df624504a3238b4
```

#### 가장 기본적인 이미지 실행. hello-world
```bash
# 헬로 월드 실행 => 로컬에 없으면 도커허브에서 해당이름의:latest 버전 이미지를 알아서 다운로드 받음
$ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
4f55086f7dd0: Pull complete 
Digest: sha256:452a468a4bf985040037cb6d5392410206e47db9bf5b7278d281f94d1c2d0931
Status: Downloaded newer image for hello-world:latest

# 여기부터가 헬로월드 이미지 실행으로 인한 출력
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

#### pull 이미지 다운로드 받기
```bash
# 이미지 삭제후 이미지 풀 => 자동 다운받은거와 거의 동일
$ docker pull hello-world
Using default tag: latest
latest: Pulling from library/hello-world
Digest: sha256:452a468a4bf985040037cb6d5392410206e47db9bf5b7278d281f94d1c2d0931
Status: Image is up to date for hello-world:latest
docker.io/library/hello-world:latest
```

#### 확인 & 모니터링 용도의 stats & ps & ps -a & logs 명령어 실행
베이직 & 보너스 실행시 출력 모습
```bash
$ docker stats # 리소스 사용 체크
```
![docker stats 실행시](images/stats.png)

```bash
$ docker ps # 현재 동작중인 (up) 컨테이너만 확인가능
```
![docker ps 실행시](images/ps.png)

```bash
$ docker ps -a # 동작중이지 않은 (exited) 컨테이너도 확인 가능
```
![docker ps -a 실행시](images/psa.png)

```bash
$ docker logs b5d3624da22a # 동작중인 베이직 컨테이너 로그 체크
```
![docker logs 실행시](images/logs.png)

### 6-2. Dockerfile
```bash
$ docker build -t web:v1 . # 현재디렉토리(.)에서 Dockerfile을 찾아 빌드하고 web:v1 태그 담
$ docker run -d -p 80:80 web:v1 # 포트를 80:80 매핑후, web:v1 이미지 실행
```
![빌드&런](images/build_run.png)

Dokkerfile
```Dockerfile
# 베이스가 될 이미지 지정
FROM nginx:latest

# 베이스 이미지에서 정적인 컨텐츠를 변경하는 코드.
COPY index.html /usr/share/nginx/html/index.html
```

### 6-3. 포트
브라우저에서 localhost 입력만으로 (http 기본포트인) 80포트로 접속되는것 확인
![80접속](images/80.png)

### 6-4. 볼륨
```bash
$ docker volume create v1
$ docker run -it --name n1 -v v1:/workspace alpine

# 1. 컨테이너에서 파일을 생성한다.

/ # ls /workspace/
/ # touch /workspace/file
/ # ls /workspace/
file
/ # exit

$ docker rm -f n1
n1

# 2. 1번에서 만들어둔 파일의 존재를 체크한다.

$ docker run -it --name n2 -v v1:/workspace alpine

/ # ls /workspace/
file
/ # exit

# 3. 볼륨을 사용하고 있는 컨테이너가 있으면 볼륨 삭제 불가함을 확인

$ docker volume rm v1
Error response from daemon: remove v1: volume is in use - [46b736b220657169f2d7962b794dde6c049b2ba5150e322a35916c95b173a36d]
$ docker rm -f n2                                 
n2
$ docker volume rm v1
v1
```

## 7. 깃

## 7-1. 깃

```bash
credential.helper=osxkeychain
user.name=jhj9109
user.email=jhj91_09@naver.com
```

## 7-2. 깃허브

```bash
$ git remote -v # 이미 ssh 적용후라 "https://" 로 시작하지 않는다.
origin  git@github.com:jhj9109/codyssey1.git (fetch)
origin  git@github.com:jhj9109/codyssey1.git (push)
```

## 8. 보너스 과제
보너스에서 수행한 과제
![8080접속](images/8080.png)

### 8.1 도커 컴포즈 기초
```bash
# 문서화 되지 못했던 명령어들 => 문서화된 실행 환경
docker build -t web:v1 .
docker run -d -p 80:80 web:v1
```
```yaml
# yaml 일부 발췌
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "${NGINX_PORT}:80"
```

### 8.2 도커 컴포즈 멀티 컨테이너
서비스명 web / app / db
```
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }

    location /api {
        proxy_pass http://app:3000;
    }
}
```
```
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'mydb',
  port: 5432,
});
```
```bash

```

### 8.3 컴포즈 운영 명령어 습득
up
![up](images/up.png)
down
![down](images/down.png)
ps
![ps](images/compose_ps.png)
logs -f
![logs -f](images/compose_logs.png)
로그 디버깅에 활용
```bash
web-1  | 192.168.97.1 - - [01/Apr/2026:11:02:13 +0000] "GET /api/visit HTTP/1.1" 404 555 "http://localhost:8080/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)
```

### 8.4 환경 변수 활용 at Dockerfile or Compose
설정과 코드 분리
```bash
DB_HOST=db
DB_USER=myuser
DB_PASSWORD=my_super_secret_password
DB_NAME=mydb
DB_PORT=5432

APP_PORT=3000

NGINX_PORT=8080
```

### 8.5 Github SSH 키 설정
Public Key & Private Key 생성
```bash
ssh-keygen -t <알고리즘명> -C <"이메일주소">
```

```bash
$ cat id_ed25519.pub #공개키

ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICVYgjlmkFzFez9xBuaE5ZOdM4IY9p656TyESknYxgLv jhj91_09@naver.com
```

```bash
$ cat id_ed25519 # 비밀키

-----BEGIN OPENSSH PRIVATE KEY-----
abcdefghijklmnopqrstuvwxyz123457890abcdefghijklmnopqrstuvwxyz123457890
abcdefghijklmnopqrstuvwxyz123457890abcdefghijklmnopqrstuvwxyz123457890
abcdefghijklmnopqrstuvwxyz123457890abcdefghijklmnopqrstuvwxyz123457890
abcdefghijklmnopqrstuvwxyz123457890abcdefghijklmnopqrstuvwxyz123457890
abcdefghijklmnopqrstuvwxyz123457890abcdefghijklmnopqrs==
-----END OPENSSH PRIVATE KEY-----
```
```bash
$ ssh -T git@github.com # ssh 접근 확인

The authenticity of host 'github.com (20.200.245.247)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
Hi jhj9109! You've successfully authenticated, but GitHub does not provide shell access.
```
```bash
$ git remote set-url origin git@github.com:jhj9109/codyssey1.git # ssh 방식으로 적용되기 위해 주소를 바꿔준다.
$ git remote -v
origin  git@github.com:jhj9109/codyssey1.git (fetch)
origin  git@github.com:jhj9109/codyssey1.git (push)
```

## 9. 트러블 슈팅
### 9.1 문제 상황 (환경변수 적용)
.env와 yaml의 evironment에서 모두 설정했다고 생각한 환경 변수가 적용 안 됨.

오류 코드
```bash
web-1  | 2026/04/01 09:12:33 [emerg] 1#1: unknown "app_port" variable
web-1  | nginx: [emerg] unknown "app_port" variable
```


nginx.html.index.html
```
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }

    location /api {
        proxy_pass http://app:${APP_PORT}; # 'app'은 컴포즈 서비스 이름
    }
}
```

야믈 일부
```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    environment:
      - APP_PORT=${APP_PORT}
    ports:
      - "${NGINX_PORT}:80"
    volumes:
      - ./default.conf.template:/etc/nginx/templates/default.conf.template
      - ./nginx/html:/usr/share/nginx/html
    depends_on:
      app:
        condition: service_started
```

## 문제 해결

nginx가 지원하는 템플릿 방식을 활용하여 해결
```
./default.conf.template:/etc/nginx/templates/default.conf.template
```

도커컴포즈 로그속에 있는 힌트
```bash
web-1  | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
web-1  | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
web-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
web-1  | 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
web-1  | 10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
web-1  | /docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
web-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
web-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
web-1  | /docker-entrypoint.sh: Configuration complete; ready for start up

```

### 9.2 문제 상황 (메타정보)
도커파일을 활용해서 커스텀 이미지 생성과정에서 한글이 깨져서 나오는 상황

![한글깨짐](images/error.png)

## 문제 해결
커스텀을 위한 index.html을 작성시 한글 사용
nginx의 기본 index.html은 영어로 작성되어 charset 정보 불필요
한글을 위해서는 charset에 대한 정보를 주어야함.
따라서 아래 유니코드에 대한 메타 정보를 적절한 위치에 삽입
```html
<meta charset="UTF-8">
```

![한글깨짐해결](images/ok.png)


# 10. 이론 돌아보기

### 10.1 절대 경로 vs 상대 경로 선택 기준
- 절대 경로는 root를 기준으로 한 경로, 현재 작업 디렉토리와 상관없이 항상 같은 경로를 지정해야할때 사용
- 상대 경로는 현재 작업 디렉토리를 기준으로 한 경로, 절대 경로가 필요하지 않은 상황에서는 상대 경로를 택.

### 10.2 이미지와 컨테이너 차이
- 이미지 (빌드 관점): 텍스트 파일인 Dockerfile에서 생성하고, 이미지 빌드를 위한 모든 명령어가 포함됨. like 설계도
- 컨테이너 (실행 관점): 이미지를 바탕으로 메모리에 올라가 실제 동작하고 있는 인스턴스
- 변경 관점: 이미지는 수정할 수 없고, 그렇기에 여러 컨테이너가 공유 가능. 컨테이너는 이미지 계층 위에 쓰기 가능한 "컨테이너" 계층이 추가 됨.'

### 10.3 컨테이너 내부 포트 직접 접속 불가 이유 및 포트 매핑
like 공유기
- 직접 접속할 수 없는 이유: 도커 컨테이너는 호스트(Mac)와는 완전히 분리된 자기만의 '가상 사설 네트워크(Docker Bridge)' 안에서 동작합니다. 따라서 외부(브라우저)에서 내 PC의 IP로 들어오더라도, 도커 내부의 사설망까지는 길이 뚫려있지 않아 도달할 수 없습니다. (네트워크 격리)
- 포트 매핑(Port Forwarding)이 필요한 이유: 외부의 요청을 컨테이너 내부로 전달해 주는 '문지기' 역할이 필요합니다.

### 10.4 파일 권한 숫자 표기 규칙
- 읽기/쓰기/실행 권한은 마치 비트로 표현 가능하고, 소유자/그룹/기타사용자 순서로 표기

### 10.5 포트 충돌 진단 및 해결
```bash
lsof -i :80 # 찾고자 하는 포트
COMMAND     PID         USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
OrbStack  54341 jhj91_093395  113u  IPv4 0xb9b30f39bd2c4c8b      0t0  TCP *:http (LISTEN)
OrbStack  54341 jhj91_093395  114u  IPv6 0x2f037bba8173312e      0t0  TCP *:http (LISTEN)
```
- 명령어를 통해 해당 포트를 점유하고 있는 소유자를 찾아냅니다.
- 소유자에 따라서 해당 포트의 점유를 빼앗을지, 다른 포트를 사용할지 결정합니다.

### 10.6 컨테이너 삭제 시 데이터 증발 방지 대안
- 컨테이너는 읽기전용인 이미지 계층과 쓰기가 가능한 컨테이너 계층으로 구성되어있습니다.
- 그리고 컨테이너 계층에 누적된 변화들은 컨테이너 삭제와 함께 사라집니다.
- 이를 방지하기위해 도커가 제공하는 방식으로 바인드 마운트 하거나 도커 볼륨을 사용합니다.