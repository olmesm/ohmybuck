# ohmybuck

Gatsby site for my blog/notes at [ohmybuck.com](//ohmybuck.com)

## Uses

- Gatsby
- Github Pages
- Github Actions
- Cloudflare

## Developing

```bash
# Setup the correct node engine with docker
docker run --rm -it -v $(pwd):/usr/app -w /usr/app -p 3000:3000 node:12-alpine sh

# Install dependencies
npm install

# Start dev server
npm start

# Create a new post called "Why You Should Be Reading This"
npm run new-post why you should be reading this

# Deploy
git push
# Github Actions handles the rest
```
