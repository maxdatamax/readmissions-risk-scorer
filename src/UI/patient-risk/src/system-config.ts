"use strict";

// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
};

/** User packages configuration. */
const packages: any = {
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/header',
  'app/patient-select',
  'app/patient-select/discharge-population',
  'app/patient-select/filter-population-by',
  'app/patient-select/proportion-at-risk',
  'app/readmission-risk-results',
  'app/dropdown',
  /** @cli-barrel */
];

const barrels2: string[] = [
  'ng2-table',
];

const barrels3: string[] = [
  'ng2-bootstrap',
];

const barrels4: string[] = [
  'moment',
];

const barrels5: string[] = [
  'zone',
];


const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

barrels2.forEach((barrelName2: string) => {
  cliSystemConfigPackages[barrelName2] = { main: 'ng2-table' };
});

barrels3.forEach((barrelName3: string) => {
  cliSystemConfigPackages[barrelName3] = { main: 'ng2-bootstrap' };
});

barrels4.forEach((barrelName4: string) => {
  cliSystemConfigPackages[barrelName4] = { main: 'moment' };
});

barrels5.forEach((barrelName5: string) => {
  cliSystemConfigPackages[barrelName5] = { main: 'zone' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js',
    'ng2-table': 'vendor/ng2-table',
    'ng2-bootstrap': 'vendor/ng2-bootstrap',
    'moment': 'vendor/moment',
    'zone': 'vendor/zone'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
