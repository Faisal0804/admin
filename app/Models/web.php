<?php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\VisitorController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Admin Panel Service Management
Route::get('/',[HomeController::class,'HomeIndex']);
Route::get('/visitor',[VisitorController::class,'VisitorIndex']);


// services controller
Route::get('/service',[ServiceController::class,'ServiceIndex']);
Route::get('/getServiceData',[ServiceController::class,'getServiceData']);
Route::post('/ServiceDelete', [ServiceController::class,'ServiceDelete']);
Route::post('/ServiceDetails', [ServiceController::class,'getServiceDetails']);
Route::post('/ServiceUpdate', [ServiceController::class,'ServiceUpdate']);
Route::post('/ServiceAdd', [ServiceController::class,'ServiceAdd']);



// Courses controller

Route::get('/courses',[CoursesController::class,'CoursesIndex']);
Route::get('/getCoursesData', [CoursesController::class,'getCoursesData']);
Route::post('/CoursesAdd',  [CoursesController::class,'CoursesAdd']);
Route::post('/CoursesDelete', [CoursesController::class,'CoursesDelete']);
Route::post('/CoursesDetails',[CoursesController::class,'getCoursesDetails']);
Route::post('/CoursesUpdate', [CoursesController::class,'CoursesUpdate']);


// Project controller
Route::get('/Project',[ProjectController::class,'ProjectIndex']);


