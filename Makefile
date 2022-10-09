# ifndef u
# u:=ubuntu
# endif

# deploy:
# 	rsync -avhzL $(localDir) $(u)@$(h):$(dir)/

# deploy-prod:
# 	make deploy h=3.229.227.78 dir=/var/www/vispx/build localDir=~/Sotatek/vispx-static-page/build/

# 	#rsync -avhzL ~/Sotatek/vispx-static-page/build/ ubuntu@3.229.227.78:/var/www/vispx/build
buildPath := build_backup_$(shell date +'%s')

ifndef u
u:=sotatek
endif
#private
deploy:
	rsync -avhzL --delete \
				--no-perms --no-owner --no-group \
				--exclude .git \
				--exclude .env \
				--exclude dist \
				--exclude node_modules \
				--exclude workers \
				--filter=":- .gitignore" \
				. $(u)@$(h):$(dir)/
	ssh $(u)@$(h) "cd $(dir); cp .env.sotatek.example .env"
	ssh $(u)@$(h) "pm2 restart UserMintPage"
#public
deploy-dev:
	make deploy h=172.16.1.225 dir=/var/www/sotatek_starter/mint-page


#public
deploy-test:
	git pull
	yarn 
	cp .env.sotatek.example .env
	yarn build 
	zip -r build.zip build
	scp build.zip sotatek@172.16.1.225:/var/www/sotatek_starter/mint-page
	ssh sotatek@172.16.1.225 "cd /var/www/sotatek_starter/mint-page && rm -rf build && unzip build.zip && pm2 delete UserMintPage && pm2 start "serve -s build -l 1403" --name="UserMintPage""
	rm -rf build.zip
	rm -rf build
#private
deploy-xborg:
	git pull
	yarn 
	cp .env.production .env
	yarn build 
	zip -r build.zip build
	scp build.zip $(server):/var/www/vispx/
	ssh $(server) "cd /var/www/vispx/ && mkdir -p backups/$(buildPath) && cp -r build backups/$(buildPath) && rm -rf build && unzip build.zip && rm -rf build.zip"
	rm -rf build.zip
	rm -rf build
#public
deploy-landing:
	make deploy-xborg server=ubuntu@xborg.vispx.io
#public
deploy-mint:
	make deploy-xborg server=ubuntu@mint.vispx.io
