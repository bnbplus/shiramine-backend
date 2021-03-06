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
JWT_SECRET="<jwtの秘密鍵>"
```

## Dockerを用いる場合

```bash
# まずは.envを作成
docker build -t shiramine-backend .
docker run -d -p 4000:4000 shiramine-backend
```

## サーバ構成

![サーバ構成](./README/サーバ構成.png)

## API一覧

| 機能 | エンドポイント | 通信 | ログイン | 説明 |
----|----|----|----|----
| 動作確認 | / | GET | 不要 | 接続テスト用 |
| ログイン | /login | POST | 不要 | email,passwordを送るとログイン情報を送る |
| ユーザ情報 | /user | GET | 必須 | 自分の情報を返す |
| ユーザ情報 | /user/:id | GET | 必須(adminのみ) | ユーザ一人の情報を返す |
| ユーザ一覧 | /users | GET | 必須(adminのみ) | 全ユーザの情報を返す |
| ユーザ作成 | /user/create | POST | 必須(adminのみ) | name,email,password,roleを送ると登録される |
| ユーザ削除 | /user/delete/:id | GET | 必須(adminのみ) | id(ユーザid)を送るとそのユーザが削除されます |
| ユーザ編集 | /user/edit/:id | POST | 必須(adminのみ) | id(ユーザid)で指定したユーザのユーザ情報を変更できます |
| 場所一覧 | /spots | GET | 不要 | 場所のリストを返す |
| 場所情報 | /spot/:id | GET | 必須(adminのみ) | ユーザ一人の情報を返す |
| 場所作成 | /spot/create | POST | 必須(adminのみ) | name,bleUuid,bnbSub,latitude,longitude,descriptionを用いて場所を登録 |
| 場所削除 | /spot/delete/:id | GET | 必須(adminのみ) | id(場所id)を送るとその場所が削除される |
| 場所編集 | /spot/edit/:id | POST | 必須(adminのみ) | id(場所id)で指定した場所の情報を変更できる |
| 頼みごと一覧 | /requests | GET | 不要 | 頼みごとの一覧を表示 |
| 頼みごと情報 | /request/:id | GET | 必須 | 頼みごとの情報を表示 |
| ユーザごとの頼みごと | /request/:id | GET | 必須 | ユーザごとの頼みごとを表示 |
| 頼みごと作成 | /request/create | POST | 必須 | userid,informationを送ると登録される |
| 頼みごと作成 | /request/create/user/:id | POST | 必須 | userid,informationを送ると登録される(userIdはパラーメータで指定) |
| 頼みごと削除 | /request/delete/:id | GET | 必須 | id(頼みごとid)を送るとその頼みごとが削除される |
| 頼みごと編集 | /request/edit/:id | POST | 必須 | id(頼みごとid)を送るとその頼みごとが変更できる |
| 頼みごと完了 | /request/done/:id | POST | 必須 | id(頼みごとid)を送るとその頼みごとを行った人を登録できる |

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
| role | 白峰BSにおける役割 | enum('traveller', 'admin', 'keyperson', 'shop') | NO |
| bleUuid | BLEのUUID | varchar(255) | YES |
| bnbplusSubject | bnb+のoidcのsub | varchar(255) | YES |
| createdAt | 生成時間 | datetime | NO |
| updatedAt | 変更時間 | datetime | NO |

### spots
| 名前 | 機能 | 型 | Null許容 | 
----|----|----|----
| id | 固有のキー | int(11) | NO |
| name | 場所名 | varchar(255) | NO |
| bleUuid | BLEゲートウェイのUUID | varchar(255) | YES |
| bnbSub | BNB+のsub | tinyint(1) | NO |
| latitude | 緯度 | float | YES |
| longitude | 経度 | float | YES |
| description | 場所について | text | YES | 
| createdAt | 生成時間 | datetime | NO |
| updatedAt | 変更時間 | datetime | NO |

### request
| 名前 | 機能 | 型 | Null許容 | 
----|----|----|----
| id | 固有のキー | int(11) | NO |
| userId | ユーザのID | int(11) | NO |
| information | 説明 | text | NO |
| solutioner | 解決者(ユーザID) | int(11) | YES | 
| createdAt | 生成時間 | datetime | NO |
| updatedAt | 変更時間 | datetime | NO |


## Sequelize

### マイグレーション
```bash
# 以下はテーブル作成の手順なので先にDBを作成する必要がある
node_modules/.bin/sequelize db:migrate
```

### DB削除
```bash
# 内容だけではなくDB自体も消えるので注意
node_modules/.bin/sequelize db:drop 
```
