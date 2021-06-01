create database if not exists pasatiempo;

use pasatiempo;

 create table if not exists soluciones (

id int not null auto_increment,
palabra varchar(45) default null,
primary key (id)

);

create table if not exists juegos (

id int not null auto_increment,
tipo varchar(45) default null,
id_soluciones int not null,
foreign key(id_soluciones)
references soluciones(id),
primary key(id)
);

