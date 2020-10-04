#!/usr/bin/env python3

from icalendar import Calendar, Event
from datetime import datetime
from pytz import UTC # timezone
import re
import json

p = re.compile("(\\w)\\-Day \\- (\\w+)")

output = []

g = open('/tmp/feed.ics','rb')
gcal = Calendar.from_ical(g.read())
for component in gcal.walk():
    if component.name == "VEVENT":
        summary = component.get('summary')
        match = p.match(summary)
        if match:
            output.append({'date': str(component.decoded('dtstart')), 'day': match.group(1), 'group': match.group(2)})
g.close()

print(json.dumps(output))
