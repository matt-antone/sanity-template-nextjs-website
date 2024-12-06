import fetch from 'node-fetch'

export async function uploadImage(client, imageUrl) {
  const imageResponse = await fetch(imageUrl)
  const arrayBuffer = await imageResponse.arrayBuffer()
  const imageBuffer = Buffer.from(arrayBuffer)
  const imageAsset = await client.assets.upload('image', imageBuffer)
  return imageAsset._id
} 