-- Triangle Judgement
-- Determine if three sides can form a triangle
SELECT *, 
       CASE WHEN x + y > z AND x + z > y AND y + z > x 
            THEN 'Yes' 
            ELSE 'No' 
       END AS triangle 
FROM Triangle;