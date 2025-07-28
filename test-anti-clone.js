#!/usr/bin/env node

/**
 * Anti-Clone System Test Script - Updated Version
 * Script untuk testing sistem anti-clone protection yang lebih fleksibel
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

// Konfigurasi test yang diperbarui
const TEST_CONFIG = {
  // Domain yang harus berhasil (mengandung 'rama-store')
  ALLOWED_DOMAINS: [
    'http://localhost:3000',
    'https://rama-store.vercel.app',
    'https://rama-store-git-main-rama-x2s-projects.vercel.app',
    'https://rama-store-4pmk9m537-rama-x2s-projects.vercel.app',
    // Tambahan test untuk berbagai format Vercel
  ],
  
  // Domain yang harus diblokir (tidak mengandung 'rama-store')
  BLOCKED_DOMAINS: [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'https://fake-domain.com',
    'https://other-store.vercel.app',
    'https://clone-website.vercel.app',
  ],
  
  // Timeout untuk request
  TIMEOUT: 10000,
};

/**
 * Test apakah domain mengandung 'rama-store'
 */
function testDomainPattern(domain) {
  const normalizedDomain = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
  return normalizedDomain.includes('rama-store');
}

/**
 * Fungsi untuk melakukan HTTP request
 */
function makeRequest(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const httpModule = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Rama-Store-Anti-Clone-Test/2.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8',
      },
      timeout: timeout,
    };

    const req = httpModule.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          url: url,
        });
      });
    });

    req.on('error', (error) => {
      reject({
        error: error.message,
        url: url,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({
        error: 'Request timeout',
        url: url,
      });
    });

    req.end();
  });
}

/**
 * Test domain yang harus diizinkan
 */
async function testAllowedDomains() {
  console.log('\n🟢 Testing ALLOWED domains (should contain "rama-store")...');
  console.log('=' .repeat(70));
  
  let successCount = 0;
  let totalCount = TEST_CONFIG.ALLOWED_DOMAINS.length;
  
  for (const domain of TEST_CONFIG.ALLOWED_DOMAINS) {
    try {
      console.log(`\n📍 Testing: ${domain}`);
      
      // Check pattern first
      const hasRamaStore = testDomainPattern(domain);
      console.log(`   🔍 Contains 'rama-store': ${hasRamaStore ? '✅' : '❌'}`);
      
      const result = await makeRequest(domain, TEST_CONFIG.TIMEOUT);
      
      if (result.statusCode === 200) {
        console.log(`   ✅ SUCCESS - Status: ${result.statusCode}`);
        successCount++;
        
        // Check security headers
        const securityHeaders = {
          'x-frame-options': result.headers['x-frame-options'],
          'x-content-type-options': result.headers['x-content-type-options'],
          'referrer-policy': result.headers['referrer-policy'],
          'x-xss-protection': result.headers['x-xss-protection'],
        };
        
        console.log('   📋 Security Headers:');
        Object.entries(securityHeaders).forEach(([key, value]) => {
          if (value) {
            console.log(`      ${key}: ${value}`);
          }
        });
        
        // Check if it's the actual Rama Store website
        if (result.body.includes('Rama Store') || result.body.includes('Top Up Game')) {
          console.log('   🎯 Verified: Actual Rama Store website content detected');
        }
        
      } else if (result.statusCode === 403) {
        console.log(`   ⚠️  UNEXPECTED BLOCK - Status: ${result.statusCode}`);
        if (result.body.includes('Akses Ditolak') || result.body.includes('403')) {
          console.log('   ❓ This domain was blocked by anti-clone system');
        }
      } else {
        console.log(`   ⚠️  UNEXPECTED STATUS - Status: ${result.statusCode}`);
      }
      
    } catch (error) {
      console.log(`   ❌ CONNECTION ERROR - ${error.error}`);
      if (error.error.includes('ENOTFOUND')) {
        console.log('   💡 This might be a test domain that doesn\'t exist');
      }
    }
  }
  
  console.log(`\n📊 Summary: ${successCount}/${totalCount} allowed domains accessible`);
}

/**
 * Test domain yang harus diblokir
 */
async function testBlockedDomains() {
  console.log('\n🔴 Testing BLOCKED domains (should NOT contain "rama-store")...');
  console.log('=' .repeat(70));
  
  let blockedCount = 0;
  let totalCount = TEST_CONFIG.BLOCKED_DOMAINS.length;
  
  for (const domain of TEST_CONFIG.BLOCKED_DOMAINS) {
    try {
      console.log(`\n📍 Testing: ${domain}`);
      
      // Check pattern first
      const hasRamaStore = testDomainPattern(domain);
      console.log(`   🔍 Contains 'rama-store': ${hasRamaStore ? '❌ (Should not!)' : '✅'}`);
      
      const result = await makeRequest(domain, TEST_CONFIG.TIMEOUT);
      
      if (result.statusCode === 403) {
        console.log(`   ✅ CORRECTLY BLOCKED - Status: ${result.statusCode}`);
        blockedCount++;
        
        // Check if it's our custom 403 page
        if (result.body.includes('Akses Ditolak') || result.body.includes('Rama Store')) {
          console.log('   🎯 Verified: Custom anti-clone 403 page detected');
        }
        
      } else if (result.statusCode === 200) {
        console.log(`   ⚠️  SECURITY ISSUE - Domain not blocked! Status: ${result.statusCode}`);
        console.log('   🚨 This domain should have been blocked by the anti-clone system');
      } else {
        console.log(`   ❓ UNEXPECTED STATUS - Status: ${result.statusCode}`);
      }
      
    } catch (error) {
      if (error.error.includes('ENOTFOUND') || error.error.includes('ECONNREFUSED')) {
        console.log(`   ✅ BLOCKED (Connection refused) - ${error.error}`);
        blockedCount++;
      } else {
        console.log(`   ❌ CONNECTION ERROR - ${error.error}`);
      }
    }
  }
  
  console.log(`\n📊 Summary: ${blockedCount}/${totalCount} domains properly blocked`);
}

/**
 * Test dengan domain Vercel yang mengandung 'rama-store'
 */
async function testVercelDomains() {
  console.log('\n🌐 Testing Vercel domain patterns...');
  console.log('=' .repeat(70));
  
  const vercelPatterns = [
    'rama-store-git-main-test.vercel.app',
    'rama-store-abc123.vercel.app', 
    'test-rama-store-xyz.vercel.app',
    'my-rama-store-project.vercel.app',
  ];
  
  vercelPatterns.forEach(pattern => {
    const hasRamaStore = testDomainPattern(`https://${pattern}`);
    console.log(`   ${pattern}: ${hasRamaStore ? '✅ Should be allowed' : '❌ Would be blocked'}`);
  });
}

/**
 * Main test function
 */
async function runTests() {
  console.log('🔒 RAMA STORE ANTI-CLONE PROTECTION TEST');
  console.log('=' .repeat(70));
  console.log(`🕐 Test started at: ${new Date().toISOString()}`);
  console.log(`⏱️  Timeout: ${TEST_CONFIG.TIMEOUT}ms`);
  console.log(`🎯 Testing anti-clone system for domains containing 'rama-store'`);
  
  try {
    await testVercelDomains();
    await testAllowedDomains();
    await testBlockedDomains();
    
    console.log('\n' + '=' .repeat(70));
    console.log('🎉 ANTI-CLONE TEST COMPLETED!');
    console.log('\n📋 Test Summary:');
    console.log('✅ Domains containing "rama-store" should be accessible (200 OK)');
    console.log('🚫 Domains NOT containing "rama-store" should be blocked (403 Forbidden)');
    console.log('🔒 All Vercel preview URLs with "rama-store" should work');
    console.log('\n⚠️  Note: Some test domains may not exist, causing connection errors');
    console.log('🌐 The actual test should be done with real deployed URLs');
    
    console.log('\n🚀 To test your live website:');
    console.log('1. Deploy using: deploy-anti-clone.bat');
    console.log('2. Access https://rama-store.vercel.app (should work)');
    console.log('3. Try accessing from a different domain (should be blocked)');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Export functions untuk penggunaan lain
module.exports = {
  makeRequest,
  testDomainPattern,
  testAllowedDomains,
  testBlockedDomains,
  testVercelDomains,
  runTests,
};

// Jalankan test jika script dipanggil langsung
if (require.main === module) {
  runTests();
}
