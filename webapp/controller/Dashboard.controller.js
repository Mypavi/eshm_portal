sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/ValueState",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, MessageToast, ValueState, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("eshm.controller.Dashboard", {
        onInit() {
            // Check if user is logged in
            this._checkAuthentication();
            
            // Initialize dashboard model
            const oDashboardModel = new JSONModel({
                totalIncidents: 0,
                totalRisks: 0,
                openIncidents: 0,
                highRisks: 0
            });
            this.getView().setModel(oDashboardModel, "dashboard");

            // Initialize data models
            this.getView().setModel(new JSONModel([]), "incidents");
            this.getView().setModel(new JSONModel([]), "risks");

            // Load data
            this._loadDashboardData();
        },

        _checkAuthentication() {
            const oUserModel = this.getOwnerComponent().getModel("user");
            if (!oUserModel || !oUserModel.getProperty("/isLoggedIn")) {
                this.getRouter().navTo("login");
                return;
            }
        },

        _loadDashboardData() {
            const oUserModel = this.getOwnerComponent().getModel("user");
            const sEmployeeId = oUserModel.getProperty("/employeeId");
            
            if (sEmployeeId) {
                this._loadIncidents(sEmployeeId);
                this._loadRisks(sEmployeeId);
            }
        },

        _loadIncidents(sEmployeeId) {
            const oDataModel = this.getOwnerComponent().getModel();
            const sPath = "/ZESHM_INC_PRSet";
            const aFilters = [new Filter("EmployeeId", FilterOperator.EQ, sEmployeeId)];

            oDataModel.read(sPath, {
                filters: aFilters,
                success: (oData) => {
                    const aIncidents = oData.results || [];
                    this.getView().getModel("incidents").setData(aIncidents);
                    this._updateIncidentStats(aIncidents);
                    MessageToast.show(`Loaded ${aIncidents.length} incidents`);
                },
                error: (oError) => {
                    console.warn("OData service not available for incidents, using mock data");
                    this._loadIncidentsFromMock(sEmployeeId);
                }
            });
        },

        _loadIncidentsFromMock(sEmployeeId) {
            sap.ui.require(["eshm/model/mockData"], (mockData) => {
                const aIncidents = mockData.getIncidentsByEmployee(sEmployeeId);
                this.getView().getModel("incidents").setData(aIncidents);
                this._updateIncidentStats(aIncidents);
                MessageToast.show(`Loaded ${aIncidents.length} incidents (mock data)`);
            });
        },

        _loadRisks(sEmployeeId) {
            const oDataModel = this.getOwnerComponent().getModel();
            const sPath = "/ZESHM_risk_PRSet";
            const aFilters = [new Filter("EmployeeId", FilterOperator.EQ, sEmployeeId)];

            oDataModel.read(sPath, {
                filters: aFilters,
                success: (oData) => {
                    const aRisks = oData.results || [];
                    this.getView().getModel("risks").setData(aRisks);
                    this._updateRiskStats(aRisks);
                    MessageToast.show(`Loaded ${aRisks.length} risks`);
                },
                error: (oError) => {
                    console.warn("OData service not available for risks, using mock data");
                    this._loadRisksFromMock(sEmployeeId);
                }
            });
        },

        _loadRisksFromMock(sEmployeeId) {
            sap.ui.require(["eshm/model/mockData"], (mockData) => {
                const aRisks = mockData.getRisksByEmployee(sEmployeeId);
                this.getView().getModel("risks").setData(aRisks);
                this._updateRiskStats(aRisks);
                MessageToast.show(`Loaded ${aRisks.length} risks (mock data)`);
            });
        },

        _updateIncidentStats(aIncidents) {
            const oDashboardModel = this.getView().getModel("dashboard");
            const iOpenIncidents = aIncidents.filter(incident => 
                incident.IncidentStatus === "Open" || incident.IncidentStatus === "In Progress"
            ).length;

            oDashboardModel.setProperty("/totalIncidents", aIncidents.length);
            oDashboardModel.setProperty("/openIncidents", iOpenIncidents);
        },

        _updateRiskStats(aRisks) {
            const oDashboardModel = this.getView().getModel("dashboard");
            const iHighRisks = aRisks.filter(risk => 
                risk.RiskSeverity === "High"
            ).length;

            oDashboardModel.setProperty("/totalRisks", aRisks.length);
            oDashboardModel.setProperty("/highRisks", iHighRisks);
        },

        onRefreshIncidents() {
            const oUserModel = this.getOwnerComponent().getModel("user");
            const sEmployeeId = oUserModel.getProperty("/employeeId");
            this._loadIncidents(sEmployeeId);
        },

        onRefreshRisks() {
            const oUserModel = this.getOwnerComponent().getModel("user");
            const sEmployeeId = oUserModel.getProperty("/employeeId");
            this._loadRisks(sEmployeeId);
        },

        onSearchIncidents(oEvent) {
            const sQuery = oEvent.getParameter("newValue");
            const oTable = this.byId("incidentTable");
            const oBinding = oTable.getBinding("items");
            
            if (sQuery) {
                const aFilters = [
                    new Filter("IncidentDescription", FilterOperator.Contains, sQuery),
                    new Filter("IncidentCategory", FilterOperator.Contains, sQuery),
                    new Filter("IncidentId", FilterOperator.Contains, sQuery)
                ];
                const oFilter = new Filter({
                    filters: aFilters,
                    and: false
                });
                oBinding.filter([oFilter]);
            } else {
                oBinding.filter([]);
            }
        },

        onSearchRisks(oEvent) {
            const sQuery = oEvent.getParameter("newValue");
            const oTable = this.byId("riskTable");
            const oBinding = oTable.getBinding("items");
            
            if (sQuery) {
                const aFilters = [
                    new Filter("RiskDescription", FilterOperator.Contains, sQuery),
                    new Filter("RiskCategory", FilterOperator.Contains, sQuery),
                    new Filter("RiskId", FilterOperator.Contains, sQuery)
                ];
                const oFilter = new Filter({
                    filters: aFilters,
                    and: false
                });
                oBinding.filter([oFilter]);
            } else {
                oBinding.filter([]);
            }
        },

        onIncidentPress(oEvent) {
            const oContext = oEvent.getSource().getBindingContext("incidents");
            const oIncident = oContext.getObject();
            MessageToast.show(`Selected Incident: ${oIncident.IncidentId}`);
            // Here you can navigate to incident details or open a dialog
        },

        onRiskPress(oEvent) {
            const oContext = oEvent.getSource().getBindingContext("risks");
            const oRisk = oContext.getObject();
            MessageToast.show(`Selected Risk: ${oRisk.RiskId}`);
            // Here you can navigate to risk details or open a dialog
        },

        onLogout() {
            // Clear user session
            this.getOwnerComponent().setModel(null, "user");
            MessageToast.show("Logged out successfully");
            this.getRouter().navTo("login");
        },

        // Formatters
        formatDate(sDate) {
            if (!sDate) return "";
            
            // Handle SAP date format /Date(timestamp)/
            if (typeof sDate === "string" && sDate.includes("/Date(")) {
                const timestamp = parseInt(sDate.match(/\d+/)[0]);
                const date = new Date(timestamp);
                return date.toLocaleDateString();
            }
            
            return new Date(sDate).toLocaleDateString();
        },

        formatPriorityState(sPriority) {
            switch (sPriority) {
                case "High":
                    return ValueState.Error;
                case "Medium":
                    return ValueState.Warning;
                case "Low":
                    return ValueState.Success;
                default:
                    return ValueState.None;
            }
        },

        formatStatusState(sStatus) {
            switch (sStatus) {
                case "Open":
                    return ValueState.Error;
                case "In Progress":
                    return ValueState.Warning;
                case "Closed":
                    return ValueState.Success;
                default:
                    return ValueState.None;
            }
        },

        formatSeverityState(sSeverity) {
            switch (sSeverity) {
                case "High":
                    return ValueState.Error;
                case "Medium":
                    return ValueState.Warning;
                case "Low":
                    return ValueState.Success;
                default:
                    return ValueState.None;
            }
        },

        formatLikelihoodState(sLikelihood) {
            switch (sLikelihood) {
                case "Likely":
                    return ValueState.Error;
                case "Unlikely":
                    return ValueState.Warning;
                case "Rare":
                    return ValueState.Success;
                default:
                    return ValueState.None;
            }
        },

        getRouter() {
            return this.getOwnerComponent().getRouter();
        }
    });
});