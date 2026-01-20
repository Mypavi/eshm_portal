sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("eshm.controller.Login", {
        onInit() {
            // Initialize login model
            const oLoginModel = new JSONModel({
                employeeId: "",
                password: ""
            });
            this.getView().setModel(oLoginModel);
        },

        onLogin() {
            const oModel = this.getView().getModel();
            const sEmployeeId = oModel.getProperty("/employeeId");
            const sPassword = oModel.getProperty("/password");
            
            // Validate input
            if (!sEmployeeId || !sPassword) {
                this._showMessage("Please enter both Employee ID and Password", "Error");
                return;
            }

            // Show loading
            this._showMessage("Authenticating...", "Information");
            this.byId("loginButton").setEnabled(false);

            // Call OData service for authentication
            this._authenticateUser(sEmployeeId, sPassword);
        },

        _authenticateUser(sEmployeeId, sPassword) {
            const oDataModel = this.getOwnerComponent().getModel();
            const sPath = `/ZESHM_LOGIN_PRSet(Employeeid='${sEmployeeId}',Password='${sPassword}')`;

            oDataModel.read(sPath, {
                success: (oData) => {
                    this._onLoginSuccess(oData, sEmployeeId);
                },
                error: (oError) => {
                    console.warn("OData service not available, using mock data");
                    // Fallback to mock data for development
                    this._authenticateWithMockData(sEmployeeId, sPassword);
                }
            });
        },

        _authenticateWithMockData(sEmployeeId, sPassword) {
            // Import mock data
            sap.ui.require(["eshm/model/mockData"], (mockData) => {
                const user = mockData.validateLogin(sEmployeeId, sPassword);
                if (user) {
                    this._onLoginSuccess({ Employeeid: user.employeeId }, sEmployeeId);
                } else {
                    this._onLoginError({ message: "Invalid credentials" });
                }
            });
        },

        _onLoginSuccess(oData, sEmployeeId) {
            // Store user session data
            const oUserModel = new JSONModel({
                employeeId: sEmployeeId,
                plant: "AT01", // Default plant from the data
                isLoggedIn: true,
                loginTime: new Date()
            });
            
            this.getOwnerComponent().setModel(oUserModel, "user");
            
            this._showMessage("Login successful! Redirecting to dashboard...", "Success");
            
            // Navigate to dashboard after short delay
            setTimeout(() => {
                this.getRouter().navTo("dashboard");
            }, 1500);
        },

        _onLoginError(oError) {
            console.error("Login error:", oError);
            this._showMessage("Invalid Employee ID or Password. Please try again.", "Error");
            this.byId("loginButton").setEnabled(true);
            
            // Clear password field
            this.getView().getModel().setProperty("/password", "");
        },

        _showMessage(sMessage, sType) {
            const oMessageStrip = this.byId("messageStrip");
            oMessageStrip.setText(sMessage);
            oMessageStrip.setType(sType);
            oMessageStrip.setVisible(true);
            
            // Auto-hide success messages
            if (sType === "Success") {
                setTimeout(() => {
                    oMessageStrip.setVisible(false);
                }, 3000);
            }
        },

        getRouter() {
            return this.getOwnerComponent().getRouter();
        }
    });
});