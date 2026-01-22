import { Actor } from 'apify';

const RATE_LIMIT_DELAY = 1000; // 1 second between requests

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function pinFileByUrl(url, apiKey, network = 'public', privateExpiration = 86400) {
    try {
        console.log(`📌 Attempting to pin: ${url} (${network} network)`);
        
        // First, fetch the file to get its content
        const fileResponse = await fetch(url);
        if (!fileResponse.ok) {
            throw new Error(`Failed to fetch file: ${fileResponse.status} ${fileResponse.statusText}`);
        }
        
        const blob = await fileResponse.blob();
        const formData = new FormData();
        
        // Extract filename from URL
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = pathname.split('/').pop() || 'file';
        
        formData.append('file', blob, filename);
        formData.append('network', network);
        formData.append('name', filename);
        
        // Upload to Pinata
        const uploadResponse = await fetch('https://uploads.pinata.cloud/v3/files', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        });
        
        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            throw new Error(`Pinata upload failed: ${uploadResponse.status} - ${errorText}`);
        }
        
        const result = await uploadResponse.json();
        console.log(`✅ Successfully pinned: ${url}`);
        
        let web3Url;
        
        // For private files, generate signed URL
        if (network === 'private') {
            console.log(`🔐 Generating signed URL for private file (expires in ${privateExpiration}s)...`);
            
            const signedUrlResponse = await fetch('https://api.pinata.cloud/v3/files/private/download_link', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: `https://os.mypinata.cloud/files/${result.data.cid}`,
                    expires: privateExpiration,
                    date: Math.floor(Date.now() / 1000),
                    method: 'GET'
                })
            });
            
            if (!signedUrlResponse.ok) {
                const errorText = await signedUrlResponse.text();
                throw new Error(`Failed to generate signed URL: ${signedUrlResponse.status} - ${errorText}`);
            }
            
            const signedUrlResult = await signedUrlResponse.json();
            web3Url = signedUrlResult.data;
            console.log(`🔐 Signed URL generated (valid for ${privateExpiration}s)`);
        } else {
            // For public files, use standard gateway URL
            web3Url = `https://gateway.pinata.cloud/ipfs/${result.data.cid}`;
        }
        
        return {
            success: true,
            cid: result.data.cid,
            web3Url: web3Url
        };
        
    } catch (error) {
        console.error(`❌ Failed to pin ${url}: ${error.message}`);
        return {
            success: false,
            error: error.message
        };
    }
}

Actor.main(async () => {
    console.log('🚀 Starting Upload to Web3...');
    
    const input = await Actor.getInput();
    const { startUrls, pinataApiKey, visibility = 'public', privateExpiration = 86400 } = input;
    
    if (!startUrls || startUrls.length === 0) {
        throw new Error('No URLs provided');
    }
    
    if (!pinataApiKey) {
        throw new Error('Pinata API Key is required');
    }
    
    console.log(`📊 Processing ${startUrls.length} URLs`);
    
    // Process URLs
    const dataset = await Actor.openDataset();
    
    for (let i = 0; i < startUrls.length; i++) {
        const urlEntry = startUrls[i];
        const url = urlEntry.url;
        
        console.log(`\n[${i + 1}/${startUrls.length}] Processing: ${url}`);
        
        const result = await pinFileByUrl(url, pinataApiKey, visibility, privateExpiration);
        
        const output = {
            url: url,
            cid: result.success ? result.cid : null,
            web3Url: result.success ? result.web3Url : null,
            status: result.success ? 'success' : `Error - ${result.error}`
        };
        
        await dataset.pushData(output);
        
        // Rate limiting delay
        if (i < startUrls.length - 1) {
            console.log(`⏳ Waiting ${RATE_LIMIT_DELAY}ms for rate limiting...`);
            await sleep(RATE_LIMIT_DELAY);
        }
    }
    
    console.log('\n✅ Upload to Web3 completed!');
});