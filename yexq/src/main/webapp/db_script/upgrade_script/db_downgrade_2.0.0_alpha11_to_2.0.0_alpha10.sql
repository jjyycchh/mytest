update `system_version` set version = '2.0.0_alpha10', update_datetime = now();

-- -------------------------------------
-- remove column device_id and index on it from portal_page_push_log
ALTER TABLE `portal_page_push_log` DROP COLUMN `device_id`, DROP INDEX `idx_device_id` ;

-- -------------------------------------
-- remove default value from terminal_user_authentication_log.total_up_traffic and total_dw_traffic
ALTER TABLE `terminal_user_authentication_log`
CHANGE COLUMN `total_up_traffic` `total_up_traffic` BIGINT(20) NULL DEFAULT NULL ,
CHANGE COLUMN `total_dw_traffic` `total_dw_traffic` BIGINT(20) NULL DEFAULT NULL ;

-- -------------------------------------
-- remove table portal_site.description
ALTER TABLE `portal_site`
DROP COLUMN `description`;

-- -------------------------------------
-- remove table device_model
DROP TABLE IF EXISTS `device_model`;

-- -------------------------------------
-- remove column produced_devics.device_model_id
ALTER TABLE `produced_devices`
DROP FOREIGN KEY `fk_device_model_idx`;
ALTER TABLE `produced_devices`
DROP COLUMN `device_model_id`,
DROP INDEX `device_model_idx` ;

-- -------------------------------------
-- remove column device.device_model_id
ALTER TABLE `device`
DROP FOREIGN KEY `fk_device_model1_idx`;
ALTER TABLE `device`
DROP COLUMN `device_model_id`,
DROP INDEX `device_model_idx` ;

-- -------------------------------------
-- remove unique index for version back
ALTER TABLE `component`
ADD UNIQUE INDEX `version_type_unq` (`version` ASC);

-- -------------------------------------
-- remove column province, city, county from produced_devices
ALTER TABLE `produced_devices`
DROP COLUMN `county`,
DROP COLUMN `city`,
DROP COLUMN `province`;

-- -------------------------------------
-- remove column province, city, county from org_produced_devices
ALTER TABLE `org_produced_devices`
DROP COLUMN `county`,
DROP COLUMN `city`,
DROP COLUMN `province`;

-- -------------------------------------
-- remove column status from portal_page
ALTER TABLE `portal_page`
DROP COLUMN `status`;

-- -------------------------------------
-- remove column unsupport_api_versions from device_model
ALTER TABLE `device_model`
DROP COLUMN `unsupport_api_versions`;