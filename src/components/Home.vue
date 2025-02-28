<template>
  <div class="home">
    <div class="profile">
      <img :src="profileImage" alt="头像" class="avatar">
      <p class="username">{{ username }}</p>
    </div>
    <div class="search-bar">
      <input v-model="searchQuery" @keyup.enter="searchArticles" placeholder="搜索文章...">
      <button @click="searchArticles">搜索</button>
    </div>
    <div class="content">
      <h1>文章</h1>
      <div v-for="article in articles" :key="article.title" class="article-summary">
        <h2 @click="goToArticle(article.title)">{{ article.title }}</h2>
        <p>更新时间: {{ article.updateAt }}</p>
        <p>概要： {{ article.summary }}</p>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <span>第 {{ currentPage }} 页</span>
        <button @click="nextPage" :disabled="!hasMore">下一页</button>
      </div>
    </div>
    <div class="friend-links">
      <h2>友链</h2>
      <ul>
        <li><a :href="links.bilibili" target="_blank">哔哩哔哩</a></li>
        <li><a href="#" @click.prevent="showWeChatQR">微信</a></li>
      </ul>
      <div v-if="showQR" class="wechat-qr-modal">
        <img :src="links.wechatQR" alt="微信好友二维码" class="wechat-qr">
        <button @click="closeWeChatQR">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileImage: new URL('@/assets/avatar.jpg', import.meta.url).href,
      username: 'mkitsdts',
      searchQuery: '',
      links: {
        bilibili: 'https://space.bilibili.com/390343932?spm_id_from=333.937.0.0',
        wechatQR: new URL('@/assets/avatar.jpg', import.meta.url).href,
      },
      articles: [],
      currentPage: 1,
      hasMore: true,
      showQR: false
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles(page = 1) {
      try {
        const response = await fetch(`http://localhost:8080/home?page=${page}`);
        if (!response.ok) {
          throw new Error('网络响应失败');
        }
        const data = await response.json();
        this.articles = data.articles;
        this.hasMore = data.hasMore;
        this.currentPage = page;
      } catch (error) {
        console.error('获取文章数据失败:', error);
      }
    },
    async searchArticles() {
      try {
        const response = await fetch(`http://localhost:8080/search?keyword=${this.searchQuery}&page=1`);
        if (!response.ok) {
          throw new Error('网络响应失败');
        }
        const data = await response.json();
        this.articles = data.articles;
        this.hasMore = data.hasMore;
        this.currentPage = 1;
      } catch (error) {
        console.error('搜索文章数据失败:', error);
      }
    },
    goToArticle(title) {
      this.$router.push({ name: 'Article', params: { title } });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.fetchArticles(this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.hasMore) {
        this.fetchArticles(this.currentPage + 1);
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
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.profile {
  text-align: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  padding: 5px;
  font-size: 16px;
}

.search-bar button {
  padding: 5px 10px;
  font-size: 16px;
}

.content {
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
}

.article-summary {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.article-summary h2 {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
}

.friend-links {
  width: 200px;
  text-align: center;
}

.friend-links ul {
  list-style: none;
  padding: 0;
}

.friend-links li {
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