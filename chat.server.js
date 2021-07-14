/**
 * チャットサーバー用のファイル
 */

// HTTPサーバーを作成する
const socketio = require('socket.io');
const express = require('express');
const app = express();
// サーバー情報
const server = require('http').createServer(app);
// ポート番号
const postNo = 3001;
// サーバー起動
server.listen(postNo, () => {
    console.log('起動しました。', 'http://localhost:' + postNo);
});

// publicディレクトリのファイルを自動で返す。
app.use('/public', express.static('./public'))
// ルートへのアクセスを/publicへ
app.get('/', (req, res) => {
    res.redirect(302, '/public');
});

// Wesocketサーバーを起動する。
const io = socketio.listen(server);
// クライアントが接続した時のイベントを定義する。
io.onconnection('connection', (socket) => {
    console.log('ユーザーが接続', socket.client.id);
    // メッセージ受信時の処理を記述する。
    socket.on('chat-msg', (msg) => {
        console.log('メッセージ', msg);
        // 全てのクライアントに送信
        io.emit('chat-msg', msg);
    });
});