<?php

namespace App\Http\Controllers;


use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    //

    public function index():Response{

        return Inertia::render('posts/index', [
            'post' => Post::latest()->get()
        ]);
    }
    public function show():Response{

        return Inertia::render('posts/show', [
            'post' => Post::findOrFail($id)
        ]);
    }

}
