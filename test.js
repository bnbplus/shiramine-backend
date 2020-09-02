const models = require('./models/index.js')

const run = async () => {
    await models.user.create({
        name: 'test',
        hash: 'qGnfqGMBv0',
        email: 'zukky.rikugame@gmail.com',
        role: 'admin',
        bleToken: null,
        bnbplusApiToken: null
    })
}
run()