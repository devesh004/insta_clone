
CREATE TABLE users(
id integer auto_increment primary key,
fullName varchar(100) not null,
username varchar(256) not null unique,
phoneNo varchar(100),
userPass varchar(1000) not null,
isAdmin boolean default false,
email varchar(100) not null unique,
websites json,
bio varchar(1000),
privacy json,
profileImg varchar(255),
created_at timestamp default now()
);