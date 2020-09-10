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
| 動作確認 | / | GETメソッドでアクセスするとJSONが帰る |
| ログイン | /login | POSTメソッド(email,password)でアクセストークンを返す |
| ユーザ情報 | /user | ログイン状態でGETメソッドで自分の情報を返す |
| ユーザ一覧 | /users | ログイン状態でGETメソッドでユーザの一覧を返す(adminのみ) |
| ユーザ作成 | /user/create | ログイン状態でPOSTメソッド(name,email,password,role)でユーザを作成(adminのみ) |
| ユーザ削除 | /user/delete/:id | ログイン状態でURLにユーザidを入れるとそのユーザが削除される(adminのみ) |
 


## ログインの流れ
1. 白峰のサイトにアクセス
2. bnb+でログインを押す
3. bnb+のログインフォームに飛ぶ
4. email,passwordでログイン
5. 白峰のサイトに戻る(その際OIDCTokenを発行)
6. そのOIDCTokenを用いて白峰のサイトにログイン
8. API側はOIDCTokenからsubを取得それをDBに保持
9. その後、白峰のサイトAPIがJWTを発行
10. JWTをvuexに格納

## データベース

### users
| 名前 | 機能 | 型 | Null許容 | 
----|----|----|----
| id | 固有のキー | int(11) | NO |
| password | パスワード | varchar(255) | NO |
| email | メールアドレス | varchar(255) | NO |
| name | ユーザの名前 | varchar(255) | NO |
| role | 白峰BSにおける役割 | enum('traveller', 'admin', 'keyperson') | NO |
| bleToken | BLEのUUID | varchar(255) | YES |
| bnbplusApiToken | bnb+のoidcトークン | varchar(255) | YES |
| createdAt | 生成時間 | datetime | NO |
| updatedAt | 変更時間 | datetime | NO |

### spots
| 名前 | 機能 | 型 | Null許容 | 
----|----|----|----
| id | 固有のキー | int(11) | NO |
| name | 場所名 | varchar(255) | NO |
| gatewayId | BLEゲートウェイのUUID | varchar(255) | YES |
| useFaceRecognition | その場所に顔認証 | tinyint(1) | NO |
| latitude | 緯度 | float | YES |
| longitude | 経度 | float | YES |
| description | 場所について | text | YES | 
| createdAt | 生成時間 | datetime | NO |
| updatedAt | 変更時間 | datetime | NO |

### keyperson
| 名前 | 機能 | 型 | Null許容 | 
----|----|----|----
| id | 固有のキー | int(11) | NO |
| keypersonId | 話を聞いたキーパーソンのID | int(11) | Yes |
| talkUserId | 旅人のID | int(11) | Yes |
| createdAt | 生成時間 | datetime | NO |
| updatedAt | 変更時間 | datetime | NO |


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
