-- Exchange Seats
-- Swap seats for adjacent students
SELECT id, 
       CASE WHEN id % 2 = 1 AND id < (SELECT COUNT(*) FROM Seat) 
            THEN (SELECT student FROM Seat s2 WHERE s2.id = s1.id + 1)
            WHEN id % 2 = 0 
            THEN (SELECT student FROM Seat s2 WHERE s2.id = s1.id - 1)
            ELSE student 
       END AS student 
FROM Seat s1 
ORDER BY id;