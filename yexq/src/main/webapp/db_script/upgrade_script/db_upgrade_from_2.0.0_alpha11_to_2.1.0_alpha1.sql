-- -------------------------------------
-- add table portal_page_push_stats
DROP TABLE IF EXISTS `portal_page_push_stats`;

CREATE TABLE IF NOT EXISTS `portal_page_push_stats` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `hits` BIGINT NOT NULL DEFAULT 0,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `device_id` VARCHAR(64) NOT NULL,
  `portal_page_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_portal_page_push_stats_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_portal_page_push_stats_portal_page1`
    FOREIGN KEY (`portal_page_id`)
    REFERENCES `portal_page` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_portal_page_push_stats_device1_idx` ON `portal_page_push_stats` (`device_id` ASC);

CREATE INDEX `fk_portal_page_push_stats_portal_page1_idx` ON `portal_page_push_stats` (`portal_page_id` ASC);

-- -------------------------------------
-- add table message
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `sender_id` BIGINT NOT NULL,
  `receiver_id` TEXT NOT NULL,
  `owner_id` BIGINT NOT NULL,
  `is_sent` TINYINT(1) NOT NULL,
  `title` VARCHAR(300) NOT NULL,
  `content` TEXT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `is_flaged` TINYINT(1) NOT NULL DEFAULT 0,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `parent_msg_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_sender_id`
    FOREIGN KEY (`sender_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_owner_id`
    FOREIGN KEY (`owner_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_sender_id_idx` ON `message` (`sender_id` ASC);

CREATE INDEX `fk_owner_id_idx` ON `message` (`owner_id` ASC);


-- -----------------------------------------------------
-- Table `radius_virtual_device`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radius_virtual_device` ;

CREATE TABLE IF NOT EXISTS `radius_virtual_device` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `wlanacname` VARCHAR(20) NOT NULL,
  `device_id` VARCHAR(64) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_radius_virtual_device_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_radius_virtual_device_device1_idx` ON `radius_virtual_device` (`device_id` ASC);

------------------------------------------------------------
-- index add
------------------------------------------------------------
create index dsl_create_datetime_idx on device_status_log(create_datetime);
create index tual_create_datetime_idx on terminal_user_authentication_log(create_datetime);
create index pppl_create_datetime_idx on portal_page_push_log(create_datetime);
create index tu_create_datetime_idx on terminal_user(create_datetime);

-- -------------------------------------
-- add status column into produced_devices
ALTER TABLE `produced_devices`
ADD COLUMN `status` VARCHAR(10) DEFAULT 'AUDITED' COMMENT 'AUDITED | WAITED' AFTER `county` ,
ADD COLUMN `manufacturer_id` BIGINT(20) AFTER `create_datetime`;

-- update `produced_devices` set `status`='AUDITED';

ALTER TABLE `device`
ADD COLUMN `manufacturer_id` BIGINT(20) AFTER `create_datetime`;
-- ----------------------------------------------------------------

insert into permission(name, description, perm_code, default_account_type) values('设备厂商管理', '设备厂商管理', 'MANUFACTURER_MGMT', "['SUPER_MAN']");
insert into permission_has_account(permission_id, account_id) select (select id from permission where perm_code = 'MANUFACTURER_MGMT'), (select id from account where username = 'superadmin');

-- -----------------------------------------------------
-- add table `dhcp_info`

DROP TABLE IF EXISTS `dhcp_info` ;

CREATE TABLE IF NOT EXISTS `dhcp_info` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_ip` VARCHAR(64) NOT NULL,
  `mac` VARCHAR(60) NOT NULL,
  `status` VARCHAR(60) NOT NULL DEFAULT 'ONLINE' COMMENT 'ONLINE | OFFLINE',
  `pvlan_id` VARCHAR(16) NOT NULL,
  `cvlan_id` VARCHAR(16) NOT NULL,
  `attribute` TEXT NULL,
  `offline_datetime` DATETIME NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

---------------------------------------------------
-- change jquery from 1.11.0 to 1.8.3
--UPDATE portal_template set template_frame=REPLACE(template_frame, 
--'/resources/portal/auth_module/js/jquery-1.11.0.min.js', 
--'/statics/js/jquery-1.8.3.min.js');

---------------------------------------------------
-- add column manufacturer_id for device_model
ALTER TABLE `device_model`
ADD COLUMN `manufacturer_id` BIGINT(20) AFTER `create_datetime`;

---------------------------------------------------
-- add permission DEVICE_ADMIN_MGMT and MANU_DEVICE_MGMT
insert into permission(name, description, perm_code, default_account_type) values('设备管理员管理', '设备管理员管理', 'DEVICE_ADMIN_MGMT', "['SUPER_MAN']");
insert into permission(name, description, perm_code, default_account_type) values('厂商设备管理', '厂商设备管理', 'MANU_DEVICE_MGMT', "['SUPER_MAN', 'MANUFACTURER', 'DEVICE_ADMIN']");
---------------------------------------------------
-- add permission DEVICE_ADMIN_MGMT and MANU_DEVICE_MGMT for superadmin
insert into permission_has_account(permission_id, account_id) select (select id from permission where perm_code = 'DEVICE_ADMIN_MGMT'), (select id from account where username = 'superadmin');
insert into permission_has_account(permission_id, account_id) select (select id from permission where perm_code = 'MANU_DEVICE_MGMT'), (select id from account where username = 'superadmin');

---------------------------------------------------
-- update device_model data
insert into device_model (brand, model, total_mem)
select k.brand as brand, k.model as model, 64 as total_mem from (
	select brand, model from device 
	where CONCAT(brand,model) not in(
	SELECT CONCAT(brand,model) from device_model
	)
	group by brand, model
	union
	select brand, model from produced_devices 
	where CONCAT(brand,model) not in(
	SELECT CONCAT(brand,model) from device_model
	)
	group by brand, model
) as k group by k.brand, k.model;

---------------------------------------------------
-- add MANUFACTURER from device_model
insert into account(username, fullname, parent_ids, password, email, is_superuser, type, geo_level, geo_location) 
SELECT CONCAT('MANU_',brand) as username, 
brand as fullname, 
'{"directParentIds":["1"], "totalParentIds":["1"]}' as parent_ids,
md5('123456') as password, 
CONCAT(brand, '@51iwifi.com') as email, 
0 as is_superuser,
'MANUFACTURER' as type, 
'4' as geo_level, 
'{"province":"浙江","city":"杭州","county":"","address":""}' as geo_location
from device_model 
where brand != '虚拟设备'
GROUP BY brand;

---------------------------------------------------
-- add permission for MANUFACTURER
insert into permission_has_account(permission_id, account_id)
select (select id from permission where perm_code = 'PROFILE_MGMT') as permission_id,
id as account_id from account where type='MANUFACTURER';

insert into permission_has_account(permission_id, account_id)
select (select id from permission where perm_code = 'MANU_DEVICE_MGMT') as permission_id,
id as account_id from account where type='MANUFACTURER';

---------------------------------------------------
-- update manufacturer_id for device_model
update device_model as d set d.manufacturer_id=(SELECT id from account where username=CONCAT('MANU_',d.brand)) where d.brand!='虚拟设备' and d.model!='虚拟设备';
update device_model as d set d.manufacturer_id=1 where d.brand='虚拟设备' and d.model='虚拟设备';
---------------------------------------------------
-- update device_model_id for device
update device as d set d.device_model_id=(SELECT id from device_model where brand=d.brand and model=d.model) where d.device_model_id is null;
-- update device_model_id for produced_devices
update produced_devices as p set p.device_model_id=(SELECT id from device_model where brand=p.brand and model=p.model) where p.device_model_id is null;
---------------------------------------------------
-- update manufacturer_id for device
update device as d set d.manufacturer_id=(SELECT manufacturer_id from device_model where id=d.device_model_id);
-- update manufacturer_id for produced_devices
update produced_devices as p set p.manufacturer_id=(SELECT manufacturer_id from device_model where id=p.device_model_id);


------------------------------------------------
--SELECT count(*) from device_model where manufacturer_id is null;
--alter table device_model add constraint device_model_manufactureridnotnull check(manufacturer_id is not null);
--
--SELECT count(*) from produced_devices where manufacturer_id is null;
--alter table produced_devices add constraint produced_devices_manufactureridnotnull check(manufacturer_id is not null);
--
--SELECT count(*) from device where manufacturer_id is null;
--alter table device add constraint device_manufactureridnotnull check(manufacturer_id is not null);
drop table location_tmp;
drop table produced_devices_tmp;

