-- Percentage of Users Attended a Contest
-- Calculate percentage of users who registered for each contest
SELECT r.contest_id, 
       ROUND(COUNT(r.user_id) * 100.0 / (SELECT COUNT(*) FROM Users), 2) AS percentage 
FROM Register r 
GROUP BY r.contest_id 
ORDER BY percentage DESC, r.contest_id;