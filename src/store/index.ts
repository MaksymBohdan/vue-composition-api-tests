import { reactive, readonly, provide, inject } from 'vue';
import axios from 'axios';
import { Post, User, Author } from './../types';

interface AuthorState {
  ids: string[];
  all: Record<string, Author>;
  loaded: boolean;
  currentUserId?: number;
}

interface PostsState {
  ids: string[];
  all: Record<string, Post>;
  loaded: boolean;
}

interface State {
  posts: PostsState;
  authors: AuthorState;
}

const initialPostsState = (): PostsState => ({
  ids: [],
  all: {},
  loaded: false,
});

const initialAuthorsState = (): AuthorState => ({
  ids: [],
  all: {},
  loaded: false,
  currentUserId: undefined,
});

const initialState = (): State => ({
  posts: initialPostsState(),
  authors: initialAuthorsState(),
});

class Store {
  protected state: State;

  constructor(initialState: State) {
    this.state = reactive(initialState);
  }

  public getState() {
    return readonly(this.state);
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts');

    response.data.forEach((post) => {
      if (!this.state.posts.ids.includes(post.id.toString())) {
        this.state.posts.ids.push(post.id.toString());
      }
      this.state.posts.all[post.id] = post;
    });

    this.state.posts.loaded = true;
  }

  async saveNewPost(post: Post) {
    const { data } = await axios.post<Post>('/posts', post);

    this.state.posts.ids.push(data.id.toString());
    this.state.posts.all[data.id] = data;
  }

  async createUser(user: User) {
    const response = await axios.post<Author>('/users', user);
    this.state.authors.all[response.data.id] = response.data;
    this.state.authors.ids.push(response.data.id.toString());
    this.state.authors.currentUserId = response.data.id;
  }
}

export const store = new Store(initialState());

export const provideStore = () => {
  provide('store', store);
};

export const createStore = () => {
  return new Store(initialState());
};

export const useStore = () => {
  const store = inject<Store>('store') as Store;

  return store;
};
