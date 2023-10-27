use blog;

create table user(
 id int primary key auto_increment,
 username varchar(50) not null,
 email varchar(255) not null,
 password varchar(255) not null,
 img varchar(255)
 );
 
 use blog;
 alter table user 
 rename to users;
 
 
 create table posts(
   id int primary key auto_increment,
   title varchar(255) not null,
   description varchar(2000) not null,
   img varchar(255) not null,
   uId int not null,
   constraint uid foreign key (uId) references users(id)
   On delete cascade
   on update cascade
 );
 
 insert into users values(null,'Abdo','abdo@abdo.com','abdo','abdo.jpg');
 insert into posts values(null,'lorem title','Lorem ipsum dolor sit amet, consectetur adipiscing
 elit. Duis eu efficitur metus. Proin et eros efficitur, ultrices sem ut, tristique enim.
 Vestibulum mi orci, interdum eget condimentum vitae, consequat id lectus. Aenean augue sapien,
 eleifend ut dapibus vel, tincidunt et libero. Cras semper at est non placerat. Aliquam leo libero,
 cursus eget massa eget, mattis porta lacus. Sed et dolor gravida tellus pellentesque tincidunt. 
 Donec ut mollis ipsum. Proin ipsum est, elementum eget nulla ut, feugiat laoreet quam.
Cras dignissim quam risus, et congue risus posuere ut. Maecenas at tincidunt eros. Aenean
 vitae tempor tortor. In hac habitasse platea dictumst. Duis venenatis tellus sit amet erat 
 tristique convallis. Nulla placerat dignissim odio sit amet commodo. Integer tincidunt ex vel 
 lorem lacinia volutpat. Proin eget tempus libero, vel congue sem. Sed luctus odio et molestie 
 fermentum. Nullam tincidunt arcu in quam tempus, eget porttitor dolor congue. Sed molestie in 
 quam in imperdiet.',
'img.png',1,'2023-10-25 18:23:35');

select * from posts;
select * from users;
delete from posts where id=1;


alter table posts 
add date datetime not null;
