<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    function LoginIndex(){
        return view('login');
    }

}
