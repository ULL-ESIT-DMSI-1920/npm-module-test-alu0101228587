#!javascript
var expect = chai.expect;
describe("gh-members", function() {
  describe("constructor", function() {
    it("should have a default name", function() {
      expect(console.log("abcd")).to.equal("abcd");
    });
    it("should set cow's name if provided", function() {
      var cow = new Cow("Kate");
      expect(cow.name).to.equal("Kate");
    });
  });
});