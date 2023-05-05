# NestJS Exception Factory

Simple Factory Function to create NestJS Exceptions.

## Code

```typescript
declare class CustomExceptionProtoType extends HttpException {
  constructor();
}

export function createException(
  status: HttpStatus,
  errorCode: string,
  message: string
) {
  class CustomException extends HttpException {
    constructor() {
      super({ status, errorCode, message }, status);
      Object.setPrototypeOf(this, Object.getPrototypeOf(HttpException));
    }
  }
  return CustomException as unknown as typeof CustomExceptionProtoType;
}
```

## Usage

Copy & Paste into your nestjs project. Then use it like this:

```typescript
export const CustomException = createException(
  HttpStatus.BAD_REQUEST,
  'CUSTOM_ERROR_CODE',
  'Custom Error Message'
);

function someFunction() {
  ...
  throw new CustomException();
  ...
}
```

## Warning

`Do not import this code as a module. `

`It will not work.`

Becasue behaviour of `instanceof` operator, is that the class must be exactly in the parent chain, in the sense of JavaScript object reference. Hence, if you import `HttpException` class twice, they are different actual object references, and instanceof may give a "false" negative.

In NestJS, checking exception type is done by `instanceof` operator. So, if you import this code as a module, it will not work.
