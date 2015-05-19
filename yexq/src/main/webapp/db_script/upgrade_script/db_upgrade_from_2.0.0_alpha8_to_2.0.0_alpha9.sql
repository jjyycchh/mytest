-- =====================================================================================
-- 20140714 add table `all_devices_hx`
DROP TABLE IF EXISTS `all_devices_hx` ;

CREATE TABLE IF NOT EXISTS `all_devices_hx` (
  `id` VARCHAR(64) NULL,
  `brand` VARCHAR(200) NOT NULL,
  `model` VARCHAR(200) NOT NULL,
  `frameware_version` VARCHAR(400) NOT NULL,
  `component_version` VARCHAR(400) NOT NULL,
  `mac` VARCHAR(60) NOT NULL,
  `pin_code` VARCHAR(60) NULL,
  `config_items` TEXT NULL,
  `create_datetime` DATETIME NOT NULL,
  PRIMARY KEY (`mac`))
ENGINE = InnoDB;

-- =====================================================================================
-- 20140714 add unique restriction for component.type + component.version
ALTER TABLE `component`
ADD UNIQUE INDEX `version_type_unq` (`type` ASC, `version` ASC);

-- =====================================================================================
-- 20140714 rename `terminal_user_authentication_log`.teminal_type to terminal_type
ALTER TABLE `terminal_user_authentication_log`
CHANGE COLUMN `teminal_type` `terminal_type` VARCHAR(100) NULL DEFAULT NULL ;