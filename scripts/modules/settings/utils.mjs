import fetch from 'node-fetch'

// Helper function to upload image
export async function uploadImage(client, imageUrl) {
  try {
    const imageResponse = await fetch(imageUrl)
    const arrayBuffer = await imageResponse.arrayBuffer()
    const imageBuffer = Buffer.from(arrayBuffer)
    const imageAsset = await client.assets.upload('image', imageBuffer)
    return imageAsset._id
  } catch (error) {
    throw new Error(`Failed to upload image from ${imageUrl}: ${error.message}`)
  }
} 