import { basePost } from '@/mocks';
import { mount } from '@vue/test-utils';
import TimelinePost from '@/components/TimelinePost.vue';

describe('TimelinePost', () => {
  it('contains title and created', () => {
    const wrapper = mount(TimelinePost, {
      propsData: {
        post: { ...basePost },
      },
    });

    const title = wrapper.find('[data-test="title"]');
    const created = wrapper.find('[data-test="created"]');

    expect(title.exists()).toBe(true);
    expect(created.exists()).toBe(true);
  });
});
