use insta_clone_database;

-- most popular registration day
select dayname(created_at) as day,count(*) as total from users group by day order by total desc limit 1;

-- find the users who have never posted a photo
select username from users 
left join photos 
on users.id=user_id
where photos.id is null 
order by username;

-- most liked photo's owner 
select username,image_url,photo_id from likes 
join photos on photos.id=photo_id 
join users on photos.user_id=users.id 
group by photo_id order by count(*) desc limit 1;

use insta_clone_database;

-- how many times does the avg user post
select((select count(*) from photos)/(select count(*) from users)) as avgerage;

-- top 5 most used hashtags
select tag_name,tag_id,count(*) from photo_tags 
group by tag_id order by count(*) desc limit 5;

-- find users who liked every photo 
select username,count(*) from users
join likes on users.id=user_id 
group by users.id
having count(*)=(select count(*) from photos);

select image_url,username,photos.user_id,photos.id,count(*) from photos 
join users on users.id=user_id
join likes on photo_id=photos.id
group by photos.id
order by photos.created_at desc;
