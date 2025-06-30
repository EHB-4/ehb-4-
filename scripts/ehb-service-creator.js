#!/usr/bin/env node
// EHB Service Creator
const { EHBAutoSystem } = require('../lib/utils/ehbDataPage');

const autoSystem = EHBAutoSystem.getInstance();

async function createService(serviceData) {
  const newService = await autoSystem.addNewService(serviceData);
  console.log('Service created:', newService);
  return newService;
}

module.exports = { createService };
