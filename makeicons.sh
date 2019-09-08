convert -background none public/favicon.svg -define icon:auto-resize public/favicon.ico
convert -background none public/favicon.svg -resize 512x512 public/favicon_512.png
convert -background none public/favicon.svg -resize 192x192 public/favicon_192.png
for png in public/desktop*.png public/mobile*.png
do
  convert $png -define webp:lossless=true "${png%.*}.webp"
done
