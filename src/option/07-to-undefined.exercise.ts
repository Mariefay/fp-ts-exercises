import { Option } from "fp-ts/Option";
import { expect } from "chai";
import { option } from "fp-ts";

//@ts-ignore
const getAddress = (addressOption: Option<string>): string | undefined => {
  //Return null if addressOption is none and the address string if addressOption is some
  //Use option.toUndefined()
};

describe("getAddress", () => {
  const addressOption1: Option<string> = option.none;
  const addressOption2: Option<string> = option.some("123 Main St");

  it("returns undefined if address option is none", () => {
    const result = getAddress(addressOption1);
    expect(result).to.be.undefined;
  });

  it("returns the address string in the correct format if address option is some", () => {
    const result = getAddress(addressOption2);
    expect(result).to.equal("Address: 123 Main St");
  });
});
