TweetDeck Accounts Switcher
==========================

[![][travis-badge]][travis-link]
[![][dependencies-badge]][dependencies-link]

TweetDeck のアカウント選択を複数選択ではなく切り替えになるように拡張します。  
新規ツイートでの選択とリツイートのダイアログでの選択の両方に対応しています。

<img src="https://raw.githubusercontent.com/wiki/chitoku-k/TweetDeckAccountsSwitcher/tweetdeck_account_switcher_enabled.gif" alt="サンプル" width="262">

## インストール

Chrome でウェブストアを開き [CHROME に追加] をクリックします。  
[TweetDeck Accounts Switcher - Chrome ウェブストア](https://chrome.google.com/webstore/detail/tweetdeck-accounts-switch/cjnfkpniglbbhifpkfnclpndpbhmfllh)

## テスト

### 環境の準備

Selenium を使用した自動テストを実行するには次の環境を準備します。

- Node.js v7 以上
- TweetDeck のユーザー名とパスワード（テスト用推奨）
- GUI 環境または X virtual framebuffer などの仮想ディスプレイ

しかしながら macOS ではうまく動作しませんでした。Linux を推奨します。

### 環境の構築

まずは次のコマンドを実行して必要なパッケージをインストールします。

```bash
$ npm install
```

次に Selenium の ChromeDriver をダウンロードして PATH の通っている場所に配置します。  
URL のうち `_linux64` の部分は環境に合わせて `_win32`, `_mac64`, `_linux32` などに変更する必要があります。

```bash
$ DRIVER_VER=$(curl -sL "https://chromedriver.storage.googleapis.com/LATEST_RELEASE")
$ curl -sOJ "https://chromedriver.storage.googleapis.com/$DRIVER_VER/chromedriver_linux64.zip"
$ unzip chromedriver_linux64.zip
$ sudo mv chromedriver /usr/local/bin
```

テストを実行する前に Chrome をすべて終了して拡張機能をパッケージ化します。

```bash
$ pushd ..
$ google-chrome --pack-extension=$OLDPWD
$ mv *.crx $OLDPWD/
$ popd
```

### 実行

次のコマンドを実行すると Chrome が自動で起動/終了して動作を確認します。

```bash
$ export TEST_TWITTER_USERNAME='<Your TweetDeck Username>'
$ export TEST_TWITTER_PASSWORD='<Your TweetDeck Password>'
$ export CHROME_BIN='chromedriver'
$ npm test
```

[travis-link]:          https://travis-ci.org/chitoku-k/TweetDeckAccountsSwitcher
[travis-badge]:         https://img.shields.io/travis/chitoku-k/TweetDeckAccountsSwitcher.svg?style=flat-square
[dependencies-link]:    https://gemnasium.com/github.com/chitoku-k/TweetDeckAccountsSwitcher
[dependencies-badge]:   https://img.shields.io/gemnasium/chitoku-k/TweetDeckAccountsSwitcher.svg?style=flat-square
