#!/bin/bash
INPUT="./public/images"
OUTPUT="./public/images/webp"
THUMBS="./public/images/thumbs"

mkdir -p "$OUTPUT"
mkdir -p "$THUMBS"

echo ""
echo "🖼️  Billy & Sarah — Converting + fixing rotation..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

total_before=0
total_after=0
count=0

for f in "$INPUT"/*.{jpg,JPG,jpeg,JPEG,png,PNG}; do
  [ -f "$f" ] || continue

  filename=$(basename "$f")
  outname="${filename%.*}.webp"
  thumbname="${filename%.*}-thumb.webp"
  outpath="$OUTPUT/$outname"
  thumbpath="$THUMBS/$thumbname"

  before=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f")
  total_before=$((total_before + before))

  # Read EXIF rotation tag
  rotation=$(ffprobe -v quiet -select_streams v:0 \
    -show_entries stream_tags=rotate \
    -of default=noprint_wrappers=1:nokey=1 "$f" 2>/dev/null)

  # Build rotation filter based on EXIF tag
  case "$rotation" in
    90)   rotate_filter="transpose=1" ;;   # 90° clockwise
    180)  rotate_filter="transpose=2,transpose=2" ;;  # 180°
    270)  rotate_filter="transpose=2" ;;   # 90° counter-clockwise
    -90)  rotate_filter="transpose=2" ;;
    *)    rotate_filter="" ;;              # no rotation needed
  esac

  # Build full filter chain
  if [ -n "$rotate_filter" ]; then
    vf_full="${rotate_filter},scale='min(1920,iw)':-2:flags=lanczos"
    vf_thumb="${rotate_filter},scale=20:-2,gblur=sigma=1"
  else
    vf_full="scale='min(1920,iw)':-2:flags=lanczos"
    vf_thumb="scale=20:-2,gblur=sigma=1"
  fi

  # Convert full image to WebP
  ffmpeg -i "$f" \
    -vf "$vf_full" \
    -c:v libwebp \
    -quality 82 \
    -compression_level 6 \
    -map_metadata -1 \
    -y "$outpath" 2>/dev/null

  # Convert tiny blur placeholder
  ffmpeg -i "$f" \
    -vf "$vf_thumb" \
    -c:v libwebp \
    -quality 20 \
    -map_metadata -1 \
    -y "$thumbpath" 2>/dev/null

  after=$(stat -c%s "$outpath" 2>/dev/null || stat -f%z "$outpath")
  total_after=$((total_after + after))
  before_kb=$((before / 1024))
  after_kb=$((after / 1024))

  if [ "$after" -gt 0 ]; then
    saved=$(( (before - after) * 100 / before ))
    echo "✅ $filename → $outname  (${before_kb}KB → ${after_kb}KB, ${saved}% smaller)"
  else
    echo "❌ $filename → FAILED (0KB output)"
  fi

  count=$((count + 1))
done

total_before_kb=$((total_before / 1024))
total_after_kb=$((total_after / 1024))

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 $count images processed"
echo "   Before : ${total_before_kb} KB"
echo "   After  : ${total_after_kb} KB"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ WebP → public/images/webp/"
echo "✨ Thumbs → public/images/thumbs/"