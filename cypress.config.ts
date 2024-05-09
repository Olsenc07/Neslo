import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "zggs7d",
  e2e: {
    setupNodeEvents(on, config) {
      if (process.env["NODE_ENV"] === 'production') {
        config.baseUrl = 'https://www.neslo.ca';
        config.responseTimeout = 60000;
      }
      return config;
    },
    baseUrl: 'http://localhost:4200',
    responseTimeout: 40000,
    specPattern: 'cypress/e2e/*.cy.{js,jsx,ts,tsx}'
  }
});
