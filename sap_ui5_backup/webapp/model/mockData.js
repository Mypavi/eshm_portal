sap.ui.define([], () => {
    "use strict";

    return {
        // Mock login data
        loginData: {
            "00000001": {
                employeeId: "00000001",
                password: "12345",
                plant: "AT01",
                name: "Safety Engineer"
            },
            "K901900": {
                employeeId: "K901900",
                password: "Pavi@12345",
                plant: "AT01",
                name: "Safety Engineer"
            }
        },

        // Mock incident data based on the provided OData response
        incidentData: [
            {
                "EmployeeId": "00000001",
                "IncidentId": "INC000001",
                "Plant": "AT01",
                "IncidentDescription": "Chemical leak in storage",
                "IncidentCategory": "Safety",
                "IncidentPriority": "High",
                "IncidentStatus": "Open",
                "IncidentDate": "/Date(1755561600000)/",
                "IncidentTime": "PT08H33M24S",
                "CreatedBy": "K901604",
                "CompletionDate": "",
                "CompletionTime": "PT00H00M00S"
            },
            {
                "EmployeeId": "00000001",
                "IncidentId": "INC000006",
                "Plant": "AT01",
                "IncidentDescription": "Equipment malfunction in assembly",
                "IncidentCategory": "Operational",
                "IncidentPriority": "Low",
                "IncidentStatus": "Closed",
                "IncidentDate": "/Date(1755129600000)/",
                "IncidentTime": "PT08H33M24S",
                "CreatedBy": "K901604",
                "CompletionDate": "/Date(1755388800000)/",
                "CompletionTime": "PT00H00M00S"
            },
            {
                "EmployeeId": "00000001",
                "IncidentId": "INC000011",
                "Plant": "AT01",
                "IncidentDescription": "Fire Accident",
                "IncidentCategory": "Environmental",
                "IncidentPriority": "Medium",
                "IncidentStatus": "In Progress",
                "IncidentDate": "/Date(1754697600000)/",
                "IncidentTime": "PT08H33M24S",
                "CreatedBy": "K901604",
                "CompletionDate": "",
                "CompletionTime": "PT00H00M00S"
            },
            {
                "EmployeeId": "00000001",
                "IncidentId": "INC000016",
                "Plant": "AT01",
                "IncidentDescription": "Electrical Hazard",
                "IncidentCategory": "Safety",
                "IncidentPriority": "High",
                "IncidentStatus": "Open",
                "IncidentDate": "/Date(1754265600000)/",
                "IncidentTime": "PT08H33M24S",
                "CreatedBy": "K901604",
                "CompletionDate": "",
                "CompletionTime": "PT00H00M00S"
            },
            {
                "EmployeeId": "K901900",
                "IncidentId": "INC000101",
                "Plant": "AT01",
                "IncidentDescription": "Chemical leak in storage",
                "IncidentCategory": "Safety",
                "IncidentPriority": "High",
                "IncidentStatus": "Open",
                "IncidentDate": "/Date(1755561600000)/",
                "IncidentTime": "PT08H33M24S",
                "CreatedBy": "K901900",
                "CompletionDate": "",
                "CompletionTime": "PT00H00M00S"
            },
            {
                "EmployeeId": "K901900",
                "IncidentId": "INC000102",
                "Plant": "AT01",
                "IncidentDescription": "Equipment malfunction in assembly",
                "IncidentCategory": "Operational",
                "IncidentPriority": "Low",
                "IncidentStatus": "Closed",
                "IncidentDate": "/Date(1755129600000)/",
                "IncidentTime": "PT08H33M24S",
                "CreatedBy": "K901900",
                "CompletionDate": "/Date(1755388800000)/",
                "CompletionTime": "PT00H00M00S"
            },
            {
                "EmployeeId": "K901900",
                "IncidentId": "INC000103",
                "Plant": "AT01",
                "IncidentDescription": "Fire Accident",
                "IncidentCategory": "Environmental",
                "IncidentPriority": "Medium",
                "IncidentStatus": "In Progress",
                "IncidentDate": "/Date(1754697600000)/",
                "IncidentTime": "PT08H33M24S",
                "CreatedBy": "K901900",
                "CompletionDate": "",
                "CompletionTime": "PT00H00M00S"
            }
        ],

        // Mock risk data based on the provided OData response
        riskData: [
            {
                "EmployeeId": "00000001",
                "RiskId": "RISK000001",
                "RiskDescription": "Exposure to chemical",
                "RiskIdentificationDate": "/Date(1755561600000)/",
                "RiskCategory": "Safety",
                "RiskSeverity": "High",
                "Plant": "AT01",
                "MitigationMeasures": "Training",
                "Likelihood": "Likely",
                "CreatedBy": "K901604"
            },
            {
                "EmployeeId": "00000001",
                "RiskId": "RISK000006",
                "RiskDescription": "Machine malfunction",
                "RiskIdentificationDate": "/Date(1755129600000)/",
                "RiskCategory": "Operational",
                "RiskSeverity": "Low",
                "Plant": "AT01",
                "MitigationMeasures": "Automation Upgrade",
                "Likelihood": "Rare",
                "CreatedBy": "K901604"
            },
            {
                "EmployeeId": "00000001",
                "RiskId": "RISK000011",
                "RiskDescription": "Fire risk",
                "RiskIdentificationDate": "/Date(1754697600000)/",
                "RiskCategory": "Environmental",
                "RiskSeverity": "Medium",
                "Plant": "AT01",
                "MitigationMeasures": "Training",
                "Likelihood": "Unlikely",
                "CreatedBy": "K901604"
            },
            {
                "EmployeeId": "00000001",
                "RiskId": "RISK000016",
                "RiskDescription": "Electrical shock haz",
                "RiskIdentificationDate": "/Date(1754265600000)/",
                "RiskCategory": "Safety",
                "RiskSeverity": "High",
                "Plant": "AT01",
                "MitigationMeasures": "Automation Upgrade",
                "Likelihood": "Likely",
                "CreatedBy": "K901604"
            },
            {
                "EmployeeId": "K901900",
                "RiskId": "RISK000101",
                "RiskDescription": "Exposure to chemical",
                "RiskIdentificationDate": "/Date(1755561600000)/",
                "RiskCategory": "Safety",
                "RiskSeverity": "High",
                "Plant": "AT01",
                "MitigationMeasures": "Training",
                "Likelihood": "Likely",
                "CreatedBy": "K901900"
            },
            {
                "EmployeeId": "K901900",
                "RiskId": "RISK000102",
                "RiskDescription": "Machine malfunction",
                "RiskIdentificationDate": "/Date(1755129600000)/",
                "RiskCategory": "Operational",
                "RiskSeverity": "Low",
                "Plant": "AT01",
                "MitigationMeasures": "Automation Upgrade",
                "Likelihood": "Rare",
                "CreatedBy": "K901900"
            },
            {
                "EmployeeId": "K901900",
                "RiskId": "RISK000103",
                "RiskDescription": "Fire risk",
                "RiskIdentificationDate": "/Date(1754697600000)/",
                "RiskCategory": "Environmental",
                "RiskSeverity": "Medium",
                "Plant": "AT01",
                "MitigationMeasures": "Training",
                "Likelihood": "Unlikely",
                "CreatedBy": "K901900"
            }
        ],

        // Utility functions
        validateLogin(employeeId, password) {
            const user = this.loginData[employeeId];
            return user && user.password === password ? user : null;
        },

        getIncidentsByEmployee(employeeId) {
            return this.incidentData.filter(incident => incident.EmployeeId === employeeId);
        },

        getRisksByEmployee(employeeId) {
            return this.riskData.filter(risk => risk.EmployeeId === employeeId);
        }
    };
});