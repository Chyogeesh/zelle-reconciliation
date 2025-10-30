async function getPendingOrders() {
  return [
    { id: 'ORD123', amount: 100, timestamp: '2025-10-29T12:15:00Z', status: 'awaiting_payment' },
  ];
}

async function updateOrderStatus(orderId, status) {
  console.log(`Order ${orderId} marked as ${status}`);
}

module.exports = { getPendingOrders, updateOrderStatus };
