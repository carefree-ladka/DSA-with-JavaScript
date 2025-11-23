-- Big Countries
-- Find countries with area >= 3M or population >= 25M
SELECT name, population, area 
FROM World 
WHERE area >= 3000000 OR population >= 25000000;