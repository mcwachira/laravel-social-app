<?php

namespace App\Http\Controllers;


use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    //

    public function index():Response{

        return Inertia::render('posts/index', [
//            'posts' => Post::with('user')->withCount('likes')->latest()->get(),
            'posts' => Inertia::scroll(
                fn () => Post::with('user')
                    ->withCount('likes')->latest()
                    ->cursorPaginate()
            ),

        ]);
    }
    public function show(string $id):Response{
$post = Post::with('user')->findOrFail($id);

        return Inertia::render('posts/show', [
            'post' =>$post,
        'comments' => Inertia::defer(
            fn() =>$post->comments()
                ->with('user')
                -> latest()
                -> get()
        ),
            'likes' => Inertia::defer(
                fn() => [
                    'count'=> $post -> likes()->count(),
                    'user_has_liked' =>Auth::check() ? $post->likes()->where('user_id', Auth::id())->exists():false
                ]
            )
        ]);

    }


    public function create():Response{

        return Inertia::render('posts/create');
    }

public function store(Request $request):RedirectResponse{

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:255',
        ]);
        Post::create([
            ...$validated,
            'user_id' => $request->user()->id
            ]);

        return redirect('/posts');

//Validate

    //create the post in db
    //redirect to /pots\
}

}
