# Chat web application với Flask và Reactjs

## Requirements
- pip packages
```sh 
pip install -r requirements.txt
```
- nodejs, npm
```bash
cd react-client
npm i
npm i react-router-dom
```
## Run client :
```bash
npm i
npm i react-router-dom
npm start
```

## Run server : 
### Linux bash
```bash
export FLASK_APP=api
export FLASK_ENV=development
flask init-db # chỉ chạy lần đầu để khởi tạo database
flask run
```
### CMD
```CMD
set FLASK_APP=api
set FLASK_ENV=development
flask init-db @REM chỉ chạy lần đầu để khởi tạo database
flask run
```
### Powershell
```powershell
$env:FLASK_APP = "api"
$env:FLASK_ENV = "development"
flask init-db # chỉ chạy lần đầu để khởi tạo database
flask run
```
