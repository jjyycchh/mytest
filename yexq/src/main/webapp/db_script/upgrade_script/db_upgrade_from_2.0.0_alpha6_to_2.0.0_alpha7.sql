USE `twifi_dev` ;

-- =====================================================================================
-- 20140609 upgrade name and description from '客户经理管理' to '代理商管理'
update permission set name = '代理商管理', description='代理商管理' where perm_code = 'REPRESENTATIVE_MGMT';
-- =====================================================================================

-- =====================================================================================
-- 20140610 add mac to terminal_user table, add auth_type to portal_template
ALTER TABLE `terminal_user` ADD COLUMN `mac` VARCHAR(60) NULL AFTER `parameter`;
ALTER TABLE `portal_template` ADD COLUMN `auth_type` VARCHAR(60) NULL AFTER `type`;
-- =====================================================================================

-- =====================================================================================
-- 20140611 add traffic_limit and mins_limit to device table
ALTER TABLE `device` ADD COLUMN `traffic_limit` INT NULL AFTER `create_datetime`, ADD COLUMN `mins_limit` INT NULL AFTER `traffic_limit`;
-- =====================================================================================

-- =====================================================================================
-- 20140616 change system_config.cfg_value from varchar(2000) to text
ALTER TABLE `system_config` CHANGE COLUMN `cfg_value` `cfg_value` TEXT NULL DEFAULT NULL ;
-- =====================================================================================

-- =====================================================================================
-- 20140616 create table account_configs
DROP TABLE IF EXISTS `account_configs` ;

CREATE TABLE IF NOT EXISTS `account_configs` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `account_id` BIGINT NOT NULL,
  `cfg_key` VARCHAR(45) NOT NULL,
  `cfg_value` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_account_configs_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_account_configs_account1_idx` ON `account_configs` (`account_id` ASC);
-- =====================================================================================

-- =====================================================================================
-- 20140617 create table device_status_log_hx
DROP TABLE IF EXISTS `device_status_log_hx` ;

CREATE TABLE IF NOT EXISTS `device_status_log_hx` (
  `id` BIGINT NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `status_message` VARCHAR(600) NULL,
  `up_traffic` BIGINT NULL,
  `down_traffic` BIGINT NULL,
  `create_datetime` DATETIME NOT NULL,
  `device_id` VARCHAR(64) NOT NULL,
  `backup_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE INDEX `idx_device_id` ON `device_status_log_hx` (`device_id` ASC);
-- =====================================================================================



-- =====================================================================================
-- 20140618 create table third_part_auth
DROP TABLE IF EXISTS `third_part_auth` ;

CREATE TABLE IF NOT EXISTS `third_part_auth` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `business_name` VARCHAR(200) NOT NULL,
  `virutal_device_id` VARCHAR(60) NOT NULL,
  `site_id` BIGINT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- =====================================================================================
