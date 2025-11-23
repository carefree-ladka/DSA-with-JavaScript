-- Invalid Tweets
-- Find tweets with content length > 15 characters
SELECT tweet_id 
FROM Tweets 
WHERE LENGTH(content) > 15;