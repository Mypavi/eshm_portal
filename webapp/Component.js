sap.ui.define([
    "sap/ui/core/UIComponent",
    "eshm/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("eshm.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            // Initialize user session check
            this._initializeSession();
        },

        _initializeSession() {
            // Check if there's an existing session
            const oRouter = this.getRouter();
            
            // Navigate to login by default
            oRouter.getRoute("login").attachPatternMatched(this._onLoginMatched, this);
            oRouter.getRoute("dashboard").attachPatternMatched(this._onDashboardMatched, this);
        },

        _onLoginMatched() {
            // Clear any existing user session when accessing login
            this.setModel(null, "user");
        },

        _onDashboardMatched() {
            // Check authentication when accessing dashboard
            const oUserModel = this.getModel("user");
            if (!oUserModel || !oUserModel.getProperty("/isLoggedIn")) {
                this.getRouter().navTo("login");
            }
        }
    });
});