#!/usr/bin/env ts-node
import {
  EHBAutoSystem,
  EHBPortManager,
  ehbCompleteServices,
  EHBService,
} from '../lib/utils/ehbDataPage';
import * as fs from 'fs';
import * as path from 'path';

const autoSystem = EHBAutoSystem.getInstance();
const portManager = EHBPortManager.getInstance();

function log(msg: string) {
  console.log(`[EHB-AUTO-SYSTEM] ${msg}`);
}

async function startAllServices() {
  log('Starting all autoStart services...');
  await autoSystem.startAutoServices();
  log('All autoStart services started.');
}

async function addService(serviceData: Partial<EHBService>) {
  log(`Adding new service: ${serviceData.name || serviceData.id}`);
  const newService = await autoSystem.addNewService(serviceData);
  log(`Service added: ${newService.name} (Port: ${newService.port})`);
  saveServiceMapping();
}

function saveServiceMapping() {
  const mapping = ehbCompleteServices.map(s => ({
    id: s.id,
    name: s.name,
    port: s.port,
    status: s.status,
  }));
  fs.writeFileSync(
    path.join(__dirname, '../lib/utils/ehb-service-mapping.json'),
    JSON.stringify(mapping, null, 2)
  );
  log('Service mapping updated.');
}

function showStatus() {
  log('EHB Services Status:');
  ehbCompleteServices.forEach(s => {
    console.log(`- ${s.name} [${s.status}] (Port: ${s.port})`);
  });
}

function showHelp() {
  console.log(`EHB Auto System CLI
Usage:
  ts-node scripts/ehb-auto-system.ts <command> [options]

Commands:
  start-all                Start all autoStart services
  add-service <json>       Add a new service (pass JSON string)
  status                   Show status of all services
  help                     Show this help message
`);
}

async function main() {
  const [, , cmd, ...args] = process.argv;
  switch (cmd) {
    case 'start-all':
      await startAllServices();
      break;
    case 'add-service':
      if (!args[0]) {
        log('Please provide service data as JSON string.');
        process.exit(1);
      }
      try {
        const serviceData = JSON.parse(args[0]);
        await addService(serviceData);
      } catch (e) {
        log('Invalid JSON for service data.');
      }
      break;
    case 'status':
      showStatus();
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

main();
