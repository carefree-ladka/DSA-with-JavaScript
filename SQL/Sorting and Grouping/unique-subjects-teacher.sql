-- Number of Unique Subjects Taught by Each Teacher
-- Count unique subjects per teacher
SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt 
FROM Teacher 
GROUP BY teacher_id;