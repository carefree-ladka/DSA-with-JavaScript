-- Recyclable and Low Fat Products
-- Find products that are both low_fats and recyclable
SELECT product_id 
FROM Products 
WHERE low_fats = 'Y' AND recyclable = 'Y';