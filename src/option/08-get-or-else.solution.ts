import { Option } from "fp-ts/Option";
import { expect } from "chai";
import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

const getAddressString = (addressOption: Option<string>): string => {
  return pipe(
    addressOption,
    option.getOrElse(() => "No address provided")
  );
};

describe("getAddressString", () => {
  const addressOption1: Option<string> = option.none;
  const addressOption2: Option<string> = option.some("123 Main St");

  it("returns default string when address option is none", () => {
    const result = getAddressString(addressOption1);
    expect(result).to.equal("No address provided");
  });

  it("returns the address string in the correct format when address option is some", () => {
    const result = getAddressString(addressOption2);
    expect(result).to.equal("123 Main St");
  });
});
