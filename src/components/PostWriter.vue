<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Post Title</div>
          <div class="control">
            <input
              v-model="title"
              type="text"
              class="input"
              data-test="post-title"
            />
            {{ title }}
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-one-half">
        <div
          contenteditable
          id="markdown"
          ref="contentEditable"
          @input="handleEdit"
          data-test="markdown"
        />
      </div>
      <div class="column is-one-half">
        <div v-html="html" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <button
          class="button is-primary is-pulled-right"
          @click="submit"
          data-test="submit-post"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { parse, MarkedOptions } from 'marked';
import debounce from 'lodash.debounce';
import { Post } from '@/types';
import { highlightAuto } from 'highlight.js';

export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props, ctx) {
    const title = ref(props.post.title);
    const contentEditable = ref<null | HTMLDivElement>(null);
    const markdown = ref(props.post.markdown);
    const html = ref('');

    const handleEdit = () => {
      markdown.value = contentEditable.value!.innerText;
    };

    onMounted(() => {
      contentEditable.value!.innerText = markdown.value;
    });

    const options: MarkedOptions = {
      highlight: (code: string) => highlightAuto(code).value,
    };

    const updateHtml = (value: string) => (html.value = parse(value, options));

    watch(() => markdown.value, debounce(updateHtml, 500), { immediate: true });

    const submit = () => {
      const newPost = {
        ...props.post,
        title: title.value,
        markdown: markdown.value,
        html: html.value,
      };

      ctx.emit('save', newPost);
    };

    return {
      title,
      contentEditable,
      handleEdit,
      html,
      submit,
    };
  },
});
</script>
