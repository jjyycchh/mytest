-- -------------------------------------
-- add new district into 杭州 (added)
-- insert into county_district (name,city_id) select '下沙区',id from city where name='杭州';

-- -----------------------------------------------------
-- add Table `org_produced_deivces`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `org_produced_devices` ;

CREATE TABLE IF NOT EXISTS `org_produced_devices` (
  `id` VARCHAR(64) NULL,
  `brand` VARCHAR(200) NOT NULL,
  `model` VARCHAR(200) NOT NULL,
  `frameware_version` VARCHAR(400) NOT NULL,
  `component_version` VARCHAR(400) NOT NULL,
  `mac` VARCHAR(60) NOT NULL,
  `pin_code` VARCHAR(60) NULL,
  `config_items` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now()
)
ENGINE = InnoDB;