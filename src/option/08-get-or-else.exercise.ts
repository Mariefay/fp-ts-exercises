import { Option } from "fp-ts/Option";
import { expect } from "chai";
import { option } from "fp-ts";

//@ts-ignore
const getAddressString = (addressOption: Option<string>): string => {
  //Return "No address provided" if addressOption is none and the address string if addressOption is some
  //Use option.getOrElse()
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
