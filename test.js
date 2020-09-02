/**
 * FIXEE: このファイルは安全性のために後で消したほうがいいとお思います。
 */

const models = require('./models/index.js')


// データベースにアカウントを追加
const run = async () => {
    await models.user.create({
        name: 'test',
        password: '$2b$10$NN/Xwt6CzV/EJpzWA3ngHujBtqZqNWVpuaw5Mq9K1E58ATbK8q5aC',
        email: 'zukky.rikugame@gmail.com',
        role: 'admin',
        bleToken: null,
        bnbplusApiToken: null
    })
}
run()