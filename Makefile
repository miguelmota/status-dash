all: index

.PHONY: index
index:
	@node index.js

.PHONY: uptime
uptime:
	@node uptime.js

.PHONY: certs
certs:
	@node certs.js

.PHONY: issues
issues:
	@node issues.js

.PHONY: pullrequests
pullrequests:
	@node pullrequests.js
