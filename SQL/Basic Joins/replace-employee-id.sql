-- Replace Employee ID With The Unique Identifier
-- Join employees with their unique identifiers
SELECT u.unique_id, e.name 
FROM Employees e 
LEFT JOIN EmployeeUNI u ON e.id = u.id;