const { readdirSync, writeFileSync, existsSync } = require('fs')
const { join } = require('path')
const sizeOf = require('image-size')

const storeDir = join(process.cwd(), 'public', 'store')
const metadata = []

// 检查 store 目录是否存在
if (existsSync(storeDir)) {
  const files = readdirSync(storeDir)

  for (const filename of files) {
    try {
      const filePath = join(storeDir, filename)
      const dimensions = sizeOf(filePath)

      const imageInfo = {
        src: `/store/${filename}`,
        isGIF: filename.split('.').pop() == 'gif',
        width: dimensions.width,
        height: dimensions.height,
      }

      metadata.push(imageInfo)
    } catch (error) {
      console.warn(
        `Warning: Could not process image ${filename}:`,
        error.message
      )
    }
  }
}

writeFileSync('plugin-images-metadata.json', JSON.stringify(metadata, null, 2))
console.log(
  `Generated plugin-images-metadata.json with ${metadata.length} images`
)
