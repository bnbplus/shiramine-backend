/**
 * FIXEE: このファイルは安全性のために後で消したほうがいいとお思います。
 */

const models = require('./models/index.js')



// データベースにアカウントを追加
const run = async () => {
    // passwordは全て「password」
    await models.user.create({
        name: 'suzuki',
        email: 'suzuki.test@gmail.com',
        role: 'admin',
        bleNumber: 24,
        bnbplusSubject: '08dc1e6b-861b-45c5-aa24-813cd650a2f1',
    })
    
    await models.spot.create({
        name: 'spot1',
        bleUuid: '4FFA9FCF-D599-4169-9D75-22BA2C2A4200',
        bnbSub: null,
        latitude: 36.1744794,
        longitude: 136.6244694,
        description: '場所①です'
    })
    await models.spot.create({
        name: 'spot2',
        bleUuid: '01966C76-8BCE-4AB5-9CA8-F31FB4B63B52',
        bnbSub: null,
        latitude: 36.1744794,
        longitude: 136.6244694,
        description: '場所②です'
    })
    // await models.request.create({
    //     userId: 1,
    //     information: '初めてのお使い1',
    //     solutioner: 2
    // })
    // await models.request.create({
    //     userId: 3,
    //     information: '初めてのお使い2',
    //     solutioner: 1
    // })
    // await models.request.create({
    //     userId: 1,
    //     information: '初めてのお使い3',
    //     solutioner: null
    // })
    // await models.request.create({
    //     userId: 2,
    //     information: '初めてのお使い4',
    //     solutioner: null
    // })
    // await models.request.create({
    //     userId: 2,
    //     information: '初めてのお使い5',
    //     solutioner: null
    // })
}
run()