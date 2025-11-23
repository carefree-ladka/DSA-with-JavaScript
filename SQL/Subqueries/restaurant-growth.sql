-- Restaurant Growth
-- Calculate 7-day moving average of daily amounts
SELECT visited_on, amount, ROUND(amount / 7, 2) AS average_amount 
FROM (
    SELECT DISTINCT visited_on,
           SUM(amount) OVER (ORDER BY visited_on RANGE BETWEEN INTERVAL 6 DAY PRECEDING AND CURRENT ROW) AS amount,
           COUNT(*) OVER (ORDER BY visited_on RANGE BETWEEN INTERVAL 6 DAY PRECEDING AND CURRENT ROW) AS cnt
    FROM Customer
) t 
WHERE cnt = 7;