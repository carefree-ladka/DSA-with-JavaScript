-- Classes With at Least 5 Students
-- Find classes with 5 or more students
SELECT class 
FROM Courses 
GROUP BY class 
HAVING COUNT(student) >= 5;