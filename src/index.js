/**
 * socketioコンポーネントを定義するJSファイル
 */

// 必要なモジュールを読み込む
import React from 'react';
import ReactDOM from 'react-dom';
import { styles } from './styles.js';
import "./styles.css";
// WebSocketサーバーへ接続する。
import socketio from 'socket.io-client';
const socket = socketio.connect('http://localhost:3001');

/**
 * 書き込むフォームのコンポーネント
 */
class ChatForm extends React.Component {
    // コンストラクター
    constructor (props) {
        super(props);
        // ステート変数
        this.state = { 
            name: '',
            message: ''
         };
    }
    // 名前が変わった時に処理される関数
    nameChanged (e) {
        this.setState({ name: e.target.value });
    };
    // メッセージが変わった時に処理される関数
    messageChanged (e) {
        this.setState({ message: e.target.value });
    };
    // サーバーに名前とメッセージを送信する関数
    send () {
        socket.emit('chat-msg', {
            name: this.state.name,
            message: this.state.message
        });
        // ステート変数をクリアする。
        this.setState({ message: '' });
    }
    // レンダリングする。
    render() {
        return (
            <div style={styles.form}>
                名前：
                <br />
                <input value={this.state.name} onChange={ e => this.nameChanged(e)} />
                <br />
                メッセージ：
                <br />
                <input value={this.state.message} onChange={ e => this.messageChanged(e)} />
                <br />
                <button onClick={e => this.send()}>送信</button>
            </div>
        )
    }
}

/**
 * メインとなるChatAppコンポーネント
 */
class ChatApp extends React.Component {
    // コンストラクター
    constructor (props) {
        super (props);
        // ステート変数の用意
        this.state = {
            logs: []
        }
    }
    // コンポーネントがマウントされたタイミングで処理する内容
    componentDidMount () {
        // リアルタイムにログを受信するように設定する。
        socket.on('chat-msg', (obj) => {
            // ログ用変数を定義する。
            const log2 = this.state.logs;
            // 格納用のキーを作成する。
            obj.key = 'key_' + (this.state.logs.length + 1);
            // コンソールに出力する。
            console.log(obj);
            // 既存ログに追加する。
            log2.unshift(obj);
            // ステート変数を更新する。
            this.setState({ logs: log2 });
        });
    }
    // レンダリングする
    render () {
        // ログを一つずつの描画内容を生成する
        const messages = this.state.logs.map(e => (
            <div key={e.key} style={styles.log}>
                <span style={styles.name}>{e.name}</span>
                <span style={styles.message}>{e.message}</span>
                <p style={{clear: 'both'}} />
            </div>
        ));

        return (
            <div>
                <h1 style={styles.h1}>リアルタイムチャット</h1>
                <ChatForm />
                <div>
                    {message}
                </div>
            </div>
        )
    }
}

// ChatAppコンポーネントを外部に公開する。
ReactDOM.render(
    <ChatApp />,
    document.getElementById('root')
);

