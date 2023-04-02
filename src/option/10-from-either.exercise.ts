import { Option } from "fp-ts/Option";
import { Either } from "fp-ts/Either";
import { expect } from "chai";
import { either, option } from "fp-ts";

interface User {
  id: number;
  name: string;
  age: number;
}

const getUserById = (id: number): Either<string, User> => {
  if (id < 1) {
    return either.left("Invalid user ID");
  }
  return either.right({ id, name: `User ${id}`, age: id * 10 });
};

//@ts-ignore
const getUserOptionById = (id: number): Option<User> => {
  //create a function that takes an id and returns an option of user using getUserById
};

describe("getUserOptionById", () => {
  it("returns none if user ID is less than 1", () => {
    const result = getUserOptionById(0);
    expect(result).to.equal(option.none);
  });

  it("returns a some object with the user if user ID is valid", () => {
    const result = getUserOptionById(2);
    expect(result).to.eql(option.some({ id: 2, name: "User 2", age: 20 }));
  });
});
