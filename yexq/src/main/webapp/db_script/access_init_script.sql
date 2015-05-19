set @old_unique_checks=@@unique_checks, unique_checks=0;
set @old_foreign_key_checks=@@foreign_key_checks, foreign_key_checks=0;
set @old_sql_mode=@@sql_mode, sql_mode='traditional,allow_invalid_dates';

-- -----------------------------------------------------
-- schema twifi_access
-- -----------------------------------------------------
drop schema if exists `twifi_access` ;
create schema if not exists `twifi_access` default character set utf8 collate utf8_general_ci ;
use `twifi_access` ;

-- -----------------------------------------------------
-- 省份表
-- -----------------------------------------------------
drop table if exists `province` ;
create table if not exists `province` (
  `id` bigint not null auto_increment,
  `name` varchar(255) not null,
  `create_datetime` datetime not null default now(),
  primary key (`id`))
engine = innodb
comment = '所有直辖市，列入省级表格';
create index `province_index_name` on `province` (`name` asc);

-- -----------------------------------------------------
-- 城市表
-- -----------------------------------------------------
drop table if exists `city` ;
create table if not exists `city` (
  `id` bigint not null auto_increment,
  `name` varchar(255) not null,
  `create_datetime` datetime not null default now(),
  `province_id` bigint not null,
  primary key (`id`),
  constraint `fk_city_province1`
    foreign key (`province_id`)
    references `province` (`id`)
    on delete no action
    on update no action)
engine = innodb;
create index `fk_city_province1_idx` on `city` (`province_id` asc);
create index `city_index_name` on `city` (`name` asc);

-- -----------------------------------------------------
-- 区县表
-- -----------------------------------------------------
drop table if exists `county_district` ;
create table if not exists `county_district` (
  `id` bigint not null auto_increment,
  `name` varchar(255) not null,
  `create_datetime` datetime not null default now(),
  `city_id` bigint null,
  `province_id` bigint null,
  primary key (`id`),
  constraint `fk_county_district_city1`
    foreign key (`city_id`)
    references `city` (`id`)
    on delete no action
    on update no action,
  constraint `fk_county_district_city2`
    foreign key (`province_id`)
    references `province` (`id`)
    on delete no action
    on update no action)
engine = innodb;
create index `fk_county_district_city1_idx` on `county_district` (`city_id` asc);
create index `county_district_index` on `county_district` (`name` asc);
create index `fk_county_district_city2_idx` on `county_district` (`province_id` asc);

-- -----------------------------------------------------
--  组件表
-- -----------------------------------------------------
drop table if exists `component` ;
create table if not exists `component` (
  `id` bigint not null auto_increment,
  `ref_counter` bigint not null default 0,
  `version` varchar(200) not null,
  `type` varchar(45) not null default 'firmware' comment 'firmware | component-portal | component-task',
  `status` varchar(20) not null default 'normal' comment 'normal | locked | deleted | draft',
  `description` text null,
  `device_supported` text null,
  `requirements` text null,
  `pkg_path` varchar(800) null,
  `script_path` varchar(800) null,
  `is_mandatory` tinyint(1) not null default false,
  `is_published` tinyint(1) not null default 0,
  `create_datetime` datetime not null default now(),
  primary key (`id`))
engine = innodb;

-- -----------------------------------------------------
-- 设备品牌型号表
-- -----------------------------------------------------
drop table if exists `device_model` ;
create table if not exists `device_model` (
  `id` bigint not null auto_increment,
  `brand` varchar(200) not null,
  `model` varchar(200) not null,
  `total_mem` int not null comment 'unit \"mb\"',
  `cpu_brand` varchar(200) null,
  `cpu_series` varchar(200) null,
  `cpu_model` varchar(200) null,
  `max_turbo_frequency` int null comment 'unit \"ghz\"',
  `cpu_cores` int null,
  `is_use_api` tinyint(1) null default 0,
  `unsupport_api_versions` text null,
  `create_datetime` datetime not null default now(),
  `manufacturer_id` bigint null,
  primary key (`id`))
engine = innodb;
create unique index `brand_model_unq_idx` on `device_model` (`brand` asc, `model` asc);

-- -----------------------------------------------------
-- table `location` 
-- -----------------------------------------------------
drop table if exists `location` ;
create table if not exists `location` (
  `id` bigint not null auto_increment,
  `name` varchar(500) null,
  `description` text null,
  `country` varchar(45) null default '中国' comment '国籍',
  `province` varchar(45) null default '浙江' comment '省',
  `city` varchar(250) null default '杭州' comment '市',
  `county_district` varchar(250) null comment '区 县',
  `address` varchar(500) null comment '详细地址',
  `latitude` double null,
  `longitude` double null,
  `account_id` bigint null,
  `create_datetime` datetime not null default now(),
  primary key (`id`))
engine = innodb;
create index `fk_location_account1_idx` on `location` (`account_id` asc);
	
-- -----------------------------------------------------
-- 设备主表
-- -----------------------------------------------------
drop table if exists `device` ;
create table if not exists `device` (
  `device_id` varchar(64) not null,
  `device_model_id` bigint null,
  `brand` varchar(200) null comment '品牌',
  `model` varchar(200) null comment '型号',
  `name` varchar(200) null,
  `type` varchar(100) not null default 'AC' comment 'FAT-AP | BAS | AC | FIT-AP',
  `status` varchar(45) not null comment 'status:online offline locked',
  `frameware_version` varchar(100) not null comment '固件',
  `component_id` bigint null comment '组件',
  `location_id` bigint null,
  `wan_protocol` varchar(200) not null default 'pppoe' comment 'pppoe',
  `last_online_datetime` datetime null,
  `registeration_date` datetime null,
  `mac` varchar(60) null,
  `startup_task` text null,
  `public_ip` varchar(50) null,
  `config_items` text null,
  `create_datetime` datetime not null default now(),
  `traffic_limit` int null,
  `mins_limit` int null,
  `telcom_account` varchar(200) null,
  `manufacturer_id` bigint null,
  `up_traffic` bigint null,
  `down_traffic` bigint null,
  `ems_dev_id` bigint null comment '网元ID',
  `ems_create_datetime` datetime null comment '网元同步时间',
  `xpos` decimal(8,4) null comment '经度',
  `ypos` decimal(8,4) null comment '维度',
  `fixaddr` varchar(200) null comment '安装地址',
  primary key (`device_id`),
  constraint `fk_device_component1`
    foreign key (`component_id`)
    references `component` (`id`)
    on delete no action
    on update no action,
  constraint `fk_device_location1`
    foreign key (`location_id`)
    references `location` (`id`)
    on delete no action
    on update no action,
  constraint `fk_device_device_model1`
    foreign key (`device_model_id`)
    references `device_model` (`id`)
    on delete no action
    on update no action)
engine = innodb;
create index `fk_device_component1_idx` on `device` (`component_id` asc);
create index `fk_device_location1_idx` on `device` (`location_id` asc);
create index `index_mac` on `device` (`mac` asc);
create index `fk_device_device_model1_idx` on `device` (`device_model_id` asc);

-- -----------------------------------------------------
-- 设备从表 3A设备表
-- -----------------------------------------------------
drop table if exists `aaa_virtual_device` ;
create table if not exists `aaa_virtual_device` (
  `id` bigint not null auto_increment,
  `wlanacname` varchar(200) not null comment 'AC NAME',
  `device_id` varchar(64) not null,
  `ip_addr` varchar(64) null,
  `port` int null,
  `regist_secret` varchar(64) not null default 'ct10000' comment '注册密钥',
  `auth_secret` varchar(64) null,
  `accounting_secret` varchar(64) null,
  `name` varchar(400) null,
  `description` text null comment '描述',
  `create_datetime` datetime not null default now() comment '创建时间',
  primary key (`id`),
  constraint `fk_aaa_virtual_device_device1`
    foreign key (`device_id`)
    references `device` (`device_id`)
    on delete no action
    on update no action)
engine = innodb;
create index `fk_aaa_virtual_device_device1_idx` on `aaa_virtual_device` (`device_id` asc);
create unique index `unq_aaa_virtual_device_wlanacname` on `aaa_virtual_device` (`wlanacname` asc);

-- -----------------------------------------------------
-- 设备从表 vlan设备表
-- -----------------------------------------------------
drop table if exists `vlan_virtual_device` ;
create table if not exists `vlan_virtual_device` (
  `id` bigint not null auto_increment,
  `device_id` varchar(64) not null,
  `pvlan_id` varchar(16) not null comment 'PVLAN',
  `cvlan_id` varchar(16) null comment 'CVLAN',
  `domain` varchar(250) null comment 'DOMAIN，NAS归属地',
  `eth_port` varchar(16) null comment 'ETHPORT，端口号',
  `name` varchar(300) null,
  `description` text null comment '描述',
  `create_datetime` datetime not null default now(),
  `telecom_account` varchar(50) null comment 'ssid',
  `acname` varchar(200) not null comment 'AC NAME',
  `shel` varchar(255) null comment '机架号',
  `slot` varchar(255) null comment '槽位号',
  primary key (`id`),
  constraint `fk_vlan_virtual_device_device1`
    foreign key (`device_id`)
    references `device` (`device_id`)
    on delete no action
    on update no action)
engine = innodb;
create index `fk_vlan_virtual_device_device1_idx` on `vlan_virtual_device` (`device_id` asc);

-- -----------------------------------------------------
-- 设备从表 瘦AP设备表
-- -----------------------------------------------------
drop table if exists `ssid_virtual_device` ;
create table if not exists `ssid_virtual_device` (
  `id` bigint not null auto_increment,
  `ssid` varchar(255) not null comment 'ssid',
  `ac_device_id` varchar(64) not null comment 'AC的device_id',
  `ap_mac` varchar(60) not null comment 'mac地址',
  `device_id` varchar(64) not null comment 'device_id',
  `create_datetime` datetime not null default now(),
  primary key (`id`),
  unique index `ssid_ap_unique` (`ssid` asc, `ac_device_id` asc, `ap_mac` asc))
engine = innodb;

-- -----------------------------------------------------
-- table `produced_devices`
-- -----------------------------------------------------
drop table if exists `produced_devices` ;
create table if not exists `produced_devices` (
  `id` varchar(64) null,
  `ems_dev_id` bigint null,
  `ems_create_datetime` datetime null,
  `device_model_id` bigint null,
  `brand` varchar(200) not null,
  `model` varchar(200) not null,
  `frameware_version` varchar(400) not null,
  `component_version` varchar(400) not null,
  `mac` varchar(60) not null,
  `pin_code` varchar(60) null,
  `config_items` text null,
  `province` varchar(200) null,
  `city` varchar(200) null,
  `county` varchar(200) null,
  `status` varchar(10) null default 'audited' comment '\'audited | waited\'',
  `create_datetime` datetime not null default now(),
  `manufacturer_id` bigint(20) null,
  `xpos` decimal(8,4) null,
  `ypos` decimal(8,4) null,
  `fixaddr` varchar(200) null,
  primary key (`mac`),
  constraint `fk_produced_devices_device_model1`
    foreign key (`device_model_id`)
    references `device_model` (`id`)
    on delete no action
    on update no action)
engine = innodb;
create index `index_mac` on `produced_devices` (`mac` asc);
create index `fk_produced_devices_device_model1_idx` on `produced_devices` (`device_model_id` asc);

-- -----------------------------------------------------
-- 虚AP分组表
-- -----------------------------------------------------
drop table if exists `device_group` ;
create table if not exists `device_group` (
	`group_id` bigint not null auto_increment,
	`group_name` varchar(60) not null comment '组名',
	`note` varchar(600) null comment '备注',
	`province` varchar(200) null comment '省',
	`city` varchar(200) null comment '市',
	`county_district` varchar(200) null comment '区',
	`create_time` datetime not null default now() comment '组创建时间',
	`update_time` datetime null comment '组更新时间',
	primary key (`group_id`))
engine = innodb;
create unique index `device_group_unq_idx` on `device_group` (`group_name` asc);
create index `device_group_id_idx` on `device_group` (`group_id` asc);
create index `device_group_createtime_idx` on `device_group` (`create_time` asc);

-- -----------------------------------------------------
-- 虚AP-分组对照表
-- -----------------------------------------------------
drop table if exists `device_has_device_group` ;
create table if not exists `device_has_device_group` (
	`group_id` bigint not null comment '分组id',
	`device_id` varchar(64) not null comment '设备id',
	primary key (`device_id`, `group_id`),
	constraint `fk_device_has_device_group1`
    foreign key (`device_id`)
    references `device` (`device_id`)
    on delete no action
    on update no action,
    constraint `fk_device_has_device_group2`
    foreign key (`group_id`)
    references `device_group` (`group_id`)
    on delete no action
    on update no action)
engine = innodb;
create unique index `device_has_device_group_unq_idx` on `device_has_device_group` (`group_id` asc, `device_id` asc);
create index `fk_device_has_device_group1_idx` on `device_has_device_group` (`group_id` asc);
create index `fk_device_has_device_group2_idx` on `device_has_device_group` (`device_id` asc);

-- -----------------------------------------------------
-- 接入系统菜单表
-- -----------------------------------------------------
create table menu(
	id int(4) not null,
	name varchar(50) null,
	description varchar(500) null,
	parent_id int(4) null,
	url varchar(200) null,
	type int(4) null,
	flag tinyint(1) null default 0,
	position varchar(200) null,
	unused tinyint(1) null default 0,
	primary key (`id`))
engine = innodb;

-- -----------------------------------------------------
--  系统版本表
-- -----------------------------------------------------
drop table if exists `system_version` ;
create table if not exists `system_version` (
  `version` varchar(200) not null comment '版本号',
  `update_datetime` datetime not null default now())
engine = innodb;

-- -----------------------------------------------------
-- table `account_has_terminal_user` 
-- -----------------------------------------------------
drop table if exists `account_has_terminal_user` ;
create table if not exists `account_has_terminal_user` (
  `account_id` bigint not null,
  `terminal_user_id` bigint not null,
  `memo` text null,
  primary key (`account_id`, `terminal_user_id`))
engine = innodb;
create index `fk_account_has_terminal_user_terminal_user1_idx` on `account_has_terminal_user` (`terminal_user_id` asc);
create index `fk_account_has_terminal_user_account1_idx` on `account_has_terminal_user` (`account_id` asc);

-- -----------------------------------------------------
-- 黑名单表
-- -----------------------------------------------------
drop table if exists `user_blacklist`;
create table `user_blacklist` (
  `id` bigint(20) not null auto_increment,
  `macs` text,
  `device_id` varchar(64) not null default '0',
  `create_datetime` datetime not null default now(),
  primary key (`id`),
  constraint `user_blacklist_ibfk_1` 
  	foreign key (`device_id`) 
  	references `device` (`device_id`) 
  	on delete no action 
  	on update no action) 
engine=innodb;
create index `user_blacklist_device_id_idx` on `user_blacklist` (`device_id`);    

-- -----------------------------------------------------
-- 白名单表
-- -----------------------------------------------------
drop table if exists `user_whitelist`;
create table `user_whitelist` (
  `id` bigint(20) not null auto_increment,
  `macs` text,
  `device_id` varchar(64) not null default '0',
  `create_datetime` datetime not null default now(),
  primary key (`id`),
  constraint `user_whitelist_ibfk_1` 
  	foreign key (`device_id`) 
  	references `device` (`device_id`) 
  	on delete no action 
  	on update no action) 
engine=innodb;
create index `user_whitelist_device_id_idx` on `user_whitelist` (`device_id`);

-- -----------------------------------------------------
-- table `终端用户表`
-- -----------------------------------------------------
drop table if exists `terminal_user`;
create table `terminal_user` (
  `id` bigint(20) not null auto_increment,
  `authentication_type` varchar(100) not null default 'cell number',
  `create_datetime` datetime not null default now(),
  `status` varchar(45) not null default 'offline' comment 'online, offline, locked',
  `memo` varchar(800) default null,
  `auth_type` varchar(45) not null,
  `auth_id` varchar(400) not null,
  `auth_code` varchar(400) default null,
  `parameter` varchar(800) default null,
  `mac` varchar(60) default null,
  `membership_id` bigint(20) default null,
  `phone_number` varchar(32) default null,
  primary key (`id`)) 
engine=innodb;
create index `tu_create_datetime_idx` on `terminal_user` (`create_datetime`);
create index `fk_terminal_user_user_membership1_idx` on `terminal_user` (`membership_id`);
  
-- -----------------------------------------------------
-- table `terminal_user_authentication_log` 
-- -----------------------------------------------------
drop table if exists `terminal_user_authentication_log` ;
create table if not exists `terminal_user_authentication_log` (
  `id` bigint not null auto_increment,
  `terminal_user_id` bigint not null,
  `log_content` text not null,
  `auth_type` varchar(45) null comment 'email, phone, userpwd, general, redius',
  `token` varchar(60) null,
  `device_id` varchar(64) not null,
  `status` varchar(45) null default 'online' comment 'online / offline',
  `terminal_mac` varchar(64) null,
  `offline_datetime` datetime null,
  `terminal_type` varchar(100) null,
  `browser_type` varchar(100) null,
  `total_up_traffic` bigint null default 0,
  `total_dw_traffic` bigint null default 0,
  `modified_datetime` datetime null,
  `create_datetime` datetime not null default now(),
  primary key (`id`),
  constraint `fk_terminal_user_authentication_log_terminal_user1`
    foreign key (`terminal_user_id`)
    references `terminal_user` (`id`)
    on delete no action
    on update no action,
  constraint `fk_terminal_user_authentication_log_device1`
    foreign key (`device_id`)
    references `device` (`device_id`)
    on delete no action
    on update no action)
engine = innodb;
create index `fk_terminal_user_authentication_log_terminal_user1_idx` on `terminal_user_authentication_log` (`terminal_user_id` asc);
create index `fk_terminal_user_authentication_log_device1_idx` on `terminal_user_authentication_log` (`device_id` asc);
create index `tual_create_datetime_idx` on `terminal_user_authentication_log` (`create_datetime` asc);

-- -----------------------------------------------------
-- table `sms`
-- -----------------------------------------------------
drop table if exists `sms` ;
create table if not exists `sms` (
  `id` bigint not null auto_increment,
  `cellphone` varchar(15) not null,
  `content` varchar(400) not null,
  `retry_times` int not null default 0,
  `is_sent` tinyint(1) not null default false,
  `create_datetime` datetime not null default now(),
  `terminal_user_authentication_log_id` bigint null,
  `associated_id` bigint(20) default null,
  `source_type` varchar(45) not null default 'auth_log' comment 'auth_log | phone_bind',
  primary key (`id`),
  constraint `fk_sms_terminal_user_authentication_log1`
    foreign key (`terminal_user_authentication_log_id`)
    references `terminal_user_authentication_log` (`id`)
    on delete no action
    on update no action)
engine = innodb;
create index `fk_sms_terminal_user_authentication_log1_idx` on `sms` (`terminal_user_authentication_log_id` asc);

-- -----------------------------------------------------
-- table `third_part_auth`
-- -----------------------------------------------------
drop table if exists `third_part_auth` ;
create table if not exists `third_part_auth` (
  `id` bigint not null auto_increment,
  `business_name` varchar(200) not null,
  `virtual_device_id` varchar(60) not null,
  `site_id` bigint null,
  `status` varchar(20) not null default 'normal' comment 'normal | locked | deleted',
  `create_datetime` datetime not null default now(),
  primary key (`id`))
engine = innodb;

-- -----------------------------------------------------
-- table `system_config`
-- -----------------------------------------------------
drop table if exists `system_config` ;
create table if not exists `system_config` (
  `id` bigint not null auto_increment,
  `cfg_key` varchar(45) not null,
  `cfg_value` text null,
  `create_datetime` datetime not null default now(),
  primary key (`id`))
engine = innodb;
create unique index `cfg_key_unique` on `system_config` (`cfg_key` asc);

-- -----------------------------------------------------
-- table `third_platform` 
-- -----------------------------------------------------
drop table if exists `third_platform` ;
create table if not exists `third_platform` (
  `id` bigint not null auto_increment,
  `name` varchar(100) not null,
  `domain` varchar(100) not null,
  `ip_addr` varchar(40) not null,
  `ip_port` varchar(10) not null,
  `phone` varchar(15) not null,
  `province` varchar(45) not null,
  `city` varchar(250) not null,
  `county` varchar(250) null,
  `user_online_url` varchar(500) not null,
  `user_offline_url` varchar(500) not null,
  `description` varchar(1000) null,
  `platform_code` varchar(64) not null,
  `welcome_url` varchar(500) null,
  `create_datetime` datetime not null default now(),
  `app_auth_type` varchar(20) not null default 'THIRD_AUTH',
  primary key (`id`))
engine = innodb;

-- -----------------------------------------------------
-- table `terminal_user_has_device` 
-- -----------------------------------------------------
drop table if exists `terminal_user_has_device` ;
create table if not exists `terminal_user_has_device` (
  `terminal_user_id` bigint not null,
  `device_id` varchar(64) not null,
  `status` varchar(45) not null default 'normal' comment 'normal / locked',
  primary key (`terminal_user_id`, `device_id`),
  constraint `fk_terminal_user_has_device_terminal_user1`
    foreign key (`terminal_user_id`)
    references `terminal_user` (`id`)
    on delete no action
    on update no action,
  constraint `fk_terminal_user_has_device_device1`
    foreign key (`device_id`)
    references `device` (`device_id`)
    on delete no action
    on update no action)
engine = innodb;
create index `fk_terminal_user_has_device_device1_idx` on `terminal_user_has_device` (`device_id` asc);
create index `fk_terminal_user_has_device_terminal_user1_idx` on `terminal_user_has_device` (`terminal_user_id` asc);

-- -----------------------------------------------------
-- table `异常日志表`
-- -----------------------------------------------------
drop table if exists `exception_log` ;
create table if not exists `exception_log` (
  `id` bigint not null auto_increment,
  `module_name` varchar(200) not null,
  `service_name` varchar(200) not null,
  `parameter` text null,
  `sys_error_mssage` text null,
  `create_datetime` datetime not null default now(),
  primary key (`id`))
engine = innodb;

set sql_mode=@old_sql_mode;
set foreign_key_checks=@old_foreign_key_checks;
set unique_checks=@old_unique_checks;
