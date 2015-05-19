-- =====================================================================================
-- 20140714 drop table `all_devices_hx`
DROP TABLE IF EXISTS `all_devices_hx` ;

-- =====================================================================================
-- 20140714 drop unique restriction from component.type + component.version
ALTER TABLE `component`
DROP INDEX `version_type_unq` ;

-- =====================================================================================
-- 20140714 rename `terminal_user_authentication_log`.terminal_type to teminal_type
ALTER TABLE `terminal_user_authentication_log`
CHANGE COLUMN `terminal_type` `teminal_type` VARCHAR(100) NULL DEFAULT NULL ;