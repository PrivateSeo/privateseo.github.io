const cheerio = require('cheerio');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { parse } = require('node-html-parser');

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://privseo.ru',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  try {
    const { urls, keywords } = JSON.parse(event.body);
    
    if (!urls?.length || !keywords?.length) {
      throw new Error('Необходимо указать URL и ключевые фразы');
    }

    const results = await Promise.all(urls.map(async (url) => {
      try {
        const { data, status } = await axios.get(url, {
          headers: { 'User-Agent': 'SEO-Analyzer/1.0' }
        });

        const $ = cheerio.load(data);
        const dom = new JSDOM(data);
        const root = parse(data);
        
        // Extract basic SEO data
        const title = $('title').text().trim();
        const description = $('meta[name="description"]').attr('content') || '';
        
        // Headers analysis
        const headers = {
          h1: [],
          h2: []
        };
        $('h1').each((i, el) => headers.h1.push($(el).text().trim()));
        $('h2').each((i, el) => headers.h2.push($(el).text().trim()));

        // Images analysis
        const images = {
          total: 0,
          withAlt: 0,
          withoutAlt: 0
        };
        $('img').each((i, el) => {
          images.total++;
          $(el).attr('alt') ? images.withAlt++ : images.withoutAlt++;
        });

        // Content analysis
        const bodyText = root.querySelector('body').text
          .replace(/\s+/g, ' ')
          .replace(/<[^>]*>/g, '')
          .trim();
        const contentLength = bodyText.length;

        // Keyword analysis
        const keywordAnalysis = {};
        keywords.forEach(keyword => {
          const exact = countExactMatches(bodyText, keyword);
          const partial = countPartialMatches(bodyText, keyword);
          const density = bodyText.length > 0 
            ? ((exact / bodyText.split(/\s+/).length) * 100 
            : 0;

          keywordAnalysis[keyword] = {
            exactMatches: exact,
            partialMatches: partial,
            density: parseFloat(density.toFixed(2))
          };
        });

        return {
          url,
          status,
          title,
          meta: { description },
          headers,
          images,
          contentLength,
          keywordAnalysis
        };

      } catch (error) {
        console.error(`Error analyzing ${url}:`, error);
        return { url, error: error.message };
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(results)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// Helper functions
function countExactMatches(text, keyword) {
  const regex = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'gi');
  return (text.match(regex) || []).length;
}

function countPartialMatches(text, keyword) {
  const words = keyword.toLowerCase().split(/\s+/);
  if (words.length <= 1) return 0;
  
  const textWords = text.toLowerCase().split(/\s+/);
  let count = 0;
  
  for (let i = 0; i <= textWords.length - words.length; i++) {
    let match = true;
    for (let j = 0; j < words.length; j++) {
      if (textWords[i + j] !== words[j]) {
        match = false;
        break;
      }
    }
    if (match) count++;
  }
  return count;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}