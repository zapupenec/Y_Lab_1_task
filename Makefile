install:
	npm ci

start:
	node server/index.js | npm run dev

build:
	npm run build

start-build:
	node server/index.js | npm run preview
