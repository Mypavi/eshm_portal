## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Mon Jan 19 2026 09:34:16 GMT+0000 (Coordinated Universal Time)|
|**App Generator**<br>SAP Fiori Application Generator|
|**App Generator Version**<br>1.20.1|
|**Generation Platform**<br>SAP Business Application Studio|
|**Template Used**<br>Basic V2|
|**Service Type**<br>SAP System (ABAP On-Premise)|
|**Service URL**<br>http://ecc.virtual:8000/sap/opu/odata/sap/ZESHM_PR_SRV|
|**Module Name**<br>eshm|
|**Application Title**<br>ESHM|
|**Namespace**<br>|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.143.2|
|**Enable TypeScript**<br>False|
|**Add Eslint configuration**<br>False|

## EHSM Portal - Kaar Technologies

Environment, Health & Safety Management Portal built with SAP UI5 for Kaar Technologies.

## Overview

This application provides a comprehensive EHSM (Environment, Health & Safety Management) portal for safety engineers to manage incidents and risks in their assigned plants. The application integrates with SAP S/4HANA system via OData services.

## Features

### 🔐 Authentication
- Secure login with Employee ID and Password
- Integration with SAP OData service for user validation
- Session management with automatic logout

### 📊 Dashboard
- Real-time statistics for incidents and risks
- Visual indicators for priority levels and status
- Plant-specific data filtering

### 🚨 Incident Management
- View all incidents assigned to the logged-in employee
- Filter and search incidents by various criteria
- Status tracking (Open, In Progress, Closed)
- Priority levels (High, Medium, Low)
- Categories (Safety, Operational, Environmental)

### ⚠️ Risk Assessment
- Comprehensive risk management interface
- Risk severity levels (High, Medium, Low)
- Likelihood assessment (Likely, Unlikely, Rare)
- Mitigation measures tracking
- Risk categorization

## Technology Stack

- **Frontend**: SAP UI5 (OpenUI5)
- **Backend**: SAP S/4HANA OData Services
- **Service**: ZESHM_PR_SRV
- **Architecture**: Model-View-Controller (MVC)

## OData Services

### Authentication Service
```
GET /sap/opu/odata/sap/ZESHM_PR_SRV/ZESHM_LOGIN_PRSet(Employeeid='[ID]',Password='[PWD]')
```

### Incident Management Service
```
GET /sap/opu/odata/sap/ZESHM_PR_SRV/ZESHM_INC_PRSet?$filter=EmployeeId eq '[ID]'&$format=json
```

### Risk Assessment Service
```
GET /sap/opu/odata/sap/ZESHM_PR_SRV/ZESHM_risk_PRSet?$filter=EmployeeId eq '[ID]'&$format=json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- SAP UI5 CLI (optional, for advanced development)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd eshm-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure OData Service**
   - Update the service URL in `webapp/manifest.json`
   - Current configuration points to: `https://172.17.19.24:44300/sap/opu/odata/sap/ZESHM_PR_SRV/`

4. **Start the application**
   ```bash
   npm start
   ```

## Testing

### Test Credentials
For development and testing purposes, use these credentials:

- **Employee ID**: `00000001`
- **Password**: `12345`

### Mock Data
The application includes mock data fallback for development when the SAP server is not accessible. Mock data includes:
- Sample incidents with various statuses and priorities
- Sample risks with different severity levels
- Test user authentication

## Project Structure

```
webapp/
├── controller/
│   ├── App.controller.js          # Main app controller
│   ├── Login.controller.js        # Login functionality
│   └── Dashboard.controller.js    # Dashboard and data management
├── view/
│   ├── App.view.xml              # Main app view
│   ├── Login.view.xml            # Login page
│   └── Dashboard.view.xml        # Dashboard with tables
├── model/
│   ├── models.js                 # Device and utility models
│   └── mockData.js              # Mock data for testing
├── css/
│   └── style.css                # Kaar Technologies styling
├── i18n/
│   └── i18n.properties          # Internationalization
├── Component.js                  # App component with routing
└── manifest.json                # App configuration
```

## Key Features Implementation

### 🎨 Kaar Technologies Branding
- Custom color scheme with company colors
- Professional gradient backgrounds
- Responsive design for all devices
- Corporate logo and branding elements

### 🔒 Security Features
- Secure authentication flow
- Session management
- Automatic logout functionality
- Input validation and sanitization

### 📱 Responsive Design
- Mobile-friendly interface
- Tablet optimization
- Desktop-first approach
- Flexible layouts

### 🚀 Performance
- Lazy loading of data
- Efficient OData queries
- Client-side filtering and searching
- Optimized rendering

## Usage Instructions

### Login Process
1. Open the application in your browser
2. Enter your Employee ID (8 digits)
3. Enter your password
4. Click "Login" to authenticate

### Dashboard Navigation
1. View summary statistics at the top
2. Browse incidents in the "Incident Management" section
3. Review risks in the "Risk Assessment" section
4. Use search functionality to find specific records
5. Click on any row to view details (future enhancement)

### Data Management
- **Refresh**: Use refresh buttons to reload latest data
- **Search**: Use search fields to filter records
- **Filter**: Data is automatically filtered by employee and plant
- **Status Indicators**: Color-coded status and priority levels

## Development Guidelines

### Code Standards
- Follow SAP UI5 best practices
- Use consistent naming conventions
- Implement proper error handling
- Add comprehensive comments

### Testing
- Test with both real OData service and mock data
- Verify responsive design on multiple devices
- Test all user interactions and edge cases
- Validate data formatting and display

## Troubleshooting

### Common Issues

1. **OData Service Connection**
   - Verify network connectivity to SAP server
   - Check CORS settings if running locally
   - Ensure proper authentication credentials

2. **Login Issues**
   - Verify Employee ID format (8 digits)
   - Check password requirements
   - Review browser console for errors

3. **Data Loading Problems**
   - Check network connectivity
   - Verify OData service availability
   - Review browser developer tools

### Support
For technical support or questions, contact the Kaar Technologies development team.

## License
© 2026 Kaar Technologies. All rights reserved.

## Version History
- **v1.0.0** - Initial release with login and dashboard functionality
- Features: Authentication, Incident Management, Risk Assessment, Responsive Design

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  To launch the generated application, run the following from the generated application root folder:

```
    npm start
```

- It is also possible to run the application using mock data that reflects the OData Service URL supplied during application generation.  In order to run the application with Mock Data, run the following from the generated app root folder:

```
    npm run start-mock
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)


