import { t } from "./helpers/createRouter";
import { usersRouter } from "./User.router";
import { profilesRouter } from "./Profile.router";
import { postsRouter } from "./Post.router";
import { categoriesRouter } from "./Category.router";

export const appRouter = t.router({
  user: usersRouter,
  profile: profilesRouter,
  post: postsRouter,
  category: categoriesRouter
})

