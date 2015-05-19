-- -------------------------------------
-- drop xiasha district into 杭州
delete from county_district where name = '下沙区' and city_id = (select id from city where name='杭州');

-- -----------------------------------------------------
-- remove Table `org_produced_deivces`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `org_produced_devices` ;