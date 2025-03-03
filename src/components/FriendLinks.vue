<template>
  <div class="friend-links-page">
    <div class="profile">
      <div class="profile-background">
        <img :src="profileImage" alt="头像" class="avatar">
        <p class="username">{{ username }}</p>
      </div>
    </div>
    <div class="nav-bar">
      <div class="nav-left">
        <button @click="goHome" class="nav-button">首页</button>
        <button @click="goAbout" class="nav-button">关于</button>
        <button @click="goFriendLinks" class="nav-button">友链</button>
      </div>
      <div class="nav-right">
        <input v-model="searchQuery" @keyup.enter="searchArticles" placeholder="搜索文章..." class="search-input">
        <button @click="searchArticles" class="search-button">搜索</button>
      </div>
    </div>
    <h1>友链</h1>
    <ul>
      <li><a :href="links.bilibili" target="_blank">哔哩哔哩</a></li>
      <li><a href="#" @click.prevent="showWeChatQR">微信</a></li>
    </ul>
    <div v-if="showQR" class="wechat-qr-modal">
      <img :src="links.wechatQR" alt="微信好友二维码" class="wechat-qr">
      <button @click="closeWeChatQR">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileImage: new URL('@/assets/avatar.png', import.meta.url).href,
      username: 'mkitsdts',
      searchQuery: '',
      links: {
        bilibili: 'https://space.bilibili.com/390343932?spm_id_from=333.937.0.0',
        wechatQR: new URL('@/assets/avatar.jpg', import.meta.url).href,
      },
      showQR: false
    };
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' });
    },
    goAbout() {
      this.$router.push({ name: 'About' });
    },
    goFriendLinks() {
      this.$router.push({ name: 'FriendLinks' });
    },
    async searchArticles() {
      try {
        const response = await fetch(`http://localhost:8080/search?keyword=${this.searchQuery}&page=1`);
        if (!response.ok) {
          throw new Error('网络响应失败');
        }
        const data = await response.json();
        this.$router.push({ name: 'Home', query: { articles: data.articles, maxPage: data.maxpage, currentPage: 1 } });
      } catch (error) {
        console.error('搜索文章数据失败:', error);
      }
    },
    showWeChatQR() {
      this.showQR = true;
    },
    closeWeChatQR() {
      this.showQR = false;
    }
  }
};
</script>

<style scoped>
.friend-links-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.profile-background {
  text-align: center;
  border: 1px solid #ccc;
  padding: 20px;
  background-image: url('@/assets/background.jpg'); /* 替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  width: 50vw;
  height: 6.18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50vw;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #ffe4e1; /* 浅粉红色背景 */
  border-radius: 10px;
}

.nav-left {
  display: flex;
  gap: 10px;
}

.nav-right {
  display: flex;
  gap: 10px;
}

.nav-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.nav-button:hover {
  text-decoration: underline;
}

.search-input {
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  font-size: 16px;
  background: none;
}

.search-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.username {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.friend-links-page ul {
  list-style: none;
  padding: 0;
}

.friend-links-page li {
  margin-bottom: 10px;
}

.wechat-qr-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.wechat-qr {
  width: 100px;
  height: 100px;
}
</style>