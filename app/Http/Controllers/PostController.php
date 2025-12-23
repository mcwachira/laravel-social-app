<?php

namespace App\Http\Controllers;


use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    //

    public function index():Response{

        return Inertia::render('posts/index', [
            'posts' => Post::latest()->get()
        ]);
    }
    public function show():Response{

        return Inertia::render('posts/show', [
            'post' => Post::findOrFail($id)
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
        Post::create($validated);

        return redirect('/posts');

//Validate

    //create the post in db
    //redirect to /pots\
}

}
