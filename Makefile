include config.mk

HOMEDIR = $(shell pwd)
SSHCMD = ssh $(USER)@$(SERVER)

fsu:
	node tools/personalize-with-fsu.js --seed hey --linesToPassThrough=35 > fucking-bible.html

pushall:
	git push origin master

sync:
	rsync -a $(HOMEDIR)/site/ $(USER)@$(SERVER):/$(APPDIR) \
    --exclude node_modules \
    --omit-dir-times --no-perms

set-up-app-dir:
	$(SSHCMD) "mkdir -p $(APPDIR)"
