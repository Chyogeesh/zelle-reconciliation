const { getTransactions } = require('./plaidClient');
const { getPendingOrders, updateOrderStatus } = require('./posUtils');
const { notifyManager } = require('./notifyManager');

async function reconcileZellePayments(batchLabel) {
  console.log(`Running Zelle reconciliation batch: ${batchLabel}`);
  const transactions = await getTransactions();
  const zelleTx = transactions.filter(tx => tx.name.toLowerCase().includes('zelle'));
  const pendingOrders = await getPendingOrders();

  for (const order of pendingOrders) {
    const match = zelleTx.find(tx =>
      Math.abs(new Date(tx.date) - new Date(order.timestamp)) < 15 * 60 * 1000 &&
      tx.amount === order.amount
    );

    if (match) {
      await updateOrderStatus(order.id, 'paid');
      await notifyManager(order.id, match.date);
    }
  }
}

module.exports = reconcileZellePayments;
