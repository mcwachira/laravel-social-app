import PostToggleLike from './PostToggleLike'
import PostController from './PostController'
import CommentController from './CommentController'

const Controllers = {
    PostToggleLike: Object.assign(PostToggleLike, PostToggleLike),
    PostController: Object.assign(PostController, PostController),
    CommentController: Object.assign(CommentController, CommentController),
}

export default Controllers