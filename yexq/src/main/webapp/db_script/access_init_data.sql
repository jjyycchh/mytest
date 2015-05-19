-- ================================================================================================================================================
-- == 创建菜单
insert into `menu` (`id`, `name`, `description`, `parent_id`, `url`, `type`, `flag`, `position`, `unused`) values (1, '配置服务器管理', '配置服务器管理', 0, '/system/main.htm', 0, 0, null, 0);
insert into `menu` (`id`, `name`, `description`, `parent_id`, `url`, `type`, `flag`, `position`, `unused`) values (2, '虚拟ap管理', '虚拟ap管理', 1, '/system/aplist.htm', 1, 0, null, 0);
insert into `menu` (`id`, `name`, `description`, `parent_id`, `url`, `type`, `flag`, `position`, `unused`) values (3, '虚拟ap组管理', '虚拟ap组管理', 1, '/system/apgrouplist.htm', 1, 0, null, 0);
insert into `menu` (`id`, `name`, `description`, `parent_id`, `url`, `type`, `flag`, `position`, `unused`) values (4, '管理员角色管理', '管理员角色管理', 1, null, 1, 0, null, 0);
insert into `menu` (`id`, `name`, `description`, `parent_id`, `url`, `type`, `flag`, `position`, `unused`) values (5, '管理员管理', '管理员管理', 4, null, 2, 0, null, 0);
insert into `menu` (`id`, `name`, `description`, `parent_id`, `url`, `type`, `flag`, `position`, `unused`) values (6, '角色管理', '角色管理', 4, null, 2, 0, null, 1);

