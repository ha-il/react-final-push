# 리액트 스터디 5기 졸업과제

## 기획

저는 이번 졸업과제의 요구사항을 영화 예매 사이트로 해석해봤는데요.
이유는 아래와 같습니다.

1. 이번 요구사항 및 api를 보면, 사용자에게 영상을 감상시키는 것이 목적이 아니기 때문에 굳이 넷플릭스의 UI를 따라갈 필요가 없다.

2. 영상을 제공하지는 않지만, 사용자에게 영화에 대한 간략한 정보를 전달해야 하는 서비스로는 영화 평론 사이트나 영화 예매 사이트가 있다고 생각했다.

3. 참고할만한 레퍼런스, 이번 과제의 api에 부합하는 정도를 고려하여 영화 예매 사이트로 결정했다.

## 디자인

참고할만한 디자인으로 CGV와 메가박스 중에서 고민을 했습니다.
전반적인 디자인은 CGV 사이트를 참고했습니다.
웹과 모바일의 UI 차이가 메가박스보다 크지 않았기 때문에 반응형을 더 빠르게 구현할 수 있을 거라 생각했습니다..

## 개발

### 문제1: unknown 타입 다루기

```tsx
// ./src/pages/ErrorPage.tsx
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
        {/* 'error' is of type 'unknown'.ts(18046) */}
      </p>
    </div>
  );
}
```

`useRouteError()`의 반환값이 `unknown`이기 때문에 발생하는 문제였습니다.
이 문제에 대한 답을 **"이펙티브 타입스크립트"** 218p에서 찾을 수 있었습니다.

> unknown 상태로 사용하려고 하면 오류가 발생하기 때문에, 적절한 타입으로 변환하도록 강제할 수 있습니다.
>
> 함수의 반환 타입인 unknown 그대로 값을 사용할 수 없기 때문에 Book으로 타입을 단언 해야 합니다. **애초에 반환 값이 Book이라고 기대하며 함수를 호출하기 때문에 단언문은 문제가 되지 않습니다.** 그리고 Book 타입 기준으로 타입 체크가 되기 때문에, unknown 타입 기준으로 오류를 표시했던 예제보다 오류의 정보가 더 정확합니다.

이 내용을 읽고, `useRouteError()`의 타입을 `Error`라는 인터페이스로 타입 단언을 하여 문제를 해결했습니다.

```tsx
// ./src/pages/ErrorPage.tsx
import { useRouteError } from 'react-router-dom';
import { IError } from '../shared/typings';

export default function ErrorPage() {
  const error = useRouteError() as IError;
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
```
