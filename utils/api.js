const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';
  const USERS_URL = 'users';
  const THREADS_URL = 'threads';
  const COMMENTS_URL = 'comments';
  
  function setToken(token) {
    sessionStorage.setItem('TOKEN_KEY', token);
  }
  
  function getToken() {
    return sessionStorage.getItem('TOKEN_KEY');
  }
  
  async function returnResult(rawResponse) {
    const data = await rawResponse.json();
    return data;
  }
  
  function fetchWithTokens(URL, option = {}) {
    return fetch(URL, {
      ...option,
      headers: {
        ...option.headers,
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }
  
  async function registerUser({ name, email, password }) {
    const rawResponse = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    return returnResult(rawResponse);
  }
  
  async function login({ email, password }) {
    const rawResponse = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await rawResponse.json();
  
    if (data.status === 'success') {
      setToken(data.data.token);
    }
  
    return data;
  }
  
  async function seeAllUsers() {
    const rawResponse = await fetch(`${BASE_URL}/${USERS_URL}`);
    return returnResult(rawResponse);
  }
  
  async function seeOwnProfile() {
    const rawResponse = await fetchWithTokens(`${BASE_URL}/${USERS_URL}/me`);
    return returnResult(rawResponse);
  }
  
  async function createThread({ title, body, category }) {
    const rawResponse = await fetchWithTokens(`${BASE_URL}/${THREADS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });
  
    return returnResult(rawResponse);
  }
  
  async function seeAllThreads() {
    const rawResponse = await fetch(`${BASE_URL}/${THREADS_URL}`);
  
    return returnResult(rawResponse);
  }
  
  async function seeDetailThread(threadId) {
    const rawResponse = await fetch(`${BASE_URL}/${THREADS_URL}/${threadId}`);
  
    return returnResult(rawResponse);
  }
  
  async function createComment(threadId, content) {
    const rawResponse = await fetchWithTokens(`${BASE_URL}/${THREADS_URL}/${threadId}/${COMMENTS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
  
    return returnResult(rawResponse);
  }
  
  async function upVoteThread(threadId) {
    const rawResponse = await fetchWithTokens(`${BASE_URL}/${THREADS_URL}/${threadId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return returnResult(rawResponse);
  }
  
  async function downVoteThread(threadId) {
    const rawResponse = await fetchWithTokens(`${BASE_URL}/${THREADS_URL}/${threadId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return returnResult(rawResponse);
  }
  
  async function neutralizeVoteThread(threadId) {
    const rawResponse = await fetchWithTokens(`${BASE_URL}/${THREADS_URL}/${threadId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return returnResult(rawResponse);
  }
  
  async function upVoteComment(threadId, commentId) {
    const rawResponse = await fetchWithTokens(`${BASE_URL}/${THREADS_URL}/${threadId}/${COMMENTS_URL}/${commentId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return returnResult(rawResponse);
  }
  
  async function downVoteComment(threadId, commentId) {
    const rawResponse = await fetchWithTokens(`${BASE_URL}/${THREADS_URL}/${threadId}/${COMMENTS_URL}/${commentId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return returnResult(rawResponse);
  }
  
  async function neutralizeVoteComment(threadId, commentId) {
    const rawResponse = await fetchWithTokens(`${BASE_URL}/${THREADS_URL}/${threadId}/${COMMENTS_URL}/${commentId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return returnResult(rawResponse);
  }
  
  async function seeLeaderboards() {
    const rawResponse = await fetch(`${BASE_URL}/leaderboards`);
  
    return returnResult(rawResponse);
  }
  
  return {
    registerUser,
    login,
    seeAllUsers,
    seeOwnProfile,
    createThread,
    seeAllThreads,
    seeDetailThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralizeVoteThread,
    upVoteComment,
    downVoteComment,
    neutralizeVoteComment,
    seeLeaderboards,
  };
})();

export default api;