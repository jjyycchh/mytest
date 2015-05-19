USE `twifi_dev` ;

-- =====================================================================================
-- 20140618 drop table third_part_auth
DROP TABLE IF EXISTS `third_part_auth` ;
-- =====================================================================================

-- =====================================================================================
-- 20140617 drop table device_status_log_hx
DROP TABLE IF EXISTS `device_status_log_hx` ;
-- =====================================================================================

-- =====================================================================================
-- 20140616 drop table account_configs
DROP TABLE IF EXISTS `account_configs` ;
-- =====================================================================================

-- =====================================================================================
-- 20140616 change system_config.cfg_value from text to varchar(2000)
ALTER TABLE `system_config` CHANGE COLUMN `cfg_value` `cfg_value` VARCHAR(2000) NULL DEFAULT NULL ;
-- =====================================================================================

-- =====================================================================================
-- 20140611 remove traffic_limit and mins_limit to device table
ALTER TABLE `device` DROP COLUMN `mins_limit`, DROP COLUMN `traffic_limit`;
-- =====================================================================================

-- =====================================================================================
-- 20140610 drop mac from terminal_user table, drop auth_type from portal_template
ALTER TABLE `terminal_user` DROP COLUMN `mac`;
ALTER TABLE `portal_template` DROP COLUMN `auth_type`;
-- =====================================================================================

-- =====================================================================================
-- 20140609 downgrade name and description from '代理商管理' to '客户经理管理'
update permission set name = '客户经理管理', description='客户经理管理' where perm_code = 'REPRESENTATIVE_MGMT';
-- =====================================================================================