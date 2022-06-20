<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Webklex\PDFMerger\Facades\PDFMergerFacade as PDFMerger;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/merge', function (Request $request) {

    $request->validate([
        'files' => 'required',
    ]);

    if ($request->hasFile('files')) {
        $pdf = PDFMerger::init();

        foreach ($request->file('files') as $key => $value) {
            $pdf->addPDF($value->getPathName(), 'all');
        }

        $fileName = "merged.pdf";
        $pdf->merge();
        $pdf->save(public_path($fileName));

        return response()->download(public_path($fileName, 'merged'));
    }

    return response()->json('No PDF files given', 400);
});