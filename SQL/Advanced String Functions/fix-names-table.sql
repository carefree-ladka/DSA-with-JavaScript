-- Fix Names in a Table
-- Fix names to have first letter uppercase and rest lowercase
SELECT user_id, 
       CONCAT(UPPER(SUBSTRING(name, 1, 1)), LOWER(SUBSTRING(name, 2))) AS name 
FROM Users 
ORDER BY user_id;