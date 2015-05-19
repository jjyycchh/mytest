SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema twifi_dev
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `twifi_dev` ;
CREATE SCHEMA IF NOT EXISTS `twifi_dev` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `twifi_dev` ;

-- -----------------------------------------------------
-- Table `account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `account` ;

CREATE TABLE IF NOT EXISTS `account` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `parent_ids` TEXT NULL COMMENT 'bunch of parent ids with JSON format. This field is null for superuser.',
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `fullname` VARCHAR(200) NULL,
  `avatar_path` VARCHAR(500) NULL,
  `cell_number` VARCHAR(30) NULL,
  `merchant_name` VARCHAR(255) NULL,
  `merchant_description` TEXT NULL,
  `is_superuser` TINYINT(1) NOT NULL DEFAULT False,
  `status` VARCHAR(45) NULL DEFAULT 'NORMAL' COMMENT 'enum: NORMAL, LOCKED',
  `type` VARCHAR(100) NOT NULL COMMENT 'enum: SUPER_MAN, ADMINISTRATOR, REPRESENTATIVE, MERCHANT',
  `attributes` TEXT NULL,
  `geo_level` VARCHAR(200) NULL COMMENT 'enum: COUNTRY, PROVINCE, CITY, COUNTY / DISTRICT',
  `geo_location` TEXT NULL COMMENT 'name of country, province, city, district with JSON format string.',
  `error_password_retry` INT NOT NULL DEFAULT 0 COMMENT 'reset to 0 when login successfully',
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `last_login_datetime` DATETIME NULL,
  `change_pwd_token` VARCHAR(64) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `username_UNIQUE` ON `account` (`username` ASC);


-- -----------------------------------------------------
-- Table `location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `location` ;

CREATE TABLE IF NOT EXISTS `location` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NULL,
  `description` TEXT NULL,
  `country` VARCHAR(45) NULL DEFAULT '中国',
  `province` VARCHAR(45) NULL DEFAULT '浙江',
  `city` VARCHAR(250) NULL DEFAULT '杭州',
  `county_district` VARCHAR(250) NULL,
  `address` VARCHAR(500) NULL,
  `latitude` FLOAT NULL,
  `longitude` FLOAT NULL,
  `account_id` BIGINT NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_location_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_location_account1_idx` ON `location` (`account_id` ASC);


-- -----------------------------------------------------
-- Table `component`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `component` ;

CREATE TABLE IF NOT EXISTS `component` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `ref_counter` BIGINT NOT NULL DEFAULT 0,
  `version` VARCHAR(200) NOT NULL,
  `type` VARCHAR(45) NOT NULL DEFAULT 'FIRMWARE' COMMENT 'FIRMWARE | COMPONENT-PORTAL | COMPONENT-TASK',
  `status` VARCHAR(20) NOT NULL DEFAULT 'NORMAL' COMMENT 'NORMAL | LOCKED | DELETED',
  `description` TEXT NULL,
  `supported_device` TEXT NULL,
  `requirements` TEXT NULL,
  `pkg_path` VARCHAR(800) NULL,
  `script_path` VARCHAR(800) NULL,
  `is_mandatory` TINYINT(1) NOT NULL DEFAULT False,
  `is_published` TINYINT(1) NOT NULL DEFAULT 0,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `device_model`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `device_model` ;

CREATE TABLE IF NOT EXISTS `device_model` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(200) NOT NULL,
  `model` VARCHAR(200) NOT NULL,
  `total_mem` INT NOT NULL COMMENT 'Unit \"MB\"',
  `cpu_brand` VARCHAR(200) NULL,
  `cpu_series` VARCHAR(200) NULL,
  `cpu_model` VARCHAR(200) NULL,
  `max_turbo_frequency` INT NULL COMMENT 'Unit \"GHz\"',
  `cpu_cores` INT NULL,
  `is_use_api` TINYINT(1) NULL DEFAULT 0,
  `unsupport_api_versions` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `manufacturer_id` BIGINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `brand_model_unq_idx` ON `device_model` (`brand` ASC, `model` ASC);


-- -----------------------------------------------------
-- Table `device`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `device` ;

CREATE TABLE IF NOT EXISTS `device` (
  `device_id` VARCHAR(64) NOT NULL,
  `device_model_id` BIGINT NULL,
  `brand` VARCHAR(200) NOT NULL,
  `model` VARCHAR(200) NOT NULL,
  `name` VARCHAR(200) NULL,
  `type` VARCHAR(100) NOT NULL DEFAULT 'CUSTOMIZED_AP' COMMENT 'P2 | FIT_AP | NAS | STANDARD_AP | CUSTOMIZED_AP' /* comment truncated */ /*3*/,
  `status` VARCHAR(45) NOT NULL COMMENT 'Status:ONLINE OFFLINE LOCKED',
  `frameware_version` VARCHAR(400) NOT NULL,
  `component_id` BIGINT NOT NULL,
  `location_id` BIGINT NOT NULL,
  `wan_protocol` VARCHAR(200) NOT NULL DEFAULT 'PPPOE' COMMENT 'PPPOE',
  `last_online_datetime` DATETIME NULL,
  `registeration_date` DATETIME NOT NULL DEFAULT now(),
  `mac` VARCHAR(60) NULL,
  `startup_task` TEXT NULL,
  `public_ip` VARCHAR(50) NULL,
  `config_items` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `traffic_limit` INT NULL,
  `mins_limit` INT NULL,
  `telcom_account` VARCHAR(200) NULL,
  `manufacturer_id` BIGINT NULL,
  PRIMARY KEY (`device_id`),
  CONSTRAINT `fk_device_component1`
    FOREIGN KEY (`component_id`)
    REFERENCES `component` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_device_location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_device_device_model1`
    FOREIGN KEY (`device_model_id`)
    REFERENCES `device_model` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_device_component1_idx` ON `device` (`component_id` ASC);

CREATE INDEX `fk_device_location1_idx` ON `device` (`location_id` ASC);

CREATE INDEX `index_mac` ON `device` (`mac` ASC);

CREATE INDEX `fk_device_device_model1_idx` ON `device` (`device_model_id` ASC);


-- -----------------------------------------------------
-- Table `portal_display_policy`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portal_display_policy` ;

CREATE TABLE IF NOT EXISTS `portal_display_policy` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `account_id` BIGINT NOT NULL,
  `device_ids` TEXT NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT 'NORMAL' COMMENT 'NORMAL / LOCKED / DELETED',
  `display_items` TEXT NULL,
  `latest_update_datetime` DATETIME NULL,
  `latest_update_account_id` BIGINT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_portal_display_policy_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_portal_display_policy_account1_idx` ON `portal_display_policy` (`account_id` ASC);


-- -----------------------------------------------------
-- Table `portal_template`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portal_template` ;

CREATE TABLE IF NOT EXISTS `portal_template` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `default_data` TEXT NULL,
  `type` VARCHAR(15) NOT NULL COMMENT 'enum: AUTH, LOGIN, INSITE',
  `auth_type` VARCHAR(60) NULL,
  `description` TEXT NULL,
  `thumbnail_path` VARCHAR(800) NULL,
  `template_frame` TEXT NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portal_site`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portal_site` ;

CREATE TABLE IF NOT EXISTS `portal_site` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `site_name` VARCHAR(200) NULL,
  `description` TEXT NULL,
  `thumbnail_path` VARCHAR(800) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `created_account_id` BIGINT NOT NULL,
  `account_id` BIGINT NOT NULL,
  `last_edit_account_id` BIGINT NULL,
  `last_update_datetime` DATETIME NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT 'NORMAL' COMMENT 'NORMAL, LOCKED, DELETD',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_portal_site_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_portal_site_account1_idx` ON `portal_site` (`account_id` ASC);


-- -----------------------------------------------------
-- Table `portal_page`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portal_page` ;

CREATE TABLE IF NOT EXISTS `portal_page` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `type` VARCHAR(45) NULL COMMENT 'enum: AUTH, LOGIN, INSITE',
  `status` VARCHAR(45) NOT NULL DEFAULT 'NORMAL' COMMENT 'NORMAL | DELETED',
  `name` VARCHAR(200) NOT NULL,
  `portal_template_id` BIGINT NOT NULL,
  `content` TEXT NULL,
  `push_statis` BIGINT NOT NULL DEFAULT 0,
  `portal_site_id` BIGINT NOT NULL,
  `create_datetime` DATETIME NULL DEFAULT now(),
  `thumbnail_path` VARCHAR(800) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_portal_page_portal_template1`
    FOREIGN KEY (`portal_template_id`)
    REFERENCES `portal_template` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_portal_page_portal_site1`
    FOREIGN KEY (`portal_site_id`)
    REFERENCES `portal_site` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_portal_page_portal_template1_idx` ON `portal_page` (`portal_template_id` ASC);

CREATE INDEX `fk_portal_page_portal_site1_idx` ON `portal_page` (`portal_site_id` ASC);


-- -----------------------------------------------------
-- Table `permission`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `permission` ;

CREATE TABLE IF NOT EXISTS `permission` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `perm_code` VARCHAR(200) NOT NULL,
  `default_account_type` VARCHAR(400) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `email_notice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `email_notice` ;

CREATE TABLE IF NOT EXISTS `email_notice` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `from` VARCHAR(400) NOT NULL,
  `to` TEXT NOT NULL,
  `cc` TEXT NULL,
  `bcc` TEXT NULL,
  `subject` TEXT NOT NULL,
  `body` TEXT NOT NULL,
  `retry_times` INT NOT NULL DEFAULT 0,
  `is_sent` TINYINT(1) NOT NULL DEFAULT FALSE,
  `sent_datetime` DATETIME NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `account_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_email_notice_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_email_notice_account1_idx` ON `email_notice` (`account_id` ASC);


-- -----------------------------------------------------
-- Table `account_operation_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `account_operation_log` ;

CREATE TABLE IF NOT EXISTS `account_operation_log` (
  `id` BIGINT NULL AUTO_INCREMENT,
  `account_id` BIGINT NULL,
  `description` VARCHAR(1000) NULL,
  `source_ip` VARCHAR(30) NOT NULL,
  `source_port` VARCHAR(12) NOT NULL,
  `action_func` VARCHAR(255) NULL,
  `module_name` VARCHAR(255) NOT NULL,
  `service_name` VARCHAR(255) NOT NULL,
  `parameter` TEXT NULL,
  `result` TINYINT(1) NOT NULL,
  `return_message` TEXT NULL,
  `memo` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_account_operation_log_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_account_operation_log_account1_idx` ON `account_operation_log` (`account_id` ASC);


-- -----------------------------------------------------
-- Table `exception_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `exception_log` ;

CREATE TABLE IF NOT EXISTS `exception_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `module_name` VARCHAR(200) NOT NULL,
  `service_name` VARCHAR(200) NOT NULL,
  `parameter` TEXT NULL,
  `sys_error_mssage` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `device_task_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `device_task_log` ;

CREATE TABLE IF NOT EXISTS `device_task_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `command` TEXT NULL,
  `is_success` TINYINT(1) NULL,
  `result_description` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `device_id` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_device_task_log_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_device_task_log_device1_idx` ON `device_task_log` (`device_id` ASC);


-- -----------------------------------------------------
-- Table `network_security_policy`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `network_security_policy` ;

CREATE TABLE IF NOT EXISTS `network_security_policy` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `security_policy` TEXT NOT NULL,
  `create_datetime` DATETIME NOT NULL,
  `device_id` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_network_security_policy_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_network_security_policy_device1_idx` ON `network_security_policy` (`device_id` ASC);


-- -----------------------------------------------------
-- Table `background_task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `background_task` ;

CREATE TABLE IF NOT EXISTS `background_task` (
  `id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `script_path` VARCHAR(1000) NULL,
  `execute_command` VARCHAR(1000) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portal_traffic_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portal_traffic_log` ;

CREATE TABLE IF NOT EXISTS `portal_traffic_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `URL` TEXT NOT NULL,
  `portal_page_id` BIGINT NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_portal_traffic_log_portal_page1`
    FOREIGN KEY (`portal_page_id`)
    REFERENCES `portal_page` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_portal_traffic_log_portal_page1_idx` ON `portal_traffic_log` (`portal_page_id` ASC);


-- -----------------------------------------------------
-- Table `device_status_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `device_status_log` ;

CREATE TABLE IF NOT EXISTS `device_status_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL DEFAULT 'HEARTBEAT' COMMENT 'enum: HEARTBEAT, REGISTRATION, ONLINE, OFFLINE',
  `status_message` VARCHAR(600) NOT NULL,
  `up_traffic` BIGINT NULL,
  `down_traffic` BIGINT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `device_id` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_device_status_log_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_device_status_log_device1_idx` ON `device_status_log` (`device_id` ASC);

CREATE INDEX `dsl_create_datetime_idx` ON `device_status_log` (`create_datetime` ASC);


-- -----------------------------------------------------
-- Table `device_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `device_tag` ;

CREATE TABLE IF NOT EXISTS `device_tag` (
  `id` BIGINT NOT NULL,
  `name` VARCHAR(400) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `terminal_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `terminal_user` ;

CREATE TABLE IF NOT EXISTS `terminal_user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `authentication_type` VARCHAR(100) NOT NULL DEFAULT 'cell number',
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `status` VARCHAR(45) NOT NULL DEFAULT 'OFFLINE' COMMENT 'ONLINE, OFFLINE, LOCKED',
  `memo` VARCHAR(800) NULL,
  `auth_type` VARCHAR(45) NOT NULL,
  `auth_id` VARCHAR(400) NOT NULL,
  `auth_code` VARCHAR(400) NULL,
  `parameter` VARCHAR(800) NULL,
  `mac` VARCHAR(60) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE INDEX `tu_create_datetime_idx` ON `terminal_user` (`create_datetime` ASC);


-- -----------------------------------------------------
-- Table `terminal_user_authentication_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `terminal_user_authentication_log` ;

CREATE TABLE IF NOT EXISTS `terminal_user_authentication_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `terminal_user_id` BIGINT NOT NULL,
  `log_content` TEXT NOT NULL,
  `auth_type` VARCHAR(45) NULL COMMENT 'EMAIL, PHONE, USERPWD, GENERAL, REDIUS',
  `token` VARCHAR(60) NULL,
  `device_id` VARCHAR(64) NOT NULL,
  `status` VARCHAR(45) NULL DEFAULT 'ONLINE' COMMENT 'ONLINE / OFFLINE',
  `terminal_mac` VARCHAR(64) NULL,
  `offline_datetime` DATETIME NULL,
  `terminal_type` VARCHAR(100) NULL,
  `browser_type` VARCHAR(100) NULL,
  `total_up_traffic` BIGINT NULL DEFAULT 0,
  `total_dw_traffic` BIGINT NULL DEFAULT 0,
  `modified_datetime` DATETIME NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_terminal_user_authentication_log_terminal_user1`
    FOREIGN KEY (`terminal_user_id`)
    REFERENCES `terminal_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_terminal_user_authentication_log_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_terminal_user_authentication_log_terminal_user1_idx` ON `terminal_user_authentication_log` (`terminal_user_id` ASC);

CREATE INDEX `fk_terminal_user_authentication_log_device1_idx` ON `terminal_user_authentication_log` (`device_id` ASC);

CREATE INDEX `tual_create_datetime_idx` ON `terminal_user_authentication_log` (`create_datetime` ASC);


-- -----------------------------------------------------
-- Table `sms`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sms` ;

CREATE TABLE IF NOT EXISTS `sms` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `cellphone` VARCHAR(15) NOT NULL,
  `content` VARCHAR(400) NOT NULL,
  `retry_times` INT NOT NULL DEFAULT 0,
  `is_sent` TINYINT(1) NOT NULL DEFAULT FALSE,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `terminal_user_authentication_log_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_sms_terminal_user_authentication_log1`
    FOREIGN KEY (`terminal_user_authentication_log_id`)
    REFERENCES `terminal_user_authentication_log` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_sms_terminal_user_authentication_log1_idx` ON `sms` (`terminal_user_authentication_log_id` ASC);


-- -----------------------------------------------------
-- Table `terminal_user_request_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `terminal_user_request_log` ;

CREATE TABLE IF NOT EXISTS `terminal_user_request_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `URL` TEXT NOT NULL,
  `MAC` VARCHAR(20) NOT NULL,
  `dest_ip` VARCHAR(45) NOT NULL,
  `dest_port` VARCHAR(12) NOT NULL,
  `source_ip` VARCHAR(45) NOT NULL,
  `source_port` VARCHAR(12) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `terminal_user_id` BIGINT NOT NULL,
  `device_id` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_terminal_user_request_log_terminal_user1`
    FOREIGN KEY (`terminal_user_id`)
    REFERENCES `terminal_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_terminal_user_request_log_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_terminal_user_request_log_terminal_user1_idx` ON `terminal_user_request_log` (`terminal_user_id` ASC);

CREATE INDEX `fk_terminal_user_request_log_device1_idx` ON `terminal_user_request_log` (`device_id` ASC);


-- -----------------------------------------------------
-- Table `portal_display_policy_has_portal_page`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portal_display_policy_has_portal_page` ;

CREATE TABLE IF NOT EXISTS `portal_display_policy_has_portal_page` (
  `portal_display_policy_id` BIGINT NOT NULL,
  `portal_page_id` BIGINT NOT NULL,
  PRIMARY KEY (`portal_display_policy_id`, `portal_page_id`),
  CONSTRAINT `fk_portal_display_policy_has_portal_page_portal_display_policy1`
    FOREIGN KEY (`portal_display_policy_id`)
    REFERENCES `portal_display_policy` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_portal_display_policy_has_portal_page_portal_page1`
    FOREIGN KEY (`portal_page_id`)
    REFERENCES `portal_page` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_portal_display_policy_has_portal_page_portal_page1_idx` ON `portal_display_policy_has_portal_page` (`portal_page_id` ASC);

CREATE INDEX `fk_portal_display_policy_has_portal_page_portal_display_pol_idx` ON `portal_display_policy_has_portal_page` (`portal_display_policy_id` ASC);


-- -----------------------------------------------------
-- Table `portal_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portal_tag` ;

CREATE TABLE IF NOT EXISTS `portal_tag` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `background_task_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `background_task_log` ;

CREATE TABLE IF NOT EXISTS `background_task_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(400) NOT NULL,
  `message` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `background_task_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_background_task_log_background_task1`
    FOREIGN KEY (`background_task_id`)
    REFERENCES `background_task` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_background_task_log_background_task1_idx` ON `background_task_log` (`background_task_id` ASC);


-- -----------------------------------------------------
-- Table `email_sending_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `email_sending_log` ;

CREATE TABLE IF NOT EXISTS `email_sending_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `message` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `email_notice_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_email_sending_log_email_notice1`
    FOREIGN KEY (`email_notice_id`)
    REFERENCES `email_notice` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_email_sending_log_email_notice1_idx` ON `email_sending_log` (`email_notice_id` ASC);


-- -----------------------------------------------------
-- Table `resource`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `resource` ;

CREATE TABLE IF NOT EXISTS `resource` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `resource_path` VARCHAR(1000) NOT NULL,
  `reference_times` INT NOT NULL DEFAULT 0,
  `thumbnail_path` VARCHAR(800) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `account_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_resource_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_resource_account1_idx` ON `resource` (`account_id` ASC);


-- -----------------------------------------------------
-- Table `portal_template_has_portal_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portal_template_has_portal_tag` ;

CREATE TABLE IF NOT EXISTS `portal_template_has_portal_tag` (
  `portal_template_id` BIGINT NOT NULL,
  `portal_tag_id` BIGINT NOT NULL,
  PRIMARY KEY (`portal_template_id`, `portal_tag_id`),
  CONSTRAINT `fk_portal_template_has_portal_tag_portal_template1`
    FOREIGN KEY (`portal_template_id`)
    REFERENCES `portal_template` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_portal_template_has_portal_tag_portal_tag1`
    FOREIGN KEY (`portal_tag_id`)
    REFERENCES `portal_tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_portal_template_has_portal_tag_portal_tag1_idx` ON `portal_template_has_portal_tag` (`portal_tag_id` ASC);

CREATE INDEX `fk_portal_template_has_portal_tag_portal_template1_idx` ON `portal_template_has_portal_tag` (`portal_template_id` ASC);


-- -----------------------------------------------------
-- Table `resource_has_portal_page`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `resource_has_portal_page` ;

CREATE TABLE IF NOT EXISTS `resource_has_portal_page` (
  `resource_id` BIGINT NOT NULL,
  `portal_page_id` BIGINT NOT NULL,
  PRIMARY KEY (`resource_id`, `portal_page_id`),
  CONSTRAINT `fk_resource_has_portal_page_resource1`
    FOREIGN KEY (`resource_id`)
    REFERENCES `resource` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resource_has_portal_page_portal_page1`
    FOREIGN KEY (`portal_page_id`)
    REFERENCES `portal_page` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_resource_has_portal_page_portal_page1_idx` ON `resource_has_portal_page` (`portal_page_id` ASC);

CREATE INDEX `fk_resource_has_portal_page_resource1_idx` ON `resource_has_portal_page` (`resource_id` ASC);


-- -----------------------------------------------------
-- Table `account_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `account_tag` ;

CREATE TABLE IF NOT EXISTS `account_tag` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `account_tag_has_account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `account_tag_has_account` ;

CREATE TABLE IF NOT EXISTS `account_tag_has_account` (
  `account_tag_id` BIGINT NOT NULL,
  `account_id` BIGINT NOT NULL,
  PRIMARY KEY (`account_tag_id`, `account_id`),
  CONSTRAINT `fk_account_tag_has_account_account_tag1`
    FOREIGN KEY (`account_tag_id`)
    REFERENCES `account_tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_account_tag_has_account_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_account_tag_has_account_account1_idx` ON `account_tag_has_account` (`account_id` ASC);

CREATE INDEX `fk_account_tag_has_account_account_tag1_idx` ON `account_tag_has_account` (`account_tag_id` ASC);


-- -----------------------------------------------------
-- Table `province`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `province` ;

CREATE TABLE IF NOT EXISTS `province` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '所有直辖市，列入省级表格';

CREATE INDEX `province_index_name` ON `province` (`name` ASC);


-- -----------------------------------------------------
-- Table `city`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `city` ;

CREATE TABLE IF NOT EXISTS `city` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `province_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_city_province1`
    FOREIGN KEY (`province_id`)
    REFERENCES `province` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_city_province1_idx` ON `city` (`province_id` ASC);

CREATE INDEX `city_index_name` ON `city` (`name` ASC);


-- -----------------------------------------------------
-- Table `county_district`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `county_district` ;

CREATE TABLE IF NOT EXISTS `county_district` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `city_id` BIGINT NULL,
  `province_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_county_district_city1`
    FOREIGN KEY (`city_id`)
    REFERENCES `city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_county_district_city2`
    FOREIGN KEY (`province_id`)
    REFERENCES `province` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_county_district_city1_idx` ON `county_district` (`city_id` ASC);

CREATE INDEX `county_district_index` ON `county_district` (`name` ASC);

CREATE INDEX `fk_county_district_city2_idx` ON `county_district` (`province_id` ASC);


-- -----------------------------------------------------
-- Table `system_config`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `system_config` ;

CREATE TABLE IF NOT EXISTS `system_config` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `cfg_key` VARCHAR(45) NOT NULL,
  `cfg_value` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `cfg_key_UNIQUE` ON `system_config` (`cfg_key` ASC);


-- -----------------------------------------------------
-- Table `terminal_user_has_device`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `terminal_user_has_device` ;

CREATE TABLE IF NOT EXISTS `terminal_user_has_device` (
  `terminal_user_id` BIGINT NOT NULL,
  `device_id` VARCHAR(64) NOT NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT 'NORMAL' COMMENT 'NORMAL / LOCKED',
  PRIMARY KEY (`terminal_user_id`, `device_id`),
  CONSTRAINT `fk_terminal_user_has_device_terminal_user1`
    FOREIGN KEY (`terminal_user_id`)
    REFERENCES `terminal_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_terminal_user_has_device_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_terminal_user_has_device_device1_idx` ON `terminal_user_has_device` (`device_id` ASC);

CREATE INDEX `fk_terminal_user_has_device_terminal_user1_idx` ON `terminal_user_has_device` (`terminal_user_id` ASC);


-- -----------------------------------------------------
-- Table `device_has_device_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `device_has_device_tag` ;

CREATE TABLE IF NOT EXISTS `device_has_device_tag` (
  `device_id` VARCHAR(64) NOT NULL,
  `device_tag_id` BIGINT NOT NULL,
  PRIMARY KEY (`device_id`, `device_tag_id`),
  CONSTRAINT `fk_device_has_device_tag_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_device_has_device_tag_device_tag1`
    FOREIGN KEY (`device_tag_id`)
    REFERENCES `device_tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_device_has_device_tag_device_tag1_idx` ON `device_has_device_tag` (`device_tag_id` ASC);

CREATE INDEX `fk_device_has_device_tag_device1_idx` ON `device_has_device_tag` (`device_id` ASC);


-- -----------------------------------------------------
-- Table `account_has_terminal_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `account_has_terminal_user` ;

CREATE TABLE IF NOT EXISTS `account_has_terminal_user` (
  `account_id` BIGINT NOT NULL,
  `terminal_user_id` BIGINT NOT NULL,
  `memo` TEXT NULL,
  PRIMARY KEY (`account_id`, `terminal_user_id`),
  CONSTRAINT `fk_account_has_terminal_user_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_account_has_terminal_user_terminal_user1`
    FOREIGN KEY (`terminal_user_id`)
    REFERENCES `terminal_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_account_has_terminal_user_terminal_user1_idx` ON `account_has_terminal_user` (`terminal_user_id` ASC);

CREATE INDEX `fk_account_has_terminal_user_account1_idx` ON `account_has_terminal_user` (`account_id` ASC);


-- -----------------------------------------------------
-- Table `permission_has_account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `permission_has_account` ;

CREATE TABLE IF NOT EXISTS `permission_has_account` (
  `permission_id` BIGINT NOT NULL,
  `account_id` BIGINT NOT NULL,
  PRIMARY KEY (`permission_id`, `account_id`),
  CONSTRAINT `fk_permission_has_account_permission1`
    FOREIGN KEY (`permission_id`)
    REFERENCES `permission` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_permission_has_account_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_permission_has_account_account1_idx` ON `permission_has_account` (`account_id` ASC);

CREATE INDEX `fk_permission_has_account_permission1_idx` ON `permission_has_account` (`permission_id` ASC);


-- -----------------------------------------------------
-- Table `produced_devices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `produced_devices` ;

CREATE TABLE IF NOT EXISTS `produced_devices` (
  `id` VARCHAR(64) NULL,
  `device_model_id` BIGINT NULL,
  `brand` VARCHAR(200) NOT NULL,
  `model` VARCHAR(200) NOT NULL,
  `frameware_version` VARCHAR(400) NOT NULL,
  `component_version` VARCHAR(400) NOT NULL,
  `mac` VARCHAR(60) NOT NULL,
  `pin_code` VARCHAR(60) NULL,
  `config_items` TEXT NULL,
  `province` VARCHAR(200) NULL,
  `city` VARCHAR(200) NULL,
  `county` VARCHAR(200) NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'AUDITED' COMMENT '\'AUDITED | WAITED\'',
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `manufacturer_id` BIGINT(20) NULL,
  PRIMARY KEY (`mac`),
  CONSTRAINT `fk_produced_devices_device_model1`
    FOREIGN KEY (`device_model_id`)
    REFERENCES `device_model` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `index_mac` ON `produced_devices` (`mac` ASC);

CREATE INDEX `fk_produced_devices_device_model1_idx` ON `produced_devices` (`device_model_id` ASC);


-- -----------------------------------------------------
-- Table `portal_site_has_portal_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portal_site_has_portal_tag` ;

CREATE TABLE IF NOT EXISTS `portal_site_has_portal_tag` (
  `portal_site_id` BIGINT NOT NULL,
  `portal_tag_id` BIGINT NOT NULL,
  PRIMARY KEY (`portal_site_id`, `portal_tag_id`),
  CONSTRAINT `fk_portal_site_has_portal_tag_portal_site1`
    FOREIGN KEY (`portal_site_id`)
    REFERENCES `portal_site` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_portal_site_has_portal_tag_portal_tag1`
    FOREIGN KEY (`portal_tag_id`)
    REFERENCES `portal_tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_portal_site_has_portal_tag_portal_tag1_idx` ON `portal_site_has_portal_tag` (`portal_tag_id` ASC);

CREATE INDEX `fk_portal_site_has_portal_tag_portal_site1_idx` ON `portal_site_has_portal_tag` (`portal_site_id` ASC);


-- -----------------------------------------------------
-- Table `portal_page_push_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `portal_page_push_log` ;

CREATE TABLE IF NOT EXISTS `portal_page_push_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `portal_page_id` BIGINT NOT NULL,
  `device_id` VARCHAR(64) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_portal_page_push_log_portal_page1`
    FOREIGN KEY (`portal_page_id`)
    REFERENCES `portal_page` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_portal_page_push_log_portal_page1_idx` ON `portal_page_push_log` (`portal_page_id` ASC);

CREATE INDEX `idx_device_id` ON `portal_page_push_log` (`device_id` ASC);

CREATE INDEX `pppl_create_datetime_idx` ON `portal_page_push_log` (`create_datetime` ASC);


-- -----------------------------------------------------
-- Table `device_display_plan`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `device_display_plan` ;

CREATE TABLE IF NOT EXISTS `device_display_plan` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `device_device_id` VARCHAR(64) NOT NULL,
  `portal_site_id` BIGINT NOT NULL,
  `clock` FLOAT NOT NULL,
  `effon` DATETIME NULL,
  `effend` DATETIME NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `latest_update_account_id` BIGINT NULL,
  `latest_update_datetime` DATETIME NULL,
  `latest_update_policy_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_device_display_plan_device1`
    FOREIGN KEY (`device_device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_device_display_plan_portal_site1`
    FOREIGN KEY (`portal_site_id`)
    REFERENCES `portal_site` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_device_display_plan_device1_idx` ON `device_display_plan` (`device_device_id` ASC);

CREATE INDEX `fk_device_display_plan_portal_site1_idx` ON `device_display_plan` (`portal_site_id` ASC);


-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `sender_id` BIGINT NOT NULL,
  `receiver_id` TEXT NOT NULL,
  `owner_id` BIGINT NOT NULL,
  `is_sent` TINYINT(1) NOT NULL,
  `title` VARCHAR(300) NOT NULL,
  `content` TEXT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `is_flaged` TINYINT(1) NOT NULL DEFAULT 0,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `parent_msg_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_sender_id`
    FOREIGN KEY (`sender_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_owner_id`
    FOREIGN KEY (`owner_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_sender_id_idx` ON `message` (`sender_id` ASC);

CREATE INDEX `fk_owner_id_idx` ON `message` (`owner_id` ASC);


-- -----------------------------------------------------
-- Table `account_configs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `account_configs` ;

CREATE TABLE IF NOT EXISTS `account_configs` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `account_id` BIGINT NOT NULL,
  `cfg_key` VARCHAR(45) NOT NULL,
  `cfg_value` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_account_configs_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_account_configs_account1_idx` ON `account_configs` (`account_id` ASC);

CREATE UNIQUE INDEX `unq_account_configs_accountid_cfgkey` ON `account_configs` (`cfg_key` ASC, `account_id` ASC);


-- -----------------------------------------------------
-- Table `device_status_log_hx`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `device_status_log_hx` ;

CREATE TABLE IF NOT EXISTS `device_status_log_hx` (
  `id` BIGINT NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `status_message` VARCHAR(600) NULL,
  `up_traffic` BIGINT NULL,
  `down_traffic` BIGINT NULL,
  `create_datetime` DATETIME NOT NULL,
  `device_id` VARCHAR(64) NOT NULL,
  `backup_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE INDEX `idx_device_id` ON `device_status_log_hx` (`device_id` ASC);


-- -----------------------------------------------------
-- Table `third_part_auth`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `third_part_auth` ;

CREATE TABLE IF NOT EXISTS `third_part_auth` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `business_name` VARCHAR(200) NOT NULL,
  `virtual_device_id` VARCHAR(60) NOT NULL,
  `site_id` BIGINT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'NORMAL' COMMENT 'NORMAL | LOCKED | DELETED',
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `china_net_auth_request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `china_net_auth_request` ;

CREATE TABLE IF NOT EXISTS `china_net_auth_request` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `auth_log_id` BIGINT NULL,
  `wlanuserip` VARCHAR(60) NULL,
  `wlanacname` VARCHAR(400) NULL,
  `mscgip` VARCHAR(60) NULL,
  `userlocation` VARCHAR(600) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sms_purchase_hx`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sms_purchase_hx` ;

CREATE TABLE IF NOT EXISTS `sms_purchase_hx` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `account_id` BIGINT NOT NULL,
  `outside_trade_id` VARCHAR(64) NULL,
  `type` VARCHAR(45) NOT NULL DEFAULT 'FREE TEST' COMMENT 'FREE TEST | PURCHASE',
  `status` VARCHAR(20) NOT NULL DEFAULT 'NEW' COMMENT 'NEW | PROCESSING | FINISHED | LOCKED',
  `amount` FLOAT NOT NULL DEFAULT 0,
  `sms_number` BIGINT NOT NULL DEFAULT 0,
  `memo` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_sms_purchase_hx_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_sms_purchase_hx_account1_idx` ON `sms_purchase_hx` (`account_id` ASC);


-- -----------------------------------------------------
-- Table `all_devices_hx`
-- -----------------------------------------------------
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


-- -----------------------------------------------------
-- Table `org_produced_deivces`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `org_produced_deivces` ;

CREATE TABLE IF NOT EXISTS `org_produced_deivces` (
  `id` VARCHAR(64) NULL,
  `brand` VARCHAR(200) NOT NULL,
  `model` VARCHAR(200) NOT NULL,
  `frameware_version` VARCHAR(400) NOT NULL,
  `component_version` VARCHAR(400) NOT NULL,
  `mac` VARCHAR(60) NOT NULL,
  `pin_code` VARCHAR(60) NULL,
  `config_items` TEXT NULL,
  `province` VARCHAR(200) NULL,
  `city` VARCHAR(200) NULL,
  `county` VARCHAR(200) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`mac`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `system_version`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `system_version` ;

CREATE TABLE IF NOT EXISTS `system_version` (
  `version` VARCHAR(200) NOT NULL,
  `update_datetime` DATETIME NOT NULL DEFAULT now())
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `radius_virtual_device`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `radius_virtual_device` ;

CREATE TABLE IF NOT EXISTS `radius_virtual_device` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `wlanacname` VARCHAR(200) NOT NULL,
  `device_id` VARCHAR(64) NOT NULL,
  `ip_addr` VARCHAR(64) NULL,
  `port` INT NULL,
  `auth_secret` VARCHAR(64) NULL,
  `accounting_secret` VARCHAR(64) NULL,
  `name` VARCHAR(400) NULL,
  `description` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_radius_virtual_device_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_radius_virtual_device_device1_idx` ON `radius_virtual_device` (`device_id` ASC);

CREATE UNIQUE INDEX `unq_radius_virtual_device_wlanacname` ON `radius_virtual_device` (`wlanacname` ASC);


-- -----------------------------------------------------
-- Table `dhcp_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dhcp_info` ;

CREATE TABLE IF NOT EXISTS `dhcp_info` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_ip` VARCHAR(64) NOT NULL,
  `mac` VARCHAR(60) NOT NULL,
  `status` VARCHAR(60) NOT NULL DEFAULT 'ONLINE' COMMENT 'ONLINE | OFFLINE',
  `pvlan_id` VARCHAR(16) NOT NULL,
  `cvlan_id` VARCHAR(16) NOT NULL,
  `attribute` TEXT NULL,
  `offline_datetime` DATETIME NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `application`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `application` ;

CREATE TABLE IF NOT EXISTS `application` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `platform` VARCHAR(40) NOT NULL,
  `version` VARCHAR(40) NOT NULL,
  `path` VARCHAR(500) NOT NULL,
  `upload_datetime` DATETIME NOT NULL DEFAULT now(),
  `published_datetime` DATETIME NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 0,
  `download_count` BIGINT NOT NULL DEFAULT 0,
  `description` VARCHAR(1000) NULL,
  `thumbnail_path` VARCHAR(800) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `id_UNIQUE` ON `application` (`id` ASC);

CREATE UNIQUE INDEX `app_unique` ON `application` (`platform` ASC, `version` ASC);


-- -----------------------------------------------------
-- Table `application`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `application` ;

CREATE TABLE IF NOT EXISTS `application` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `platform` VARCHAR(40) NOT NULL,
  `version` VARCHAR(40) NOT NULL,
  `path` VARCHAR(500) NOT NULL,
  `upload_datetime` DATETIME NOT NULL DEFAULT now(),
  `published_datetime` DATETIME NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 0,
  `download_count` BIGINT NOT NULL DEFAULT 0,
  `description` VARCHAR(1000) NULL,
  `thumbnail_path` VARCHAR(800) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `app_unique` ON `application` (`platform` ASC, `version` ASC);


-- -----------------------------------------------------
-- Table `third_platform`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `third_platform` ;

CREATE TABLE IF NOT EXISTS `third_platform` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `domain` VARCHAR(100) NOT NULL,
  `ip_addr` VARCHAR(40) NOT NULL,
  `ip_port` VARCHAR(10) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `province` VARCHAR(45) NOT NULL,
  `city` VARCHAR(250) NOT NULL,
  `county` VARCHAR(250) NULL,
  `user_online_url` VARCHAR(600) NOT NULL,
  `user_offline_url` VARCHAR(600) NOT NULL,
  `description` VARCHAR(1000) NULL,
  `platform_code` VARCHAR(64) NOT NULL,
  `welcome_url` VARCHAR(500) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telecom_virtual_device`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `telecom_virtual_device` ;

CREATE TABLE IF NOT EXISTS `telecom_virtual_device` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `pvlan_id` VARCHAR(16) NOT NULL,
  `cvlan_id` VARCHAR(16) NOT NULL,
  `domain` VARCHAR(250) NULL,
  `name` VARCHAR(300) NULL,
  `description` TEXT NULL,
  `device_id` VARCHAR(64) NOT NULL,
  `account_id` BIGINT NOT NULL,
  `createdatetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_telcom_virtual_device_device1`
    FOREIGN KEY (`device_id`)
    REFERENCES `device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_telecom_virtual_device_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_telcom_virtual_device_device1_idx` ON `telecom_virtual_device` (`device_id` ASC);

CREATE INDEX `fk_telecom_virtual_device_account1_idx` ON `telecom_virtual_device` (`account_id` ASC);


-- -----------------------------------------------------
-- Table `system_data`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `system_data` ;

CREATE TABLE IF NOT EXISTS `system_data` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) NOT NULL DEFAULT 'SERVERIP',
  `code` VARCHAR(255) NULL,
  `value` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- create new table fit_ap_virtual_device
CREATE TABLE IF NOT EXISTS `fit_ap_virtual_device` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `ssid` VARCHAR(255) NOT NULL,
  `ac_device_id` VARCHAR(64) NOT NULL,
  `ap_mac` VARCHAR(60) NOT NULL,
  `device_id` VARCHAR(64) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `fit_ap_unique` (`ssid` ASC, `ac_device_id` ASC, `ap_mac` ASC))
ENGINE = InnoDB;

-- create new table jubao
CREATE TABLE IF NOT EXISTS `jubao` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `jb_type` TINYINT NOT NULL COMMENT '举报类型\n举报恶意账号(1)\n举报恶意网址(2)\n举报恶意操作(3)\n其它(9)',
  `visious_account` VARCHAR(255) NULL COMMENT '举报恶意操作账号',
  `visious_url` VARCHAR(500) NULL COMMENT '举报恶意网址',
  `jb_description` VARCHAR(2000) NOT NULL COMMENT '举报内容说明',
  `jb_account_id` BIGINT NOT NULL COMMENT '举报人ID',
  `create_datetime` DATETIME NOT NULL DEFAULT now() COMMENT '举报时间',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
---------------------------------------------
-- create new table suggest
CREATE TABLE IF NOT EXISTS `suggest` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(2000) NOT NULL,
  `mac` VARCHAR(60) NOT NULL,
  `cellphone` VARCHAR(20) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
---------------------------------------------
-- create new table request_log
CREATE TABLE IF NOT EXISTS `twifi_dev`.`request_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(20) NOT NULL,
  `interface_url` VARCHAR(500) NOT NULL,
  `interface_parameter` TEXT NULL,
  `ip_source` VARCHAR(50) NOT NULL,
  `is_success` TINYINT NOT NULL,
  `message` TEXT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
---------------------------------------------
-- create new table third_application
CREATE TABLE IF NOT EXISTS `twifi_dev`.`third_application` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `description` VARCHAR(1000) NULL,
  `app_id` VARCHAR(100) NOT NULL,
  `app_key` VARCHAR(100) NOT NULL,
  `thumb_path` VARCHAR(500) NULL,
  `interface_url` VARCHAR(500) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `version` VARCHAR(50) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `type_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_version_unique` (`name` ASC, `version` ASC),
  INDEX `TYPE_idx` (`type_id` ASC),
  CONSTRAINT `TYPE`
    FOREIGN KEY (`type_id`)
    REFERENCES `twifi_dev`.`third_application_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
-- -------------------------------------------
-- create new table merchant_has_third_application
CREATE TABLE IF NOT EXISTS `twifi_dev`.`merchant_has_third_application` (
  `third_app_id` BIGINT NOT NULL,
  `account_id` BIGINT NOT NULL,
  `status` TINYINT NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`third_app_id`, `account_id`),
  INDEX `account_id_idx` (`account_id` ASC),
  UNIQUE INDEX `third_account_unique` (`third_app_id` ASC, `account_id` ASC),
  CONSTRAINT `third_app_id`
    FOREIGN KEY (`third_app_id`)
    REFERENCES `twifi_dev`.`third_application` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `account_id`
    FOREIGN KEY (`account_id`)
    REFERENCES `twifi_dev`.`account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

-- -------------------------------------------
-- create new table wechat_auth_log
CREATE TABLE IF NOT EXISTS `twifi_dev`.`wechat_auth_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `wechat_account` VARCHAR(50) NOT NULL,
  `user_open_id` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  `terminal_user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `terminal_user_id`
    FOREIGN KEY (`terminal_user_id`)
    REFERENCES `twifi_dev`.`terminal_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

-- -------------------------------------------
-- create new table third_application_type
CREATE TABLE IF NOT EXISTS `twifi_dev`.`third_application_type` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(50) NOT NULL,
  `memo` VARCHAR(50) NULL,
  `create_datetime` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB

-- -------------------------------------------
-- create new table advert_merchant_config
CREATE TABLE IF NOT EXISTS `twifi_dev`.`advert_merchant_config` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `account_id` BIGINT NOT NULL,
  `jscode1` TEXT NULL,
  `status1` VARCHAR(10) NULL,
  `jscode2` TEXT NULL,
  `status2` VARCHAR(10) NULL,
  `jscode3` TEXT NULL,
  `status3` VARCHAR(10) NULL,
  `createdate` DATETIME NOT NULL DEFAULT now(),
  `editdate` DATETIME NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `account_id_idx` (`account_id` ASC),
  UNIQUE INDEX `account_id_UNIQUE` (`account_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `accountId`
    FOREIGN KEY (`account_id`)
    REFERENCES `twifi_dev`.`account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

-- -------------------------------------------
-- create new table advert_default_config
CREATE TABLE IF NOT EXISTS `twifi_dev`.`advert_default_config` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `codetype` VARCHAR(10) NULL,
  `jscode` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB

-------------------------------------------------
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
USE `twifi_dev`;

DELIMITER $$

USE `twifi_dev`$$
DROP TRIGGER IF EXISTS `device_status_log_AINS` $$
USE `twifi_dev`$$
CREATE TRIGGER `device_status_log_AINS` AFTER INSERT ON `device_status_log` FOR EACH ROW
update device as d set 
	d.status = case upper(new.type) = 'HEARTBEAT' or upper(new.type) = 'ONLINE' 
					when true then 'ONLINE'
					else 'OFFLINE'
				end
	where d.device_id = new.device_id and upper(d.status) in ('ONLINE', 'OFFLINE')
$$


DELIMITER ;
