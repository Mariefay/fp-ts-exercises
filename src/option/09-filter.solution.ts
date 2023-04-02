import { Option } from "fp-ts/Option";
import { expect } from "chai";
import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

const getValidUserAddress = (address: Option<string>): Option<string> =>
  pipe(
    address,
    option.filter((address) => address.length >= 5)
  );

describe("getValidUserAddress", () => {
  it("returns none if user has no address", () => {
    const result = getValidUserAddress(option.none);
    expect(result).to.equal(option.none);
  });

  it("returns none if user has an address that is too short", () => {
    const result = getValidUserAddress(option.of("456"));
    expect(result).to.equal(option.none);
  });

  it("returns the valid address if user has an address that is long enough", () => {
    const result = getValidUserAddress(option.of("123 Main St"));
    expect(result).to.eql(option.some("123 Main St"));
  });
});
