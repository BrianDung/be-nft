ifndef u
u:=ubuntu
endif

deploy:
	rsync -avhzL $(localDir) $(u)@$(h):$(dir)/

deploy-dev:
	make deploy h=3.229.227.78 dir=/var/www/vispx/frontend-user localDir=~/Sotatek/vispx-launchpad/frontend-user/build/

	#rsync -avhzL ~/Sotatek/vispx-static-page/build/ ubuntu@3.229.227.78:/var/www/vispx/build

