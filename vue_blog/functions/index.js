const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./serviceAccountKey.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vue-blog-f1b07.firebaseio.com"
});

var db = admin.firestore();
// 포트폴리오 푸시
exports.portfolioPush = functions
  .region('asia-east2')
  .firestore.document('portfolios/{any}').onCreate((event, uid) => {   
    console.log("[portfolio nickname]", event.data().portfolio.nickName);

    const payload = {
        notification: {
            title: '푸쉬 알림',
            body: '포트폴리오 작성',
        },
        data : {
            link: '/portfolio/view/'+ uid.params.any,
            nickName: event.data().portfolio.nickName
        }
    }
    db.collection('users').get().then((snapshot) => {
        snapshot.forEach(doc => {
            console.log(doc.data()['token'])
            if (doc.data()['token']) {
                admin.messaging().sendToDevice(doc.data()['token'], payload).then((response) => {
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error)
                })
            }
        })
    })
});
// 포스트 푸시
exports.postPush = functions
  .region('asia-east2')
  .firestore.document('posts/{any}').onCreate((event, uid) => {
    console.log("[post nickname]",event.data().post.nickName);

    const payload = {
        notification: {
            title: '푸쉬 알림',
            body: '포스트 작성',
        },
        data : {
            link: '/post/view/'+ uid.params.any,
            nickName: event.data().post.nickName
        }
    }
    console.log('글변경')
    db.collection('users').get().then((snapshot) => {
        snapshot.forEach(doc => {
            console.log(doc.data()['token'])
            if (doc.data()['token']) {
                admin.messaging().sendToDevice(doc.data()['token'], payload).then((response) => {
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error)
                })
            }
        })
    })
});
// 포트폴리오 댓글 푸시
exports.portfolioReplyPush = functions
  .region('asia-east2')
  .firestore.document('portfolios/{any}/portfolio_replys/{anys}').onCreate((event, uid) => {
    console.log("[portfolioreply nickname]", event.data().portfolioReply.nickName);
    const payload = {
        notification: {
            title: '푸쉬 알림',
            body: '포트폴리오에 댓글 작성',
        },
        data : {
            link: '/portfolio/view/'+ uid.params.any,
            nickName: event.data().portfolioReply.nickName
        }
    }
    console.log('글변경')
    db.collection('users').get().then((snapshot) => {
        console.log('[sapshot]',snapshot);
        snapshot.forEach(doc => {
            console.log(doc.data()['token'])
            if (doc.data()['token']) {
                if (doc.data()['auth'] === 'manager') {
                    admin.messaging().sendToDevice(doc.data()['token'], payload).then((response) => {
                        console.log('Successfully sent message:', response);
                    })
                    .catch((error) => {
                        console.log('Error sending message:', error)
                    })
                }
            }
        })
    })
});
// 포스트 댓글 푸시
exports.postReplyPush = functions
  .region('asia-east2')
  .firestore.document('posts/{any}/post_replys/{anys}').onCreate((event, uid) => {
    console.log('[postreplynick]', event.data().postReply.nickName);
    console.log('[info]', 'posts/'+uid.params.any)
    const payload = {
        notification: {
            title: '푸쉬 알림',
            body: '포스트에 댓글 작성',
        },
        data : {
            link: '/post/view/' + uid.params.any,
            nickName: event.data().postReply.nickName
        }
    } 
    console.log('글변경');
    db.collection('users').get().then((snapshot) => {
        console.log('[sapshot]',snapshot);
        snapshot.forEach(doc => {
            console.log(doc.data()['token'])
            if (doc.data()['token']) {
                if (doc.data()['auth'] === 'manager') {
                    admin.messaging().sendToDevice(doc.data()['token'], payload).then((response) => {
                        console.log('Successfully sent message:', response);
                    })
                    .catch((error) => {
                        console.log('Error sending message:', error)
                    })
                }
            }
        })
    })
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
