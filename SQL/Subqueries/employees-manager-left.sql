-- Employees Whose Manager Left the Company
-- Find employees whose manager left and salary < 30000
SELECT employee_id 
FROM Employees 
WHERE salary < 30000 
  AND manager_id NOT IN (SELECT employee_id FROM Employees WHERE employee_id IS NOT NULL) 
ORDER BY employee_id;