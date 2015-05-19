#!/bin/sh
# e.g. reboot at 3:00 AM every day
echo "0 {%=clock%} * * * reboot" > /etc/crontabs/root
/etc/init.d/cron enable
/etc/init.d/cron restart
exit 0