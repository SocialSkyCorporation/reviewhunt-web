# Reviewhunt
Review Campaign for Product Influencers to Unleash Launching Hype

## Deploy Setup
```
rm -rf build
ln -s ../api/public/ build

git push && npm run build-staging && cd ../api && git push && bundle exec cap staging deploy upload_assets=true
git push && npm run build && cd ../api && git push && bundle exec cap production deploy upload_assets=true
```