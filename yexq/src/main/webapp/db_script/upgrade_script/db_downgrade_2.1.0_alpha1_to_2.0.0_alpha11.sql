-- -------------------------------------
-- drop table portal_page_push_stats
DROP TABLE IF EXISTS `portal_page_push_stats`;

-- -------------------------------------
-- drop table message
DROP TABLE IF EXISTS `message` ;

-- -----------------------------------------------------
-- drop table `radius_virtual_device`

DROP TABLE IF EXISTS `radius_virtual_device` ;

-- --------------------------------------------------
-- drop column manufacturer_id and status from produced_devices
ALTER TABLE `produced_devices` 
DROP COLUMN `status`,
DROP COLUMN `manufacturer_id`;

---------------------------------------------
-- drop column manufacturer_id from device
ALTER TABLE `device` DROP COLUMN `manufacturer_id`;

-- ------------------------------------------------
-- drop table radius_virtual_device
DROP TABLE IF EXISTS `radius_virtual_device` ;

-- -----------------------------------------------------
-- add table `dhcp_info`
DROP TABLE IF EXISTS `dhcp_info` ;

--------------------------------------------------
-- change jquery from 1.8.3 to 1.11.0
UPDATE portal_template set template_frame=REPLACE(template_frame, 
'/statics/js/jquery-1.8.3.min.js', 
'/resources/portal/auth_module/js/jquery-1.11.0.min.js');

---------------------------------------------------------
-- drop column manufacturer_id and status from device_model
ALTER TABLE `device_model` DROP COLUMN `manufacturer_id`;


