# 영화 포스터 모아보기 PWA 적용해보기

## PWA란?

웹과 네이티브 앱 기능의 모든 이점을 갖도록 특정 기술과 패턴을 사용해 개발 된 웹앱.

웹의 접근성과 네이티브 앱의 UX 그리고 오프라인 데이터의 캐싱, 푸쉬 알림, 사용자 설치가 필요없이 홈화면에 추가하여 아이콘으로 앱처럼 접근 가능한 장점을 가지고 있다.

## serviceWorker

서비스워커는 웹 브라우저가 백그라운드에서 실행하는 스크립트로 웹페이지와는 별개로 작동한다. 로컬에서는 `http로 사용해도 되지만 배포시는 https`에서 작동한다.

서비스 워커를 사용하기 위해 index.html에 코드를 추가하자

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(reg => console.log('Service worker registered.', reg));
  }
</script>
```

🗂 ./index.tsx;

서비스 워커 활성화

```js
serviceWorker.register();
```

## menifest 작성

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

왼쪽 화면을 보면 앱바와 주소창이 없어져 어플처럼 변경되었다.
