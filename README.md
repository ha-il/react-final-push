# 리액트 스터디 5기 졸업과제

## unknown 타입

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

`useRouteError()`의 반환값이 `unknown`이기 때문에 발생하는 문제였다.
이 문제에 대한 답을 **"이펙티브 타입스크립트"** 218p에서 찾을 수 있었다.

> unknown 상태로 사용하려고 하면 오류가 발생하기 때문에, 적절한 타입으로 변환하도록 강제할 수 있습니다.
>
> 함수의 반환 타입인 unknown 그대로 값을 사용할 수 없기 때문에 Book으로 타입을 단언 해야 합니다. **애초에 반환 값이 Book이라고 기대하며 함수를 호출하기 때문에 단언문은 문제가 되지 않습니다.** 그리고 Book 타입 기준으로 타입 체크가 되기 때문에, unknown 타입 기준으로 오류를 표시했던 예제보다 오류의 정보가 더 정확합니다.

이 내용을 읽고, `useRouteError()`의 타입을 `Error`라는 인터페이스로 타입 단언을 하여 문제를 해결했다.

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
