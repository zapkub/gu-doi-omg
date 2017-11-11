find -E . -regex '.*\.(js|map|jsx)' -not -path "./node_modules/*" -not -path  "./.next/*" -not -path "./bin/*" -delete
rm -rf dist
rm public/react-loadable.json