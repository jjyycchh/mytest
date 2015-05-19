#!/bin/sh
# file max size should less than 3K
TWIFI_CONF_NAME="twifi"
uci set ${TWIFI_CONF_NAME}".base.enabled"="1" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".device.device_id"="{%=dev_id%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".device.account"="{%=account_id%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".device.active_date"="{%=active_date%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".auth.hostname"="{%=auth_hostname%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".auth.ssl_available"="{%=auth_usessl%}" >/dev/null 2>&1 # default is no
uci set ${TWIFI_CONF_NAME}".auth.ssl_port"="{%=auth_sslport%}" >/dev/null 2>&1  # default is 443
uci set ${TWIFI_CONF_NAME}".auth.http_port"="{%=auth_httpport%}" >/dev/null 2>&1 # default is 80
uci set ${TWIFI_CONF_NAME}".auth.path"="{%=auth_path%}" >/dev/null 2>&1 # default is "/"
uci set ${TWIFI_CONF_NAME}".platform.hostname"="{%=plat_hostname%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".platform.ssl_available"="{%=plat_usessl%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".platform.ssl_port"="{%=plat_sslport%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".platform.http_port"="{%=plat_httpport%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".platform.path"="{%=plat_path%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".portal.hostname"="{%=portal_hostname%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".portal.ssl_available"="{%=portal_usessl%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".portal.ssl_port"="{%=portal_sslport%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".portal.http_port"="{%=portal_httpport%}" >/dev/null 2>&1
uci set ${TWIFI_CONF_NAME}".portal.path"="{%=portal_path%}" >/dev/null 2>&1
uci commit ${TWIFI_CONF_NAME}
/etc/init.d/twifi-portal restart
reboot
