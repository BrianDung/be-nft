# ifndef u
# u:=ubuntu
# endif

# deploy:
# 	rsync -avhzL $(localDir) $(u)@$(h):$(dir)/

# deploy-prod:
# 	make deploy h=3.229.227.78 dir=/var/www/vispx/build localDir=~/Sotatek/vispx-static-page/build/

# 	#rsync -avhzL ~/Sotatek/vispx-static-page/build/ ubuntu@3.229.227.78:/var/www/vispx/build

ifndef u
u:=sotatek
endif

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
	ssh $(u)@$(h) "cd $(dir); cp .env.sotatek.example .env; cp .env.sotatek.example .env.production"
	ssh $(u)@$(h) "pm2 restart UserMintPage"

deploy-dev:
	make deploy h=172.16.1.225 dir=/var/www/sotatek_starter/mint-page
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
deploy-stg:
	git pull
	yarn 
	cp .env.production .env
	yarn build 
	zip -r build.zip build
	scp build.zip ubuntu@3.229.227.78:/var/www/vispx/
	ssh ubuntu@3.229.227.78 "cd /var/www/vispx/ && rm -rf build && unzip build.zip && rm -rf build.zip"
	rm -rf build.zip
	rm -rf build


