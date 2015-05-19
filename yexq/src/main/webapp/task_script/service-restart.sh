#!/bin/sh
restart_delay="{%=restart_delay%}"
service_name="{%=service_name%}"

#sleep ${restart_delay}
#restart twifi-task
/etc/init.d/${service_name} restart >/dev/null 2>&1
exit 0