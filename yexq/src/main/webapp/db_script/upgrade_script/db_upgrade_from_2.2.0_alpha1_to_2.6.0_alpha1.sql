-- add column eth_port and telecom_account
ALTER table telecom_virtual_device 
add COLUMN `eth_port` VARCHAR(10) NOT NULL AFTER `domain`,
add COLUMN `telecom_account` VARCHAR(50) NOT NULL AFTER `account_id`,
CHANGE COLUMN `createdatetime` `create_datetime` DATETIME NOT NULL DEFAULT now();

-- -------------------------------------------
-- create new table request_log
CREATE TABLE IF NOT EXISTS `request_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(20) NOT NULL,
  `interface_url` VARCHAR(500) NOT NULL,
  `interface_parameter` TEXT NULL,
  `ip_source` VARCHAR(50) NOT NULL,
  `is_success` TINYINT NOT NULL,
  `message` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;

-- -------------------------------------------
-- create new table third_application
CREATE TABLE IF NOT EXISTS `third_application` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `description` VARCHAR(1000) NULL,
  `app_id` VARCHAR(100) NOT NULL,
  `app_key` VARCHAR(100) NOT NULL,
  `thumb_path` VARCHAR(500) NULL,
  `interface_url` VARCHAR(500) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `version` VARCHAR(50) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `type_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_version_unique` (`name` ASC, `version` ASC),
  INDEX `TYPE_idx` (`type_id` ASC),
  CONSTRAINT `TYPE`
    FOREIGN KEY (`type_id`)
    REFERENCES `twifi_dev`.`third_application_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -------------------------------------------
-- create new table merchant_has_third_application
CREATE TABLE IF NOT EXISTS `merchant_has_third_application` (
  `third_app_id` BIGINT NOT NULL,
  `account_id` BIGINT NOT NULL,
  `status` TINYINT NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`third_app_id`, `account_id`),
  INDEX `account_id_idx` (`account_id` ASC),
  UNIQUE INDEX `third_account_unique` (`third_app_id` ASC, `account_id` ASC),
  CONSTRAINT `third_app_id`
    FOREIGN KEY (`third_app_id`)
    REFERENCES `third_application` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `account_id`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -------------------------------------------
-- create table acct_phone_bind
DROP TABLE IF EXISTS `acct_phone_bind` ;

CREATE TABLE `acct_phone_bind` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `account_id` BIGINT NOT NULL,
  `phone_number` VARCHAR(32) NOT NULL,
  `bind_code` VARCHAR(32) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  INDEX `fk_acct_phone_bind_account1_idx` (`account_id` ASC),
  INDEX `idx_acct_phone_bind_code` (`bind_code` ASC),
  CONSTRAINT `fk_acct_phone_bind_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- -------------------------------------------
-- create table alert_template
DROP TABLE IF EXISTS `alert_template` ;

CREATE TABLE `alert_template` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `sms_content` VARCHAR(400) NOT NULL,
  `type` VARCHAR(45) NOT NULL COMMENT '“member_alert” | “device_alert” ',
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`));


-- -------------------------------------------
-- create table alert_template
DROP TABLE IF EXISTS `user_membership` ;

CREATE TABLE `user_membership` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `account_id` BIGINT NOT NULL,
  `full_name` VARCHAR(400) NOT NULL,
  `phone_number` VARCHAR(32) NULL,
  `memo` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  INDEX `fk_user_membership_account1_idx` (`account_id` ASC),
  CONSTRAINT `fk_user_membership_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- -------------------------------------------
-- add column phone_binded into account table
ALTER TABLE `account`
ADD COLUMN `phone_binded` TINYINT(1) NOT NULL DEFAULT 0 AFTER `change_pwd_token`;

-- -------------------------------------------
-- add column associated_id and source_type into sms table
ALTER TABLE `sms`
ADD COLUMN `associated_id` BIGINT NULL AFTER `terminal_user_authentication_log_id`,
ADD COLUMN `source_type` VARCHAR(45) NOT NULL DEFAULT 'auth_log' COMMENT 'auth_log | phone_bind' AFTER `associated_id`;

-- -------------------------------------------
-- add column type into message table
ALTER TABLE `message`
ADD COLUMN `type` VARCHAR(45) NOT NULL DEFAULT 'system_notice' COMMENT 'member_alert | device_alert' AFTER `parent_msg_id`;

-- -------------------------------------------
-- add column membership_id into terminal_user table
ALTER TABLE `terminal_user`
ADD COLUMN `membership_id` BIGINT NULL AFTER `mac`,
ADD INDEX `fk_terminal_user_user_membership1_idx` (`membership_id` ASC);
ALTER TABLE `terminal_user`
ADD CONSTRAINT `fk_terminal_user_user_membership1`
  FOREIGN KEY (`membership_id`)
  REFERENCES `user_membership` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
-- -------------------------------------------
-- create table wechat_auth_log
CREATE TABLE IF NOT EXISTS `wechat_auth_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `wechat_account` VARCHAR(50) NOT NULL,
  `user_open_id` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `terminal_user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `terminal_user_id`
    FOREIGN KEY (`terminal_user_id`)
    REFERENCES `twifi_dev`.`terminal_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -------------------------------------------
-- create new table wechat_auth_log
CREATE TABLE IF NOT EXISTS `third_application_type` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(50) NOT NULL,
  `memo` VARCHAR(50) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;

-- -------------------------------------------
-- create table user_whitelist
DROP TABLE IF EXISTS `user_whitelist` ;

CREATE TABLE IF NOT EXISTS `user_whitelist` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `account_id` BIGINT NOT NULL,
  `mac` VARCHAR(64) NOT NULL,
  `phone_number` VARCHAR(32) NULL,
  `terminal_user_id` BIGINT NULL,
  `device_ids` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  INDEX `fk_user_whitelist_account_id_idx` (`account_id` ASC),
  INDEX `fk_user_whitelist_terminal_user_id_idx` (`terminal_user_id` ASC),
  UNIQUE INDEX `idx_user_whitelist_mac` (`mac` ASC, `account_id` ASC),
  CONSTRAINT `fk_user_whitelist_account_id`
    FOREIGN KEY (`account_id`)
    REFERENCES `twifi_dev`.`account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_whitelist_terminal_user_id`
    FOREIGN KEY (`terminal_user_id`)
    REFERENCES `terminal_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -------------------------------------------
-- create table user_blacklist
DROP TABLE IF EXISTS `user_blacklist` ;

CREATE TABLE IF NOT EXISTS `user_blacklist` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `account_id` BIGINT NOT NULL,
  `mac` VARCHAR(64) NOT NULL,
  `phone_number` VARCHAR(32) NULL,
  `terminal_user_id` BIGINT NULL,
  `device_ids` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  INDEX `fk_user_blacklist_account_id_idx` (`account_id` ASC),
  INDEX `fk_user_blacklist_terminal_user_id_idx` (`terminal_user_id` ASC),
  UNIQUE INDEX `unq_user_blacklist_mac_account` (`mac` ASC, `account_id` ASC),
  CONSTRAINT `fk_user_blacklist_account_id`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_blacklist_terminal_user_id`
    FOREIGN KEY (`terminal_user_id`)
    REFERENCES `terminal_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
-- -------------------------------------------
-- create new table advert_merchant_config
CREATE TABLE IF NOT EXISTS `advert_merchant_config` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `account_id` BIGINT NOT NULL,
  `jscode1` TEXT NULL,
  `status1` VARCHAR(10) NULL,
  `jscode2` TEXT NULL,
  `status2` VARCHAR(10) NULL,
  `jscode3` TEXT NULL,
  `status3` VARCHAR(10) NULL,
  `createdate` DATETIME NOT NULL DEFAULT now(),
  `editdate` DATETIME NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `account_id_idx` (`account_id` ASC),
  UNIQUE INDEX `account_id_UNIQUE` (`account_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `accountId`
    FOREIGN KEY (`account_id`)
    REFERENCES `twifi_dev`.`account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;    

-- -------------------------------------------
-- create new table advert_default_config
CREATE TABLE IF NOT EXISTS `advert_default_config` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `codetype` VARCHAR(10) NULL,
  `jscode` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;

-- -------------------------------------------
-- add column phone_number with table terminal_user
ALTER TABLE `terminal_user`
ADD COLUMN `phone_number` VARCHAR(32) NULL AFTER `membership_id`;
-- -------------------------------------------
-- change length of column `eth_port` with table telecom_virtual_device
ALTER table telecom_virtual_device 
change COLUMN `eth_port` `eth_port` VARCHAR(20) NOT NULL;
-- --------------------------------------------
-- change type of column 'latitude' and 'longitude' with table location
ALTER TABLE `location` 
CHANGE COLUMN `latitude` `latitude` DOUBLE NULL DEFAULT NULL  , 
CHANGE COLUMN `longitude` `longitude` DOUBLE NULL DEFAULT NULL  ;

-- --------------------------------------------
-- 广告平台默认初始化数据
insert into advert_default_config (codetype, jscode) values(1, '<script type="text/javascript">$(document).ready(function(){var _avp=_avp||[];(function(){var s=document.createElement("script");s.type="text/javascript";s.src="http://advert.51iwifi.com/advert/push/js/ad.js";var x=document.getElementsByTagName("script")[0];x.parentNode.insertBefore(s,x);var dev_id=getRequestValue(\'dev_id\');if(!dev_id)dev_id=\'\';s.onload=function(){AD.push("adBox","theBanner",dev_id+"@1024-35585")}})();});</script>');

-- --------------------------------------------
-- 第三方应用分类默认类别
insert into third_application_type (type) values('通用');

-- --------------------------------------------
-- 第三方默认应用  微通宝
insert into third_application (name, app_id, app_key, interface_url, url, version, status, type_id, phone) values('微通宝', '7476c36d', '3db7080eb562', 'http://test.vtongbao.com/iwifi/iwifi/vtongbao.htm', 'http://test.vtongbao.com/iwifi/iwifi/vtongbao.htm', '1.0.0', 'PUBLISHED', 1, '18900000000');

-- --------------------------------------------
-- 默认portal 模板行业
insert into portal_tag(name) values('restaurant'), ('finance'), ('travel'), ('others'), ('tag');

-- --------------------------------------------
-- portal_tag.name 字段添加 unique 属性
ALTER TABLE `portal_tag`
ADD UNIQUE INDEX `portal_tag_name_unq` (`name` ASC);
