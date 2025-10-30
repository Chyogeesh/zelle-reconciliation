const cron = require('node-cron');
const reconcileZellePayments = require('./reconcileZelle');

cron.schedule('0 9 * * *', () => reconcileZellePayments('9AM'));
cron.schedule('0 13 * * *', () => reconcileZellePayments('1PM'));
cron.schedule('0 17 * * *', () => reconcileZellePayments('5PM'));
cron.schedule('0 23 * * *', () => reconcileZellePayments('11PM'));
