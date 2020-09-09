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
        bleUuid: null,
        bnbplusSubject: null
    })
    await models.user.create({
        name: 'test1',
        password: '$2b$10$2yNdsk/1s8X.IzlL2UIBpujhKFfmrFad0x5q.9hCCXnsU2/d/QpOu',
        email: 'test1@shiramine.com',
        role: 'traveller',
        bleUuid: 'C42BB41E-C097-47AF-B431-2BBEEEC32745',
        bnbplusSubject: null
    })
    await models.user.create({
        name: 'test2',
        password: '$2b$10$OI/MC7LoV.5re4LwwjUgYOyYKW0YCKmPIL1dF4wvD5hm0YtLUn666',
        email: 'test2@shiramine.com',
        role: 'traveller',
        bleUuid: null,
        bnbplusSubject: null
    })
    await models.user.create({
        name: 'test3',
        password: '$2b$10$AqBxsJrel8NXblwVJpHPVuLIA/koID1gIewIlu5Sqmo5HBtgvmtfa',
        email: 'test3@shiramine.com',
        role: 'traveller',
        bleUuid: 'F635AC04-CEB9-418C-A978-045935C05480',
        bnbplusSubject: null
    })
    await models.user.create({
        name: 'test4',
        password: '$2b$10$7gfWn4rs55TuetAaKLkzl.LURGVEVH5IAQtCBDouMkGfpRhTRPpem',
        email: 'test4@shiramine.com',
        role: 'villager',
        bleUuid: null,
        bnbplusSubject: null
    })
    await models.user.create({
        name: 'test5',
        password: '$2b$10$7gfWn4rs55TuetAaKLkzl.LURGVEVH5IAQtCBDouMkGfpRhTRPpem',
        email: 'test5@shiramine.com',
        role: 'villager',
        bleUuid: 'A321CDEC-7D39-419D-AF4C-19A7C2889DF4',
        bnbplusSubject: null
    })
    await models.spot.create({
        name: 'spot1',
        bleUuid: '4FFA9FCF-D599-4169-9D75-22BA2C2A4200',
        bnbSub: null,
        latitude: 36.1744794,
        longitude: 136.6244694,
        description: '説明説明説明説明説明説明説明説明説明\n説明説明説明説明説明説明説明説明説明\n説明説明説明説明説明説明説明説明説明'
    })
    await models.spot.create({
        name: 'spot2',
        bleUuid: '01966C76-8BCE-4AB5-9CA8-F31FB4B63B52',
        bnbSub: null,
        latitude: 36.1744794,
        longitude: 136.6244694,
        description: '説明説明説明説明説明説明説明説明説明\n説明説明説明説明説明説明説明説明説明\n説明説明説明説明説明説明説明説明説明'
    })
}
run()