<template>
  <section v-if="isCollection && topicData" class="mb-4">
    <h2>{{ $t('topics') }}</h2>
    <div>
      <ul>
        <li v-for="topic in topicData.topics" :key="topic.id">
          <a
            :href="`${discourseRoot}/t/${topic.slug}`"
            target="_blank"
          >
            <span class="title">{{ topic.unicode_title || topic.title }}</span>
            <span class="excerpt">{{
              topic.excerpt?.replace("&hellip;", " ...")
            }}</span>
            <span class="date">{{
              new Date(topic.bumped_at).toLocaleDateString()
            }}</span>
            <span class="posts">
              <img
                v-for="(avatar, idx) in uniqueAvatars(topic.id)"
                :key="idx"
                :src="`${discourseRoot}${avatar.replace('{size}', '28')}`"
              />
              {{ topicData.posts.filter((p) => p.topic_id === topic.id).length }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>message-text-outline</title>
                <path
                  fill="#C2C8CC"
                  d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M4,4V17.17L5.17,16H20V4H4M6,7H18V9H6V7M6,11H15V13H6V11Z"
                />
              </svg>
              {{ topic.posts_count }}
            </span>
          </a>
        </li>
      </ul>
      <i>
        <span v-if="topicData.topics?.length < 1">
          No related topics found?
        </span>
        <span v-else> Didn't find what you were looking for? </span>
        <a
          :href="`${discourseRoot}/new-topic?title=${
            data.title
          }&category=data-workflows&tags=${capitalize(
            data['osc:type']
          )},${data.keywords?.join(',')},STAC`"
          target="_blank"
          ><strong>Start a new topic on the EarthCODE forum</strong></a
        >!</i
      >
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState, mapGetters } from 'vuex';
import { discourseRoot } from "../custom";

export default defineComponent({
  data() {
    return {
      discourseRoot,
      topicData: null,
    };
  },
  computed: {
    ...mapState(['data']),
    ...mapGetters(['isCollection']),
  },
  watch: {
    data: {
      immediate: true,
      async handler(stacData) {
        if (!stacData?.title || !this.isCollection) {
          this.topicData = null;
          return;
        }
        await this.fetchTopics(stacData.title);
      }
    }
  },
  methods: {
    async fetchTopics(title) {
      try {
        const response = await fetch(`${discourseRoot}/search.json?q=${encodeURIComponent(title)}`);
        if (response.ok) {
          this.topicData = await response.json();
        }
      } catch (error) {
        console.error('Failed to fetch forum topics:', error);
      }
    },
    capitalize(s) {
      return String(s[0]).toUpperCase() + String(s).slice(1);
    },
    uniqueAvatars(topicId) {
      return [...new Set(
        this.topicData.posts
          .filter((p) => p.topic_id === topicId)
          .map((p) => p.avatar_template)
      )];
    },
  },
});
</script>

<style scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
}
li a {
  background: #fff;
  border: 1px solid #c2c8cc;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 12px;
  display: grid;
  grid-template-areas:
    "title"
    "date"
    "posts"
    "excerpt";
  gap: 16px;
  transition: all ease-in-out 0.3s;
  text-decoration: none;
}
.title {
  font-family: NotesESAbold, sans-serif;
  font-size: 18px;
  line-height: 27px;
  grid-area: title;
  margin-bottom: 8px;
}
.date {
  grid-area: date;
  color: #647078;
  font-size: 16px;
  line-height: 25px;
}
.excerpt {
  grid-area: excerpt;
  color: #8a969e;
  font-size: 16px;
  line-height: 25px;
}
.posts {
  grid-area: posts;
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 25px;
}
.posts img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 8px;
}
.posts img:nth-child(n + 2) {
  margin-left: -20px;
}
.posts svg {
  margin-left: 16px;
  margin-right: 8px;
  height: 28px;
}
@media (min-width: 640px) {
  li a {
    grid-template-areas:
      "title date"
      "excerpt posts";
  }
  .date,
  .posts {
    justify-self: self-end;
  }
}
</style>
