# shiramine-backend

クローンして最初に行うこと
```bash
cd shiramine-backend
npm install
```

## Sequelize

### データベースの作成
```bash
node_modules/.bin/sequelize model:generate --name user --attributes name:string,role:enum,bleToken:string,bnbplusApiToken:string

node_modules/.bin/sequelize model:generate --name spot --attributes name:string,gatewayId:string,useFaceRecognition:boolean,longitude:float,latitude:float,description:text

node_modules/.bin/sequelize model:generate --name keyperson --attributes keypersonId:integer,talkUserId:integer
```
## マイグレーション
```bash
node_modules/.bin/sequelize db:migrate
```

## DB削除
```bash
# 内容だけではなくDB自体も消えるので注意
node_modules/.bin/sequelize db:drop 
```
