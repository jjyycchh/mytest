USE `twifi_dev` ;
-- ================================================================================================================================================
-- == 20140710 delete record for super_admin sms limit
DELETE FROM `account_configs` WHERE account_id=1 and cfg_key = 'SMS_USABLE_COUNT';
-- =====================================================================================

-- =====================================================================================
-- 20140708 remove unique restriction on account_configs.cfg_key + account.account_id
ALTER TABLE `account_configs` DROP INDEX `unq_account_configs_accountid_cfgkey` ;
-- =====================================================================================

-- =====================================================================================
-- 20140707 remove XiRuan from third_part_auth
DELETE FROM `third_part_auth` WHERE `business_name`='XiRuan';
DELETE FROM `third_part_auth` WHERE `business_name`='ChinaNet';
-- =====================================================================================

-- =====================================================================================
-- 20140707 remove column browser_type and teminal_type from terminal_user_authentication_log
ALTER TABLE `terminal_user_authentication_log`
DROP COLUMN `browser_type`,
DROP COLUMN `teminal_type`;
-- =====================================================================================

-- =====================================================================================
-- 20140703 remove create_datetime from produced_devices
ALTER TABLE `produced_devices` DROP COLUMN `create_datetime`;
-- =====================================================================================

-- =====================================================================================
-- 20140702 drop table sms_purchase_hx
DROP TABLE IF EXISTS `sms_purchase_hx` ;
-- =====================================================================================

-- =====================================================================================
-- 20140630 drop column telcom_account from device table.
ALTER TABLE `device` DROP COLUMN `telcom_account`;
-- =====================================================================================

-- =====================================================================================
-- 20140624 component version upgrade function table rollback
ALTER TABLE `component` 
DROP COLUMN `script_path`,
DROP COLUMN `device_supported`,
DROP COLUMN `type`,
CHANGE COLUMN `pkg_path` `pkg_path` VARCHAR(2000) NULL DEFAULT NULL ;

ALTER TABLE `component` DROP COLUMN `status`;
ALTER TABLE `component` DROP COLUMN `ref_counter`;
ALTER TABLE `component` DROP COLUMN `is_published`;
-- =====================================================================================

-- =====================================================================================
-- 20140624 remove ChinaNet from third_part_auth
DELETE FROM `third_part_auth` WHERE `business_name` = 'ChinaNet';
-- =====================================================================================

-- =====================================================================================
-- 20140624 update for third_part_auth.virtual_device_id typo rollback
ALTER TABLE `third_part_auth` CHANGE COLUMN `virtual_device_id` `virutal_device_id` VARCHAR(60) NOT NULL ;
-- =====================================================================================

-- =====================================================================================
-- 20140623 update or insert virutal device component name
update `component` set `version` ='VIRTUAL COMPONENT' where `version` = '虚拟设备组件';
-- =====================================================================================

-- =====================================================================================
-- 20140623 add new table china_net_auth_request
DROP TABLE IF EXISTS `china_net_auth_request` ;
-- =====================================================================================

-- =====================================================================================
-- 20140623 add column status to third_part_auth
ALTER TABLE `third_part_auth` DROP COLUMN `status`;
-- =====================================================================================