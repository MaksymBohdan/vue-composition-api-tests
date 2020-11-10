import { mount } from '@vue/test-utils';
import Home from '@/components/Home.vue';
import flushPromises from 'flush-promises';
import * as mocks from '@/mocks';

jest.mock('axios', () => ({
  get: (url: string) => ({
    data: [mocks.todayPost, mocks.thisWeekPost, mocks.thisMonthPost],
  }),
}));

describe('Home', () => {
  it('renders progress', () => {
    const wrapper = mount(Home);

    expect(wrapper.find('[data-test="progress"]').exists()).toBe(true);
  });

  it('renders two 3 tabs', async () => {
    const wrapper = mount(Home);
    await flushPromises();

    expect(wrapper.findAll('[data-test="period"]')).toHaveLength(3);
  });

  it('updates the period when clicked', async () => {
    const wrapper = mount(Home);
    await flushPromises();

    const $today = wrapper.findAll('[data-test="period"]')[0];
    expect($today.classes()).toContain('is-active');

    const $thisWeek = wrapper.findAll('[data-test="period"]')[1];
    // trigger returns nextTick by default
    await $thisWeek.trigger('click');
    expect($today.classes()).not.toContain('is-active');
    expect($thisWeek.classes()).toContain('is-active');

    const $thisMonth = wrapper.findAll('[data-test="period"]')[2];
    await $thisMonth.trigger('click');
    expect($thisWeek.classes()).not.toContain('is-active');
    expect($thisMonth.classes()).toContain('is-active');
  });

  it('renders today posts by default', async () => {
    const wrapper = mount(Home);
    await flushPromises();

    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(1);
  });

  it('updates the post when clicked', async () => {
    const wrapper = mount(Home);
    await flushPromises();

    const $today = wrapper.findAll('[data-test="period"]')[0];
    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(1);

    const $thisWeek = wrapper.findAll('[data-test="period"]')[1];
    await $thisWeek.trigger('click');
    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(2);

    const $thisMonth = wrapper.findAll('[data-test="period"]')[2];
    await $thisMonth.trigger('click');
    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(3);
  });
});
