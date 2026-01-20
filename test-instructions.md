# EHSM Portal Testing Instructions

## Quick Test Guide

### 1. Start the Application
```bash
npm start
```
The application will open in your default browser at `http://localhost:8080`

### 2. Test Login
- **Employee ID**: `00000001`
- **Password**: `12345`
- Click "Login"

### 3. Verify Dashboard
After successful login, you should see:
- Welcome header with Kaar Technologies branding
- Statistics cards showing:
  - Total Incidents: 4
  - Total Risks: 4
  - Open Incidents: 2
  - High Risks: 2

### 4. Test Incident Management
- Scroll to "Incident Management" section
- Verify 4 incidents are displayed
- Test search functionality
- Check status color coding:
  - Red: Open/High Priority
  - Yellow: In Progress/Medium Priority
  - Green: Closed/Low Priority

### 5. Test Risk Assessment
- Scroll to "Risk Assessment" section
- Verify 4 risks are displayed
- Test search functionality
- Check severity color coding:
  - Red: High Severity
  - Yellow: Medium Severity
  - Green: Low Severity

### 6. Test Responsive Design
- Resize browser window
- Test on mobile device
- Verify layout adapts properly

### 7. Test Logout
- Click "Logout" button in header
- Verify redirect to login page
- Verify session is cleared

## Expected Behavior

### Login Page
- Professional gradient background
- Kaar Technologies branding
- Responsive form layout
- Error handling for invalid credentials

### Dashboard
- Clean, professional interface
- Real-time data display
- Interactive tables with search
- Color-coded status indicators
- Responsive design

### Data Integration
- If SAP server is available: Real OData calls
- If SAP server is unavailable: Automatic fallback to mock data
- Proper error handling in both scenarios

## Troubleshooting

### If Login Fails
1. Check browser console for errors
2. Verify mock data is loading
3. Check network connectivity

### If Data Doesn't Load
1. Application will automatically use mock data
2. Check browser console for OData errors
3. Verify service URLs in manifest.json

### If Styling Issues
1. Clear browser cache
2. Check CSS file loading
3. Verify responsive breakpoints

## Mock Data Details

The application includes comprehensive mock data:
- 1 test user (Employee ID: 00000001)
- 4 sample incidents with various statuses
- 4 sample risks with different severity levels
- Proper date formatting and status indicators

This ensures the application works perfectly even without SAP server connectivity.