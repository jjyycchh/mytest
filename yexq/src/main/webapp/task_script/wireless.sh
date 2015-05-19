#!/bin/sh
uci set system.@system[0].hostname="{%=devicename%}" >/dev/null 2>&1
uci set wireless.@wifi-iface[0].ssid="{%=ssid%}" >/dev/null 2>&1
uci commit
/etc/init.d/network restart >/dev/null 2>&1
/etc/init.d/twifi-portal restart >/dev/null 2>&1
echo "0"