/**
 * FIXEE: このファイルは安全性のために後で消したほうがいいとお思います。
 */

const models = require('./models/index.js')



// データベースにアカウントを追加
const run = async () => {
    // passwordは全て「password」
    await models.user.create({
        name: 'admin',
        password: '$2b$10$NDNlGBh4e97PnwFdRuOnPO8GaOfpeuiveZ1qMtVOFgkjLiwrJp15S',
        email: 'admin@shiramine.com',
        role: 'admin',
        bleToken: null,
        bnbplusApiToken: null
    })
    await models.user.create({
        name: 'test1',
        password: '$2b$10$2yNdsk/1s8X.IzlL2UIBpujhKFfmrFad0x5q.9hCCXnsU2/d/QpOu',
        email: 'test1@shiramine.com',
        role: 'traveller',
        bleToken: null,
        bnbplusApiToken: null
    })
    await models.user.create({
        name: 'test2',
        password: '$2b$10$OI/MC7LoV.5re4LwwjUgYOyYKW0YCKmPIL1dF4wvD5hm0YtLUn666',
        email: 'test2@shiramine.com',
        role: 'traveller',
        bleToken: null,
        bnbplusApiToken: null
    })
    await models.user.create({
        name: 'test3',
        password: '$2b$10$AqBxsJrel8NXblwVJpHPVuLIA/koID1gIewIlu5Sqmo5HBtgvmtfa',
        email: 'test3@shiramine.com',
        role: 'traveller',
        bleToken: null,
        bnbplusApiToken: null
    })
    await models.user.create({
        name: 'test4',
        password: '$2b$10$7gfWn4rs55TuetAaKLkzl.LURGVEVH5IAQtCBDouMkGfpRhTRPpem',
        email: 'test4@shiramine.com',
        role: 'keyperson',
        bleToken: null,
        bnbplusApiToken: null
    })
    await models.user.create({
        name: 'test5',
        password: '$2b$10$7gfWn4rs55TuetAaKLkzl.LURGVEVH5IAQtCBDouMkGfpRhTRPpem',
        email: 'test5@shiramine.com',
        role: 'keyperson',
        bleToken: null,
        bnbplusApiToken: null
    })
}
run()