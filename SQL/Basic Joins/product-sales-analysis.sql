-- Product Sales Analysis I
-- Get product name, year, and price for each sale
SELECT p.product_name, s.year, s.price 
FROM Sales s 
JOIN Product p ON s.product_id = p.product_id;