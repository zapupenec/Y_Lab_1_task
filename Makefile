install:
	npm ci

start:
	node server.js | npm run dev

build:
	npm run build

start-build:
	node server.js | npm run preview
