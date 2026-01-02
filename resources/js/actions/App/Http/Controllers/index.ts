import PostController from './PostController'
import CommentController from './CommentController'

const Controllers = {
    PostController: Object.assign(PostController, PostController),
    CommentController: Object.assign(CommentController, CommentController),
}

export default Controllers