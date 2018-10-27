const { describe, it } = require('mocha');
const { expect } = require('chai');

describe('Fake test', () => {
  it('Must return true', () => {
    expect(true).to.be.equals(true);
  });
});
