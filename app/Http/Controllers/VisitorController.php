<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\visitorModel;

class VisitorController extends Controller
{
    function VisitorIndex(){


        $VisitorData =json_decode(visitorModel::orderBy('id','desc')->take(100)->get()) ;
        return view('visitor',['VisitorData'=> $VisitorData]);

    }
}
