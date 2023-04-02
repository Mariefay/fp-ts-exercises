import { option } from "fp-ts";
import { Option, some, none } from "fp-ts/Option";
import { expect } from "chai";
import { pipe } from "fp-ts/lib/function";

interface User {
  id: number;
  name: string;
  age: number;
}

const createUserOptionFromAge =
  (age: number) =>
  //@ts-ignore
  (user: User): Option<User> => {
    //Create a function that returns an option from a user.
    //If the user has the same age as the given age, return an option with the user wrapped in some.
    //If the user does not have the same age as the given age, return an option with none.
    //Use the fromPredicate function from the option module.
  };

//TESTS
describe("createUserOptionFromAge", () => {
  const user1: User = { id: 1, name: "Alice", age: 25 };
  const user2: User = { id: 2, name: "Bob", age: 30 };

  it("returns some if user has same age as given age", () => {
    const result = createUserOptionFromAge(30)(user2);
    expect(result).to.deep.equal(some(user2));
  });

  it("returns none if user does not have same age as given age", () => {
    const result = createUserOptionFromAge(20)(user1);
    expect(result).to.deep.equal(none);
  });
});
