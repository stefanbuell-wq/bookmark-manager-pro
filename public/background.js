// Background Service Worker for Bookmark Manager Extension

// Hugging Face API configuration
const HF_API_URL = 'https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.3/v1/chat/completions';

// Get API key from storage
async function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['huggingfaceApiKey'], (result) => {
      resolve(result.huggingfaceApiKey || '');
    });
  });
}

// Generate tags using AI
async function generateTags(url, title) {
  const apiKey = await getApiKey();

  if (!apiKey) {
    return generateTagsLocally(url, title);
  }

  try {
    const prompt = `Analysiere dieses Lesezeichen und generiere 3-5 passende deutsche Tags (einzelne Wörter, lowercase).
URL: ${url}
Titel: ${title || 'Kein Titel'}

Antworte NUR mit den Tags, kommagetrennt, ohne weitere Erklärung.`;

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      throw new Error('API Error: ' + response.status);
    }

    const data = await response.json();
    const content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || '';

    const tags = content
      .split(',')
      .map(function(t) { return t.trim().toLowerCase().replace(/[^a-zäöüß0-9-]/g, ''); })
      .filter(function(t) { return t.length > 1 && t.length < 30; })
      .slice(0, 5);

    return tags.length > 0 ? tags : generateTagsLocally(url, title);
  } catch (error) {
    console.error('AI tag generation failed:', error);
    return generateTagsLocally(url, title);
  }
}

// Local tag generation fallback
function generateTagsLocally(url, title) {
  const tags = [];

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '').split('.')[0];
    if (domain.length > 2 && tags.indexOf(domain) === -1) {
      tags.push(domain);
    }
  } catch (e) {}

  // Extract words from title
  if (title) {
    const words = title.toLowerCase()
      .replace(/[^a-zäöüß0-9\s]/g, '')
      .split(/\s+/)
      .filter(function(w) { return w.length > 3 && w.length < 20; });

    words.slice(0, 3).forEach(function(w) {
      if (tags.indexOf(w) === -1) {
        tags.push(w);
      }
    });
  }

  // URL path analysis
  var pathTags = {
    'github': 'entwicklung',
    'stackoverflow': 'programmierung',
    'youtube': 'video',
    'docs': 'dokumentation',
    'blog': 'artikel',
    'news': 'nachrichten',
    'shop': 'shopping',
    'amazon': 'shopping'
  };

  for (var key in pathTags) {
    if (url.toLowerCase().indexOf(key) !== -1) {
      var tag = pathTags[key];
      if (tags.indexOf(tag) === -1) {
        tags.push(tag);
      }
    }
  }

  return tags.slice(0, 5);
}

// Check if URL is reachable
async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(function() { controller.abort(); }, 10000);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      mode: 'no-cors'
    });

    clearTimeout(timeoutId);
    return { ok: true, status: response.status || 200 };
  } catch (error) {
    if (error.name === 'AbortError') {
      return { ok: false, status: 0, error: 'Timeout' };
    }
    return { ok: false, status: 0, error: error.message };
  }
}

// Message handler
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'generateTags') {
    generateTags(request.url, request.title).then(sendResponse);
    return true;
  }

  if (request.action === 'checkUrl') {
    checkUrl(request.url).then(sendResponse);
    return true;
  }

  if (request.action === 'getBookmarks') {
    chrome.bookmarks.getTree().then(sendResponse);
    return true;
  }
});

console.log('Bookmark Manager Pro - Background Service Worker loaded');
