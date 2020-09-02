# shiramine-backend

## クローンして最初に行うこと

以下のコマンドを実行  
```bash
cd shiramine-backend
npm install
```

shiramine-backend直下に`.env`ファイルを作成し以下を記述  
```text:.env
DB_USERNAME="<mysqlのログインのユーザネーム>"
DB_PASSWORD="<mysqlのログインのパスワード>"
DB_DATABASE="<mysqlのデータベース名>"
DB_HOST="<mysqlのホスト>"
DB_PORT="<mysqlのポート>"
DB_WEBSOCKET="<mysqlのWEBSOCKET(UNIXのみ)>"
JWT_SECRET="<jwtの秘密鍵>"
```

## API一覧

| 機能 | エンドポイント | 説明 |
----|----|----
| 動作確認 | / | GETメソッドでアクセスするとJSONが帰る
| ログイン | /login | POSTメソッド(email,password)でアクセストークンを返す


## Sequelize

データベースがない場合に以下の手順で作成する。

### データベースの作成
```bash
node_modules/.bin/sequelize model:generate --name user --attributes name:string,role:enum,bleToken:string,bnbplusApiToken:string

node_modules/.bin/sequelize model:generate --name spot --attributes name:string,gatewayId:string,useFaceRecognition:boolean,longitude:float,latitude:float,description:text

node_modules/.bin/sequelize model:generate --name keyperson --attributes keypersonId:integer,talkUserId:integer
```
## マイグレーション
```bash
# 以下はテーブル作成の手順なので先にDBを作成する必要がある
node_modules/.bin/sequelize db:migrate
```

## DB削除
```bash
# 内容だけではなくDB自体も消えるので注意
node_modules/.bin/sequelize db:drop 
```
