-- ----------------------------------------------------------
-- drop column index eth_port of telecom_virtual_device
ALTER TABLE `telecom_virtual_device`
DROP COLUMN `eth_port` ;


-- ----------------------------------------------------------
-- drop table request_log
DROP TABLE IF EXISTS `request_log` ;

-- ----------------------------------------------------------
-- drop table third_application
DROP TABLE IF EXISTS `third_application` ;

-- ----------------------------------------------------------
-- drop table merchant_has_third_application
DROP TABLE IF EXISTS `merchant_has_third_application` ;

-- -------------------------------------------
-- drop table acct_phone_bind
DROP TABLE IF EXISTS `acct_phone_bind` ;

-- -------------------------------------------
-- drop table alert_template
DROP TABLE IF EXISTS `alert_template` ;

-- -------------------------------------------
-- drop table alert_template
DROP TABLE IF EXISTS `user_membership` ;

-- -------------------------------------------
-- drop column phone_binded from account
ALTER TABLE `account` DROP COLUMN `phone_binded`;

-- -------------------------------------------
-- drop column source_type and associated_id from sms
ALTER TABLE `sms` DROP COLUMN `source_type`, DROP COLUMN `associated_id`;

-- -------------------------------------------
-- drop column type from message
ALTER TABLE `message` DROP COLUMN `type`;

-- -------------------------------------------
-- drop table wechat_auth_log
DROP TABLE IF EXISTS `wechat_auth_log` ;

-- -------------------------------------------
-- drop table third_application_type
DROP TABLE IF EXISTS `third_application_type` ;

-- -------------------------------------------
-- add column membership_id into terminal_user table
ALTER TABLE `terminal_user`
DROP FOREIGN KEY `fk_terminal_user_user_membership1`;
ALTER TABLE `terminal_user`
DROP COLUMN `membership_id`,
DROP INDEX `fk_terminal_user_user_membership1_idx` ;

-- -------------------------------------------
-- drop table user_whitelist
DROP TABLE IF EXISTS `user_whitelist` ;

-- -------------------------------------------
-- drop table user_blacklist
DROP TABLE IF EXISTS `user_blacklist` ;

-- -------------------------------------------
-- drop table advert_merchant_config
DROP TABLE IF EXISTS `advert_merchant_config`;

-- -------------------------------------------
-- drop table advert_default_config
DROP TABLE IF EXISTS `advert_default_config`;

-- -------------------------------------------
-- drop table terminal_user.phone_number
ALTER TABLE `terminal_user`
DROP COLUMN `phone_number`;

