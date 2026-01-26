# Upload to Web3

## Description
**Upload to Web3** is an Apify app that uploads files to IPFS (InterPlanetary File System) using the Pinata API. Upload any type of file - images, PDFs, documents, videos - to decentralized Web3 storage and get permanent, censorship-resistant URLs.

**Key Features:**
- **Universal File Support**: Pin any file type (images, PDFs, documents, videos, archives)
- **Bulk Processing**: Process thousands of URLs in a single run
- **Rate Limiting**: Built-in 1-second delay between requests to respect Pinata API limits
- **Direct URLs**: Get immediate IPFS gateway URLs for all pinned files
- **Permanent Storage**: Files are permanently stored on the decentralized IPFS network

[![Watch the video](https://img.youtube.com/vi/P0e-eD_dUTY/maxresdefault.jpg)](https://www.youtube.com/watch?v=P0e-eD_dUTY)

## Open Source

This is an **open source project** released under the MIT License with Attribution. You're free to use, modify, and distribute this code for personal or commercial purposes. See the [LICENSE](https://github.com/onescales/Upload-to-Web3/blob/main/LICENSE) file for full details.

**Code Repository:** [https://github.com/onescales/Upload-to-Web3](https://github.com/onescales/Upload-to-Web3)

This software is provided "as is" without warranties. Use at your own risk and enjoy! 🚀

## Prerequisites

### Get Your Pinata API Key

1. **Create a Pinata Account**: Sign up at [https://pinata.cloud](https://pinata.cloud)
2. **Generate API Key**: 
   - Visit [https://app.pinata.cloud/developers/api-keys](https://app.pinata.cloud/developers/api-keys)
   - Click "New Key"
   - Give it a name (e.g., "Apify Bulk Backup")
   - Select "Admin" access or ensure "Pinning" permissions are enabled
   - Click "Generate API Key"
   - **Copy the JWT token** (you won't be able to see it again!)

## Use Cases

### 1. **Content Archive & Backup**
- Archive blog posts, articles, and media files
- Create permanent backups of important documents
- Preserve content that might be taken down or deleted

### 2. **NFT & Digital Art**
- Store NFT metadata and artwork on IPFS
- Create permanent links for digital collectibles
- Ensure artwork remains accessible forever

### 3. **Decentralized Applications**
- Host static assets for dApps on IPFS
- Store user-generated content permanently
- Build censorship-resistant applications

### 4. **Academic & Research**
- Archive research papers and datasets
- Create permanent citations for digital resources
- Share research materials with guaranteed availability

### 5. **Media Distribution**
- Distribute videos, podcasts, and audio files
- Host images and graphics on decentralized storage
- Create permanent download links

### 6. **Legal & Compliance**
- Create immutable records of documents
- Timestamp and preserve evidence
- Meet regulatory archival requirements

## Input Example

```json
{
  "startUrls": [
    {
      "url": "https://example.com/document.pdf"
    },
    {
      "url": "https://example.com/images/photo.jpg"
    },
    {
      "url": "https://example.com/video.mp4"
    }
  ],
  "pinataApiKey": "eyJhgh8bGciOiJIUzI1XVCJ9...",
  "privateExpiration": 2592000
}
```

### Settings Explanations

**startUrls** (Required)
- Supports any file type: images (jpg, png, gif, webp), documents (pdf, docx), videos (mp4, mov), archives (zip, tar), and more
- Click "Bulk edit" to paste multiple URLs at once
- Each URL must be a direct link to a file (not a webpage)

**pinataApiKey** (Required)
- Your Pinata JWT token from [https://app.pinata.cloud/developers/api-keys](https://app.pinata.cloud/developers/api-keys)
- This is securely stored and never shown in logs
- Required for authentication with Pinata's API

**visibility** (Optional, default: "public")
- Choose how your files are accessible on IPFS
- **Public**: Files are accessible by anyone using standard IPFS gateways
- **Private**: Files are only accessible via signed URLs from your Pinata gateway
- Use private for sensitive content that should have controlled access

**privateExpiration** (Optional, default: 2592000 seconds / 30 days)
- ⚠️ Only applies when visibility is set to "Private"
- Controls how long the signed URL remains valid before expiring
- After expiration, you'll need to generate a new signed URL from Pinata
- Common values:
  - 3600 = 1 hour
  - 86400 = 24 hours (1 day)
  - 604800 = 7 days
  - 2592000 = 30 days (default)
  - 31556952 = 1 year
- Maximum: 315569520 seconds (~10 years)
- Minimum: 60 seconds

## Output Example

```json
[
  {
    "url": "https://example.com/document.pdf",
    "web3Url": "https://gateway.pinata.cloud/ipfs/QmX7K8bV9fGj3HnNJ5qP4rL2mD8wE1xA",
    "cid": "QmX7K8bV9fGj3HnNJ5qP4rL2mD8wE1xA",
    "status": "success"
  },
  {
    "url": "https://example.com/images/photo.jpg",
    "web3Url": "https://gateway.pinata.cloud/ipfs/QmY8L9cW0hHk4IoOK6rQ5sN3nE2yB",
    "cid": "QmX7K8bV9fGj3HnNJ5qP4rL2mD8wE1xA",
    "status": "success"
  },
  {
    "url": "https://example.com/missing-file.jpg",
    "web3Url": null,
    "cid": null,
    "status": "Error - Failed to fetch file: 404 Not Found"
  }
]
```

### Output Fields Description

- **url**: The original URL you provided
- **web3Url**: The permanent IPFS gateway URL where your file can be accessed (null if failed)
- **status**: Either "success" or "Error - {reason}" explaining what went wrong

## Rate Limiting

The app includes built-in rate limiting of 1 second between URL's to comply with Pinata's API limits

## Common Issues & Solutions

### "Failed to fetch file: 404"
- The URL doesn't exist or is broken
- Make sure the URL is a direct link to the file

### "Failed to fetch file: 403"
- The file is behind authentication or access control
- You need a publicly accessible URL

### "Pinata upload failed: 401"
- Your API key is invalid or expired
- Generate a new API key from Pinata

### "Budget limit reached"
- Increase your budget in Apify settings
- Or reduce the number of URLs to process

## IPFS & Web3 URLs

Your files are pinned to IPFS and accessible via:
- **Pinata Gateway**: `https://gateway.pinata.cloud/ipfs/{CID}`
- **Public IPFS**: Any IPFS gateway can access your files using the CID
- **Permanent**: Files remain accessible as long as they're pinned

## Disclaimer

**IMPORTANT: Legal Responsibility and Content Ownership**

By using this app, you acknowledge and agree that:

- **You are solely responsible** for the content you upload and pin to IPFS
- **You own or have proper authorization** to upload, distribute, and store all files you process through this service
- **You will not upload** any content that infringes on copyrights, trademarks, patents, or other intellectual property rights
- **You will not upload** any illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable content
- **You understand** that files pinned to IPFS are publicly accessible and permanent - they cannot be easily removed once uploaded
- **You comply** with all applicable laws and regulations regarding the content you upload
- **You hold harmless** One Scales Inc., Apify, and Pinata from any legal claims, damages, or liabilities arising from your use of this service
- **You accept** that this tool is provided "as-is" without warranties of any kind
- **You are responsible** for your own Pinata account, API keys, and any charges incurred

**Content Permanence Warning**: IPFS is designed for permanent storage. Once content is pinned and distributed across the network, it may be cached by multiple nodes and become difficult or impossible to completely remove. Only upload content you are comfortable being publicly accessible indefinitely.

**Privacy Notice**: Do not upload personal information, sensitive data, private documents, or confidential materials unless you fully understand the implications of permanent public storage.

By proceeding to use this actor and/or the open source code, you confirm that you have read, understood, and agree to these terms, abide by all laws and you understand you are fully responsible for using this actor and/or code.

## / Try it Out / Demo

You can use the open source code to upload to your Apify account or use https://apify.com/onescales/upload-to-web3

See video walkthrough: https://www.youtube.com/watch?v=P0e-eD_dUTY

## Need Help?

**Have Questions or Need Support?**

We're here to help! Whether you need assistance with setup, API key issues, or have questions about IPFS and Web3 storage, we've got you covered.

**Contact Us**

Fill out the form at [https://docs.google.com/forms/d/e/1FAIpQLSfsKyzZ3nRED7mML47I4LAfNh_mBwkuFMp1FgYYJ4AkDRgaRw/viewform?usp=dialog](https://docs.google.com/forms/d/e/1FAIpQLSfsKyzZ3nRED7mML47I4LAfNh_mBwkuFMp1FgYYJ4AkDRgaRw/viewform?usp=dialog), and we'll help you as quickly as possible.

## License

MIT License with Attribution

Copyright (c) 2026 One Scales Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

1. The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

2. Any use of this Software, whether in source or binary form, must include attribution to "One Scales" with a link to https://onescales.com in the user-facing documentation, UI, or credits section.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
