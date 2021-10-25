show databases;
use insta_clone_database;

delimiter $$
create trigger prevent_follow_yourself
before insert on follows for each row
begin
if new.follower_id=new.followee_id
then 
signal sqlstate '45000'
set message_text ='You can not follow yoursefl';
end if;
end
$$

delimiter $$ 

create trigger capture_unfollow
after delete on follows for each row
begin
 --  insert into unfollows(follower_id,followee_id)
--   values(old.follower_id,old.followee_id);
  insert into unfollows
  set 
      follower_id=old.follower_id,
      followee_id=old.followee_id;
end 
$$