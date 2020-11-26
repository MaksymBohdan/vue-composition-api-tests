import { makeRouter } from './../../src/router/index';
import { mount } from '@vue/test-utils';
import ShowPost from '@/components/ShowPost.vue';
import flushPromises from 'flush-promises';
import * as mocks from '@/mocks';
import { createStore, initialState } from '../../src/store';

jest.mock('axios', () => ({
  get: (url: string) => ({
    data: [mocks.todayPost],
  }),
}));

describe('ShowPost', () => {
  it('does not render an edit link when no users is logged in', async () => {
    const store = createStore(initialState());
    const router = makeRouter();

    router.push('/posts/1');
    await router.isReady();

    const wrapper = mount(ShowPost, {
      global: {
        provide: {
          store,
        },
        plugins: [router],
      },
    });

    await flushPromises();
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false);
  });

  it('does not render an edit link when not authorized', async () => {
    const store = createStore({
      ...initialState(),
      authors: {
        ...initialState().authors,
        currentUserId: 2,
      },
    });

    const router = makeRouter();
    router.push('/posts/1');
    await router.isReady();

    const wrapper = mount(ShowPost, {
      global: {
        provide: {
          store,
        },
        plugins: [router],
      },
    });

    await flushPromises();
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false);
  });

  it('does render an edit link when authorized', async () => {
    const store = createStore({
      ...initialState(),
      authors: {
        ...initialState().authors,
        currentUserId: 1,
      },
    });
    const router = makeRouter();
    router.push('/posts/1');
    await router.isReady();

    const wrapper = mount(ShowPost, {
      global: {
        provide: {
          store,
        },
        plugins: [router],
      },
    });

    await flushPromises();
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(true);
  });
});
