const axios = require('axios');

exports.handler = async function(event, context) {
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // OPTIONS 요청 처리 (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // 백엔드 URL
    const backendUrl = 'http://todo-demo-inyeong.ap-northeast-2.elasticbeanstalk.com';
    
    // 요청 경로 추출
    const path = event.path.replace('/.netlify/functions/api-proxy', '');
    const fullUrl = `${backendUrl}${path}`;
    
    // 요청 헤더 설정
    const requestHeaders = {
      'Content-Type': 'application/json'
    };
    
    // Authorization 헤더가 있으면 추가
    if (event.headers.authorization) {
      requestHeaders.Authorization = event.headers.authorization;
    }

    // 백엔드로 요청 전송
    const response = await axios({
      method: event.httpMethod,
      url: fullUrl,
      headers: requestHeaders,
      data: event.body ? JSON.parse(event.body) : undefined,
      timeout: 10000
    });

    return {
      statusCode: response.status,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response.data)
    };

  } catch (error) {
    console.error('Proxy error:', error);
    
    return {
      statusCode: error.response?.status || 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: error.response?.data?.message || error.message || 'Internal server error'
      })
    };
  }
}; 