insert into administrator(ID,password)
value("admin","admin");

insert into account(account,password,account_type) value("admin","admin",1);

select * from account;