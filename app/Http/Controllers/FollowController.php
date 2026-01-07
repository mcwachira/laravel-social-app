<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Services\FollowService;
use Illuminate\Http\RedirectResponse;

class FollowController extends Controller
{

    public function store(User $user, FollowService $service):RedirectResponse
    {

        $service -> follow(auth() -> user(), $user);

        return back()->with('message', 'User followed successfully');
    }


    public function destroy(User $user, FollowService $service):RedirectResponse
    {
        $service->unfollow(auth()->user(), $user);

        return  back();
    }
}
