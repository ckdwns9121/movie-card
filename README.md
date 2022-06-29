# React 프로젝트에 PWA 적용해보기

## PWA란?

- PWA는 `Progressive Web Apps`의 줄인말로, 모바일 사이트에서 네이티브 앱과 같은 UX를 제공하는 기술이다.
- PWA는 웹과 네이티브 앱 기능의 모든 장점을 갖도록 특정 기술과 표준 패턴을 사용해 개발 된 웹 앱이다.
- 웹의 접근성과 네이티브 앱의 UX 그리고 오프라인 데이터의 캐싱, 푸쉬 알림, 사용자 설치가 필요없이 홈화면에 추가하여 아이콘으로 앱처럼 접근 가능한 장점을 가지고 있다.

## 모바일 네이티브 앱

- 장점
  - 인터넷에 연결되지 않아도 앱이 구동된다.
  - 운영체제와 잘 통합되어 있어 매끄러운 ux를 제공할 수 있다.
  - 백그라운드에서 관심있는 정보나 푸쉬 알림을 보내줄 수 있다.
- 단점
  - 앱 배포가 번거롭다. 작은 수정이라도 검수를 받아서 새로운 릴리즈로 배포해야한다.
  - 설치하기 번거롭다.

## 모바일 웹

- 장점
  - 브라우저에서는 URL만 클릭하면 웹 사이트에 접속할 수 있어 설치하는 것보다 빠르고 쉽게 접근할 수 있다.
- 단점
  - 운영체제의 기능을 사용하는데 제한이 있다.(카메라 faceid 등등..)
  - 인터넷이 연결되지않은 오프라인 환경에서 사용하기 어려운 경우가 있다.

## serviceWorker

- 서비스워커는 웹 브라우저가 백그라운드에서 실행하는 스크립트로 웹페이지와는 별개로 작동한다.
- 로컬에서는 `http로 사용해도 되지만 배포시는 https`에서 작동한다.
- 오프라인에서 PWA를 구동할 수 있는 자바스크립트 형태의 핵심 기술.
- 브라우저와 네트워크 사이 프록시처럼 동작하며 리소스를 캐시하거나 필요에 따라 푸시 메시지를 전달할 수 있다.
- 서비스 워커를 사용하기 위해 index.html에 코드를 추가하자.

```html
<script>
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(reg => console.log("Service worker registered.", reg));
  }
</script>
```

### 🗂 ./index.tsx;

- 서비스 워커 활성화

```js
serviceWorker.register();
```

## 애플리케이션 메니페스트 파일

- 앱의 정보를 담고있는 JSON 기반 파일
- 홈 화면에 아이콘을 설치하거나 앱이 로딩될 때 첫 페이지, 표시 방향 등의 구동 정보를 설정한다.

```json
{
  "short_name": "Movie Card",
  "name": "Movie Card",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#121212",
  "prefer_related_applications": true,
  "background_color": "#121212"
}
```

- `display`는 standalone으로 해주어야 브라우저의 주소칸과 버튼들을 숨길 수 있다.
- `theme_color`는 PWA의 앱바 색상을 지정해준다.
- `background_color`는 스플래쉬 화면 시 백그라운드 컬러를 지정해준다.

## 결과

### PWA 적용

|                                                                         PWA                                                                          |                                                                         WEB                                                                          |
| :--------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/40492343/153543994-a43b26dd-d176-4fa3-a9e4-1ec852e4755c.jpg" width="375px" height="812px"></img> | <img src="https://user-images.githubusercontent.com/40492343/153543996-2f4d7815-91c0-4519-9523-6da40bb963bc.jpg" width="375px" height="812px"></img> |

왼쪽 화면을 보면 앱바와 주소창이 없어져 앱처럼 변경되었다.
