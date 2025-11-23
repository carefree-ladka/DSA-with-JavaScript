-- Last Person to Fit in the Bus
-- Find last person who can fit in bus with 1000kg capacity
SELECT person_name 
FROM (
    SELECT person_name, 
           SUM(weight) OVER (ORDER BY turn) AS running_total 
    FROM Queue 
    ORDER BY turn
) q 
WHERE running_total <= 1000 
ORDER BY running_total DESC 
LIMIT 1;