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

const userBalanceController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userBalances = getUserBalances(userId);

    res.send(userBalances);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  userBalanceController,
};
