-- Primary Department for Each Employee
-- Find primary department for each employee
SELECT employee_id, department_id 
FROM Employee 
WHERE primary_flag = 'Y' 
   OR employee_id IN (
       SELECT employee_id 
       FROM Employee 
       GROUP BY employee_id 
       HAVING COUNT(department_id) = 1
   );