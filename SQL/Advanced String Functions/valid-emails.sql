-- Find Users With Valid E-Mails
-- Find users with valid email format
SELECT * 
FROM Users 
WHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode\\.com$';