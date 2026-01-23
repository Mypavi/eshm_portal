sap.ui.define([
    "sap/ui/core/UIComponent",
    "eshm/model/models",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], (UIComponent, models, JSONModel, ResourceModel) => {
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

            // Initialize i18n model explicitly
            this._initializeI18n();

            // Initialize user session
            this._initializeUserSession();

            // enable routing
            this.getRouter().initialize();
        },

        _initializeI18n() {
            // Create i18n model explicitly to avoid locale issues
            const oI18nModel = new ResourceModel({
                bundleName: "eshm.i18n.i18n",
                supportedLocales: ["en"],
                fallbackLocale: "en"
            });
            this.setModel(oI18nModel, "i18n");
        },

        _initializeUserSession() {
            // Initialize empty user model
            const oUserModel = new JSONModel({
                employeeId: "",
                plant: "",
                isLoggedIn: false,
                loginTime: null
            });
            this.setModel(oUserModel, "user");

            // Set up route guards
            const oRouter = this.getRouter();
            oRouter.attachRouteMatched(this._onRouteMatched, this);
        },

        _onRouteMatched(oEvent) {
            const sRouteName = oEvent.getParameter("name");
            const oUserModel = this.getModel("user");
            const bIsLoggedIn = oUserModel && oUserModel.getProperty("/isLoggedIn");

            // Redirect to login if not authenticated and trying to access protected routes
            if (sRouteName === "dashboard" && !bIsLoggedIn) {
                this.getRouter().navTo("login", {}, true);
            }
        }
    });
});