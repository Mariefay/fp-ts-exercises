import { expect } from "chai";
import { option } from "fp-ts";
import { Option } from "fp-ts/lib/Option";

//@ts-ignore
const getAddress = (addressOption: Option<string>): string | null => {
  //Return null if addressOption is none and the address string if addressOption is some
  //Use option.toNullable()
};

//TESTS
describe("getAddressString", () => {
  const addressOption1: Option<string> = option.none;
  const addressOption2: Option<string> = option.some("123 Main St");

  it("returns null if address option is none", () => {
    const result = getAddress(addressOption1);
    expect(result).to.be.null;
  });

  it("returns the address string in the correct format if address option is some", () => {
    const result = getAddress(addressOption2);
    expect(result).to.equal("123 Main St");
  });
});
