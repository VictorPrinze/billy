#!/usr/bin/env python3
"""
Billy & Sarah — Image Optimizer
Uses Pillow to correctly fix EXIF rotation + convert to WebP
Run: python3 compress.py
"""

from PIL import Image, ImageFilter
import os, sys

INPUT  = './public/images'
OUTPUT = './public/images/webp'
THUMBS = './public/images/thumbs'

os.makedirs(OUTPUT, exist_ok=True)
os.makedirs(THUMBS, exist_ok=True)

EXTS = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}

# EXIF orientation tag number
ORIENTATION_TAG = 274

def fix_orientation(img: Image.Image) -> Image.Image:
    """Read EXIF orientation and physically rotate pixels to match."""
    try:
        exif = img._getexif()
        if not exif:
            return img
        orientation = exif.get(ORIENTATION_TAG, 1)
        if   orientation == 2: img = img.transpose(Image.FLIP_LEFT_RIGHT)
        elif orientation == 3: img = img.rotate(180)
        elif orientation == 4: img = img.rotate(180).transpose(Image.FLIP_LEFT_RIGHT)
        elif orientation == 5: img = img.rotate(-90, expand=True).transpose(Image.FLIP_LEFT_RIGHT)
        elif orientation == 6: img = img.rotate(-90, expand=True)
        elif orientation == 7: img = img.rotate(90, expand=True).transpose(Image.FLIP_LEFT_RIGHT)
        elif orientation == 8: img = img.rotate(90, expand=True)
    except Exception:
        pass
    return img

files = [f for f in os.listdir(INPUT)
         if os.path.splitext(f)[1] in EXTS
         and os.path.isfile(os.path.join(INPUT, f))]

if not files:
    print(f"❌ No images found in {INPUT}")
    sys.exit(1)

print(f"\n🖼️  Processing {len(files)} images...\n{'━'*50}")

total_before = 0
total_after  = 0

for filename in sorted(files):
    inpath    = os.path.join(INPUT, filename)
    base      = os.path.splitext(filename)[0]
    outpath   = os.path.join(OUTPUT, f"{base}.webp")
    thumbpath = os.path.join(THUMBS, f"{base}-thumb.webp")

    before = os.path.getsize(inpath)
    total_before += before

    try:
        img = Image.open(inpath)

        # Convert to RGB (handles CMYK, RGBA, palette modes)
        if img.mode not in ('RGB', 'RGBA'):
            img = img.convert('RGB')
        elif img.mode == 'RGBA':
            bg = Image.new('RGB', img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[3])
            img = bg

        # ✅ THE FIX — read EXIF and rotate pixels correctly
        img = fix_orientation(img)

        # Resize to max 1920px wide keeping aspect ratio
        max_w = 1920
        if img.width > max_w:
            ratio = max_w / img.width
            img = img.resize(
                (max_w, int(img.height * ratio)),
                Image.LANCZOS
            )

        # Save full WebP
        img.save(outpath, 'WEBP', quality=82, method=6)

        # Save tiny blur thumbnail (20px wide)
        thumb_w = 20
        thumb_h = int(img.height * (thumb_w / img.width))
        thumb = img.resize((thumb_w, thumb_h), Image.LANCZOS)
        thumb = thumb.filter(ImageFilter.GaussianBlur(radius=1))
        thumb.save(thumbpath, 'WEBP', quality=20)

        after = os.path.getsize(outpath)
        total_after += after
        saved = round((1 - after / before) * 100)
        print(f"✅ {filename}")
        print(f"   {before//1024}KB → {after//1024}KB  ({saved}% smaller)\n")

    except Exception as e:
        print(f"❌ {filename} — {e}\n")

print('━'*50)
print(f"📦 {len(files)} images processed")
print(f"   Before : {total_before//1024} KB")
print(f"   After  : {total_after//1024} KB")
print(f"   Saved  : {round((1 - total_after/total_before)*100)}%")
print('━'*50)
print(f"\n✨ WebP   → public/images/webp/")
print(f"✨ Thumbs → public/images/thumbs/")
print(f"\n🚀 Now run: npm run build\n")