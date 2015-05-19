-- -------------------------------------------------------------------
-- add columns description, name, ip_addr column from radius_virtual_device
ALTER TABLE `radius_virtual_device`
ADD COLUMN `ip_addr` VARCHAR(64) NULL AFTER `device_id`,
ADD COLUMN `name` VARCHAR(400) NULL AFTER `ip_addr`,
ADD COLUMN `description` TEXT NULL AFTER `name`;


-- -------------------------------------------------------------------
-- add columns port, auth_secret, accounting_secret column from radius_virtual_device
ALTER TABLE `radius_virtual_device`
ADD COLUMN `port` INT NULL AFTER `ip_addr`,
ADD COLUMN `auth_secret` VARCHAR(64) NULL AFTER `port`,
ADD COLUMN `accounting_secret` VARCHAR(64) NULL AFTER `auth_secret`;

ALTER TABLE `radius_virtual_device`
CHANGE COLUMN `wlanacname` `wlanacname` VARCHAR(200) NOT NULL ;

-- --------------------------------------------------------------------
update produced_devices set status='WAITED' where status='UNAUDITED';

-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `application` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `platform` VARCHAR(40) NOT NULL,
  `version` VARCHAR(40) NOT NULL,
  `path` VARCHAR(500) NOT NULL,
  `upload_datetime` DATETIME NOT NULL DEFAULT now(),
  `published_datetime` DATETIME NULL,
  `is_published` TINYINT NOT NULL DEFAULT 0,
  `download_count` BIGINT NOT NULL DEFAULT 0,
  `description` VARCHAR(1000) NULL,
  `thumbnail_path` VARCHAR(800) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `app_unique` (`platform` ASC, `version` ASC))
ENGINE = InnoDB;
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `third_platform` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `domain` VARCHAR(100) NOT NULL,
  `ip_addr` VARCHAR(40) NOT NULL,
  `ip_port` VARCHAR(10) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `province` VARCHAR(45) NOT NULL,
  `city` VARCHAR(250) NOT NULL,
  `county` VARCHAR(250) NULL,
  `user_online_url` VARCHAR(500) NOT NULL,
  `user_offline_url` VARCHAR(500) NOT NULL,
  `description` VARCHAR(1000) NULL,
  `platform_code` VARCHAR(64) NOT NULL,
  `welcome_url` VARCHAR(500) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- ----------------------------------------------------------
ALTER TABLE `portal_template`
ADD COLUMN `description` text NULL AFTER `thumbnail_path`;

-- ----------------------------------------------------------
-- create new table telcom_virtual_device
DROP TABLE IF EXISTS `telecom_virtual_device` ;

CREATE TABLE IF NOT EXISTS `telecom_virtual_device` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `pvlan_id` VARCHAR(16) NOT NULL,
  `cvlan_id` VARCHAR(16) NOT NULL,
  `domain` VARCHAR(250) NULL,
  `name` VARCHAR(300) NULL,
  `description` TEXT NULL,
  `device_id` VARCHAR(64) NOT NULL,
  `account_id` BIGINT NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_telcom_virtual_device_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_telecom_virtual_device_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- ----------------------------------------------------------
-- add unique index on radius_virtual_device.wlanacname
ALTER TABLE `radius_virtual_device`
ADD UNIQUE INDEX `unq_radius_virtual_device_wlanacname` (`wlanacname` ASC);

-- --------------------------------------------------------
-- create new table system_data
DROP TABLE IF EXISTS `system_data`;
CREATE TABLE `system_data` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ===========================================================
-- add column `app_auth_type` for third_platform
ALTER TABLE `third_platform` add COLUMN `app_auth_type` VARCHAR(20) NOT NULL DEFAULT 'THIRD_AUTH' AFTER `create_datetime`;

-- --------------------------------------------------------
-- add terminal_mac into terminal_user_authentication_log
ALTER TABLE `terminal_user_authentication_log`
ADD COLUMN `terminal_mac` VARCHAR(64) NULL AFTER `status`;

-- --------------------------------------------------------
-- set up mac for terminal_user_authentication_log.terminal_mac by terminal_user.mac
update terminal_user_authentication_log as tual
set tual.terminal_mac = (select tu.mac from terminal_user as tu where tu.id = tual.terminal_user_id)
where tual.terminal_mac is null;

-- --------------------------------------------------------
-- add column `type` into device
ALTER TABLE `device`
ADD COLUMN `type` VARCHAR(100) NOT NULL DEFAULT 'CUSTOMIZED_AP' COMMENT 'P2 | FIT_AP | NAS | STANDARD_AP | CUSTOMIZED_AP | THIRD_ACCESS';

update device as d set d.type = 'NAS' where d.device_id in (select device_id from radius_virtual_device);
update device as d set d.type = 'THIRD_ACCESS' where d.device_id in (select virtual_device_id from third_part_auth);
update device as d set d.type = 'P2' where d.device_id in (select platform_code from third_platform);
update device as d set d.type = 'STANDARD_AP' where d.device_id in (select device_id from telecom_virtual_device);

-- --------------------------------------------------------
-- create new table fit_ap_virtual_device
CREATE TABLE IF NOT EXISTS `fit_ap_virtual_device` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `ssid` VARCHAR(255) NOT NULL,
  `ac_device_id` VARCHAR(64) NOT NULL,
  `ap_mac` VARCHAR(60) NOT NULL,
  `device_id` VARCHAR(64) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `fit_ap_unique` (`ssid` ASC, `ac_device_id` ASC, `ap_mac` ASC))
ENGINE = InnoDB;

-- --------------------------------------------------------
-- create new table jubao
CREATE TABLE IF NOT EXISTS `jubao` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `jb_type` TINYINT NOT NULL COMMENT '举报类型\n举报恶意账号(1)\n举报恶意网址(2)\n举报恶意操作(3)\n其它(9)',
  `visious_account` VARCHAR(255) NULL COMMENT '举报恶意操作账号',
  `visious_url` VARCHAR(500) NULL COMMENT '举报恶意网址',
  `jb_description` VARCHAR(2000) NOT NULL COMMENT '举报内容说明',
  `jb_account_id` BIGINT NOT NULL COMMENT '举报人ID',
  `create_datetime` DATETIME NOT NULL DEFAULT now() COMMENT '举报时间',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -------------------------------------------
-- create new table suggest
CREATE TABLE IF NOT EXISTS `suggest` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(2000) NOT NULL,
  `mac` VARCHAR(60) NOT NULL,
  `cellphone` VARCHAR(20) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;