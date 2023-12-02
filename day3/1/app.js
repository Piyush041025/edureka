const express = require('express');
const app = express();
const port = 3001;

// Load JSON files
const employeesData = require('./employees.json');
const projectsData = require('./projects.json');

// API to get employee details by ID
app.get('/employee/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const employee = employeesData.employees.find(emp => emp.id === employeeId);

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
});

// API to get project details by ID
app.get('/project/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = projectsData.projects.find(proj => proj.projectId === projectId);

    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
});

// API to get employee details along with project details
app.get('/getemployeedetails/:id', async (req, res) => {
    try {
        const employeeId = parseInt(req.params.id);
        const employee = await fetchEmployeeDetails(employeeId);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const projectId = employee.projectId;
        const project = await fetchProjectDetails(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const result = {
            employee: employee,
            project: project
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Helper function to fetch employee details
function fetchEmployeeDetails(employeeId) {
    return new Promise((resolve, reject) => {
        const employee = employeesData.employees.find(emp => emp.id === employeeId);
        resolve(employee);
    });
}

// Helper function to fetch project details
function fetchProjectDetails(projectId) {
    return new Promise((resolve, reject) => {
        const project = projectsData.projects.find(proj => proj.projectId === projectId);
        resolve(project);
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
