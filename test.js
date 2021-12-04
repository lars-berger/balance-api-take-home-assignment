const { expect } = require('chai');
const sinon = require('sinon');
const { default: axios } = require('axios');

const { userBalanceController } = require('./controllers/user-balance.controller');

describe('User balance controller', () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, 'get');
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it('should send Bitstamp request with correct params', async () => {
    const mockReq = {
      params: {
        userId: 'user-2',
      },
    };

    await userBalanceController(mockReq, {}, () => {});

    expect(axiosGetStub.calledOnceWith('https://www.bitstamp.net/api/v2/ticker/btcusd')).to.be.true;
  });

  it('should send error response if user ID is invalid', async () => {
    const mockReq = {
      params: {
        userId: 'invalid-id',
      },
    };

    const nextSpy = sinon.spy();
    await userBalanceController(mockReq, {}, nextSpy);

    expect("User doesn't exist in cache.").to.be.equal(nextSpy.getCall(0).args[0].message);
  });
});
