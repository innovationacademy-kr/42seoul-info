# Seoul42 Member Info

```bash
$ git clone https://github.com/innovationacademy-kr/42seoul-info
$ cd 42seoul-info
$ npm install
```

* Register [an app](https://profile.intra.42.fr/oauth/applications) on 42 intra
and set the redirect URI to `http://localhost:4200/login/42/return`.

* Copy `.env.sample` to `.env` and edit CLIENT_ID and CLIENT_SECRET info.

* Start the server.

```bash
$ npm run start
```

* Open a web browser and navigate to
[http://localhost:4200/](http://localhost:4200/)
to see the example in action.

## Testing
* add test code in `test/`
* `node_modules/.bin/jest --watch`

## `.env`
* START_ID: start point of id for `batch/sync.js`

## 이 문서의 저작권

<img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/cc-zero.png" width="80px"></img>
이 문서는 [CC0 (Public Domain, 크리에이티브 커먼즈 권리 포기)](LICENSE)로 누구나 영리적인 목적을 포함한 어떤 목적으로든 그리고 어떤 방법으로든 마음대로 사용할 수 있습니다.
