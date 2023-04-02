import { option } from "fp-ts";
import { expect } from "chai";

interface User {
  id: number;
  name: string;
}

// @ts-ignore
export const getUserById = (users: User[], id: number): option.Option<User> => {
  const user = users.find((u) => u.id === id);
  return user ? option.some(user) : option.none;
};

//TESTS
describe("getUserById", () => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  it("returns an option with user if it exists", () => {
    const user = getUserById(users, 2);
    expect(user).to.deep.equal({ _tag: "Some", value: { id: 2, name: "Bob" } });
  });

  it("returns none if user does not exist", () => {
    const user = getUserById(users, 4);
    expect(user).to.deep.equal({ _tag: "None" });
  });
});
