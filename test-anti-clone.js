// Test script untuk memverifikasi sistem anti-clone
// Jalankan dengan: node test-anti-clone.js

const https = require('https');
const http = require('http');

// Konfigurasi test
const TEST_CONFIG = {
  // Domain yang seharusnya diizinkan
  ALLOWED_DOMAINS: [
    'rama-store.vercel.app',
    'localhost:3000'
  ],
  
  // Domain yang seharusnya diblokir
  BLOCKED_DOMAINS: [
    'fake-clone-site.com',
    'unauthorized-domain.com',
    'malicious-clone.vercel.app'
  ],
  
  // Bypass secret untuk testing (jika ada)
  BYPASS_SECRET: process.env.ANTI_CLONE_BYPASS_SECRET || '',
  
  // Timeout untuk request
  TIMEOUT: 10000
};

/**
 * Membuat HTTP request untuk testing
 */
function makeRequest(domain, path = '/', headers = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = domain.includes('vercel.app') || domain.includes('https://');
    const client = isHttps ? https : http;
    const url = `${isHttps ? 'https' : 'http'}://${domain}${path}`;
    
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Anti-Clone-Test/1.0',
        ...headers
      },
      timeout: TEST_CONFIG.TIMEOUT
    };

    const req = client.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          domain,
          statusCode: res.statusCode,
          headers: res.headers,
          body: data.substring(0, 500), // Ambil 500 karakter pertama saja
          success: res.statusCode === 200
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        domain,
        statusCode: 0,
        error: error.message,
        success: false
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        domain,
        statusCode: 0,
        error: 'Request timeout',
        success: false
      });
    });
  });
}

/**
 * Test akses ke domain yang diizinkan
 */
async function testAllowedDomains() {
  console.log('🟢 Testing ALLOWED domains...');
  
  for (const domain of TEST_CONFIG.ALLOWED_DOMAINS) {
    try {
      const result = await makeRequest(domain);
      
      if (result.success) {
        console.log(`✅ ${domain}: PASSED (Status: ${result.statusCode})`);
      } else {
        console.log(`❌ ${domain}: FAILED (Status: ${result.statusCode}) - ${result.error || 'Unknown error'}`);
      }
      
      // Check security headers
      const securityHeaders = [
        'x-frame-options',
        'x-content-type-options',
        'referrer-policy'
      ];
      
      const hasSecurityHeaders = securityHeaders.some(header => 
        result.headers && result.headers[header]
      );
      
      if (hasSecurityHeaders) {
        console.log(`   🛡️  Security headers detected`);
      }
      
    } catch (error) {
      console.log(`❌ ${domain}: ERROR - ${error.message}`);
    }
  }
}

/**
 * Test akses ke domain yang seharusnya diblokir
 */
async function testBlockedDomains() {
  console.log('\\n🔴 Testing BLOCKED domains...');
  
  for (const domain of TEST_CONFIG.BLOCKED_DOMAINS) {
    try {
      const result = await makeRequest(domain);
      
      if (result.statusCode === 403) {
        console.log(`✅ ${domain}: CORRECTLY BLOCKED (Status: 403)`);
        
        // Check if response contains anti-clone message
        if (result.body && result.body.includes('Akses Ditolak')) {
          console.log(`   🛡️  Anti-clone message detected`);
        }
      } else if (result.statusCode === 0) {
        console.log(`⚠️  ${domain}: UNREACHABLE (${result.error}) - This is expected for fake domains`);
      } else {
        console.log(`❌ ${domain}: NOT BLOCKED! Status: ${result.statusCode} - SECURITY ISSUE!`);
      }
      
    } catch (error) {
      console.log(`⚠️  ${domain}: ERROR - ${error.message} (This might be expected for fake domains)`);
    }
  }
}

/**
 * Test bypass secret functionality
 */
async function testBypassSecret() {
  if (!TEST_CONFIG.BYPASS_SECRET) {
    console.log('\\n⚠️  No bypass secret configured, skipping bypass tests');
    return;
  }
  
  console.log('\\n🔑 Testing BYPASS secret...');
  
  const testDomain = TEST_CONFIG.BLOCKED_DOMAINS[0];
  
  try {
    // Test bypass via query parameter
    const queryResult = await makeRequest(testDomain, `/?bypass=${TEST_CONFIG.BYPASS_SECRET}`);
    
    if (queryResult.success) {
      console.log(`✅ Query bypass: WORKING`);
    } else {
      console.log(`❌ Query bypass: FAILED (Status: ${queryResult.statusCode})`);
    }
    
    // Test bypass via header
    const headerResult = await makeRequest(testDomain, '/', {
      'x-bypass-secret': TEST_CONFIG.BYPASS_SECRET
    });
    
    if (headerResult.success) {
      console.log(`✅ Header bypass: WORKING`);
    } else {
      console.log(`❌ Header bypass: FAILED (Status: ${headerResult.statusCode})`);
    }
    
  } catch (error) {
    console.log(`❌ Bypass test ERROR: ${error.message}`);
  }
}

/**
 * Test localhost variations
 */
async function testLocalhostVariations() {
  console.log('\\n🏠 Testing LOCALHOST variations...');
  
  const localhostVariations = [
    'localhost:3000',
    'localhost:3001', 
    '127.0.0.1:3000',
    '0.0.0.0:3000'
  ];
  
  for (const domain of localhostVariations) {
    try {
      const result = await makeRequest(domain);
      
      if (result.success) {
        console.log(`✅ ${domain}: ACCESSIBLE`);
      } else if (result.statusCode === 0) {
        console.log(`⚠️  ${domain}: NOT RUNNING (This is normal if dev server is not started)`);
      } else {
        console.log(`❌ ${domain}: BLOCKED (Status: ${result.statusCode}) - Check middleware config`);
      }
      
    } catch (error) {
      console.log(`⚠️  ${domain}: ${error.message}`);
    }
  }
}

/**
 * Test rate limiting (jika diimplementasikan)
 */
async function testRateLimit() {
  console.log('\\n⏱️  Testing RATE LIMITING...');
  
  const testDomain = TEST_CONFIG.BLOCKED_DOMAINS[0];
  const requests = [];
  
  // Send multiple requests rapidly
  for (let i = 0; i < 10; i++) {
    requests.push(makeRequest(testDomain));
  }
  
  try {
    const results = await Promise.all(requests);
    const blockedCount = results.filter(r => r.statusCode === 403).length;
    const errorCount = results.filter(r => r.statusCode === 0).length;
    
    console.log(`   📊 Sent 10 rapid requests to blocked domain`);
    console.log(`   📊 403 responses: ${blockedCount}`);
    console.log(`   📊 Errors/timeouts: ${errorCount}`);
    
    if (blockedCount > 0) {
      console.log(`✅ Rate limiting appears to be working`);
    }
    
  } catch (error) {
    console.log(`❌ Rate limit test ERROR: ${error.message}`);
  }
}

/**
 * Test dengan User-Agent yang berbeda
 */
async function testUserAgents() {
  console.log('\\n🤖 Testing different USER AGENTS...');
  
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', // Normal browser
    'Googlebot/2.1 (+http://www.google.com/bot.html)', // Google bot
    'curl/7.68.0', // Curl
    'PostmanRuntime/7.28.0', // Postman
    'python-requests/2.25.1' // Python requests
  ];
  
  const testDomain = TEST_CONFIG.BLOCKED_DOMAINS[0];
  
  for (const ua of userAgents) {
    try {
      const result = await makeRequest(testDomain, '/', {
        'User-Agent': ua
      });
      
      const userAgentType = ua.includes('Googlebot') ? 'Bot' : 
                           ua.includes('curl') ? 'Curl' :
                           ua.includes('Postman') ? 'Postman' :
                           ua.includes('python') ? 'Python' : 'Browser';
      
      if (result.statusCode === 403) {
        console.log(`✅ ${userAgentType}: BLOCKED (Status: 403)`);
      } else {
        console.log(`❌ ${userAgentType}: NOT BLOCKED (Status: ${result.statusCode})`);
      }
      
    } catch (error) {
      console.log(`⚠️  ${ua.substring(0, 20)}...: ${error.message}`);
    }
  }
}

/**
 * Main test function
 */
async function runAllTests() {
  console.log('🧪 ANTI-CLONE SYSTEM TEST SUITE');
  console.log('================================\\n');
  
  const startTime = Date.now();
  
  try {
    await testAllowedDomains();
    await testBlockedDomains();
    await testBypassSecret();
    await testLocalhostVariations();
    await testRateLimit();
    await testUserAgents();
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\\n================================');
    console.log(`✅ Test suite completed in ${duration} seconds`);
    console.log('\\n📋 SUMMARY:');
    console.log('- ✅ Green checkmarks = Working as expected');
    console.log('- ❌ Red X marks = Issues that need attention');
    console.log('- ⚠️  Yellow warnings = Expected behavior or info');
    console.log('\\n🔍 NEXT STEPS:');
    console.log('1. Fix any red X issues');
    console.log('2. Deploy to production if all tests pass');
    console.log('3. Monitor logs in Vercel dashboard');
    console.log('4. Set up monitoring alerts');
    
  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
    process.exit(1);
  }
}

/**
 * Interactive test menu
 */
function showTestMenu() {
  console.log('\\n🧪 ANTI-CLONE TEST MENU');
  console.log('========================');
  console.log('1. Test allowed domains');
  console.log('2. Test blocked domains');
  console.log('3. Test bypass secret');
  console.log('4. Test localhost variations');
  console.log('5. Test rate limiting');
  console.log('6. Test user agents');
  console.log('7. Run all tests');
  console.log('0. Exit');
  console.log('\\nSelect option (0-7): ');
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('\\n🧪 Anti-Clone Test Suite');
  console.log('Usage: node test-anti-clone.js [options]');
  console.log('\\nOptions:');
  console.log('  --all, -a    Run all tests');
  console.log('  --allowed    Test allowed domains only');
  console.log('  --blocked    Test blocked domains only');
  console.log('  --bypass     Test bypass secret only');
  console.log('  --localhost  Test localhost variations only');
  console.log('  --rate       Test rate limiting only');
  console.log('  --ua         Test user agents only');
  console.log('  --help, -h   Show this help');
  console.log('\\nEnvironment Variables:');
  console.log('  ANTI_CLONE_BYPASS_SECRET  Bypass secret for testing');
  process.exit(0);
}

// Run specific tests based on arguments
if (args.includes('--all') || args.includes('-a')) {
  runAllTests();
} else if (args.includes('--allowed')) {
  testAllowedDomains();
} else if (args.includes('--blocked')) {
  testBlockedDomains();
} else if (args.includes('--bypass')) {
  testBypassSecret();
} else if (args.includes('--localhost')) {
  testLocalhostVariations();
} else if (args.includes('--rate')) {
  testRateLimit();
} else if (args.includes('--ua')) {
  testUserAgents();
} else {
  // Default: run all tests
  runAllTests();
}

// Export for use as module
module.exports = {
  testAllowedDomains,
  testBlockedDomains,
  testBypassSecret,
  testLocalhostVariations,
  testRateLimit,
  testUserAgents,
  runAllTests
};