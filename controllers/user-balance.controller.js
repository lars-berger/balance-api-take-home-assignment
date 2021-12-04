const { default: axios } = require('axios');

const mockUserCache = {
  'user-1': {
    BTC: '0.5',
    ETH: '2',
  },
  'user-2': {
    BTC: '0.1',
  },
  'user-3': {
    ETH: '5',
  },
};

function getUserBalances(userId) {
  if (!mockUserCache[userId]) {
    throw new Error("User doesn't exist in cache.");
  }

  return mockUserCache[userId];
}

function getUsdCurrencyPair(currency) {
  return `${currency.toLowerCase()}usd`;
}

async function getLatestCurrencyPairPrice(currencyPair) {
  const response = await axios.get(`https://www.bitstamp.net/api/v2/ticker/${currencyPair}`);

  return Number(response.data.last);
}

const userBalanceController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Get user's balances from cache.
    const userBalances = getUserBalances(userId);

    const currencyValuesPromises = Object.entries(userBalances).map(
      async ([currency, userBalance]) => {
        // Get latest coin price in terms of USD.
        const usdCurrencyPair = getUsdCurrencyPair(currency);
        const latestPrice = await getLatestCurrencyPairPrice(usdCurrencyPair);

        return latestPrice * userBalance;
      },
    );

    // Get total value of user's assets in terms of USD.
    const currencyValues = await Promise.all(currencyValuesPromises);
    const totalBalance = currencyValues.reduce((acc, value) => acc + value, 0);

    res.json({ totalBalance });
  } catch (e) {
    next({ code: 400, message: e.message });
  }
};

module.exports = {
  userBalanceController,
};
