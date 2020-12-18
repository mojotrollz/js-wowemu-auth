# js-wowemu-auth
SRP implementation for WoW Server authentication in Typescript

## installation

```
yarn add js-wowemu-auth
```

## usage

### register

```ts
import { register } from 'js-wowemu-auth'

register('user', 'password')
```

This will return
```ts
{
  salt: "63f86e2b89cec2f95d1d67abd7148309787b98847c55f6e68fcfdaebdadcc505",
  verifier: "636a2087700468caded99874ea45cee20e2b70a7a7edf522d8e6eb0f1a1b15fc"
}
```

`username` is to be set to the column `username` in `realm.account`

`salt` is to be set to the column `s` in `realm.account`

`verifier`is to be set to the column `v` in `realm.account`