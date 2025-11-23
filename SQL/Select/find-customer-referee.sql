-- Find Customer Referee
-- Find customers not referred by customer with id = 2
SELECT name 
FROM Customer 
WHERE referee_id != 2 OR referee_id IS NULL;