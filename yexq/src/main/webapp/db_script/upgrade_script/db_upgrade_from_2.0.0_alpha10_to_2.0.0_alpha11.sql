-- -------------------------------------
-- add column device_id with index to portal_page_push_log to record device which received page
ALTER TABLE `portal_page_push_log` ADD COLUMN `device_id` VARCHAR(64) NULL AFTER `portal_page_id`;
ALTER TABLE `portal_page_push_log` ADD INDEX `idx_device_id` (`device_id` ASC);

-- -------------------------------------
-- add default value to terminal_user_authentication_log.total_up_traffic and total_dw_traffic
ALTER TABLE `terminal_user_authentication_log`
CHANGE COLUMN `total_up_traffic` `total_up_traffic` BIGINT(20) NULL DEFAULT 0 ,
CHANGE COLUMN `total_dw_traffic` `total_dw_traffic` BIGINT(20) NULL DEFAULT 0 ;

-- -------------------------------------
-- add column for portal_ste
ALTER TABLE `portal_site`
ADD COLUMN `description` TEXT NULL AFTER `status`;

-- -------------------------------------
-- add table device_model to store all device model.
DROP TABLE IF EXISTS `device_model` ;
CREATE TABLE IF NOT EXISTS `device_model` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(200) NOT NULL,
  `model` VARCHAR(200) NOT NULL,
  `total_mem` INT NOT NULL,
  `cpu_brand` VARCHAR(200) NULL,
  `cpu_series` VARCHAR(200) NULL,
  `cpu_model` VARCHAR(200) NULL,
  `max_turbo_frequency` INT NULL,
  `cpu_cores` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

ALTER TABLE `device_model`
ADD UNIQUE INDEX `brand_model_unq_idx` (`brand` ASC, `model` ASC);

-- -------------------------------------
-- add device_model_id column into produced_devices with foreign key
ALTER TABLE `produced_devices`
ADD COLUMN `device_model_id` BIGINT NULL AFTER `id`;

ALTER TABLE `produced_devices`
ADD INDEX `device_model_idx` (`device_model_id` ASC);
ALTER TABLE `produced_devices`
ADD CONSTRAINT `fk_device_model_idx`
  FOREIGN KEY (`device_model_id`)
  REFERENCES `device_model` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


-- -------------------------------------
-- add add device_model_id column into device with foreign key
ALTER TABLE `device`
ADD COLUMN `device_model_id` BIGINT NULL AFTER `device_id`;

ALTER TABLE `device`
ADD INDEX `device_model_idx` (`device_model_id` ASC);
ALTER TABLE `device`
ADD CONSTRAINT `fk_device_model1_idx`
  FOREIGN KEY (`device_model_id`)
  REFERENCES `device_model` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

-- -------------------------------------
-- remove unique for component.version.
ALTER TABLE `component`
DROP INDEX `version_type_unq` ;

-- -------------------------------------
-- add provice, city, county into produced_devices
ALTER TABLE `produced_devices`
ADD COLUMN `province` VARCHAR(200) NULL AFTER `config_items`,
ADD COLUMN `city` VARCHAR(200) NULL AFTER `province`,
ADD COLUMN `county` VARCHAR(200) NULL AFTER `city`;

-- -------------------------------------
-- add provice, city, county org_produced_devices produced_devices
ALTER TABLE `org_produced_devices`
ADD COLUMN `province` VARCHAR(200) NULL AFTER `config_items`,
ADD COLUMN `city` VARCHAR(200) NULL AFTER `province`,
ADD COLUMN `county` VARCHAR(200) NULL AFTER `city`;

-- -------------------------------------
-- add is_use_api, create_datetime for device_model
ALTER TABLE `device_model`
ADD COLUMN `is_use_api` TINYINT(1) NOT NULL DEFAULT 1 AFTER `cpu_cores`,
ADD COLUMN `create_datetime` DATETIME NOT NULL DEFAULT now() AFTER `is_use_api`;

-- -------------------------------------
-- initial data for device_model from current device table and produced_devices table
insert into device_model (brand, model, total_mem)
select k.brand as brand, k.model as model, 64 as total_mem from (
	select brand, model from device group by brand, model
	union
	select brand, model from produced_devices group by brand, model
) as k group by k.brand, k.model;

update device_model set is_use_api = 0 where brand = 'RIXIN';
update device_model set is_use_api = 0 where brand = '虚拟设备';

update device as d set device_model_id = (select id from device_model as dm where dm.brand = d.brand and dm.model = d.model);
update produced_devices as pd set device_model_id = (select id from device_model as dm where dm.brand = pd.brand and dm.model = pd.model);

-- -------------------------------------
-- add status default is NORMAL into portal_page
ALTER TABLE `portal_page`
ADD COLUMN `status` VARCHAR(45) NOT NULL DEFAULT 'NORMAL' COMMENT 'NORMAL | DELETED' AFTER `title`;

-- -------------------------------------
-- add unsupport_api_versions column into device_model
ALTER TABLE `device_model`
ADD COLUMN `unsupport_api_versions` TEXT NULL AFTER `is_use_api`;

-- -------------------------------------
-- add system_version table
DROP TABLE IF EXISTS `system_version` ;
CREATE TABLE IF NOT EXISTS `system_version` (
  `version` VARCHAR(200) NOT NULL,
  `update_datetime` DATETIME NOT NULL DEFAULT now())
ENGINE = InnoDB;

insert into `system_version`(version, update_datetime) values ('2.0.0_alpha11', now());

-- -------------------------------------
-- update device_model.unsupport_api_versions column for RIXIN devices
-- update device_model set unsupport_api_versions = '' where brand = 'RIXIN';
