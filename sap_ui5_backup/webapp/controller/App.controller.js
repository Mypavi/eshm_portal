sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("eshm.controller.App", {
      onInit() {
          // Initialize app-level functionality
          this._initializeApp();
      },

      _initializeApp() {
          // Set up global error handling
          this._setupErrorHandling();
          
          // Initialize app state
          this._initializeAppState();
      },

      _setupErrorHandling() {
          // Global error handler for unhandled promises
          window.addEventListener('unhandledrejection', (event) => {
              console.error('Unhandled promise rejection:', event.reason);
          });
      },

      _initializeAppState() {
          // Any app-level initialization can go here
          console.log("EHSM App initialized successfully");
      }
  });
});