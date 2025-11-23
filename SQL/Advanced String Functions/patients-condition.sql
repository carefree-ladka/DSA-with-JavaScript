-- Patients With a Condition
-- Find patients with Type I Diabetes condition
SELECT * 
FROM Patients 
WHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';