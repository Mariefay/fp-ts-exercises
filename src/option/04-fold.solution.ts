import { Option, some, none } from "fp-ts/Option";
import { expect } from "chai";
import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

interface User {
  id: number;
  name: string;
  email: string;
}

// @ts-ignore
const getUserEmail = (user: Option<User>): string =>
  pipe(
    user,
    option.fold(
      () => "User email not available",
      (user: User) => user.email
    )
  );

//TESTS
describe("getUserEmail", () => {
  const user1: Option<User> = some({
    id: 1,
    name: "Alice",
    email: "alice@example.com",
  });
  const user2: Option<User> = none;

  it("returns user email if available", () => {
    const result = getUserEmail(user1);
    expect(result).to.equal("alice@example.com");
  });

  it("returns default message if user email is not available", () => {
    const result = getUserEmail(user2);
    expect(result).to.equal("User email not available");
  });
});
