import axios from 'axios';
import { reactive, readonly } from 'vue';
import { Post, User } from './../types';

interface PostsState {
  ids: string[];
  all: Record<string, Post>;
  loaded: boolean;
}

interface State {
  posts: PostsState;
}

const initialPostsState = (): PostsState => ({
  ids: [],
  all: {},
  loaded: false,
});

const initialState = (): State => ({
  posts: initialPostsState(),
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
    console.log('user', user);
  }
}

const store = new Store(initialState());

export const useStore = () => store;
