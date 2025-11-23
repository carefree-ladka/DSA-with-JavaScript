-- Biggest Single Number
-- Find the largest number that appears only once
SELECT MAX(num) AS num 
FROM MyNumbers 
WHERE num IN (
    SELECT num 
    FROM MyNumbers 
    GROUP BY num 
    HAVING COUNT(num) = 1
);