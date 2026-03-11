#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Billy & Sarah — Image Compression Script
# Uses ffmpeg (already on your machine — no installs needed)
#
# HOW TO USE:
# 1. Copy this file to your project root
# 2. Run: chmod +x compress.sh
# 3. Run: ./compress.sh
# 4. Done — compressed images are in public/images/
#
# TO ADD NEW PHOTOS LATER:
# Just drop them in src/assets/images/ and run ./compress.sh again
# ─────────────────────────────────────────────────────────────

INPUT="./src/assets/images"
OUTPUT="./public/images"

# Create output folder if it doesn't exist
mkdir -p "$OUTPUT"

# Check ffmpeg is available
if ! command -v ffmpeg &> /dev/null; then
  echo "❌ ffmpeg not found. Install it with: sudo apt install ffmpeg"
  exit 1
fi

echo ""
echo "🖼️  Billy & Sarah — Compressing images..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

total_before=0
total_after=0
count=0

# Process every JPG/PNG in the input folder
for f in "$INPUT"/*.{jpg,JPG,jpeg,JPEG,png,PNG}; do
  # Skip if no files match
  [ -f "$f" ] || continue

  # Output filename — always lowercase .jpg
  filename=$(basename "$f")
  outname="${filename%.*}"
  outname=$(echo "$outname" | tr '[:upper:]' '[:lower:]').jpg
  outpath="$OUTPUT/$outname"

  # Get size before
  before=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f")
  total_before=$((total_before + before))

  # Compress with ffmpeg
  # -vf scale: max 1920px wide, keep aspect ratio
  # -q:v 3: high quality JPEG (scale 1-31, lower = better)
  ffmpeg -i "$f" \
    -vf "scale='min(1920,iw)':min'(1280,ih)':force_original_aspect_ratio=decrease" \
    -q:v 3 \
    -y \
    "$outpath" \
    2>/dev/null

  # Get size after
  after=$(stat -c%s "$outpath" 2>/dev/null || stat -f%z "$outpath")
  total_after=$((total_after + after))

  # Calculate savings
  saved=$(( (before - after) * 100 / before ))
  before_kb=$((before / 1024))
  after_kb=$((after / 1024))

  echo "✅ $filename → $outname"
  echo "   ${before_kb}KB → ${after_kb}KB  (${saved}% smaller)"
  echo ""

  count=$((count + 1))
done

if [ "$count" -eq 0 ]; then
  echo "❌ No images found in $INPUT"
  echo "   Make sure your photos are in: src/assets/images/"
  exit 1
fi

# Summary
total_before_kb=$((total_before / 1024))
total_after_kb=$((total_after / 1024))
total_saved=$(( (total_before - total_after) * 100 / total_before ))

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 $count images processed"
echo "   Before: ${total_before_kb}KB total"
echo "   After:  ${total_after_kb}KB total"
echo "   Saved:  ${total_saved}%"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ Done! Compressed images saved to: $OUTPUT"
echo ""
echo "📝 Your filenames are now lowercase .jpg:"
ls "$OUTPUT"/*.jpg 2>/dev/null | xargs -I{} basename {} | sed 's/^/   /'
echo ""
echo "🚀 Next steps:"
echo "   git add public/images/"
echo "   git commit -m 'add compressed images'"
echo "   git push"