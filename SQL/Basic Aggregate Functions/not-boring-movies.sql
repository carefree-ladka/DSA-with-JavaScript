-- Not Boring Movies
-- Find movies with odd id and not boring description
SELECT * 
FROM Cinema 
WHERE id % 2 = 1 AND description != 'boring' 
ORDER BY rating DESC;