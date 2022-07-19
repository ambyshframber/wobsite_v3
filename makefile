GEM_SITE_FILES := $(shell find gemini/source/ -print)
BIG_SITE_FILES := $(shell find site/ -print)

upload: gem_site big_site
	touch upload

gem_site: $(GEM_SITE_FILES)
	gemini/gem_build.py
	rsync -av --delete --exclude=/data gemini/build/ ubuntu@ambylastname.xyz:~/gem_site/content

big_site: $(BIG_SITE_FILES)
	staticcc -tsSf -R "BUILDTIME=$(date --rfc-2822)"
	rsync -av --delete --exclude=/data build/ ubuntu@ambylastname.xyz:~/wobsite/content


