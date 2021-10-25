use insta_clone_database;
show tables;

-- drop table users;

create table users(
id integer auto_increment primary key,
user_name varchar(100),
username varchar(256) unique,
phone_no varchar(100) not null,
user_pass varchar(1000) not null,
email varchar(100) unique,
created_at timestamp default now()
);
desc users;

create table photos(
id integer auto_increment primary key,
image_url varchar(255) not null,
user_id integer not null,
created_at timestamp default now(),
foreign key (user_id) references users(id)
);

create table comments(
id integer auto_increment primary key,
comment_text varchar(255) not null,
user_id integer not null,
photo_id integer not null,
created_at timestamp default now(),
foreign key (user_id) references users(id),
foreign key (photo_id) references photos(id)
);

create table likes(
user_id integer not null,
photo_id integer not null,
created_at timestamp default now(),
foreign key (user_id) references users(id),
foreign key (photo_id) references photos(id),
primary key (user_id,photo_id)
);

create table follows(
follower_id integer not null,
followee_id integer not null,
created_at timestamp default now(),
foreign key (follower_id) references users(id),
foreign key (followee_id) references users(id),
primary key (follower_id,followee_id)
);

create table unfollows(
follower_id integer not null,
followee_id integer not null,
created_at timestamp default now(),
foreign key (follower_id) references users(id),
foreign key (followee_id) references users(id),
primary key (follower_id,followee_id)
);

create table tags(
id integer auto_increment primary key,
tag_name varchar(255) unique,
created_at timestamp
);


create table photo_tags(
photo_id integer not null,
tag_id integer not null,
foreign key (photo_id) references photos(id),
foreign key (tag_id) references tags(id),
primary key (photo_id,tag_id)
);



