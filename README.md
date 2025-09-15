# ESI_COMMON

- [Getting Started](#getting-started)
- [How to download and install this package](#how-to-download-and-install-this-package)
- [How to use this package](#how-to-use-this-package)
- [How to generate a Token (Only for package owner)](#how-to-generate-a-token-only-for-package-owner)
- [How to add data](#how-to-add-data)
- [Package versioning](#package-versioning)

## Getting Started

1. Go to repository setting > Actions > General > Workflow permissions > Select `Read and write permissions` and click `Save`. This allow pipeline to automatically update package version.
<img width="506" height="229" alt="image" src="https://github.com/user-attachments/assets/5f92b83e-f168-4b7f-9f88-e9924780afb0" />
<img width="1325" height="553" alt="image" src="https://github.com/user-attachments/assets/7c1349e3-754f-459c-a661-593146ca9492" />

3. Search for `{{USER_NAME}}` in code and replace with your github username.
4. Change package name in `package.json` to name of your package.

```
{
  "name": "@{{USER_NAME}}/esi_common",
  ...
}
```

4. Commit your first change to trigger pipeline to deploy package. After that you should see package in gitlab repository.
<img width="525" height="182" alt="image" src="https://github.com/user-attachments/assets/f6f606f5-664f-4a48-827e-0f745007be0e" />

## How to download and install this package

| **Note: This is a private package so it needs a Token that has read permission from the package owner to install and update**

1. Put Token in file `.npmrc`

```
@{{USER_NAME}}:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken={{YOUR_TOKEN}}
```

2. Install package

```
npm install @{{USER_NAME}}/esi_common
```

3. PLease regularly update package to latest version.

```
npm install @{{USER_NAME}}/esi_common@latest
```

## How to use this package

import from `import e from "@{{USER_NAME}}/esi_common"`

1. to get a value

```typescript
import e from "@{{USER_NAME}}/esi_common";

e.Gender.enums.Male; // 1
```

3. to get a `enum object` from `enum code` with default object

```ts
import e from "@{{USER_NAME}}/esi_common";

// Gender.getEnumValue(string | number, defaultObject)
e.Gender.getEnumValue("Male"); // {value:1, th:"ชาย",en:"male"}
e.Gender.getEnumValue("MaleMale", {
  value: -1,
  th: "not found",
  en: "not found",
}); // {value:-1, th:"not found",en:"not found"}
```

4. to get a `enum object` from `enum value` with default object

```ts
import e from "@{{USER_NAME}}/esi_common";

e.Gender.getEnumValue(1); // {value:1, th:"ชาย", en:"male"}
e.Gender.getEnumValue(0); // {value:0, th:"ไม่ระบุ", en:"not specified"}
e.Gender.getEnumValue(e.Gender.enums.Male); // {value:1 , th:"ชาย", en:"male"}
e.Gender.getEnumValue(100, {
  value: -1,
  th: "not found",
  en: "not found",
}); // {value:-1, th:"not found",en:"not found"}
e.Gender.getEnumValue(100); // {value:-1, th:"not found",en:"not found"}
```

5. to get a list of `enum object`

```ts
import e from "@{{USER_NAME}}/esi_common";

const genderArr = e.Gender.entries;
// [{key: "Male", value : 1, th: "ชาย", en: "male"},
//  {key:"Female", value: 2, th: "หญิง" en: "female"}
// ...]
```

6. work with `class validators`

```ts
// file `dto/something.dto.ts`
import e from "@{{USER_NAME}}/esi_common"

export class SomethingDto{
  ...
  @IsEnum(e.Gender.enums)
  Gender: Number
  ...
}
```

## How to generate a Token (Only for package owner)

1. Go to settings

![image](https://github.com/{{USER_NAME}}/ESI_COMMON/assets/90249534/4118cc43-87b5-49f2-a68b-bbe065cdae57)

2. Settings > Developer Settings > Personal access tokens > Tokens (Classic)

![image](https://github.com/{{USER_NAME}}/ESI_COMMON/assets/90249534/561a076c-489e-4b7d-ba0d-d9b7ee3ec25f)

3. Generate a token with a name and desired expiration date.
4. Select permission to read a package.

![image](https://github.com/{{USER_NAME}}/ESI_COMMON/assets/90249534/49e622bb-f240-4084-9c2b-cfa3d329d465)

## How to add data

1. In folder `src/enumsBaseObjects`. Create a BaseObject that has the following structure

| **Note that declare object `as const` is required**

```ts
const baseObject = {
   [key: string]: {        // key is the enum code for example: Male
     value: number;
     th: string;
     en: string;
   }
} as const
```

2. Create and export a `Enum` Class with **BaseObject** and **default Value** as a input

| Note that type of DefaultValue must match a type of BaseObject

```ts
import { Enums } from "../enumsClass";

export const EnumName = new Enums(BaseObject, DefaultObject);
```

Example:

```ts
import { Enums } from "../enumsClass";

const GenderObj = {
  Female: {
    value: 2,
    th: "หญิง",
    en: "female",
  },
  Male: {
    value: 1,
    th: "ชาย",
    en: "male",
  },
  Other: {
    value: 0,
    th: "อื่นๆ",
    en: "other",
  },
} as const;

export const Gender = new Enums(GenderObj, {
  value: -1,
  en: "not found",
  th: "not found",
});
```

3. In file `index.ts`. Import a enum Class and register in `e` object.

```ts
import { Gender } from "./enumsBaseObjects/person";

const e={
  ...,
  ...,
  Gender
}
```

## Package versioning

- This package have github workflow to automatically `patch` npm version oin every push commit.
- You can change version in `package.js`

```
{
  "name": "@{{USER_NAME}}/esi_common",
  "version": "1.0.14",
  ...
}
```

- with commit message start with `[SKIP] commit message...` can skip redeploy and versioning a package.
