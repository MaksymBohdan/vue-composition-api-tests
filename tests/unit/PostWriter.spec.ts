import { mount } from '@vue/test-utils';
import PostWriter from '@/components/PostWriter.vue';
import { basePost } from '@/mocks';

describe('PostWriter', () => {
  it('composes a post and emits new data', (done) => {
    const wrapper = mount(PostWriter, {
      propsData: {
        post: { ...basePost },
      },
    });

    wrapper
      .find<HTMLInputElement>('[data-test="post-title"]')
      .setValue('some new title');

    wrapper.find<HTMLDivElement>('[data-test="markdown"]').element.innerText =
      '### Content';
    wrapper.find<HTMLDivElement>('[data-test="markdown"]').trigger('input');

    setTimeout(() => {
      wrapper.find('[data-test="submit-post"]').trigger('click');
      expect(wrapper.emitted().save[0][0].title).toBe('some new title');
      expect(wrapper.emitted().save[0][0].markdown).toBe('### Content');
      expect(wrapper.emitted().save[0][0].html).toBe(
        '<h3 id="content">Content</h3>\n',
      );

      done();
    }, 550);
  });
});
