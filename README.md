# typesafe-model-select
Select properties from a model while retaining original types


## Example
```
interface User {
  name: string;
  amount?: number;
  email: string | null;
  password?: string;
  nested: {
    a: number,
    b: string,
    c: {
      g: boolean;
    }
  };
  nestedArr?: {
    a: boolean,
    zz?: number
  }[];
}

const select = {
  name: true,
  email: true,
  password: true,
  amount: true,
  nestedArr: {
    a: true,
    zz: true,
  }
}

const user = {} as SelectModel<User, typeof select>;

user.nestedArr[0].a; // Object is possibly 'undefined'.
user.password.length // Object is possibly 'undefined'.
user.amount.toExponential // Object is possibly 'undefined'
user.name.length //
user.nestedArr?.[0].zz; // Optional chaining to access nested array property
```

## Nested properties

Nested model properties in the `User` interface can be further extracted:

```
const select = {
  nested: {
    a: true,
    b: true,
    c: {
      g: true;
    }
  };
}
```

Properties within array of models can be selected with a similar object:
```
interface Monster {
  type: {
    element: boolean,
    size: number
  }[];
}

const select = {
  type: {
    element: true,
    size: true,
  };
}

```
