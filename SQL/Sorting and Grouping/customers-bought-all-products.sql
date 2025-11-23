-- Customers Who Bought All Products
-- Find customers who bought all available products
SELECT customer_id 
FROM Customer 
GROUP BY customer_id 
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);