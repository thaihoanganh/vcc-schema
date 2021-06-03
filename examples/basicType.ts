import {
  string,
  number,
  mixed,
  oneOf,
  ValueType,
  date,
  ErrorType,
} from "../dist";

const NormalName = string()
  .min(4, "Tên phải dài hơn 4 ký tự")
  .max(15, "Tên phải ngắn hơn 15 ký tự");

const UserModel = mixed({
  name: NormalName,

  age: number().optional(),

  email: string().email(),

  addressIds: string().array(),

  addressDetails: mixed({
    name: NormalName,
  }).array(),

  stringOrNumber: oneOf([string(), number().max(5)]),

  address: mixed({
    name: NormalName,
    detail: string(),
  }),

  birthDate: date(),
});

type UserEntity = ValueType<typeof UserModel>;

try {
  const user = UserModel.parser({
    name: "gialynguyen",
    age: 23,
    email: "emthanchet@gmail",
    addressIds: [],
    addressDetails: [{ name: "Gialynguyen123" }],
    address: {
      name: "GL123123123",
      detail: "Detail",
    },
    stringOrNumber: 4,
    birthDate: new Date("2021-04-30T07:47:24.168Z"),
  });

  console.log("user: ", user);
} catch (error) {
  const errorObjectLike: ErrorType<UserEntity> = error.format();
  console.log("error: ", JSON.stringify(errorObjectLike, null, 2));
}
