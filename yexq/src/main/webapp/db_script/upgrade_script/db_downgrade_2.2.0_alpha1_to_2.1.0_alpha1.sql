-- -------------------------------------------------------------------
-- remove columns description, name, ip_addr column from radius_virtual_device
ALTER TABLE `radius_virtual_device`
DROP COLUMN `description`,
DROP COLUMN `name`,
DROP COLUMN `ip_addr`;

-- -------------------------------------------------------------------
-- remove columns accounting_secret, auth_secret, port column from radius_virtual_device
ALTER TABLE `radius_virtual_device`
DROP COLUMN `accounting_secret`,
DROP COLUMN `auth_secret`,
DROP COLUMN `port`;

-- -------------------------------------------------------------------
-- change radius_virtual_device.wlanacname from 200 to 20
ALTER TABLE `radius_virtual_device`
CHANGE COLUMN `wlanacname` `wlanacname` VARCHAR(20) NOT NULL ;

--------------------------------------------------------------------
--roll back value of produced_devices.status
update produced_devices set status='UNAUDITED' where status='WAITED';
--------------------------------------------------------------------
--drop table application
drop table `application`;

-------------------------------------------------------------------
drop table `third_platform`;

------------------------------------------------------------
ALTER TABLE `portal_template`
drop COLUMN `description`;

-- ----------------------------------------------------------
-- drop table telecom_virtual_device
DROP TABLE IF EXISTS `telecom_virtual_device` ;

-- ----------------------------------------------------------
-- drop unique index radius_virtual_device.wlanacname
ALTER TABLE `radius_virtual_device`
DROP INDEX `unq_radius_virtual_device_wlanacname` ;

-- ----------------------------------------------------------
-- create new table system_data
DROP TABLE IF EXISTS `system_data`;

-- ----------------------------------------------------------
-- remove column app_auth_type from third_platform
ALTER TABLE `third_platform`
drop COLUMN `app_auth_type`;

-- ----------------------------------------------------------
-- drop column terminal_mac from terminal_user_authentication_log
ALTER TABLE `terminal_user_authentication_log`
DROP COLUMN `terminal_mac`;

-- ----------------------------------------------------------
-- drop column type from device
ALTER TABLE `device`
DROP COLUMN `type`;

-- ----------------------------------------------------------
-- drop table fit_ap_virtual_device
DROP TABLE IF EXISTS `fit_ap_virtual_device`;
-- ----------------------------------------------------------
-- drop table jubao
DROP TABLE IF EXISTS `jubao`;
-- ----------------------------------------------------------
-- drop table suggest
DROP TABLE IF EXISTS `suggest`;

